const Discord = require('discord.js');
const { authorized_roles: { moderator_id } } = 
    require('C:/Users/c0401/Documents/Coding Projects/discord/bot_v2_config.json');

module.exports = {
    name: 'give',
    aliases: ['role', 'addrole'],
    description: 'Give a role to a user',
    usage: '<@user> <role>',
    cooldown: 0,
    guildOnly: true,
    execute(message, args) {
        let msg = new Discord.MessageEmbed().setColor('#0099FF');
        
        giveUser = message.mentions.members.first()
        role = message.guild.roles.cache.find(role => role.name === args[1]);
        if (!role) return message.channel.send('That role wasn\'t found. please try again');

        giveUser.roles.add(role.id);

        msg.setDescription(`${giveUser} given \`${role.name}\` role!`);

        message.channel.send(msg);
        message.delete();
    },
};
