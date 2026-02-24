require('dotenv').config();
const { Client, SpotifyRPC } = require('discord.js-selfbot-v13');
const { NARUTO_SHIPPUDEN_PLAYLIST } = require('./narutoPlaylist');

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
    return {
      token: value.trim(),
      status: VALID_STATUSES.includes(status) ? status : 'online',
      spotifyEnabled,
      voiceChannelId,
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
function playSong(client, playlist, songIndex, status) {
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

  client.user.setPresence({
    activities: [spotify],
    status,
  });

  console.log(
    `${client.user.username}: Now playing [${song.op}] "${song.title}" by ${song.artist} (${Math.floor(song.durationMs / 1000)}s)`,
  );

  // Schedule the next song when this one ends
  const nextIndex = songIndex + 1;
  const timer = setTimeout(() => {
    if (nextIndex < playlist.length) {
      playSong(client, playlist, nextIndex, status);
    } else {
      // Re-shuffle and loop from the beginning
      const reshuffled = shuffleArray(playlist);
      console.log(`${client.user.username}: Playlist finished — reshuffling and restarting!`);
      playSong(client, reshuffled, 0, status);
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
  if (!channel || !channel.isVoice()) {
    console.warn(`${client.user.username}: Voice channel ${channelId} not found or not a voice channel.`);
    return;
  }

  channel
    .join()
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

for (const { token, status, spotifyEnabled, voiceChannelId, suffix } of accounts) {
  const client = new Client();

  client.on('ready', async () => {
    console.log(
      `${client.user.username} is ready! (status: ${status}, spotify: ${spotifyEnabled}, voice: ${voiceChannelId || 'none'})`,
    );

    if (spotifyEnabled) {
      // Each client gets its own shuffled copy of the playlist
      const shuffled = shuffleArray(NARUTO_SHIPPUDEN_PLAYLIST);
      console.log(`${client.user.username}: Shuffled playlist — first up: "${shuffled[0].title}"`);
      playSong(client, shuffled, 0, status);
    } else {
      // Clear all activities (removes Spotify RPC & custom status)
      client.user.setPresence({
        activities: [],
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