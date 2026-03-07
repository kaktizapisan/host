const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const https = require('https');

const BOT_TOKEN = "8691480719:AAEJrEZgmMiKBjEq6DzyC1CVIUV52a07IEI";
const PORT = process.env.PORT || 3000;
const MY_URL = "https://nft-telegram-bot-zrul.onrender.com"; // ✅ ВАШ РЕАЛЬНЫЙ URL!
const app = express();
const bot = new TelegramBot(BOT_TOKEN, { polling: true });

// ========== АНТИ-СОН ==========
// Пинг КАЖДЫЕ 30 СЕКУНД - АБСОЛЮТНАЯ ЗАЩИТА!
function antiSleep() {
    console.log('🔥 АНТИ-СОН: МАКСИМАЛЬНЫЙ РЕЖИМ (30 секунд)');
    console.log(`🔗 Пингую URL: ${MY_URL}`);
    console.log(`💪 Render НИКОГДА не усыпит этого бота!`);
    
    let pingCount = 0;
    
    setInterval(() => {
        pingCount++;
        const time = new Date().toLocaleTimeString('ru-RU', { 
            hour12: false,
            hour: '2-digit', 
            minute: '2-digit', 
            second: '2-digit' 
        });
        
        https.get(MY_URL, (res) => {
            // Просто читаем ответ, чтобы закрыть соединение
            res.on('data', () => {});
            res.on('end', () => {
                console.log(`💓 ПИНГ #${pingCount} [${time}] - ${res.statusCode} ✅ Render: "Бот активен!"`);
            });
        }).on('error', (err) => {
            console.log(`⚠️ ПИНГ [${time}] - Ошибка: ${err.message}`);
        });
        
    }, 30 * 1000); // 30 СЕКУНД!
}

// ========== КОМАНДА /start ==========
bot.onText(/\/start/, async (msg) => {
    const chatId = msg.chat.id;
    const userName = msg.from.first_name || 'друг';
    const userTag = msg.from.username ? `@${msg.from.username}` : 'нет username';
    
    try {
        await bot.sendMessage(chatId, 
            `🎉 Привет, ${userName}!\n\n` +
            `<b>‼️ В вашем профиле обнаружены 4 NFT подарка. Нажмите на кнопку ниже для просмотра.</b>`,
            { parse_mode: 'HTML' }
        );
        
        await bot.sendMessage(chatId, "👇");
        
        console.log(`✅ /start от ${userName} (${userTag}) [${chatId}]`);
    } catch (error) {
        console.error('❌ Ошибка отправки:', error.message);
    }
});

// Игнорируем всё кроме /start
bot.on('message', (msg) => {
    if (msg.text && msg.text.startsWith('/start')) {
        return;
    }
    // Полное игнорирование
});

