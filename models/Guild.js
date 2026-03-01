
const mongoose = require('mongoose');

const guildSchema = new mongoose.Schema({
    guildId: { type: String, required: true, unique: true },
    prefix: { type: String, default: '!' },
    modLogChannel: { type: String, default: null },
    muteRole: { type: String, default: null },
    autoMod: {
        enabled: { type: Boolean, default: false },
        antiSpam: { type: Boolean, default: false },
        antiLink: { type: Boolean, default: false },
        blacklistedWords: [{ type: String }]
    },
    welcome: {
        enabled: { type: Boolean, default: false },
        channel: { type: String, default: null },
        message: { type: String, default: 'Welcome {user} to {server}!' }
    },
    lockdown: {
        enabled: { type: Boolean, default: false },
        channels: [{ type: String }],
        startTime: { type: Date, default: null },
        reason: { type: String, default: '' }
    }
}, { timestamps: true });

module.exports = mongoose.model('Guild', guildSchema);
               
