const fs = require('fs');
const path = require('path');
const Logger = require('./logger');

const baseDir = path.join(__dirname, 'logs')


const logTypes = ['SUCCESS', 'ERROR', 'INFO'];



async function ensureDirExists(dirPath) {
    try {
        await fs.promises.mkdir(dirPath, { recursive: true });
    } catch (err) {
        console.error('Ошибка при создании папки:', err.message);
    }
}


async function startLogGenerator() {
    console.log('Генератор логов запущен!Ожмдайте');


    await ensureDirExists(baseDir);


    setInterval(async () => {
        const folderName = new Date().toISOString().replace(/[:.]/g, '-');
        const folderPath = path.join(baseDir, folderName);
        await ensureDirExists(folderPath);

        console.log(`Создана папка: ${folderName}`);


        const logInterval = setInterval(async () => {
            const fileName = `log_${Date.now()}.txt`;
            const filePath = path.join(folderPath, fileName);

            const logger = new Logger(filePath);


            const randomType = logTypes[Math.floor(Math.random() * logTypes.length)];
            const message = `Random ${randomType.toLowerCase()} message`;


            await logger.log(randomType, message);

            console.log(`Лог записан: ${fileName} (${randomType})`);
        }, 10_000);


        setTimeout(() => {
            clearInterval(logInterval);
            console.log(`Остановка записи в папку ${folderName}`);
        }, 60_000);

    }, 60_000);
}


startLogGenerator();
