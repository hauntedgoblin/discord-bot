const Discord = require('discord.js');

module.exports = {
    name: 'give',
    aliases: ['role', 'give', 'add', 'giverole', 'addrole'],
    description: 'Give a role to a user',
    usage: '<@user> <role>',
    args: "<@user> <role>",
    restricted: true,
    cooldown: 0,
    guildOnly: true,
    execute(message, args, client, prefix) {
        let msg = new Discord.MessageEmbed().setColor('#0099FF');

        if (args.length <= 1) {
            msg.setDescription('You must provide a role to give that user.');
            message.channel.send(msg)
                .then(message.delete())
                .then(m => {
                    m.delete({ timeout: 3000 });
            });
            return;
        };

        giveUser = message.mentions.members.first();
        if (!giveUser) {
            msg.setDescription('That user wasn\'t found, please try again.');
            message.channel.send(msg)
                .then(message.delete())
                .then(m => {
                    m.delete({ timeout: 3000 });
            });
            return;
        };

        role = message.guild.roles.cache.find(role => role.name === args[1]);
        if (!role) {
            msg.setDescription('That role wasn\'t found. please try again');
            message.channel.send(msg)
                .then(message.delete())
                .then(m => {
                    m.delete({ timeout: 3000 });
            });
            return;
        } ;


        giveUser.roles.add(role.id)
            .then( () => {
                msg.setDescription(`${giveUser} given \`${role.name}\` role!`);
                message.channel.send(msg)
                    .then(message.delete())
                    .then(m => {
                        m.delete({ timeout: 4000 });
                });
            })
            .catch(err => {
                msg.setDescription(`I can't give that role.`);
                message.channel.send(msg)
                    .then(message.delete())
                    .then(m => {
                        m.delete({ timeout: 3000 });
                });
            });
    },
};
