const { Permissions } = require('discord.js');
const {SlashCommandBuilder} = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("massmove")
    .setDescription("Move all users between channels")
    .addChannelOption(option => option.setName("from-channel").setDescription("origin channel").setRequired(false))
    .addChannelOption(option => option.setName("to-channel").setDescription("destination channel").setRequired(true))
    ,
    async execute(interaction) {
        if (!interaction.member.permissions.has([Permissions.FLAGS.MOVE_MEMBERS, Permissions.FLAGS.ADMINISTRATOR])) {
            interaction.reply({ content: "I don't think you're supposed to do that >:(", ephemeral: true });
            return;
        }
        
        let firstChannel = interaction.options.getChannel("from-channel");
        let members = firstChannel.members;
        let secondChannel = interaction.options.getChannel("to-channel");

        if(firstChannel.type !== "GUILD_VOICE" || secondChannel.type !== "GUILD_VOICE"){ //check for voicechannels
            interaction.reply({ content: "You shouldn't select text-channels there ...", ephemeral: true });
            return;
        }

        members.forEach(member => {
            member.voice.setChannel(secondChannel);
        });

        interaction.reply({ content: 'Moved everyone!', ephemeral: true });
    }
}