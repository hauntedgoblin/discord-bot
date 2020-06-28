const Discord = require('discord.js');

module.exports = {
    name: 'embed',
    description: 'Send embed. Must be customized in command JS file first.',
    usage: ' ',
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

        msg
            .setTitle('Embed title')
            .setTimestamp()
            .setFooter(client.user.username)

        message.channel.send(msg).then(message.delete());
    },
};
