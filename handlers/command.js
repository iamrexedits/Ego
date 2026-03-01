const { readdirSync } = require('fs');
const { join } = require('path');

module.exports = async (client) => {
    const commandsPath = join(__dirname, '..', 'commands');
    
    // Load prefix commands and slash commands from command files
    const loadCommands = (dir) => {
        const files = readdirSync(dir, { withFileTypes: true });
        
        for (const file of files) {
            const filePath = join(dir, file.name);
            
            if (file.isDirectory()) {
                loadCommands(filePath);
            } else if (file.name.endsWith('.js')) {
                try {
                    const command = require(filePath);
                    
                    // Validate command structure
                    if (!command.name) {
                        console.warn(`[COMMAND] ${file.name} missing name property`);
                        continue;
                    }
                    
                    // Set prefix command
                    if (command.execute) {
                        client.commands.set(command.name, command);
                        
                        // Set aliases
                        if (command.aliases && Array.isArray(command.aliases)) {
                            command.aliases.forEach(alias => {
                                client.aliases.set(alias, command.name);
                            });
                        }
                        
                        console.log(`[COMMAND] Loaded prefix: ${command.name}`);
                    }
                    
                    // Set slash command data
                    if (command.data) {
                        client.slashCommands.set(command.data.name, command);
                        console.log(`[COMMAND] Loaded slash: ${command.data.name}`);
                    }
                    
                } catch (error) {
                    console.error(`[COMMAND ERROR] ${file.name}:`, error);
                }
            }
        }
    };
    
    loadCommands(commandsPath);
};
