const Discord = require('discord.js');
const { prefix, authorized_roles: { moderator_id } } = require('C:/Users/c0401/Documents/Coding Projects/discord/bot_v2_config.json');

module.exports = {
    name: 'ban',
    description: 'ban a user from the server',
    usage: '<@user> <reason>',
    cooldown: 0,
    guildOnly: true,
    execute(message, args) {
        let msg = new Discord.MessageEmbed().setColor('#0099FF');

        // set permissions for command usage
        if(!message.member.roles.cache.has(moderator_id)) {
            msg.setDescription(`${message.author}, you are not authorized to use that command.`);
            message.channel.send(msg);
            message.delete();
            return;
        };

        if (args.length < 2) {
            msg.setColor('#0099FF')
                .setDescription(`${message.author}, you must provide a user AND a reason for banning them.`);
            message.channel.send(msg);
            return;
        } else {
            let banUser = message.mentions.members.first();
            let banReason = args.join(' ').slice(22);
            
            if (!banUser) {
                msg.setDescription(`${message.author}, that user was not found. Please try again`);
                message.channel.send(msg);
            } else {
                if (!banReason) return(`${message.author}, you must provide a reason for banning this user.`);
                let data = [`${banUser} has been banned from \`${message.guild.name}\`.`];
                data.push(`\nReason: ${banReason}`)
                data.push(`\nAppeal your ban by DMing ${message.author}`)
                msg.setDescription(data);
                message.channel.send(msg);

                banUser.send(msg);
                banUser.ban({reason: banReason});
            };
        };
    },
};