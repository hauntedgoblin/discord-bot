const Discord = require('discord.js');
const { authorized_roles: { moderator_id }} = require('../config/config.json');

module.exports = {
    name: 'embed',
    description: 'Send embed. Must be customized in command JS file first.',
    usage: ' ',
    cooldown: 0,
    guildOnly: true,
    execute(message, args) {

        // set command permissions
        if (!message.member.roles.cache.has(moderator_id)) {
            let msg = new Discord.MessageEmbed()
                .setColor('#0099FF')
                .setDescription(`${message.author}, you are not authorized to use that command.`);
            message.channel.send(msg);
            message.delete();
            return;
        };

        let msg = new Discord.MessageEmbed()
            .setColor('#0099FF')
            .setTitle('Welcome!')
            .setDescription(`Welcome to ${message.guild.name}! 
                Please type \`-verify\` to access the rest of the server! :)`);
        message.channel.send(msg);
    },
};