const { EmbedBuilder } = require('discord.js');
const config = require('../config.js');

module.exports = {
    name: 'mention',
    async execute(message, client, prefix) {
        const embed = new EmbedBuilder()
            .setColor(config.embedColor.info)
            .setTitle('👋 Hello!')
            .setDescription(`My prefix in this server is: \`${prefix}\``)
            .addFields(
                { name: 'Need Help?', value: `Type \`${prefix}help\` for commands` },
                { name: 'Slash Commands', value: 'I also support slash commands! Try `/help`' }
            )
            .setFooter({ text: `${client.user.username} v${config.version}` })
            .setTimestamp();
        
        await message.reply({ embeds: [embed] });
    }
};
