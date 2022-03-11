const {SlashCommandBuilder} = require("@discordjs/builders");
const {MessageEmbed, Client} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("self-role")
    .setDescription("Create self-role-assign embeds")
    .addRoleOption(option => option.setName("role").setDescription("select role").setRequired(true))
    .addStringOption(option => option.setName("emote").setDescription("select emote").setRequired(true))
    ,
    async execute(interaction) {

        let emote = interaction.options.getString("emote");
        let role = interaction.options.getRole("role");
        let channelId = interaction.channelId;
        let channel = Client.channels.cache.get(channelId);

        console.log(channelId);

        channel.send('Beep')

        if(role.position >= interaction.guild.me.roles.highest.position) 
        return interaction.followUp("I can't assign a role that is higher or equal than me!");
        
        /*
        interaction.reply({embeds: [
            new MessageEmbed()
            .setTitle(`React below to get <@&${role}>`)
            .setColor(`${role.getColor}`)
            ]
        })

        interaction.react("emote");

        interaction.reply.react(emote);
        */
    }
}


/*
const reactionRoleConfig = JSON.parse(fs.readFileSync("src\\reactionRoles.json","utf8"));

client.on("message", async (msg) => {
    if(msg.author.bot || !msg.guild) return;
    if(msg.content.startsWith("~reactionRole")){
        let args = msg.content.split(" ");
        if(args.length == 3){
            let emote = args[2];
            let roleId = args[1];
            let role = msg.guild.roles.cache.get(roleId);

            if(!role){
                msg.reply("Invalid role ID!");
                return;
            }

            let embed = new Discord.MessageEmbed()
            .setTitle("Reaction Role")
            .setDescription(`Click ${emote} to get <@&${roleId}>`)
            .setColor(`${role.color}`);

            let reply = await msg.channel.send(embed);
            reply.react(emote);

            msg.remove;

            let data = {message: reply.id, emote: emote, roleId: roleId};
            reactionRoleConfig.reactions.push(data);

            fs.writeFileSync("src\\reactionRoles.json", JSON.stringify(reactionRoleConfig));
        }
    }
});

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
*/