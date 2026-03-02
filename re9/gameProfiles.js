/**
 * Rich Presence game profiles — Resident Evil 9 themed.
 *
 * Each profile represents a character / playstyle from the RE universe.
 * Users appear as "Playing Resident Evil 9" with different details
 * depending on their account suffix.
 *
 * - name          : Game title shown in "Playing <name>"
 * - details       : First line of the Rich Presence body
 * - state         : Second line
 * - largeImage    : URL for the large (cover) image
 * - largeText     : Tooltip on the large image
 * - smallImage    : URL for the small (badge) image
 * - smallText     : Tooltip on the small image
 * - partySize     : [current, max] players in the room
 * - buttons       : Up to 2 clickable buttons [{name, url}]
 */

const GAME_PROFILES = {
  // ─── Ethan Winters ────────────────────────────────────────────
  '1': {
    name: 'Resident Evil 9',
    details: 'Story Mode — The Shadows of Valiant',
    state: 'Exploring the Abandoned Monastery',
    largeImage: 'https://cdn.akamai.steamstatic.com/steam/apps/2050650/header.jpg',
    largeText: 'Resident Evil 9 — Shadows of Valiant',
    smallImage: 'https://cdn.akamai.steamstatic.com/steam/apps/2050650/capsule_231x87.jpg',
    smallText: 'S.T.A.R.S.',
    partySize: [1, 4],
    buttons: [
      { name: '🎮 Get on Steam', url: 'https://store.steampowered.com/app/2050650/' },
      { name: '🧟 RE Wiki', url: 'https://residentevil.fandom.com/wiki/Ethan_Winters' },
    ],
  },

  // ─── Chris Redfield ───────────────────────────────────────────
  '2': {
    name: 'Resident Evil 9',
    details: 'Campaign — Operation Nightfall',
    state: 'Clearing the Bioweapon Lab 💀',
    largeImage: 'https://cdn.akamai.steamstatic.com/steam/apps/2050650/header.jpg',
    largeText: 'Resident Evil 9 — Chris Redfield',
    smallImage: 'https://cdn.akamai.steamstatic.com/steam/apps/2050650/capsule_231x87.jpg',
    smallText: 'B.S.A.A.',
    partySize: [2, 4],
    buttons: [
      { name: '🎮 Get on Steam', url: 'https://store.steampowered.com/app/2050650/' },
      { name: '🧟 RE Wiki', url: 'https://residentevil.fandom.com/wiki/Chris_Redfield' },
    ],
  },

  // ─── Jill Valentine ──────────────────────────────────────────
  '3': {
    name: 'Resident Evil 9',
    details: 'Survival Mode — Last Stand',
    state: 'Defending the Safe House 🔫',
    largeImage: 'https://cdn.akamai.steamstatic.com/steam/apps/2050650/header.jpg',
    largeText: 'Resident Evil 9 — Jill Valentine',
    smallImage: 'https://cdn.akamai.steamstatic.com/steam/apps/2050650/capsule_231x87.jpg',
    smallText: 'S.T.A.R.S.',
    partySize: [3, 4],
    buttons: [
      { name: '🎮 Get on Steam', url: 'https://store.steampowered.com/app/2050650/' },
      { name: '🧟 RE Wiki', url: 'https://residentevil.fandom.com/wiki/Jill_Valentine' },
    ],
  },

  // ─── Leon S. Kennedy ─────────────────────────────────────────
  '4': {
    name: 'Resident Evil 9',
    details: 'Mercenaries — S-Rank Run',
    state: 'Village Ruins — Wave 15 🏚️',
    largeImage: 'https://cdn.akamai.steamstatic.com/steam/apps/2050650/header.jpg',
    largeText: 'Resident Evil 9 — Leon S. Kennedy',
    smallImage: 'https://cdn.akamai.steamstatic.com/steam/apps/2050650/capsule_231x87.jpg',
    smallText: 'D.S.O. Agent',
    partySize: [4, 4],
    buttons: [
      { name: '🎮 Get on Steam', url: 'https://store.steampowered.com/app/2050650/' },
      { name: '🧟 RE Wiki', url: 'https://residentevil.fandom.com/wiki/Leon_S._Kennedy' },
    ],
  },

  // ─── Rose Winters ─────────────────────────────────────────────
  '5': {
    name: 'Resident Evil 9',
    details: 'Shadows of Rose — DLC Campaign',
    state: 'Megamycete Realm — Final Chapter 🌹',
    largeImage: 'https://cdn.akamai.steamstatic.com/steam/apps/2050650/header.jpg',
    largeText: 'Resident Evil 9 — Rose Winters',
    smallImage: 'https://cdn.akamai.steamstatic.com/steam/apps/2050650/capsule_231x87.jpg',
    smallText: 'Winters Legacy',
    partySize: [1, 2],
    buttons: [
      { name: '🎮 Get on Steam', url: 'https://store.steampowered.com/app/2050650/' },
      { name: '🧟 RE Wiki', url: 'https://residentevil.fandom.com/wiki/Rosemary_Winters' },
    ],
  },

  // ─── Ada Wong ─────────────────────────────────────────────────
  '6': {
    name: 'Resident Evil 9',
    details: 'Separate Ways — Covert Ops',
    state: 'Infiltrating Umbrella HQ 🕵️',
    largeImage: 'https://cdn.akamai.steamstatic.com/steam/apps/2050650/header.jpg',
    largeText: 'Resident Evil 9 — Ada Wong',
    smallImage: 'https://cdn.akamai.steamstatic.com/steam/apps/2050650/capsule_231x87.jpg',
    smallText: 'Double Agent',
    partySize: [1, 2],
    buttons: [
      { name: '🎮 Get on Steam', url: 'https://store.steampowered.com/app/2050650/' },
      { name: '🧟 RE Wiki', url: 'https://residentevil.fandom.com/wiki/Ada_Wong' },
    ],
  },
};

module.exports = { GAME_PROFILES };
