const winston = require('winston');
const config = require('../config.js');

const logger = winston.createLogger({
    level: config.logLevel,
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.errors({ stack: true }),
        winston.format.json()
    ),
    transports: [
        new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
        new winston.transports.File({ filename: 'logs/combined.log' }),
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.simple()
            )
        })
    ]
});

module.exports = async (client) => {
    // Process error handling
    process.on('uncaughtException', (error) => {
        logger.error('Uncaught Exception:', error);
        console.error('Uncaught Exception:', error);
    });
    
    process.on('unhandledRejection', (reason, promise) => {
        logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
        console.error('Unhandled Rejection:', reason);
    });
    
    // Discord.js error handling
    client.on('error', (error) => {
        logger.error('Discord Client Error:', error);
    });
    
    client.on('warn', (warning) => {
        logger.warn('Discord Client Warning:', warning);
    });
    
    client.on('shardError', (error, shardID) => {
        logger.error(`Shard ${shardID} Error:`, error);
    });
    
    // Make logger available globally
    client.logger = logger;
};
          
