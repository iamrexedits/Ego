module.exports = {
    // Bot Info
    name: 'Ego',
    version: '1.0.0',
    owners: ['YOUR_USER_ID'],
    
    // Default Settings
    defaultPrefix: '!',
    defaultColor: 0x5865F2,
    embedColor: {
        success: 0x57F287,
        error: 0xED4245,
        warning: 0xFEE75C,
        info: 0x5865F2
    },
    
    // Database
    mongoURI: process.env.MONGO_URI || 'mongodb://localhost:27017/discordbot',
    
    // Lavalink (Music)
    lavalink: {
        nodes: [
            {
                name: 'Main',
                host: process.env.LAVALINK_HOST || 'localhost',
                port: parseInt(process.env.LAVALINK_PORT) || 2333,
                auth: process.env.LAVALINK_AUTH || 'youshallnotpass',
                secure: process.env.LAVALINK_SECURE === 'true'
            }
        ]
    },
    
    // Cooldown Settings
    defaultCooldown: 3000, // 3 seconds
    
    // Logging
    logLevel: process.env.LOG_LEVEL || 'info',
    
    // Features
    features: {
        prefixCommands: true,
        slashCommands: true,
        noPrefixCommands: true,
        database: true,
        music: true
    }
};
  
