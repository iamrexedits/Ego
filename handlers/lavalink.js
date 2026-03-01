const { Shoukaku, Connectors } = require('shoukaku');
const config = require('../config.js');

module.exports = async (client) => {
    if (!config.features.music) return;
    
    const shoukaku = new Shoukaku(
        new Connectors.DiscordJS(client),
        config.lavalink.nodes,
        {
            moveOnDisconnect: false,
            resumable: true,
            resumableTimeout: 30,
            reconnectTries: 2,
            restTimeout: 10000
        }
    );
    
    client.shoukaku = shoukaku;
    
    // Load lavalink events
    const lavalinkEvents = ['nodeConnect', 'nodeDisconnect', 'nodeError', 'nodeReconnect', 'close', 'disconnect', 'debug'];
    
    for (const event of lavalinkEvents) {
        shoukaku.on(event, (...args) => {
            const eventFile = require(`../events/lavalink/${event}.js`);
            if (eventFile) eventFile.execute(...args, client);
        });
    }
    
    console.log('[LAVALINK] Handler initialized');
};
