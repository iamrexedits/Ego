require('dotenv').config();
const { Client, GatewayIntentBits, Partials, Collection } = require('discord.js');
const config = require('./config.js');

// Initialize client with all intents and partials
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildModeration,
        GatewayIntentBits.GuildEmojisAndStickers,
        GatewayIntentBits.GuildIntegrations,
        GatewayIntentBits.GuildWebhooks,
        GatewayIntentBits.GuildInvites,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildMessageTyping,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.DirectMessageReactions,
        GatewayIntentBits.DirectMessageTyping,
        GatewayIntentBits.MessageContent
    ],
    partials: [
        Partials.User,
        Partials.Channel,
        Partials.GuildMember,
        Partials.Message,
        Partials.Reaction,
        Partials.GuildScheduledEvent,
        Partials.ThreadMember
    ],
    allowedMentions: {
        parse: ['users', 'roles', 'everyone'],
        repliedUser: true
    }
});

// Global collections
client.commands = new Collection();
client.slashCommands = new Collection();
client.cooldowns = new Collection();
client.aliases = new Collection();
client.categories = new Collection();

// Load handlers
const handlers = [
    'logging',
    'error',
    'database',
    'command',
    'events',
    'cooldown',
    'lavalink'
];

(async () => {
    for (const handler of handlers) {
        try {
            await require(`./handlers/${handler}.js`)(client);
            console.log(`[HANDLER] Loaded ${handler}`);
        } catch (error) {
            console.error(`[HANDLER ERROR] ${handler}:`, error);
        }
    }

    // Login to Discord
    client.login(process.env.TOKEN);
})();
              
