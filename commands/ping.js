const Discord = require('discord.js');

module.exports = {
    name: 'ping',
    description: 'Ping the bot.',
    usage: ' ',
    cooldown: 60,
    guildOnly: false,
    execute(message, args, client, prefix) {
        let msg = new Discord.MessageEmbed()
            .setColor('#0099FF')
            .setDescription('pong!');
        message.channel.send(msg);
    },
};
