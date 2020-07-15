const fs = require('fs');
const Discord = require('discord.js');
const { token, prefix, filter } = 
    require('./config/config.json');

const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });
client.commands = new Discord.Collection();

// Get command files and load them into collection. 
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
};

// Construct cooldown collection.
const cooldowns = new Discord.Collection();

// Client login
client.login(token);

client.once('ready', () => {
    console.log(`${client.user.tag} has logged in.`);
});

// Command Handler
client.on('message', message => {

    // construct embedded message for bot responses
    let msg = new Discord.MessageEmbed().setColor('#0099FF');

    // server-wide message listening - filter bad words 
    for (let i = 0; i < filter.length; i++) {
        if (message.content.toLowerCase().includes(filter[i])) {
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
    };


    // ---------------------------------------------------------------------------------

    // begin listening for command calls 
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    // separate commands and arguments 
    const args = message.content.slice(prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName)
        || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    // if command isn't recognized, let author know
        if (!command) {
        msg.setDescription(
            `Hi, ${message.author}! Just letting you know that \`${prefix}${commandName}\` isn't a 
            command I recognize. Type \`${prefix}help\` for a list of things I can do! :)`);
        return message.channel.send(msg)
            .then(message.delete())
            .then(m => {
                m.delete({timeout: 4000});
        });
    };
    
    // Check if command can only be used inside server.
    if (command.guildOnly && message.channel.type !== 'text') {
        msg.setDescription('I can\'t execute that command inside DMs!');
        message.channel.send(msg)
            .then(m => { 
                m.delete({ timeout: 3000 });
            });
        return;
    };

    // set permissions for command usage
    let moderator_role = message.guild.roles.cache.find(role => role.name.toLowerCase() === 'moderator')
    if (!message.member.roles.cache.has(moderator_role.id) && command.restricted) {
        msg.setDescription(`${message.author}, you are not authorized to use that command.`);
        message.channel.send(msg)
            .then(message.delete())
            .then(m => {
                m.delete({ timeout: 3000 });
            });
        return;
    };

    // Check if command arguments exist, and sends usage if necessary.
    if (command.args && !args.length) {
        let reply = `You didn't provide any arguments, ${message.author}!`;

        if (command.usage) {
            reply += `\nThe proper usage would be: 
                \`${prefix}${message.content.slice(1)} ${command.usage}\``;
        };
        msg.setDescription(reply);
        return message.reply(msg)
            .then(message.delete())
            .then(m => {
                m.delete({ timeout: 8000 });
        });;
    };

    // enables cooldowns for commands to prevent command spam 
    if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Discord.Collection());
    };

    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 0) * 1000;

    if (timestamps.has(message.author.id)) {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

        if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000;
            
            if (timeLeft > 60) {
                msg.setDescription(`Please wait ${(timeLeft/60).toFixed()} 
                    more minutes(s) before reusing the 
                    \`${prefix}${command.name}\` command.`);
                return message.reply(msg)
                    .then(message.delete())
                    .then(m => {
                        m.delete({ timeout: 3000 });
                    });
            } else {
                msg.setDescription(`Please wait ${timeLeft.toFixed(1)} 
                    more second(s) before reusing the 
                \`${prefix}${command.name}\` command.`);
                return message.reply(msg)
                    .then(message.delete())
                    .then(m => {
                        m.delete({ timeout: 3000 });
                    });
            };
        };
    };

    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

    // Command executor
    try {
        command.execute(message, args, client, prefix);
    } catch (error) {
        console.error(error);
        msg.setDescription(`${message.author}, error executing command.`);
        message.channel.send(msg).then(m => {
            m.delete({ timeout: 3000 });
        });
    };
});

// Assign temporary guest role on server join
client.on('guildMemberAdd', (guildMember) => {
    let guestRole = guildMember.guild.roles.cache.find(role => role.name.toLowerCase() === 'guest');
    if (!guestRole) return;
    guildMember.roles.add(guestRole.id);
});

// verification handler - ony active on bot testing server
// gives verified role and removes guest role on message reaction in 
// verification channel
client.on('messageReactionAdd', async (reaction, user) => {
    if (reaction.message.partial) await reaction.message.fetch();
    if (reaction.partial) await reaction.fetch();

    if (user.bot) return;
    if (!reaction.message.guild) return;
    if (reaction.message.channel.id ==='726249481728950322') {
        if (reaction.emoji.name === '✅') {
            await reaction.message.guild.members.cache.get(user.id).roles.add('726249094267273256')
                .then(console.log(`verified role given to ${user.tag}`))
                .then(reaction.users.remove(user.id))
                .then(user.presence.member.roles.remove('726251800469962782'))
        };
    };
});

// Fetch event info using terminal
client.on('raw', event => {
    console.log(event);
});
