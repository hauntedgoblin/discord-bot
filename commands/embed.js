const Discord = require('discord.js');

module.exports = {
    name: 'embed',
    description: 'Send embed. Must be customized in command JS file first.',
    usage: ' ',
    restricted: true,
    cooldown: 0,
    guildOnly: true,
    execute(message, args, client, prefix) {

        let msg = new Discord.MessageEmbed().setColor('#0099FF');

        msg
            .setTitle('Embed title')
            .setTimestamp()
            .setFooter(client.user.username)

        message.channel.send(msg).then(message.delete());
    },
};
