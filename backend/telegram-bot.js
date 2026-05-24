require("dotenv").config();

const TelegramBot = require("node-telegram-bot-api");
const pool = require("./src/config/db");

const bot = new TelegramBot(process.env.BOT_TOKEN, {
  polling: true,
});

bot.onText(/\/suhu/, async (msg) => {
  const result = await pool.query(`
        SELECT * FROM sensor_data
        ORDER BY created_at DESC
        LIMIT 1
    `);

  const data = result.rows[0];

  bot.sendMessage(msg.chat.id, `🌡 Suhu terbaru: ${data.suhu}°C`);
});

console.log("🤖 Telegram Bot Running");
