const {SlashCommandBuilder} = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder().setName('ping').setDescription('Pong!'),
    async execute(interaction) {
         var m;
         var ping = m.createdTimestamp - message.createdTimestamp;
         var botping = ping;
         var botping = Math.round(bot.pi);
        interaction.reply('**Pong! with a Delay of**\n ${botping}ms');
    }
}