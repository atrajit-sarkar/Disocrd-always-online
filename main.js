require('dotenv').config();
const { Client, SpotifyRPC, CustomStatus, RichPresence } = require('discord.js-selfbot-v13');
const { NARUTO_SHIPPUDEN_PLAYLIST } = require('./narutoPlaylist');
const { GAME_PROFILES } = require('./gameProfiles');

const VALID_STATUSES = ['online', 'idle', 'dnd', 'invisible'];

const accounts = Object.entries(process.env)
  .filter(([key]) => key.startsWith('TOKEN_'))
  .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
  .map(([key, value]) => {
    const suffix = key.replace('TOKEN_', '');
    const status = (process.env[`STATUS_${suffix}`] || 'online').trim().toLowerCase();
    const spotifyRaw = (process.env[`SPOTIFY_${suffix}`] || 'true').trim().toLowerCase();
    const spotifyEnabled = spotifyRaw === 'true' || spotifyRaw === '1' || spotifyRaw === 'yes';
    const voiceChannelId = (process.env[`VOICE_${suffix}`] || '').trim() || null;
    const textStatus = (process.env[`TEXT_STATUS_${suffix}`] || '').trim() || null;
    const game = (process.env[`GAME_${suffix}`] || '').trim() || null;
    return {
      token: value.trim(),
      status: VALID_STATUSES.includes(status) ? status : 'online',
      spotifyEnabled,
      voiceChannelId,
      textStatus,
      game,
      suffix,
    };
  })
  .filter(({ token }) => Boolean(token));

if (accounts.length === 0) {
  console.error('No tokens found in DISCORD_TOKENS. Add comma-separated tokens to .env');
  process.exit(1);
}

/**
 * Fisher-Yates shuffle — returns a new shuffled copy of the array.
 */
function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * Build and set the Spotify RPC presence for a given song index.
 * When all songs finish, re-shuffles and starts again.
 */
function playSong(client, playlist, songIndex, status, extraActivities) {
  const song = playlist[songIndex];
  const now = Date.now();

  const spotify = new SpotifyRPC(client)
    .setAssetsLargeImage(`spotify:${song.imageId}`)
    .setAssetsLargeText(song.album)
    .setState(song.artist)
    .setDetails(song.title)
    .setStartTimestamp(now)
    .setEndTimestamp(now + song.durationMs)
    .setSongId(song.trackId);

  const activities = [...extraActivities, spotify];

  client.user.setPresence({
    activities,
    status,
  });

  console.log(
    `${client.user.username}: Now playing [${song.op}] "${song.title}" by ${song.artist} (${Math.floor(song.durationMs / 1000)}s)`,
  );

  // Schedule the next song when this one ends
  const nextIndex = songIndex + 1;
  const timer = setTimeout(() => {
    if (nextIndex < playlist.length) {
      playSong(client, playlist, nextIndex, status, extraActivities);
    } else {
      // Re-shuffle and loop from the beginning
      const reshuffled = shuffleArray(playlist);
      console.log(`${client.user.username}: Playlist finished — reshuffling and restarting!`);
      playSong(client, reshuffled, 0, status, extraActivities);
    }
  }, song.durationMs);

  // Store timer reference on client so it can be cleaned up
  client._spotifyTimer = timer;

  return timer;
}

/**
 * Join a voice channel and auto-rejoin on disconnect.
 */
function joinVoice(client, channelId) {
  const channel = client.channels.cache.get(channelId);
  if (!channel) {
    console.warn(`${client.user.username}: Voice channel ${channelId} not found in cache.`);
    return;
  }

  client.voice
    .joinChannel(channel, { selfMute: false, selfDeaf: true })
    .then(connection => {
      console.log(`${client.user.username}: Joined voice channel #${channel.name} (${channelId})`);

      connection.on('disconnect', () => {
        console.log(`${client.user.username}: Disconnected from voice — rejoining in 5s...`);
        setTimeout(() => joinVoice(client, channelId), 5_000);
      });
    })
    .catch(err => {
      console.error(`${client.user.username}: Failed to join voice channel ${channelId}:`, err.message);
      // Retry after 10s on failure
      setTimeout(() => joinVoice(client, channelId), 10_000);
    });
}

