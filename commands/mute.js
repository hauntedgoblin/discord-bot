const Discord = require('discord.js');
const ms = require('ms');

module.exports = {
    name: 'mute',
    description: 'Temporarily mserver-mute a user.',
    usage: '<@user> <minutes> <reason>',
    args: '<@user> <minutes> <reason>',
    restricted: true,
    cooldown: 0,
    guildOnly: true,
    execute(message, args, client, prefix) {
        let msg = new Discord.MessageEmbed().setColor('#0099FF');

        let muteUser = message.mentions.members.first();
        if (!muteUser) return;
        let muteRole = message.guild.roles.cache.find(role => role.name.toLowerCase() === 'muted');
        if (!muteRole) return;
        let muteLength = args[1]
        if (!muteLength) return;
        let muteReason = args.slice(2).join(' ');
        if (!muteReason) return;

        msg
            .setDescription(`${muteUser} has been muted for ${muteLength} minutes for ${muteReason}.`)
        
        message.channel.send(msg)
            .then(message.delete())
            .then(m => {
                m.delete({ timeout: 5000 });
            });

        muteUser.roles.add(muteRole.id);

        setTimeout(function(){
            muteUser.roles.remove(muteRole.id);
            msg
                .setDescription(`You have been unmuted in \` ${message.guild.name} \`.\n
                Refrain from \` ${muteReason} \` to avoid future mutes, kicks, or bans.`);

            muteUser.send(msg);
        }, ms(muteLength + 'm'));
    },
};
