const {SlashCommandBuilder} = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder().setName('ping').setDescription('Pong!'),
    async execute(interaction) {
        interaction.reply('**Pong! with a Delay of**\n ${Date.now() - message.createdTimestamp}ms');
    }
}