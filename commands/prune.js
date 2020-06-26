const Discord = require('discord.js');
const { prefix } = require('../config/config.json');

module.exports = {
    name: 'prune',
    aliases: ['purge', 'remove', 'delete', 'cls'],
    description: 'Delete up to 100 messages in a channel.',
    usage: '<number between 1 and 100>',
    cooldown: 0,
    guildOnly: true,
    execute(message, args) {
            var amount = parseInt(args[0]);

            if (message.toString() === `${prefix}cls` && isNaN(amount)) {
                message.channel.bulkDelete(100,true);
            } else {
                if (isNaN(amount)) {
                    let msg = new Discord.MessageEmbed()
                        .setColor('#0099FF')
                        .setDescription('Please enter a number of messages to remove.');
                    return message.channel.send(msg);
                } else if (amount < 1 || amount > 100) {
                    let msg = new Discord.MessageEmbed()
                        .setColor('#0099FF')
                        .setDescription('Number of messages to delete must not exceed 100.');
                    return message.channel.send(msg);
                } else {
                    if (amount === 100) {
                        message.channel.bulkDelete(amount, true).catch(err => {
                            console.error(err);
                            let msg = new Discord.MessageEmbed()
                                .setColor('#0099FF')
                                .setDescription('Error deleting messages.');
                            message.channel.send(msg);
                        });
                    } else {
                        amount++;
                        message.channel.bulkDelete(amount, true).catch(err => {
                            console.error(err);
                            let msg = new Discord.MessageEmbed()
                                .setColor('#0099FF')
                                .setDescription('Error deleting messages.');
                            message.channel.send(msg);                        
                        });
                    };
                };
            };
    },
};
