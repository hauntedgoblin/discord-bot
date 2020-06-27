const Discord = require('discord.js');
const { prefix } = require('C:/Users/c0401/Documents/Coding Projects/discord/bot_v2_config.json');

module.exports = {
    name: 'help',
    aliases: ['commands'],
    description: 'List of all commands or info about a command.',
    usage: '[command name]',
    cooldown: 5,
    guildOnly: false,
    execute(message, args) {
        let msg = new Discord.MessageEmbed().setColor('#0099FF');

        const data = [];
        const { commands } = message.client;

        if(!args.length) {
            data.push('Here\'s a list of all my commands:');
            data.push(commands.map(command => `${prefix}${command.name}`).join('\n'));
            data.push(`\nYou can send \`${prefix}help [command name]\` to get info on a specific command!`);
            msg.setDescription(data, { split: true });
            return message.author.send(msg)
                .then(() => {
                    if (message.channel.type === 'dm') return;
                    mgs.setDescription('I\'ve sent you a DM with all my commands!');
                    message.reply(msg);
                })
                .catch(error => {
                    console.error(`Could not send help DM to ${message.author.tag}.\n`, error);
                    msg.setDescription('it seems like I can\'t DM you! Do you have DMs disabled?');
                    message.reply(msg);
                });
        };

        const name = args[0].toLowerCase();
        const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

        if (!command) {
            msg.setDescription('That\'s not a valid command!');
            return message.reply(msg);
        };

        data.push(`**Command:** ${command.name}`);

        if (command.aliases) data.push(`**Aliases:** ${command.aliases.join(', ')}`);
        if (command.description) data.push(`**Description:** ${command.description}`);
        if (command.usage) data.push(`**Usage:** ${prefix}${command.name} ${command.usage}`);
        if (!command.guildOnly) data.push(`**DM-Enabled:** Yes`)
        data.push(`**Cooldown:** ${command.cooldown || 0} second(s)`);

        message.channel.send(data, { split: true });

    },
};
