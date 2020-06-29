const Discord = require('discord.js');

module.exports = {
    name: 'eval',
    aliases: ['e'],
    description: 'Evaluate and run JavaScript code.',
    usage: '<line to evaluate>',
    restricted: true,
    cooldown: 0,
    guildOnly: false,
    execute(message, args, client, prefix) {
        let msg = new Discord.MessageEmbed().setColor('#0099FF');
        
        if (message.author.id !== '213814266912964610') {
            msg
                .setTitle('Warning')
                .setDescription(`${message.author}, you are not authorized to use that command.`);
            message.channel.send(msg)
                .then(m => {m.delete({ timeout: 2500})});
            message.delete();
            return;
        };

        if (message.content.toLowerCase().includes('token')) {
            msg.setDescription('You cannot access tokens using this command.');
            message.channel.send(msg)
                .then(m => { m.delete({ timeout: 2500 }) });
            message.delete();
            return;
        };

        const clean = text => {
            if (typeof (text) === "string")
                return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
            else
                return text;
        }

        try {
            const code = args.join(" ");
            let evaled = eval(code);

            if (typeof evaled !== "string")
                evaled = require("util").inspect(evaled);

            message.channel.send(clean(evaled), { code: "xl" });
        } catch (err) {
            message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
        };

        
        // console.log('hello eval');
        
    },
};