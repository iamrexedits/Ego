const { readdirSync } = require('fs');
const { join } = require('path');

module.exports = async (client) => {
    const eventsPath = join(__dirname, '..', 'events');
    
    const loadEvents = (dir) => {
        const files = readdirSync(dir, { withFileTypes: true });
        
        for (const file of files) {
            const filePath = join(dir, file.name);
            
            if (file.isDirectory()) {
                loadEvents(filePath);
            } else if (file.name.endsWith('.js')) {
                try {
                    const event = require(filePath);
                    
                    if (!event.name || !event.execute) {
                        console.warn(`[EVENT] ${file.name} missing name or execute`);
                        continue;
                    }
                    
                    const eventName = event.name;
                    const emitter = event.emitter || 'client';
                    
                    if (event.once) {
                        client[emitter].once(eventName, (...args) => event.execute(...args, client));
                    } else {
                        client[emitter].on(eventName, (...args) => event.execute(...args, client));
                    }
                    
                    console.log(`[EVENT] Loaded: ${eventName}`);
                    
                } catch (error) {
                    console.error(`[EVENT ERROR] ${file.name}:`, error);
                }
            }
        }
    };
    
    loadEvents(eventsPath);
};
  
