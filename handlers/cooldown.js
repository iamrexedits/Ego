const { Collection } = require('discord.js');
const config = require('../config.js');

module.exports = async (client) => {
    client.checkCooldown = (command, userId) => {
        const { cooldowns } = client;
        
        if (!cooldowns.has(command.name)) {
            cooldowns.set(command.name, new Collection());
        }
        
        const now = Date.now();
        const timestamps = cooldowns.get(command.name);
        const cooldownAmount = (command.cooldown || config.defaultCooldown);
        
        if (timestamps.has(userId)) {
            const expirationTime = timestamps.get(userId) + cooldownAmount;
            
            if (now < expirationTime) {
                const timeLeft = (expirationTime - now) / 1000;
                return { 
                    onCooldown: true, 
                    timeLeft: timeLeft.toFixed(1) 
                };
            }
        }
        
        timestamps.set(userId, now);
        setTimeout(() => timestamps.delete(userId), cooldownAmount);
        
        return { onCooldown: false };
    };
};
