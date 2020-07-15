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

        if (message.author.id !== '213814266912964610') {
            msg
                .setDescription(`${message.author}, you are not authorized to use that command.`);
            message.channel.send(msg)
                .then(m => { m.delete({ timeout: 2500 }) });
            message.delete();
            return;
        };

        msg
            .setTitle('Embed title')
            .setTimestamp()
            .setFooter(client.user.username)

        message.channel.send(msg).then(message.delete());
    },
};
