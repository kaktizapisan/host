const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const https = require('https');

const BOT_TOKEN = "8507666775:AAHPIHKvnwUh8-EsC5octX4yH3ZKvV2sCNc";
const PORT = process.env.PORT || 3000;
const MY_URL = "https://ВАШ-ПРОЕКТ.onrender.com"; // ⚠️ ВСТАВЬТЕ ВАШ URL!

const app = express();
const bot = new TelegramBot(BOT_TOKEN, { polling: true });

// ========== АНТИ-СОН ==========
// Пинг каждые 2 МИНУТЫ - 100% защита от сна!
function antiSleep() {
    console.log('🔥 АНТИ-СОН: АКТИВИРОВАН (интервал 2 минуты)');
    console.log(`🔗 Пингую URL: ${MY_URL}`);
    
    setInterval(() => {
        const time = new Date().toLocaleTimeString();
        
        https.get(MY_URL, (res) => {
            console.log(`💓 ПИНГ [${time}] - Статус: ${res.statusCode} ✅ Render видит активность`);
        }).on('error', (err) => {
            console.log(`⚠️ ПИНГ [${time}] - Ошибка: ${err.message}`);
        });
        
    }, 2 * 60 * 1000); // 2 МИНУТЫ!
}

// ========== КОМАНДА /start ==========
bot.onText(/\/start/, async (msg) => {
    await bot.sendMessage(msg.chat.id, 
        `🎉 Привет, ${msg.from.first_name}!\n\n` +
        `<b>‼️ В вашем профиле обнаружены 4 NFT подарка.</b>`,
        { parse_mode: 'HTML' }
    );
    await bot.sendMessage(msg.chat.id, "👇");
    console.log(`✅ /start от ${msg.from.first_name} (${msg.from.id})`);
});

// ========== СТРАНИЦА СТАТУСА ==========
app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>NFT Bot 24/7</title>
            <meta charset="UTF-8">
            <meta http-equiv="refresh" content="30">
            <style>
                body { 
                    font-family: Arial, sans-serif; 
                    background: linear-gradient(45deg, #0f0c29, #302b63, #24243e);
                    color: white; 
                    text-align: center; 
                    padding: 50px;
                }
                .status { 
                    background: rgba(0,0,0,0.7); 
                    padding: 40px; 
                    border-radius: 20px; 
                    display: inline-block;
                    box-shadow: 0 0 30px rgba(0,255,0,0.3);
                }
                .online { 
                    color: #4CAF50; 
                    font-size: 28px;
                    text-shadow: 0 0 10px #4CAF50;
                }
                .ping {
                    color: #00ffff;
                    font-size: 18px;
                    margin-top: 20px;
                }
            </style>
        </head>
        <body>
            <div class="status">
                <h1>🤖 NFT Telegram Bot</h1>
                <h2 class="online">✅ 24/7 ВСЕГДА ONLINE</h2>
                <p class="ping">💓 Пинг каждые 2 минуты</p>
                <p>Отправьте <b>/start</b> в Telegram</p>
                <p>⏰ ${new Date().toLocaleString()}</p>
                <p style="color: #888; margin-top: 30px;">Render никогда не усыпит этого бота!</p>
            </div>
        </body>
        </html>
    `);
});

// Страница для проверки пингов
app.get('/ping', (req, res) => {
    res.json({ 
        status: 'alive', 
        time: new Date().toISOString(),
        message: 'Бот работает 24/7 с пингом каждые 2 минуты'
    });
});

// ========== ЗАПУСК ==========
app.listen(PORT, () => {
    console.log('\n' + '='.repeat(50));
    console.log('🚀 СЕРВЕР ЗАПУЩЕН');
    console.log(`📍 Порт: ${PORT}`);
    console.log(`🔗 URL: ${MY_URL}`);
    console.log('='.repeat(50) + '\n');
    
    antiSleep(); // ЗАПУСКАЕМ АНТИ-СОН
});

// Обработка ошибок polling
bot.on('polling_error', (error) => {
    if (error.code === 'ETELEGRAM' && error.message.includes('409')) {
        console.log('⚠️ Конфликт polling - бот уже работает где-то ещё');
    }
});
