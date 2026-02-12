const TelegramBot = require('node-telegram-bot-api');
const express = require('express');

// ========== НАСТРОЙКИ ==========
const BOT_TOKEN = "8507666775:AAEKlLaA4ANRzVMXE6gldVkRcnRpZG9OZwU";
const WEB_APP_URL = "https://kaktizapisan.github.io/star/";
const PORT = process.env.PORT || 3000;
// ===============================

// Инициализация бота
const bot = new TelegramBot(BOT_TOKEN);
const app = express();

// ==== ВСЕГДА РАБОТАЕТ, НИКОГДА НЕ ВЫКЛЮЧАЕТСЯ ====
bot.startPolling();
console.log('✅ Бот запущен в режиме 24/7');

// ========== ТОЛЬКО /start ==========
bot.onText(/\/start/, async (msg) => {
    const chatId = msg.chat.id;
    const userName = msg.from.first_name || 'друг';
    
    try {
        await bot.sendMessage(chatId, 
            `🎉 Привет, ${userName}!\n\n` +
            `<b>‼️ В вашем профиле обнаружены 4 NFT подарка. Нажмите на кнопку ниже для просмотра.</b>`,
            { parse_mode: 'HTML' }
        );
        
        await bot.sendMessage(chatId, "👇");
        
        console.log(`✅ /start от ${userName} (${chatId})`);
    } catch (error) {
        console.error('❌ Ошибка:', error.message);
    }
});

// Игнорируем всё остальное
bot.on('message', (msg) => {
    if (msg.text === '/start') return;
    // НИЧЕГО НЕ ОТВЕЧАЕМ
});

// ========== ПРОСТО СТРАНИЦА СТАТУСА ==========
app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>NFT Bot</title>
            <meta charset="UTF-8">
            <meta http-equiv="refresh" content="30">
            <style>
                body { 
                    font-family: Arial, sans-serif; 
                    background: #1a1a2e; 
                    color: white; 
                    text-align: center; 
                    padding: 50px;
                }
                .status { 
                    background: #16213e; 
                    padding: 30px; 
                    border-radius: 10px; 
                    display: inline-block;
                }
                .online { color: #4CAF50; font-size: 24px; }
            </style>
        </head>
        <body>
            <div class="status">
                <h1>🤖 NFT Telegram Bot</h1>
                <h2 class="online">✅ РАБОТАЕТ 24/7</h2>
                <p>Отправьте <b>/start</b> в Telegram</p>
                <p>⏰ ${new Date().toLocaleString()}</p>
                <p style="color: #888; margin-top: 30px;">Никогда не выключается</p>
            </div>
        </body>
        </html>
    `);
});

// ========== ЗАПУСК ==========
app.listen(PORT, () => {
    console.log(`🚀 Сервер запущен на порту ${PORT}`);
    console.log(`📱 Mini App: ${WEB_APP_URL}`);
    console.log(`🤖 Бот работает и НИКОГДА не завершит работу сам`);
    console.log(`💪 24/7 forever!`);
});
