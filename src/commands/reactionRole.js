const {SlashCommandBuilder} = require("@discordjs/builders");
const {MessageEmbed} = require("discord.js");
const fs = require("fs");
const reactionRoleConfig = JSON.parse(fs.readFileSync("src\\reactionRoles.json","utf8"));

module.exports = {
    data: new SlashCommandBuilder()
    .setName("reaction-role")
    .setDescription("Create self-role-assign embeds")
    .addRoleOption(option => option.setName("role").setDescription("select role").setRequired(true))
    .addStringOption(option => option.setName("emote").setDescription("select emote").setRequired(true))
    ,
    async execute(interaction) {
        
        let emote = interaction.options.getString("emote");
        let role = interaction.options.getRole("role");
        let channel = interaction.channel;

        if(role.position >= interaction.guild.me.roles.highest.position)
        return interaction.followUp("I can't assign a role that is higher or equal than me!");

        let embed = new MessageEmbed()
            .setTitle("Reaction Role")
            .setDescription(`React with ${emote} to get <@&${role.id}>`);

        channel.send({ embeds: [embed] }).then(embedMessage => {
            embedMessage.react(emote);

            let data = {message: embedMessage.id, emote: emote, role: role.id};
            reactionRoleConfig.reactions.push(data);
            fs.writeFileSync("src\\reactionRoles.json", JSON.stringify(reactionRoleConfig));
        });

        interaction.reply({ content: 'Embed created!', ephemeral: true });
    }
}