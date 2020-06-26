const fs = require('fs');
const Discord = require('discord.js');
const { token, prefix } = require('./config/config.json')

const client = new Discord.Client();

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
};

// Enables cooldowns on commands
const cooldowns = new Discord.Collection();


client.login(token);


client.once('ready', () => {
    console.log(`${client.user.tag} has logged in.`);
});

// Command Handler
client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName)
        || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    if (!command) {
        let msg = new Discord.MessageEmbed()
            .setColor('#0099FF')
            .setDescription(`Hi, ${message.author}! Just letting you know that ${message.content} isn't a 
                            command I recognize. Type \`${prefix}help\` for a list of things I can do! :)`);
        return message.author.send(msg);
    };
    

    // Check if command can only be used inside server.
    if (command.guildOnly && message.channel.type !== 'text') {
        let msg = new Discord.MessageEmbed()
            .setColor('#0099FF')
            .setDescription('I can\'t execute that command inside DMs!');
        return message.channel.send(msg);
    };


    // Check if command usage exists, and sends usage if necessary.
    if (command.args && !args.length) {
        let reply = `You didn't provide any arguments, ${message.author}!`;

        if (command.usage) {
            reply += `${message.author}\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
        };

        let msg = new Discord.MessageEmbed()
            .setColor('#0099FF')
            .setDescription(reply);
        return message.reply(msg);
    };

    // check if cooldowns collection has command in it
    // if not, add it
    if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Discord.Collection());
    };

    // create variables: current timestamp, get collection for command, get cooldown amount (default 0)
    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 0) * 1000;

    // checks if timestamp collection has author id 
    if (timestamps.has(message.author.id)) {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

        if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000;
            
            let msg = new Discord.MessageEmbed()
                .setColor('#0099FF')
                .setDescription(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the 
                \`${command.name}\` command.`);
            return message.reply(msg);
        };
    };

    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

    try {
        command.execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply('Error executing command.');
    };
});

// Fetch event info using terminal
client.on('raw', event => {
    console.log(event);
});