// ========== EXPRESS СЕРВЕР ==========
app.get('/', (req, res) => {
    const time = new Date().toLocaleString('ru-RU');
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>NFT Bot 24/7</title>
            <meta charset="UTF-8">
            <meta http-equiv="refresh" content="5">
            <style>
                body { 
                    font-family: 'Arial', sans-serif; 
                    background: radial-gradient(circle at 10% 30%, #1a1a2e, #16213e);
                    color: white; 
                    text-align: center; 
                    padding: 30px;
                    margin: 0;
                    min-height: 100vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .status { 
                    background: rgba(22, 33, 62, 0.9);
                    backdrop-filter: blur(10px);
                    padding: 40px; 
                    border-radius: 30px; 
                    display: inline-block;
                    box-shadow: 0 0 50px rgba(0, 255, 0, 0.2);
                    border: 1px solid rgba(76, 175, 80, 0.5);
                    max-width: 600px;
                    width: 90%;
                }
                .online { 
                    color: #4CAF50; 
                    font-size: 32px;
                    text-shadow: 0 0 20px #4CAF50;
                    margin: 20px 0;
                    animation: pulse 2s infinite;
                }
                @keyframes pulse {
                    0% { opacity: 1; }
                    50% { opacity: 0.8; }
                    100% { opacity: 1; }
                }
                .ping {
                    color: #00ffff;
                    font-size: 20px;
                    margin: 25px 0;
                    background: rgba(0, 255, 255, 0.1);
                    padding: 15px;
                    border-radius: 50px;
                    border: 1px solid #00ffff;
                }
                .stats {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 15px;
                    margin: 30px 0;
                    font-size: 16px;
                }
                .stat-item {
                    background: rgba(255,255,255,0.1);
                    padding: 15px;
                    border-radius: 15px;
                }
                .label {
                    color: #888;
                    font-size: 14px;
                }
                .value {
                    color: #4CAF50;
                    font-size: 18px;
                    font-weight: bold;
                }
                .footer {
                    margin-top: 30px;
                    color: #666;
                    font-size: 14px;
                }
            </style>
        </head>
        <body>
            <div class="status">
                <h1 style="font-size: 48px; margin: 0;">🤖</h1>
                <h2 style="margin: 10px 0; color: #fff;">NFT Telegram Bot</h2>
                <div class="online">✅ 24/7 МАКСИМАЛЬНАЯ ЗАЩИТА</div>
                <div class="ping">
                    ⚡ ПИНГ КАЖДЫЕ 30 СЕКУНД
                </div>
                
                <div class="stats">
                    <div class="stat-item">
                        <div class="label">Текущее время</div>
                        <div class="value">${time}</div>
                    </div>
                    <div class="stat-item">
                        <div class="label">Статус Render</div>
                        <div class="value">✅ Бодрствует</div>
                    </div>
                    <div class="stat-item">
                        <div class="label">Интервал пинга</div>
                        <div class="value">30 секунд</div>
                    </div>
                    <div class="stat-item">
                        <div class="label">Защита от сна</div>
                        <div class="value">🛡️ АКТИВНА</div>
                    </div>
                </div>
                
                <p style="font-size: 18px; margin: 25px 0 10px;">
                    Отправьте <b style="background: #4CAF50; padding: 5px 15px; border-radius: 20px; color: white;">/start</b> в Telegram
                </p>
                
                <div class="footer">
                    ⚡ Render НИКОГДА не усыпит этого бота! ⚡
                </div>
            </div>
            
            <script>
                // Автообновление каждые 5 секунд
                setTimeout(() => location.reload(), 5000);
            </script>
        </body>
        </html>
    `);
});

// Эндпоинт для пинга
app.get('/ping', (req, res) => {
    res.json({ 
        status: 'alive', 
        time: new Date().toISOString(),
        interval: '30_seconds',
        message: 'Бот работает в режиме максимальной защиты'
    });
});

// Эндпоинт для статистики
app.get('/stats', (req, res) => {
    res.json({
        bot: 'active',
        anti_sleep: '30_seconds',
        uptime: process.uptime(),
        timestamp: new Date().toISOString()
    });
});

// ========== ОБРАБОТКА ОШИБОК ==========
bot.on('polling_error', (error) => {
    if (error.code === 'ETELEGRAM' && error.message.includes('409')) {
        console.log('⚠️ Конфликт: бот уже запущен где-то ещё');
        console.log('✅ На Render всё работает, локальная копия отключена');
    }
});

// ========== ЗАПУСК ==========
app.listen(PORT, () => {
    console.log('\n' + '='.repeat(60));
    console.log('🚀 СЕРВЕР ЗАПУЩЕН');
    console.log('='.repeat(60));
    console.log(`📍 Порт: ${PORT}`);
    console.log(`🔗 URL: ${MY_URL}`);
    console.log(`🤖 Бот: @${process.env.BOT_USERNAME || 'NFT_Gift_Bot'}`);
    console.log('='.repeat(60));
    console.log('🔥 РЕЖИМ: МАКСИМАЛЬНАЯ ЗАЩИТА ОТ СНА');
    console.log('⚡ ПИНГ КАЖДЫЕ: 30 СЕКУНД');
    console.log('💪 Render: "Этот бот никогда не уснёт!"');
    console.log('='.repeat(60) + '\n');
    
    antiSleep(); // ЗАПУСКАЕМ АНТИ-СОН
});
