const {SlashCommandBuilder} = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder().setName('dice').setDescription('diceing :sunglasses: '),
    async execute(interaction) {
        interaction.reply('You rolled a ' + math.random);
    }
}