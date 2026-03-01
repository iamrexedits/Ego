const { ActivityType } = require('discord.js');
const config = require('../../config.js');

module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        console.log(`[READY] Logged in as ${client.user.tag}`);
        
        // Set bot activity
        client.user.setActivity(`${config.defaultPrefix}help | v${config.version}`, {
            type: ActivityType.Listening
        });
        
        // Register slash commands globally or per guild
        try {
            const slashCommands = Array.from(client.slashCommands.values()).map(cmd => cmd.data.toJSON());
            
            if (process.env.NODE_ENV === 'development') {
                // Register to specific guild for testing
                const guild = client.guilds.cache.first();
                if (guild) {
                    await guild.commands.set(slashCommands);
                    console.log(`[SLASH] Registered ${slashCommands.length} commands to ${guild.name}`);
                }
            } else {
                // Register globally
                await client.application.commands.set(slashCommands);
                console.log(`[SLASH] Registered ${slashCommands.length} global commands`);
            }
        } catch (error) {
            console.error('[SLASH ERROR]', error);
        }
        
        // Initialize database cache
        if (client.db) {
            console.log('[DATABASE] Cache initialized');
        }
    }
};