/**
 * Build a full RichPresence "Playing" activity with images, party, details, and buttons.
 * Uses RichPresence.getExternal() to proxy the cover image through Discord's CDN.
 */
async function buildGamePresence(client, profile) {
  const rpc = new RichPresence(client)
    .setName(profile.name)
    .setType('PLAYING')
    .setDetails(profile.details)
    .setState(profile.state)
    .setStartTimestamp(Date.now())
    .setParty({
      id: `akatsuki_${client.user.id}`,
      current: profile.partySize[0],
      max: profile.partySize[1],
    });

  // Resolve external images through a known Discord application
  const APP_ID = '363445589247131668'; // A public RPC-enabled app
  try {
    const external = await RichPresence.getExternal(
      client,
      APP_ID,
      profile.largeImage,
      profile.smallImage,
    );
    if (external?.[0]?.external_asset_path) {
      rpc.setAssetsLargeImage(`mp:${external[0].external_asset_path}`);
      rpc.setAssetsLargeText(profile.largeText);
    }
    if (external?.[1]?.external_asset_path) {
      rpc.setAssetsSmallImage(`mp:${external[1].external_asset_path}`);
      rpc.setAssetsSmallText(profile.smallText || 'Akatsuki');
    }
  } catch {
    console.warn(`${client.user.username}: Could not load external game images, continuing without.`);
  }

  rpc.setApplicationId(APP_ID);

  // Add clickable buttons
  if (profile.buttons?.length) {
    try {
      rpc.setButtons(...profile.buttons);
    } catch {
      // Buttons may fail if URLs are invalid, skip gracefully
    }
  }

  return rpc;
}

for (const { token, status, spotifyEnabled, voiceChannelId, textStatus, game, suffix } of accounts) {
  const client = new Client();

  client.on('ready', async () => {
    console.log(
      `${client.user.username} is ready! (status: ${status}, spotify: ${spotifyEnabled}, voice: ${voiceChannelId || 'none'}, customStatus: ${textStatus || 'none'}, game: ${game || 'none'})`,
    );

    // Build extra activities (custom status + rich game presence) that persist alongside Spotify
    const extraActivities = [];

    if (textStatus) {
      extraActivities.push(new CustomStatus(client).setState(textStatus));
      console.log(`${client.user.username}: Custom status set: "${textStatus}"`);
    }

    // Build rich game presence from profile
    const gameProfile = GAME_PROFILES[suffix];
    if (gameProfile) {
      try {
        const gameRpc = await buildGamePresence(client, gameProfile);
        extraActivities.push(gameRpc);
        console.log(`${client.user.username}: Rich game presence: "${gameProfile.name}" — ${gameProfile.details} [${gameProfile.partySize[0]}/${gameProfile.partySize[1]}]`);
      } catch (err) {
        console.error(`${client.user.username}: Failed to build game RPC:`, err.message);
        // Fall back to simple game name
        if (game) extraActivities.push({ name: game, type: 0 });
      }
    } else if (game) {
      extraActivities.push({ name: game, type: 0 });
      console.log(`${client.user.username}: Playing game (simple): "${game}"`);
    }

    if (spotifyEnabled) {
      // Each client gets its own shuffled copy of the playlist
      const shuffled = shuffleArray(NARUTO_SHIPPUDEN_PLAYLIST);
      console.log(`${client.user.username}: Shuffled playlist — first up: "${shuffled[0].title}"`);
      playSong(client, shuffled, 0, status, extraActivities);
    } else {
      // Set extra activities only, or clear
      client.user.setPresence({
        activities: extraActivities,
        status,
      });
    }

    // Join voice channel if configured
    if (voiceChannelId) {
      joinVoice(client, voiceChannelId);
    }
  });

  client.login(token).catch(err => {
    console.error(`Failed to login with token ...${token.slice(-6)}:`, err.message);
  });
}