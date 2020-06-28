const Discord = require('discord.js');

module.exports = {
    name: 'report',
    description: 'Report rulebreaking activity. Requires a user and a reason',
    usage: '<@user> <reason>',
    cooldown: 0,
    guildOnly: true,
    execute(message, args, client) {
        
        let msg = new Discord.MessageEmbed().setColor('#0099FF');
        
        if (args.length < 2) {
            msg.setDescription(
                    `To file a report, you must provide a user and a reason for reporting them.`
                    );
            message.channel.send(msg).then(m => {
                m.delete({ timeout: 3000 });
            });
            return;
        } else {
            let reportedUser = message.mentions.members.first();
            let reportReason = args.join(' ').slice(22);

            if (!reportedUser) {
                msg.setDescription('User not found. Please try again');
                message.reply(msg).then(m => {
                    m.delete({ timeout: 3000 });
                });
                return;
            } else if (!reportReason) return ('You must provide a reason for reporting this user.')
            
            let data = [`${reportedUser} has been reported for \`${reportReason} \` by ${message.author}.`];
            data.push(`\nReport sent: \`${message.createdAt.toString()}\``)
            data.push(`\nChannel: ${message.channel}`)
            msg.setDescription(data)
            
            if (message.guild.channels.cache.get('726202173242998834')) {
                message.guild.channels.cache.get('726202173242998834').send(msg)
            } else {
                message.channel.send(msg).then(m => {
                    m.delete({ timeout: 3000 });
                });
            };
            data.splice(0, 0, `Thank you for helping us enforce server rules. The following report 
                has beenn submitted to the moderation team:\n`)
            message.author.send(msg.setDescription(data))
            message.delete()
        };        
    },
};
