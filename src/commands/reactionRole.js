const {SlashCommandBuilder} = require("@discordjs/builders");
const {MessageEmbed} = require("discord.js");
const {client} = require("D:\\BEEMO\\src\\index.js");
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
        let roleId = role.id;
        let channel = interaction.channel;

        if(role.position >= interaction.guild.me.roles.highest.position)
        return interaction.followUp("I can't assign a role that is higher or equal than me!");

        let embed = new MessageEmbed()
            .setTitle("Reaction Role")
            .setDescription(`React with ${emote} to get <@&${roleId}>`);

        let reply = channel.send({ embeds: [embed] }).then(embedMessage => {
            embedMessage.react(emote);
        });

        let data = {message: reply.id, emote: emote, roleId: roleId};
        reactionRoleConfig.reactions.push(data);

        fs.writeFileSync("src\\reactionRoles.json", JSON.stringify(reactionRoleConfig));
    }
}

client.on("messageReactionAdd", (reaction, user) => {
    if(reaction.message.partial) reaction.fetch();
    if(reaction.partial) reaction.fetch();
    if(user.bot || !reaction.message.guild) return;

    for(let i = 0; i < reactionRoleConfig.reactions.length; i++) {
        let reactionRole = reactionRoleConfig.reactions[i];
        if(reaction.message.id == reactionRole.message && reaction.emoji.name == reactionRole.emote 
            && !reaction.message.guild.members.cache.get(user.id).roles.cache.has(reactionRole.roleId)) {
                reaction.message.guild.members.cache.get(user.id).roles.add(reactionRole.role);
            }
    }
});

client.on("messageReactionRemove", (reaction, user) => {
    if(reaction.message.partial) reaction.fetch();
    if(reaction.partial) reaction.fetch();
    if(user.bot || !reaction.message.guild) return;

    for(let i = 0; i < reactionRoleConfig.reactions.length; i++) {
        let reactionRole = reactionRoleConfig.reactions[i];

        if(reaction.message.id == reactionRole.message && reaction.emoji.name == reactionRole.emote) {
            reaction.message.guild.members.cache.get(user.id).roles.remove(reactionRole.role);
        }
    }
});
