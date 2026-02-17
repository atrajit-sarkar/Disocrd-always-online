require('dotenv').config();
const { Client } = require('discord.js-selfbot-v13');

const VALID_STATUSES = ['online', 'idle', 'dnd', 'invisible'];

const accounts = Object.entries(process.env)
  .filter(([key]) => key.startsWith('TOKEN_'))
  .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
  .map(([key, value]) => {
    const suffix = key.replace('TOKEN_', '');
    const status = (process.env[`STATUS_${suffix}`] || 'online').trim().toLowerCase();
    return { token: value.trim(), status: VALID_STATUSES.includes(status) ? status : 'online' };
  })
  .filter(({ token }) => Boolean(token));

if (accounts.length === 0) {
  console.error('No tokens found in DISCORD_TOKENS. Add comma-separated tokens to .env');
  process.exit(1);
}

for (const { token, status } of accounts) {
  const client = new Client();

  client.on('ready', async () => {
    console.log(`${client.user.username} is ready! (status: ${status})`);

    // Clear all activities (removes Spotify RPC & custom status)
    client.user.setPresence({
      activities: [],
      status,
    });

    // console.log(`${client.user.username}: Cleared status & Spotify, set online.`);
  });

  client.login(token).catch(err => {
    console.error(`Failed to login with token ...${token.slice(-6)}:`, err.message);
  });
}