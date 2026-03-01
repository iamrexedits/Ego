const { EmbedBuilder } = require('discord.js');
const config = require('../../config.js');

module.exports = {
    name: 'interactionCreate',
    async execute(interaction, client) {
        if (!interaction.isChatInputCommand()) return;
        
        const command = client.slashCommands.get(interaction.commandName);
        if (!command) return;
        
        // Check cooldown
        const cooldown = client.checkCooldown(command, interaction.user.id);
        if (cooldown.onCooldown) {
            return interaction.reply({
                content: `⏰ Please wait ${cooldown.timeLeft} more second(s) before reusing this command.`,
                ephemeral: true
            });
        }
        
        // Check permissions
        if (command.permissions) {
            const memberPerms = interaction.memberPermissions;
            if (!memberPerms.has(command.permissions)) {
                return interaction.reply({
                    content: '❌ You do not have permission to use this command.',
                    ephemeral: true
                });
            }
        }
        
        // Execute command
        try {
            await command.execute(interaction, client);
            
            // Log command usage
            client.log('command', {
                user: interaction.user,
                command: interaction.commandName,
                guild: interaction.guild?.name || 'DM',
                type: 'slash'
            });
            
        } catch (error) {
            console.error(error);
            const reply = {
                content: '❌ An error occurred while executing this command.',
                ephemeral: true
            };
            
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp(reply);
            } else {
                await interaction.reply(reply);
            }
        }
    }
};
                  
