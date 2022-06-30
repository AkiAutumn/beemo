const {SlashCommandBuilder} = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder().setName('ping').setDescription('Pong!'),
    async execute(interaction) {
        const client = new Discord.Client();
        interaction.reply('**Pong! with a Delay of**\n' + client.ping + 'ms');
    }
}