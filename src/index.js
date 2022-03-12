require("dotenv").config();
const {Client, Collection, Intents} = require("discord.js");
const fs = require("fs");
const client = new Client({intents: [Intents.FLAGS.GUILDS], partials: ['MESSAGE', 'CHANNEL', 'REACTION']});
client.commands = new Collection();

const commandFiles = fs.readdirSync("./src/commands").filter(file => file.endsWith(".js"));

module.exports = {client};

commandFiles.forEach(commandFile => {
    const command = require(`./commands/${commandFile}`);
    client.commands.set(command.data.name, command);
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
                interaction.editReply("Beemo bumped into an error trying to execute that");
            } else {
                interaction.reply("Beemo bumped into an error trying to execute that");
            }
        }
    }
});

client.once("ready", () => {
    console.log(`Logged in as ${client.user.tag} on ${client.guilds.cache.size} guild(s)`);
    client.user.setActivity({name: "a pillow fight", type: "COMPETING"});
});

client.login(process.env.BOT_TOKEN);