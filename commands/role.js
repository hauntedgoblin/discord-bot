const Discord = require('discord.js');

module.exports = {
    name: 'role',
    aliases: ['give', 'add', 'giverole', 'roleadd', 'remove', 'removerole'],
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

        let user = message.mentions.members.first();
        if (!user) {
            msg.setDescription('That user wasn\'t found, please try again.');
            message.channel.send(msg)
                .then(message.delete())
                .then(m => {
                    m.delete({ timeout: 3000 });
            });
            return;
        };

        let role = message.guild.roles.cache.find(role => role.name === args[1]);
        if (!role) {
            msg.setDescription('That role wasn\'t found. please try again');
            message.channel.send(msg)
                .then(message.delete())
                .then(m => {
                    m.delete({ timeout: 3000 });
            });
            return;
        } ;

        if (!user.roles.cache.has(role.id)) {
        user.roles.add(role.id)
            .then( () => {
                msg.setDescription(`${user} given \`${role.name}\` role!`);
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
        } else {
            user.roles.remove(role.id)
            msg.setDescription(`\`${role.name}\` role removed from ${user}.`)
            message.channel.send(msg)
                .then(message.delete())
                .then(m => {
                    m.delete({ timeout: 4000 });
                })
                .catch(err => {
                    msg.setDescription(`Error removing role: ${err}`);
                    message.channel.send(msg)
                        .then(m => {
                            m.delete({ timeout: 4000 });
                        });
            });
        };
    },
};
