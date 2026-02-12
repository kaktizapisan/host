const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const https = require('https'); // Добавить в начало

const BOT_TOKEN = "8507666775:AAEKlLaA4ANRzVMXE6gldVkRcnRpZG9OZwU";
const PORT = process.env.PORT || 3000;
const RENDER_URL = process.env.RENDER_URL || "https://ВАШ-ПРОЕКТ.onrender.com"; // СВОЙ URL!

const app = express();
const bot = new TelegramBot(BOT_TOKEN, { polling: true });

// ========== АНТИ-СОН ==========
// Пинг сам себя каждые 10 минут
function keepAlive() {
    if (RENDER_URL.includes('onrender.com')) {
        setInterval(() => {
            https.get(RENDER_URL, (res) => {
                console.log(`💓 Пинг сам себя: ${res.statusCode}`);
            }).on('error', (err) => {
                console.log('❌ Ошибка пинга:', err.message);
            });
        }, 10 * 60 * 1000); // Каждые 10 минут
    }
}

// ========== КОМАНДЫ ==========
bot.onText(/\/start/, async (msg) => {
    const chatId = msg.chat.id;
    const userName = msg.from.first_name || 'друг';
    
    await bot.sendMessage(chatId, 
        `🎉 Привет, ${userName}!\n\n` +
        `<b>‼️ В вашем профиле обнаружены 4 NFT подарка.</b>`,
        { parse_mode: 'HTML' }
    );
    await bot.sendMessage(chatId, "👇");
});

// ========== СТРАНИЦА СТАТУСА ==========
app.get('/', (req, res) => {
    res.send('🤖 Бот работает! Пинг получен: ' + new Date().toLocaleString());
});

// ========== ЗАПУСК ==========
app.listen(PORT, () => {
    console.log(`🚀 Сервер на порту ${PORT}`);
    keepAlive(); // Запускаем пинг
    console.log('💓 Анти-сон активирован!');
});
