const Discord = require('discord.js');
const { prefix } = require('../config/config.json');

module.exports = {
    name: 'ban',
    description: 'ban a user from the server',
    usage: '<@user> <reason>',
    cooldown: 0,
    guildOnly: true,
    execute(message, args) {
        // console.log('Kicked member');

        if (args.length < 3) {
            let msg = new Discord.MessageEmbed()
                .setColor('#0099FF')
                .setDescription('You must provide a user AND a reason for banning them.');
            message.reply(msg);
            return;
        } else {
            let banUser = message.mentions.members.first();
            let banReason = args.join(' ').slice(22);
            
            if (!banUser) {
                let msg = new Discord.MessageEmbed()
                    .setColor('#0099FF')
                    .setDescription('User not found. Please try again');
                message.reply(msg);
            } else {
                if (!banReason) return('You must provide a reason for banning this user.');
                let data = [`${banUser} has been banned from \`${message.guild.name}\`.`];
                data.push(`\nReason: ${banReason}`)
                data.push(`\nAppeal your ban by DMing ${message.author}`)
                let msg = new Discord.MessageEmbed()
                    .setColor('#0099FF')
                    .setDescription(data);
                message.channel.send(msg);

                banUser.send(msg);
                banUser.ban({reason: banReason});
            };
        };
    },
};