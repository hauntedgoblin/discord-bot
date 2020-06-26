const Discord = require('discord.js');
const { prefix } = require('../config/config.json');

module.exports = {
    name: 'kick',
    description: 'kick a member of the server',
    usage: '<@user> {reason}',
    cooldown: 0,
    guildOnly: true,
    execute(message, args) {
        // console.log('Kicked member');

        if (!args.length) {
            let msg = new Discord.MessageEmbed()
                .setColor('#0099FF')
                .setDescription('Must provide user to kick. Optionally provide a reason.');
            message.reply(msg);
            return;
        } else {
            let kickUser = message.mentions.members.first();
            if (!kickUser) {
                let msg = new Discord.MessageEmbed()
                    .setColor('#0099FF')
                    .setDescription('User not found. Please try again');
                message.reply(msg);
            } else {
                let data = [`${kickUser} removed from \`${message.guild.name}\`.`];
                let kickReason = args.join(' ').slice(22);
                if (kickReason) data.push(`\nReason: ${kickReason}`)
                let msg = new Discord.MessageEmbed()
                    .setColor('#0099FF')
                    .setDescription(data);
                message.channel.send(msg);
                
                kickUser.send(msg)
                kickUser.kick()
            };
        };
    },
};