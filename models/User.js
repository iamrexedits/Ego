const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    guildId: { type: String, required: true },
    warnings: [{
        reason: String,
        moderator: String,
        timestamp: { type: Date, default: Date.now },
        id: String
    }],
    mutes: [{
        reason: String,
        moderator: String,
        duration: Number,
        timestamp: { type: Date, default: Date.now }
    }],
    bans: [{
        reason: String,
        moderator: String,
        duration: Number,
        timestamp: { type: Date, default: Date.now }
    }],
    notes: [{
        content: String,
        moderator: String,
        timestamp: { type: Date, default: Date.now }
    }]
}, { timestamps: true });

userSchema.index({ userId: 1, guildId: 1 }, { unique: true });

module.exports = mongoose.model('User', userSchema);
