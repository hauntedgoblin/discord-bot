const Discord = require('discord.js');

module.exports = {
    name: 'botinfo',
    description: 'Get link to bot GitHub repo.',
    usage: ' ',
    cooldown: 60,
    guildOnly: false,
    execute(message, args, client, prefix) {
        let msg = new Discord.MessageEmbed()
            .setColor('#0099FF')
            .setTitle("Bot Source Code")
            .setDescription(`
            The source code for this bot can be found at 
            https://github.com/hauntedgoblin/discord-bot.\n
            It was written and is maintained by <@213814266912964610> (hauntedgoblin on GitHub).
            Please DM <@213814266912964610> with any questions, requests, etc.`)
        
        message.channel.send(msg);
    },
};
