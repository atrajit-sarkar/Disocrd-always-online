/**
 * Rich Presence game profiles for each Akatsuki member.
 *
 * Each profile provides all the data needed to build a full RichPresence:
 * - name          : Game title shown in "Playing <name>"
 * - details       : First line of the Rich Presence body (e.g. current mode)
 * - state         : Second line (e.g. score / map)
 * - largeImage    : URL for the large (cover) image  (Steam CDN — always reachable)
 * - largeText     : Tooltip on the large image
 * - smallImage    : URL for the small (badge) image
 * - smallText     : Tooltip on the small image
 * - partySize     : [current, max] players in the room
 * - buttons       : Up to 2 clickable buttons [{name, url}]
 */

const GAME_PROFILES = {
  // ─── Pain / Nagato ────────────────────────────────────────────
  '1': {
    name: 'Naruto Shippuden: Ultimate Ninja Storm 4',
    details: 'Online Battle — Ranked Match',
    state: 'Almighty Push Mode',
    // App ID: 349040 (Storm 4)
    largeImage: 'https://cdn.akamai.steamstatic.com/steam/apps/349040/header.jpg',
    largeText: 'Naruto Storm 4 — Road to Boruto',
    smallImage: 'https://raw.githubusercontent.com/tnienow4-crypto/Images/main/akatsuki-logo.png',
    smallText: 'Akatsuki',
    partySize: [6, 10],
    buttons: [
      { name: '🎮 Get on Steam', url: 'https://store.steampowered.com/app/349040/' },
      { name: '🍥 Naruto Wiki', url: 'https://naruto.fandom.com/wiki/Pain' },
    ],
  },

  // ─── Hidan ────────────────────────────────────────────────────
  '2': {
    name: 'Naruto to Boruto: Shinobi Striker',
    details: 'Survival Exercise — Base Battle',
    state: 'Jashin Ritual Arena',
    // App ID: 633230 (Shinobi Striker)
    largeImage: 'https://cdn.akamai.steamstatic.com/steam/apps/633230/header.jpg',
    largeText: 'Shinobi Striker — Healer Class',
    smallImage: 'https://raw.githubusercontent.com/tnienow4-crypto/Images/main/akatsuki-logo.png',
    smallText: 'Akatsuki',
    partySize: [4, 8],
    buttons: [
      { name: '🎮 Get on Steam', url: 'https://store.steampowered.com/app/633230/' },
      { name: '🍥 Naruto Wiki', url: 'https://naruto.fandom.com/wiki/Hidan' },
    ],
  },

  // ─── Kakuzu ───────────────────────────────────────────────────
  '3': {
    name: 'Naruto Shippuden: Ultimate Ninja Impact',
    details: 'Story Mode — Chapter 9',
    state: 'Five Hearts Unleashed',
    // Impact is a PSP game. Using a GitHub-hosted cover image.
    largeImage: 'https://raw.githubusercontent.com/tnienow4-crypto/Images/main/naruto-game.jpg',
    largeText: 'Ultimate Ninja Impact — PSP',
    smallImage: 'https://raw.githubusercontent.com/tnienow4-crypto/Images/main/akatsuki-logo.png',
    smallText: 'Akatsuki',
    partySize: [3, 6],
    buttons: [
      { name: '📖 IGDB Page', url: 'https://www.igdb.com/games/naruto-shippuden-ultimate-ninja-impact' },
      { name: '🍥 Naruto Wiki', url: 'https://naruto.fandom.com/wiki/Kakuzu' },
    ],
  },

  // ─── Deidara ──────────────────────────────────────────────────
  '4': {
    name: 'Naruto Shippuden: Ultimate Ninja Storm Revolution',
    details: 'Ninja World Tournament — Finals',
    state: 'C4 Karura Unleashed 💥',
    // App ID: 272510 (Storm Revolution)
    largeImage: 'https://raw.githubusercontent.com/tnienow4-crypto/Images/main/naruto-game.jpg',
    largeText: 'Storm Revolution',
    smallImage: 'https://raw.githubusercontent.com/tnienow4-crypto/Images/main/akatsuki-logo.png',
    smallText: 'Akatsuki',
    partySize: [5, 8],
    buttons: [
      { name: '🎮 Get on Steam', url: 'https://store.steampowered.com/app/272510/' },
      { name: '🍥 Naruto Wiki', url: 'https://naruto.fandom.com/wiki/Deidara' },
    ],
  },

  // ─── Sasori ───────────────────────────────────────────────────
  '5': {
    name: 'Naruto Shippuden: Ultimate Ninja Storm 3',
    details: 'Adventure Mode — War Arc',
    state: 'Red Secret Technique',
    // App ID: 234670 (Storm 3 Full Burst)
    largeImage: 'https://raw.githubusercontent.com/tnienow4-crypto/Images/main/naruto-game.jpg',
    largeText: 'Storm 3 — Full Burst',
    smallImage: 'https://raw.githubusercontent.com/tnienow4-crypto/Images/main/akatsuki-logo.png',
    smallText: 'Akatsuki',
    partySize: [4, 8],
    buttons: [
      { name: '🎮 Get on Steam', url: 'https://store.steampowered.com/app/234670/' },
      { name: '🍥 Naruto Wiki', url: 'https://naruto.fandom.com/wiki/Sasori' },
    ],
  },

  // ─── Konan ────────────────────────────────────────────────────
  '6': {
    name: 'Naruto Shippuden: Ultimate Ninja Storm 2',
    details: 'Free Battle — VS Mode',
    state: 'Paper Ocean Technique 🦋',
    // App ID: 543770 (Storm 2)
    largeImage: 'https://raw.githubusercontent.com/tnienow4-crypto/Images/main/naruto-game.jpg',
    largeText: 'Storm 2 — Tale of Jiraiya the Gallant',
    smallImage: 'https://raw.githubusercontent.com/tnienow4-crypto/Images/main/akatsuki-logo.png',
    smallText: 'Akatsuki',
    partySize: [6, 10],
    buttons: [
      { name: '🎮 Get on Steam', url: 'https://store.steampowered.com/app/543770/' },
      { name: '🍥 Naruto Wiki', url: 'https://naruto.fandom.com/wiki/Konan' },
    ],
  },
};

module.exports = { GAME_PROFILES };
