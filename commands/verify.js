const Discord = require('discord.js');
const { prefix, verification_channel_id, verification_role_id, guest_role_id } = require('../config/config.json');

module.exports = {
    name: 'verify',
    description: `Gives user the 'verified' role and access to the server.`,
    usage: ' ',
    cooldown: 0,
    guildOnly: true,
    execute(message, args) {
        if (message.channel.id === verification_channel_id) {
            message.member.roles.add(verification_role_id);
            message.member.roles.remove(guest_role_id);
            message.delete();
        } else if (message.member.roles.cache.has(verification_role_id) 
            || message.channel.id !== verification_channel_id) {
            message.delete()
        };
    },
};
