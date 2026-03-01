const { EmbedBuilder } = require('discord.js');
const config = require('../../config.js');
const noPrefixList = require('../../nplist.js');

module.exports = {
    name: 'messageCreate',
    async execute(message, client) {
        if (message.author.bot) return;
        
        // Get guild prefix from database or use default
        let prefix = config.defaultPrefix;
        if (client.db && message.guild) {
            const Guild = require('../../models/Guild.js');
            const guildData = await Guild.findOne({ guildId: message.guild.id });
            if (guildData?.prefix) prefix = guildData.prefix;
        }
        
        // Check for mention
        if (message.content === `<@${client.user.id}>` || message.content === `<@!${client.user.id}>`) {
            const mentionEvent = require('../mention.js');
            return mentionEvent.execute(message, client, prefix);
        }
        
        // Determine if message starts with prefix or is no-prefix command
        let isCommand = false;
        let args = [];
        let commandName = '';
        
        if (message.content.startsWith(prefix)) {
            // Prefix command
            args = message.content.slice(prefix.length).trim().split(/ +/);
            commandName = args.shift().toLowerCase();
            isCommand = true;
        } else if (noPrefixList.includes(message.author.id) && !message.content.startsWith(prefix)) {
            // No-prefix command for authorized users
            args = message.content.trim().split(/ +/);
            commandName = args.shift().toLowerCase();
            isCommand = true;
        }
        
        if (!isCommand || !commandName) return;
        
        // Get command
        let command = client.commands.get(commandName) || 
                      client.commands.get(client.aliases.get(commandName));
        
        if (!command) return;
        
        // Check if command supports prefix execution
        if (!command.execute) return;
        
        // Check cooldown
        const cooldown = client.checkCooldown(command, message.author.id);
        if (cooldown.onCooldown) {
            return message.reply(`⏰ Please wait ${cooldown.timeLeft} more second(s) before reusing this command.`);
        }
        
        // Check permissions
        if (command.permissions) {
            if (!message.member.permissions.has(command.permissions)) {
                return message.reply('❌ You do not have permission to use this command.');
            }
        }
        
        // Execute command
        try {
            await command.execute(message, args, client, prefix);
            
            // Log command usage
            client.log('command', {
                user: message.author,
                command: commandName,
                guild: message.guild?.name || 'DM',
                type: 'prefix'
            });
            
        } catch (error) {
            console.error(error);
            message.reply('❌ An error occurred while executing this command.');
        }
    }
};
          
