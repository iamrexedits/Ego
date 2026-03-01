module.exports = {
    name: 'mongoEvents',
    async execute(client) {
        if (!client.db) return;
        
        client.db.on('connected', () => {
            console.log('[MONGODB] Connection established');
        });
        
        client.db.on('error', (err) => {
            console.error('[MONGODB] Error:', err);
        });
        
        client.db.on('disconnected', () => {
            console.warn('[MONGODB] Disconnected');
        });
        
        client.db.on('reconnected', () => {
            console.log('[MONGODB] Reconnected');
        });
    }
};
