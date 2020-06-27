const Discord = require('discord.js');
const { prefix, authorized_roles: { moderator_id } } = require('../config/config.json');

module.exports = {
    name: 'kick',
    description: 'kick a member of the server',
    usage: '<@user> {reason}',
    cooldown: 0,
    guildOnly: true,
    execute(message, args) {
        let msg = new Discord.MessageEmbed().setColor('#0099FF');

        // set permissions for command usage
        if (!message.member.roles.cache.has(moderator_id)) {
            msg.setDescription(`${message.author}, you are not authorized to use that command.`);
            message.channel.send(msg);
            message.delete();
            return;
        };

        if (!args.length) {
            msg.setDescription('Must provide user to kick. Optionally provide a reason.');
            message.reply(msg);
            return;
        } else {
            let kickUser = message.mentions.members.first();
            if (!kickUser) {
                msg.setDescription('User not found. Please try again');
                message.reply(msg);
            } else {
                let data = [`${kickUser} removed from \`${message.guild.name}\`.`];
                let kickReason = args.join(' ').slice(22);
                if (kickReason) data.push(`\nReason: ${kickReason}`)
                msg.setDescription(data);
                message.channel.send(msg);
                
                kickUser.send(msg)
                kickUser.kick()
            };
        };
    },
};