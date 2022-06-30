require("dotenv").config();
const {Client, Collection, Intents} = require("discord.js");
const fs = require("fs");
const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_VOICE_STATES], 
    partials: ['MESSAGE', 'CHANNEL', 'REACTION']});
client.commands = new Collection();

const commandFiles = fs.readdirSync("./src/commands").filter(file => file.endsWith(".js"));

commandFiles.forEach(commandFile => {
    const command = require(`./commands/${commandFile}`);
    client.commands.set(command.data.name, command);
});

client.on('messageDelete', (message) => {

    let data = {reactions: []};
    let reactionRoleConfig = JSON.parse(fs.readFileSync("src\\reactionRoles.json","utf8"));
    let reactions = reactionRoleConfig.reactions;

    if(reactions !== undefined){
        reactions.forEach(function(item, index, object) {

            if (item.message == message.id) {
                object.splice(index, 1);
            }
        });

        data.reactions = reactions;
        fs.writeFileSync("src\\reactionRoles.json", JSON.stringify(data));
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

client.on("messageReactionAdd", (messageReaction, user) => {
    if(user.bot) {return}
    let reactionRoleConfig = JSON.parse(fs.readFileSync("src\\reactionRoles.json","utf8"));
    let guild = messageReaction.message.guild;
    let member = guild.members.cache.get(user.id);
    
    for(let i = 0; i < reactionRoleConfig.reactions.length; i++) {
        let reactionRole = reactionRoleConfig.reactions[i];
        if(messageReaction.message.id == reactionRole.message){
            if(messageReaction.emoji.identifier == reactionRole.emote){
                member.roles.add(reactionRole.role);
            }
        }
    }
});

client.on("messageReactionRemove", (messageReaction, user) => {
    if(user.bot) {return}
    let reactionRoleConfig = JSON.parse(fs.readFileSync("src\\reactionRoles.json","utf8"));
    let guild = messageReaction.message.guild;
    let member = guild.members.cache.get(user.id);
    
    for(let i = 0; i < reactionRoleConfig.reactions.length; i++) {
        let reactionRole = reactionRoleConfig.reactions[i];
        if(messageReaction.message.id == reactionRole.message){
            if(messageReaction.emoji.identifier == reactionRole.emote){
                member.roles.remove(reactionRole.role);
            }
        }
    }
});


client.once("ready", () => {
    console.log(`Logged in as ${client.user.tag} on ${client.guilds.cache.size} guild(s)`);
    client.user.setActivity({name: "a pillow fight", type: "COMPETING"});
});

client.login(process.env.DISCORD_TOKEN);