const { Client, Intents, Collection } = require('discord.js');
const fs = require('fs')
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.DIRECT_MESSAGES] });
const { prefix } = require('./config.json')
const cron = require('./cron');

cron(client);

client.commands = new Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);

}

for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(client, ...args));
    } else {
        client.on(event.name, (...args) => event.execute(client, ...args));
    }
}



client.once('ready', () => {
    console.log('Ready!');
});



client.on('messageCreate', async message => {

    if (message.author.bot) return;

    if (message.content.indexOf(prefix) !== 0 && message.content.indexOf('!') !== 0) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    const cmd = client.commands.get(command);

    if (!cmd) return;

    await cmd.execute(client, message, args);


});



client.login('ODc0MjU0MDQ2MzU2MjAxNTAy.YREShw.wpll3FIObdpm_nO2LoJn01uDjJM');