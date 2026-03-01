const mongoose = require('mongoose');

const warnSchema = new mongoose.Schema({
    warnId: { type: String, required: true, unique: true },
    userId: { type: String, required: true },
    guildId: { type: String, required: true },
    reason: { type: String, required: true },
    moderator: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    active: { type: Boolean, default: true }
});

module.exports = mongoose.model('Warn', warnSchema);
