const Discord = require('discord.js');

module.exports = {
    name: 'kick',
    description: 'kick a member of the server',
    usage: '<@user> {reason}',
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

        if (!args.length) {
            msg.setDescription('Must provide user to kick. Optionally provide a reason.');
            message.reply(msg).then(m => {
                m.delete({ timeout: 3000 });
            });
            return;
        } else {
            let kickUser = message.mentions.members.first();
            if (!kickUser) {
                msg.setDescription('User not found. Please try again');
                message.reply(msg).then(m => {
                    m.delete({ timeout: 3000 });
                });
            } else {
                let data = [`${kickUser} removed from \`${message.guild.name}\`.`];
                let kickReason = args.join(' ').slice(22);
                if (kickReason) data.push(`\nReason: ${kickReason}`)
                msg.setDescription(data);
                message.channel.send(msg).then(m => {
                    m.delete({ timeout: 3000 });
                });
                
                kickUser.send(msg)
                kickUser.kick()
            };
        };
    },
};