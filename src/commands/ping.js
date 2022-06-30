const {SlashCommandBuilder} = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder().setName('ping').setDescription('Pong!'),
    async execute(interaction) {
        message.reply('**Pong! with a Delay of**\n' + ${Date.now() - message.createdTimestamp} + 'ms');
    }
}