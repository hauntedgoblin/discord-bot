const Discord = require('discord.js');
const { prefix } = 
    require('C:/Users/c0401/Documents/Coding Projects/discord/bot_v2_config.json');

module.exports = {
    name: 'prune',
    aliases: ['purge', 'remove', 'delete', 'cls'],
    description: 'Delete up to 100 messages in a channel.',
    usage: '<number between 1 and 100>',
    cooldown: 0,
    guildOnly: true,
    execute(message, args, client) {

        let msg = new Discord.MessageEmbed().setColor('#0099FF');

        // set permissions for command usage
        moderator_role = message.guild.roles.cache.find(role => role.name.toLowerCase() === 'moderator')
        if (!message.member.roles.cache.has(moderator_role.id)) {
            msg.setDescription(`${message.author}, you are not authorized to use that command.`);
            message.channel.send(msg)
            .then(message.delete())
            .then(m => {
                m.delete({ timeout: 3000 });
            });
            return;
        };

        var amount = parseInt(args[0]);
        if (message.toString() === `${prefix}cls` && isNaN(amount)) {
            message.channel.bulkDelete(100,true);
        } else {
            if (isNaN(amount)) {
                msg.setDescription('Please enter a number of messages to remove.');
                return message.channel.send(msg).then(m => {
                    m.delete({ timeout: 3000 });
                });
            } else if (amount < 1 || amount > 100) {
                msg.setDescription('Number of messages to delete must not exceed 100.');
                return message.channel.send(msg).then(m => {
                    m.delete({ timeout: 3000 });
                });
            } else {
                if (amount === 100) {
                    message.channel.bulkDelete(amount, true).catch(err => {
                        console.error(err);
                        msg.setDescription('Error deleting messages.');
                        message.channel.send(msg).then(m => {
                            m.delete({ timeout: 3000 });
                        });
                    });
                } else {
                    amount++;
                    message.channel.bulkDelete(amount, true).catch(err => {
                        console.error(err);
                        msg.setDescription('Error deleting messages.');
                        message.channel.send(msg).then(m => {
                            m.delete({ timeout: 3000 });
                        });                        
                    });
                };
            };
        };
    },
};
