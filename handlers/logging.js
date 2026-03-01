const { EmbedBuilder, WebhookClient } = require('discord.js');

module.exports = async (client) => {
    // Centralized logging function
    client.log = async (type, data) => {
        const timestamp = new Date().toISOString();
        
        switch(type) {
            case 'command':
                console.log(`[CMD] ${data.user.tag} used ${data.command} in ${data.guild}`);
                break;
            case 'moderation':
                console.log(`[MOD] ${data.action} by ${data.moderator} on ${data.target}`);
                break;
            case 'error':
                console.error(`[ERROR] ${data.message}`);
                break;
            default:
                console.log(`[LOG] ${data}`);
        }
    };
    
    // Send to webhook if configured
    client.webhookLog = async (embed) => {
        if (process.env.LOG_WEBHOOK_URL) {
            const webhook = new WebhookClient({ url: process.env.LOG_WEBHOOK_URL });
            await webhook.send({ embeds: [embed] }).catch(() => {});
        }
    };
};
