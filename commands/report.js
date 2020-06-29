const Discord = require('discord.js');

module.exports = {
    name: 'report',
    description: 'Report rulebreaking activity. Requires a user and a reason',
    usage: '<@user> <reason>',
    args: '<@user> <reason>',
    cooldown: 0,
    guildOnly: true,
    execute(message, args, client) {
        
        let msg = new Discord.MessageEmbed().setColor('#0099FF').setTimestamp();
        
        let reportedUser = message.mentions.members.first();
        let reportReason = args.join(' ').slice(23);

        if (!reportedUser) {
            msg.setDescription('User not found. Please try again');
            message.reply(msg)
                .then(message.delete())
                .then(m => {
                    m.delete({ timeout: 3000 });
            });
            return;
        } else if (!reportReason.length) {
            msg.setDescription('You must provide a reason for reporting this user.');
            message.reply(msg)
                .then(message.delete())
                .then(m => {
                    m.delete({ timeout: 3000 });
                });
            return;
        };
        
        let data = [`${reportedUser} has been reported for \`${reportReason}\` 
            by ${message.author}.`];
        data.push(`\nChannel: ${message.channel}`)
        msg.setDescription(data)
        
        let reportChannel = message.guild.channels.cache.find(channel => 
            channel.name.toLowerCase() === 'reports');

        if (reportChannel) {
            message.guild.channels.cache.get(reportChannel.id).send(msg);
        } else {
            message.guild.channels.create('reports')
                .then(channel => {
                    channel.send(msg);
                });
        };
    data.splice(0, 0, `Thank you for helping us enforce server rules. The following report 
        has been submitted to the moderation team:\n`)
    message.author.send(msg.setDescription(data))
        .then(message.delete());        
    },
};
