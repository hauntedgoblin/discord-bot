module.exports = {
    name: 'prune',
    aliases: ['purge', 'remove', 'delete', 'cls'],
    description: 'Delete up to 100 messages in a channel.',
    usage: '<number between 1 and 100>',
    cooldown: 0,
    guildOnly: true,
    execute(message, args) {
            var amount = parseInt(args[0]);

            if (message.toString() === '!cls' && isNaN(amount)) {
                message.channel.bulkDelete(100,true);
            } else {
                if (isNaN(amount)) {
                    return message.reply('Enter a number of messages to remove.');
                } else if (amount < 1 || amount > 100) {
                    return message.reply('Number of messages to delete must not exceed 100.');
                } else {
                    if (amount === 100) {
                        message.channel.bulkDelete(amount, true).catch(err => {
                            console.error(err);
                            message.channel.send('Error deleting messages. ');
                        });
                    } else {
                        amount++;
                        message.channel.bulkDelete(amount, true).catch(err => {
                            console.error(err);
                            message.channel.send('Error deleting messages. ');
                        });
                    };
                };

            
            };
    },
};
