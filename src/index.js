require("dotenv").config();
const {Client, Collection, Intents} = require("discord.js");
const fs = require("fs");
const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_VOICE_STATES], 
    partials: ['MESSAGE', 'CHANNEL', 'REACTION']});
client.commands = new Collection();
const reactionRoleConfig = JSON.parse(fs.readFileSync("src\\reactionRoles.json","utf8"));

const commandFiles = fs.readdirSync("./src/commands").filter(file => file.endsWith(".js"));

commandFiles.forEach(commandFile => {
    const command = require(`./commands/${commandFile}`);
    client.commands.set(command.data.name, command);
});

client.on('messageDelete', (message) => {

    let data = {reactions: []};
    let reactions = reactionRoleConfig.reactions;

    if(reactions !== undefined){
        reactions.forEach(function(item, index, object) {

            console.log(JSON.stringify(item.message) + " !== " + message.id);
            if (item.message == message.id) {
                object.splice(index, 1);
                console.log("spliced");
            }
        });

        data.reactions = reactions;
        fs.writeFileSync("src\\reactionRoles.json", JSON.stringify(data));
        console.log("updated json file");
    }
});

client.on("interactionCreate", async (interaction) => {
    if(!interaction.isCommand()) return;
    const command = client.commands.get(interaction.commandName);

    if(command){
        try {
            await command.execute(interaction);
        } catch(error) {
            console.error(error);

            if(interaction.deferred || interaction.replied) {
                interaction.editReply({content: "Beemo bumped into an error trying to execute that", ephemeral: true });
            } else {
                interaction.reply({content: "Beemo bumped into an error trying to execute that", ephemeral: true });
            }
        }
    }
});

client.on("messageReactionAdd", (reaction, user) => {
    //if(reaction.message.partial) reaction.fetch();
    //if(reaction.partial) reaction.fetch();
    if(user.bot) {
        return;
    }
    for(let i = 0; i < reactionRoleConfig.reactions.length; i++) {
        let reactionRole = reactionRoleConfig.reactions[i];
        console.log("add test");
        if(reaction.message.id == reactionRole.message.id)
        if(reaction.emoji.name == reactionRole.emote)
        //if(!reaction.message.guild.members.cache.get(user.id).roles.cache.has((reactionRole.role).id)) {
            reaction.message.guild.members.cache.get(user.id).roles.add(reactionRole.role);
            console.log('Added role');
        //}
    }
});

client.on("messageReactionRemove", (reaction, user) => {
    //if(reaction.message.partial) reaction.fetch();
    //if(reaction.partial) reaction.fetch();
    if(user.bot) {
        return;
    }
    console.log("remove test");
    for(let i = 0; i < reactionRoleConfig.reactions.length; i++) {
        let reactionRole = reactionRoleConfig.reactions[i];
        console.log(reaction.message.id + " != " + reactionRole.message);
        if(reaction.message.id == reactionRole.message.id)
        if(reaction.emoji.name == reactionRole.emote)
        //if(reaction.message.guild.members.cache.get(user.id).roles.cache.has((reactionRole.role).id)) {
            reaction.message.guild.members.cache.get(user.id).roles.remove(reactionRole.role);
            console.log('Removed role');
        //}
    }
});


client.once("ready", () => {
    console.log(`Logged in as ${client.user.tag} on ${client.guilds.cache.size} guild(s)`);
    client.user.setActivity({name: "a pillow fight", type: "COMPETING"});
});

client.login(process.env.BOT_TOKEN);