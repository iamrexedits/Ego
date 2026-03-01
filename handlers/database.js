const mongoose = require('mongoose');
const config = require('../config.js');

module.exports = async (client) => {
    if (!config.features.database) return;
    
    try {
        await mongoose.connect(config.mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        
        console.log('[DATABASE] Connected to MongoDB');
        
        // Store db connection in client
        client.db = mongoose.connection;
        
    } catch (error) {
        console.error('[DATABASE ERROR]', error);
        process.exit(1);
    }
};
