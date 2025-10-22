const fs = require('fs');
const path = require('path');

class Logger {
    constructor(filePath) {
        this.filePath = filePath;
    }
    async log(type, message) {
        const time = new Date().toISOString();
        const line = `[${time}] ${type}: ${message}\n`;

        try {

            await fs.promises.appendFile(this.filePath, line, 'utf8');
        } catch (err) {
            console.error('Ошибка при записи лога:', err.message);
        }
    }
}

module.exports = Logger;
