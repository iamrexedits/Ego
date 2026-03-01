module.exports = {
    name: 'nodeDisconnect',
    async execute(node, reason, client) {
        console.log(`[LAVALINK] Node ${node.name} disconnected: ${reason}`);
    }
};
