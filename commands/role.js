const Discord = require('discord.js');

module.exports = {
    name: 'give',
    aliases: ['role', 'role', 'giverole'],
    description: 'Give a role to a user',
    usage: '<@user> <role>',
    cooldown: 0,
    guildOnly: true,
    execute(message, args, client) {
        let msg = new Discord.MessageEmbed().setColor('#0099FF');


        // set permissions for command usage
        moderator_role = message.guild.roles.cache.find(role => role.name.toLowerCase() === 'moderator')
        if (!message.member.roles.cache.has(moderator_role.id)) {
            msg.setDescription(`${message.author}, you are not authorized to use that command.`);
            message.channel.send(msg)
                .then(message.delete())
                .then(m => {m.delete({ timeout: 3000 });
                });
            return;
        };


        if (!args.length) {
            msg.setDescription('You must provide a user and a role to give them.');
            message.channel.send(msg).then(m => {
                m.delete({ timeout: 3000 });
            });
            return;
        } else if (args.length <= 1) {
            msg.setDescription('You must provide a role to give that user.');
            message.channel.send(msg).then(m => {
                m.delete({ timeout: 3000 });
            });
            return;
        };

        giveUser = message.mentions.members.first();
        if (!giveUser) {
            msg.setDescription('THat user wasnt found, please try again.');
            message.channel.send(msg).then(m => {
                m.delete({ timeout: 3000 });
            });
            return;
        };

        role = message.guild.roles.cache.find(role => role.name === args[1]);
        if (!role) {
            msg.setDescription('That role wasn\'t found. please try again');
            message.channel.send(msg).then(m => {
                m.delete({ timeout: 3000 });
            });
            return;
        } ;


        giveUser.roles.add(role.id)
            .then( () => {
                msg.setDescription(`${giveUser} given \`${role.name} role!\``);
                message.channel.send(msg).then(m => {
                    m.delete({ timeout: 3000 });
                });
            })
            .catch(err => {
                msg.setDescription(`I can't give that role.`);
                message.channel.send(msg).then(m => {
                    m.delete({ timeout: 3000 });
                });
            });
        message.delete();
    },
};
