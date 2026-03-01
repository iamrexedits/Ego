const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');
const config = require('../../config.js');

module.exports = {
    name: 'ban',
    description: 'Ban a user from the server',
    aliases: ['b', 'banish'],
    permissions: [PermissionFlagsBits.BanMembers],
    cooldown: 5000,
    
    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('Ban a user from the server')
        .addUserOption(option => 
            option.setName('user')
                .setDescription('The user to ban')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('reason')
                .setDescription('Reason for banning')
                .setRequired(false))
        .addIntegerOption(option =>
            option.setName('days')
                .setDescription('Days of messages to delete (0-7)')
                .setMinValue(0)
                .setMaxValue(7)
                .setRequired(false))
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),
    
    // Prefix command execution
    async execute(message, args, client, prefix) {
        if (!args[0]) {
            return message.reply(`Usage: \`${prefix}ban <user> [reason]\``);
        }
        
        const target = message.mentions.members.first() || 
                      await message.guild.members.fetch(args[0]).catch(() => null);
        
        if (!target) return message.reply('❌ Please mention a valid user or provide their ID.');
        if (!target.bannable) return message.reply('❌ I cannot ban this user.');
        if (target.id === message.author.id) return message.reply('❌ You cannot ban yourself.');
        if (target.roles.highest.position >= message.member.roles.highest.position) {
            return message.reply('❌ You cannot ban this user due to role hierarchy.');
        }
        
        const reason = args.slice(1).join(' ') || 'No reason provided';
        
        try {
            await target.ban({ reason: `${message.author.tag}: ${reason}` });
            
            const embed = new EmbedBuilder()
                .setColor(config.embedColor.success)
                .setTitle('🔨 User Banned')
                .addFields(
                    { name: 'User', value: `${target.user.tag} (${target.id})`, inline: true },
                    { name: 'Moderator', value: message.author.tag, inline: true },
                    { name: 'Reason', value: reason }
                )
                .setTimestamp();
            
            await message.reply({ embeds: [embed] });
            
            // Log to modlog
            await this.logModAction(client, message.guild, embed);
            
        } catch (error) {
            console.error(error);
            message.reply('❌ Failed to ban user.');
        }
    },
    
    // Slash command execution
    async execute(interaction, client) {
        const target = interaction.options.getMember('user');
        const reason = interaction.options.getString('reason') || 'No reason provided';
        const days = interaction.options.getInteger('days') || 0;
        
        if (!target) {
            return interaction.reply({ content: '❌ User not found.', ephemeral: true });
        }
        
        if (!target.bannable) {
            return interaction.reply({ content: '❌ I cannot ban this user.', ephemeral: true });
        }
        
        if (target.id === interaction.user.id) {
            return interaction.reply({ content: '❌ You cannot ban yourself.', ephemeral: true });
        }
        
        if (target.roles.highest.position >= interaction.member.roles.highest.position) {
            return interaction.reply({ 
                content: '❌ You cannot ban this user due to role hierarchy.', 
                ephemeral: true 
            });
        }
        
        try {
            await target.ban({ deleteMessageDays: days, reason: `${interaction.user.tag}: ${reason}` });
            
            const embed = new EmbedBuilder()
                .setColor(config.embedColor.success)
                .setTitle('🔨 User Banned')
                .addFields(
                    { name: 'User', value: `${target.user.tag} (${target.id})`, inline: true },
                    { name: 'Moderator', value: interaction.user.tag, inline: true },
                    { name: 'Reason', value: reason },
                    { name: 'Messages Deleted', value: `${days} days`, inline: true }
                )
                .setTimestamp();
            
            await interaction.reply({ embeds: [embed] });
            await this.logModAction(client, interaction.guild, embed);
            
        } catch (error) {
            console.error(error);
            interaction.reply({ content: '❌ Failed to ban user.', ephemeral: true });
        }
    },
    
    async logModAction(client, guild, embed) {
        const Guild = require('../../models/Guild.js');
        const guildData = await Guild.findOne({ guildId: guild.id });
        if (guildData?.modLogChannel) {
            const channel = guild.channels.cache.get(guildData.modLogChannel);
            if (channel) channel.send({ embeds: [embed] });
        }
    }
};
              
