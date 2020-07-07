const Discord = require('discord.js');

module.exports = {
    name: 'help',
    aliases: ['commands'],
    description: 'List of all commands or info about a command.',
    usage: '[command name]',
    restricted: false,
    cooldown: 0,
    guildOnly: false,
    execute(message, args, client, prefix) {
        let msg = new Discord.MessageEmbed().setColor('#0099FF');
        let moderator_role = message.guild.roles.cache.find(role => role.name.toLowerCase() === 'moderator')
        const data = [];
        const { commands } = message.client;

        if(!args.length) {
            if (message.member.roles.cache.has(moderator_role.id)) {
                data.push('Here\'s a list of all my commands:\n');
                data.push(commands.map(command => `${prefix}${command.name}`).join('\n'));
                data.push(`\nYou can send \`${prefix}help [command name]\` to get info on a specific command!`);
                msg.setDescription(data, { split: true });
                return message.author.send(msg)
                    .then(() => {
                        if (message.channel.type === 'dm') return;
                        msg.setDescription('I\'ve sent you a DM with all my commands!');
                        message.reply(msg)
                            .then(message.delete())
                            .then(m => {
                                m.delete({ timeout: 3000 });
                            });
                    })
                    .catch(error => {
                        console.error(`Could not send help DM to ${message.author.tag}.\n`, error);
                        msg.setDescription('It seems like I can\'t DM you! Do you have DMs disabled?');
                        message.reply(msg).then(m => {
                            m.delete({ timeout: 3000 });
                        });
                    });
            } else {
                let commandList = [];
                data.push('Here\'s a list of all my commands:\n');
                commandList.push(commands.map(command => {
                    if (!command.restricted) {
                        return `${prefix}${command.name}`
                    };
                }));
                commandList = commandList[0].filter(item => item !== undefined);
                data.push(commandList.map(command => `${command}`).join('\n'));
                data.push(`\nYou can send \`${prefix}help [command name]\` to get info on a specific command!`);
                msg.setDescription(data, { split: true });
                return message.author.send(msg)
                    .then(() => {
                        if (message.channel.type === 'dm') return;
                        msg.setDescription('I\'ve sent you a DM with all my commands!');
                        message.reply(msg)
                            .then(message.delete())
                            .then(m => {
                                m.delete({ timeout: 3000 });
                            });
                    })
                    .catch(error => {
                        console.error(`Could not send help DM to ${message.author.tag}.\n`, error);
                        msg.setDescription('It seems like I can\'t DM you! Do you have DMs disabled?');
                        message.reply(msg).then(m => {
                            m.delete({ timeout: 3000 });
                        });
                    });
            };
        };

        const name = args[0].toLowerCase();
        const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

        if (!command) {
            msg.setDescription('That\'s not a valid command!');
            return message.reply(msg)
                .then(message.delete())
                .then(m => {
                    m.delete({ timeout: 3000 });
            });
        };


        if (!message.member.roles.cache.has(moderator_role.id) && command.restricted) {
            msg.setDescription(`${message.author}, that\'s not a valid command!`);
            message.channel.send(msg)
                .then(message.delete())
                .then(m => {
                    m.delete({ timeout: 3000 });
                });
            return;
        } else {
            data.push(`**Command:** ${command.name}`);

            if (command.aliases) data.push(`**Aliases:** ${command.aliases.join(', ')}`);
            if (command.description) data.push(`**Description:** ${command.description}`);
            if (command.usage) data.push(`**Usage:** ${prefix}${command.name} ${command.usage}`);
            if (command.restricted) data.push(`**Restricted:** ${command.restricted}`)
            if (!command.guildOnly) data.push(`**DM-Enabled:** Yes`);
            data.push(`**Cooldown:** ${command.cooldown || 0} second(s)`);
            msg.setDescription(data);

            message.channel.send(msg)
                .then(message.delete())
                .then(m => {
                    m.delete({ timeout: 8000 });
                });
        };
    },
};
