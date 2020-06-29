const Discord = require('discord.js');

module.exports = {
    name: 'kick',
    description: 'kick a member of the server',
    usage: '<@user> {reason}',
    args: '<@user> {reason}',
    restricted: true,
    cooldown: 0,
    guildOnly: true,
    execute(message, args, client, prefix) {
        let msg = new Discord.MessageEmbed().setColor('#0099FF');

        let kickUser = message.mentions.members.first();
        if (!kickUser) {
            msg.setDescription('User not found. Please try again');
            message.reply(msg)
                .then(message.delete())
                .then(m => {
                    m.delete({ timeout: 3000 });
            });
        } else {
            let data = [`${kickUser} kicked from \`${message.guild.name}\`.`];
            let kickReason = args.join(' ').slice(22);
            if (kickReason) data.push(`\nReason: ${kickReason}`)
            msg.setDescription(data);
            message.channel.send(msg)
                .then(message.delete());
            
            kickUser.send(msg)
            kickUser.kick()
        };
    },
};