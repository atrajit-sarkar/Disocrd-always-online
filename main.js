require('dotenv').config();
const { Client } = require('discord.js-selfbot-v13');

const tokens = Object.entries(process.env)
  .filter(([key]) => key.startsWith('TOKEN_'))
  .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
  .map(([, value]) => value.trim())
  .filter(Boolean);

if (tokens.length === 0) {
  console.error('No tokens found in DISCORD_TOKENS. Add comma-separated tokens to .env');
  process.exit(1);
}

for (const token of tokens) {
  const client = new Client();

  client.on('ready', async () => {
    console.log(`${client.user.username} is ready!`);

    // Clear all activities (removes Spotify RPC & custom status)
    client.user.setPresence({
      activities: [],
      status: 'online',
    });

    // console.log(`${client.user.username}: Cleared status & Spotify, set online.`);
  });

  client.login(token).catch(err => {
    console.error(`Failed to login with token ...${token.slice(-6)}:`, err.message);
  });
}