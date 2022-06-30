const {SlashCommandBuilder} = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder().setName('ping').setDescription('Pong!'),
    async execute(interaction) {
        message.channel.send("Pinging...").then(m =>{
                        var ping = m.createdTimestamp - message.createdTimestamp;
                        var botPing = Math.round(bot.pi);
        interaction.reply('**Pong! with a Delay of**\n ${ping}ms');
        });
    }
}