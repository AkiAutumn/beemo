const {SlashCommandBuilder} = require("@discordjs/builders");
const {MessageEmbed} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("info")
    .setDescription("Get information about the server and its members")
    .addSubcommand(subCommand => subCommand.setName("server").setDescription("returns info about the server"))
    .addSubcommand(subCommand => subCommand.setName("member").setDescription("returns info about a member")
        .addUserOption(option => option.setName("member").setDescription("select member").setRequired(true)))
    ,
    async execute(interaction) {
        switch(interaction.options.getSubcommand()){
            case "server": {
                interaction.reply({embeds: [
                    new MessageEmbed()
                    .setTitle("Server Info")
                    .addFields([
                            {
                                name: "Channels",
                                value: `${interaction.guild.channels.cache.size}`
                            },
                            {
                                name: "Members",
                                value: `${interaction.guild.members.cache.size}`
                            },
                            {
                                name: "Created",
                                value: `<t:${Math.round(interaction.guild.createdTimestamp / 1000)}>`,
                                inline: true
                            }
                        ])
                    ]}) 
                break;
            }

            case "member": {
                const member = interaction.options.getMember("member")
                interaction.reply({embeds: [
                    new MessageEmbed()
                    .setTitle(`Info about ${member.user.tag}`)
                    .setThumbnail(member.user.avatarURL({dynamic: true}))
                    .addFields([
                            {
                                name: "Joined",
                                value: `<t:${Math.round(member.joinedTimestamp / 1000)}>`,
                            },
                            {
                                name: "Account creation",
                                value: `<t:${Math.round(member.user.createdTimestamp / 1000)}>`,
                                inline: true
                            }
                        ])
                    ]}) 
                break;
            }
        }
    }
}