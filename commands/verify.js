const Discord = require('discord.js');
const { verification_channel_id } = require('../config/config.json');

module.exports = {
    name: 'verify',
    description: `Gives user the 'verified' role and access to the server.`,
    usage: ' ',
    restricted: false,
    cooldown: 0,
    guildOnly: true,
    execute(message, args, client) {
        if (message.channel.id === verification_channel_id) {
            let guestRole = message.guild.roles.cache.find(
                role => role.name.toLowerCase() === 'guest')

            let verifiedRole = message.guild.roles.cache.find(
                role => role.name.toLowerCase() === 'verified')

            message.member.roles.add(verifiedRole.id);
            message.member.roles.remove(guestRole.id);
            message.delete();

            let msg = new Discord.MessageEmbed()
                .setColor('#0099FF')
                .setDescription(`Everyone welcome ${message.author} to the server!`);
            message.guild.channels.cache.find(channel => channel.name === 'general').send(msg);

        } else if (message.member.roles.cache.has(verifiedRole.id) 
            || message.channel.id !== verification_channel_id) {
            message.delete()
        };
    },
};
