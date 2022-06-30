const {SlashCommandBuilder} = require('@discordjs/builders');

module.exports = {
    var ping = m.createdTimestamp - message.createdTimestamp;
                var botPing = Math.round(bot.pi);

    data: new SlashCommandBuilder().setName('ping').setDescription('Pong!'),
    async execute(interaction) {
        interaction.reply('Pong! with a Delay of ' + ${ping} + 'ms');
    }
}