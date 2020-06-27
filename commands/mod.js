const Discord = require('discord.js');
const { authorized_roles: { moderator_id } } = require('C:/Users/c0401/Documents/Coding Projects/discord/bot_v2_config.json');

module.exports = {
    name: 'mod',
    description: 'Give moderator role to a user',
    usage: '<@user>',
    cooldown: 0,
    guildOnly: true,
    execute(message, args) {
        let msg = new Discord.MessageEmbed().setColor('#0099FF');
        
        modUser = message.mentions.members.first()

        modUser.roles.add(moderator_id);

        msg.setDescription(`Congratulations ${modUser}! 
            You are now a moderator in \`${message.guild.name}\`.`);

        modUser.send(msg);
    },
};
