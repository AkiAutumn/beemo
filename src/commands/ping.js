const {SlashCommandBuilder} = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder().setName('ping').setDescription('Pong!'),
    async execute(interaction) {
        var message;
        var ping = Date.now() - message.createdTimestamp
        interaction.reply('**Pong! with a Delay of**\n' + ping + 'ms');
    }
}