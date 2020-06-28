const Discord = require('discord.js');
const { authorized_roles: { moderator_id } } = 
    require('C:/Users/c0401/Documents/Coding Projects/discord/bot_v2_config.json');

module.exports = {
    name: 'embed',
    description: 'Send embed. Must be customized in command JS file first.',
    usage: ' ',
    cooldown: 0,
    guildOnly: true,
    execute(message, args) {

        let msg = new Discord.MessageEmbed().setColor('#0099FF');

        // set command permissions
        if (!message.member.roles.cache.has(moderator_id)) {
            
            msg.setDescription(`${message.author}, you are not authorized to use that command.`);
            message.channel.send(msg);
            message.delete();
            return;
        };

        msg
            .setTitle('Welcome!')
            .setDescription(`Welcome to ${message.guild.name}! 
                Please type \`-verify\` to access the rest of the server! :)`);
        message.channel.send(msg);
        message.delete()
    },
};
