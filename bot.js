const fs = require('fs');
const Discord = require('discord.js');
const Filter = require('bad-words')
const { token, prefix, verification_channel_id, guest_role_id } = 
    require('C:/Users/c0401/Documents/Coding Projects/discord/bot_v2_config.json');

const client = new Discord.Client();
client.commands = new Discord.Collection();
let filter = new Filter();

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

let msg = new Discord.MessageEmbed().setColor('#0099FF');

// server-wide message listening - filter bad words -------------------------------
    if (filter.isProfane(message.content)) {
        if (message.channel.type === 'dm') {
            return;
        } else {
            msg.setDescription(`Your message was deleted for profanity.
                    Refrain from swearing in \`${message.guild.name}\` to avoid a kick/ban.\n
                    Deleted message: \`${message.content}\`
                    Deleted from: ${message.channel}`);
            message.author.send(msg);
            message.delete();
        };
    };
    
    // Controls verification channel messages
    if (message.channel.id === verification_channel_id) {
        if (message.content !== `${prefix}verify`) {
            message.delete();
        };
    };
// ---------------------------------------------------------------------------------

// begin listening for command calls -----------------------------------------------
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName)
        || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    if (!command) {
        msg.setDescription(`Hi, ${message.author}! Just letting you know that ${message.content} isn't a 
                            command I recognize. Type \`${prefix}help\` for a list of things I can do! :)`);
        return message.channel.send(msg).then(m => {
            m.delete({timeout: 3000});
        });
    };
    
    // Check if command can only be used inside server.
    if (command.guildOnly && message.channel.type !== 'text') {
        msg.setDescription('I can\'t execute that command inside DMs!');
        return message.channel.send(msg).then(m => {
            m.delete({ timeout: 3000 });
        });;
    };

    // Check if command arguments exist, and sends usage if necessary.
    if (command.args && !args.length) {
        let reply = `You didn't provide any arguments, ${message.author}!`;

        if (command.usage) {
            reply += `${message.author}\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
        };

        msg.setDescription(reply);
        return message.reply(msg).then(m => {
            m.delete({ timeout: 3000 });
        });;
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
            
            msg.setDescription(`Please wait ${timeLeft.toFixed(1)} more second(s) before reusing the 
                \`${prefix}${command.name}\` command.`);
            return message.reply(msg).then(m => {
                m.delete({ timeout: 3000 });
            });;
        };
    };

    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

    // Execute command
    try {
        command.execute(message, args, client);
    } catch (error) {
        console.error(error);
        msg.setDescription(`${message.author}, error executing command.`);
        message.channel.send(msg).then(m => {
            m.delete({ timeout: 3000 });
        });
    };
});

// Assign temp role on server join
// Using the 'verify' command will remove this role and give access to the rest of the server.
client.on('guildMemberAdd', (guildMember) => {
    guildMember.roles.add(guest_role_id);
});

// Fetch event info using terminal
// client.on('raw', event => {
//     console.log(event);
// });
