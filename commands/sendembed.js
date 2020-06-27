const Discord = require('discord.js');

module.exports = {
    name: 'embed',
    description: 'Send embed. Must be customized in command JS file first.',
    usage: ' ',
    cooldown: 0,
    guildOnly: true,
    execute(message, args) {
        let msg = new Discord.MessageEmbed()
            .setColor('#0099FF')
            .setTitle('Welcome!')
            .setDescription(`Welcome to ${message.guild.name}! 
                Please type \`-verify\` to access the rest of the server! :)`);
        message.channel.send(msg);
    },
};
