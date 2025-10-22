const fs = require('fs');
const path = require('path');

const Logger = require('./logger');
const baseDir = path.join(__dirname, 'logs');
const errorLogger = new Logger(path.join(__dirname, 'analyzer_error.log'));

async function analyzeLogs(filterType) {

    const stats = { SUCCESS: 0, ERROR: 0, INFO: 0 };

    try {
        const folders = await fs.promises.readdir(baseDir);
        for (const folder of folders) {
            const folderPath = path.join(baseDir, folder);
            const files = await fs.promises.readdir(folderPath);
            for (const file of files) {
                const filePath = path.join(folderPath, file);
                const content = await fs.promises.readFile(filePath, 'utf8');
                const lines = content.split('\n').filter(Boolean);
                for (const line of lines) {
                    if (line.includes('SUCCESS')) stats.SUCCESS++;
                    else if (line.includes('ERROR')) stats.ERROR++;
                    else if (line.includes('INFO')) stats.INFO++;
                }
            }
        }
        if (filterType) {
            const key = filterType.toUpperCase();
            console.log(`${key}: ${stats[key] ?? 0}`);
        } else {
            console.log(stats);
        }
    } catch (err) {
        await errorLogger.log('ERROR', `Analyzer failed: ${err.message}`);
        console.error('Ошибка при анализе логов:', err.message);
    }
}
const argType = process.argv.find(arg => arg.startsWith('--type='))?.split('=')[1];

analyzeLogs(argType);
