const Discord = require('discord.js');
const { verification_channel_id, 
        verification_role_id, 
        guest_role_id, 
        general_channel_id } = require(
            'C:/Users/c0401/Documents/Coding Projects/discord/bot_v2_config.json');

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

            let msg = new Discord.MessageEmbed()
                .setColor('#0099FF')
                .setDescription(`Everyone welcome ${message.author} to the server!`);
            message.guild.channels.cache.get(general_channel_id).send(msg);

        } else if (message.member.roles.cache.has(verification_role_id) 
            || message.channel.id !== verification_channel_id) {
            message.delete()
        };
    },
};
