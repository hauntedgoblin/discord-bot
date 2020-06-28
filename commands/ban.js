const Discord = require('discord.js');

module.exports = {
    name: 'ban',
    description: 'ban a user from the server',
    usage: '<@user> <reason>',
    cooldown: 0,
    guildOnly: true,
    execute(message, args, client) {
        let msg = new Discord.MessageEmbed().setColor('#0099FF');

        // set permissions for command usage
        moderator_role = message.guild.roles.cache.find(role => role.name.toLowerCase() === 'moderator')
        if (!message.member.roles.cache.has(moderator_role.id)) {
            msg.setDescription(`${message.author}, you are not authorized to use that command.`);
            message.channel.send(msg).then(m => {
                m.delete({ timeout: 3000 });
            });;
            message.delete();
            return;
        };

        if (args.length < 2) {
            msg.setColor('#0099FF')
                .setDescription(`${message.author}, you must provide a user AND a reason for banning them.`);
            message.channel.send(msg.then(m => {
                m.delete({ timeout: 3000 });
            }));
            return;
        } else {
            let banUser = message.mentions.members.first();
            let banReason = args.join(' ').slice(22);
            
            if (!banUser) {
                msg.setDescription(`${message.author}, that user was not found. Please try again`);
                message.channel.send(msg).then(m => {
                    m.delete({ timeout: 3000 });
                });
            } else {
                if (!banReason) return(`${message.author}, you must provide a reason for banning this user.`);
                let data = [`${banUser} has been banned from \`${message.guild.name}\`.`];
                data.push(`\nReason: ${banReason}`)
                data.push(`\nAppeal your ban by DMing ${message.author}`)
                msg.setDescription(data);
                message.channel.send(msg).then(m => {
                    m.delete({ timeout: 3000 });
                });;

                banUser.send(msg);
                banUser.ban({reason: banReason});
            };
        };
    },
};