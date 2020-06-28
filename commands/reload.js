const Discord = require('discord.js');
const { prefix } = 
    require('C:/Users/c0401/Documents/Coding Projects/discord/bot_v2_config.json');

module.exports = {
    name: 'reload',
    aliases: ['refresh'],
    description: 'Reloads a command',
    usage: '<command name>',
    cooldown: 0,
    guildOnly: false,
    execute(message, args) {
        let msg = new Discord.MessageEmbed().setColor('#0099FF');

        const commandName = args[0].toLowerCase();
        const command = message.client.commands.get(commandName)
            || message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

        if (!command) {
           msg.setDescription(`There is no command with name or alias 
                \`${commandName}\`, ${message.author}!`);
            message.channel.send(msg);
            return;
        };

        delete require.cache[require.resolve(`./${command.name}.js`)];

        try {
            const newCommand = require(`./${command.name}.js`);
            message.client.commands.set(newCommand.name, newCommand);
        } catch (error) {
            console.log(error);
            msg.setDescription(`There was an error while reloading a command 
                \`${prefix}${command.name}\`:\n\`${error.message}\``);
            message.channel.send(msg);
        };
        
        msg.setDescription(`Command \`${prefix}${command.name}\` was reloaded!`);
        message.channel.send(msg);
    },
};