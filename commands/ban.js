const Discord = require('discord.js');

module.exports = {
    name: 'ban',
    description: 'ban a user from the server',
    usage: '<@user> <reason>',
    args: '<@user> <reason>',
    restricted: true,
    cooldown: 0,
    guildOnly: true,
    execute(message, args, client, prefix) {
        let msg = new Discord.MessageEmbed().setColor('#0099FF').setTimestamp();

        let banUser = message.mentions.members.first();
        let banReason = args.join(' ').slice(22);
        
        if (!banUser) {
            msg.setDescription(`${message.author}, that user was not found. Please try again`);
            message.channel.send(msg)
                .then(message.delete())
                .then(m => {
                m.delete({ timeout: 3000 });
            });
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
    },
};