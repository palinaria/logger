Project Structure:

project/
├── generator.js     # Generates folders and log files every minute and every 10 seconds
├── analyzer.js      # Analyzes all logs and counts SUCCESS, ERROR, and INFO
├── logger.js        # Shared logging module used by both applications
└── logs/            # Automatically created folder for generated logs

Log Generator

The generator creates logs automatically based on time intervals:
Every minute a new folder is created inside logs/.
Every 10 seconds a new .txt file is created inside the current folder.
Each file contains a random log entry of type SUCCESS, ERROR, or INFO.

Run:

node generator.js


Log Analyzer

Reads all generated logs and calculates the number of messages by type.

Run:

node analyzer.js


Filter by type:

node analyzer.js --type=error


Logger Module

logger.js provides a shared Logger class used by both applications .