import { Client } from 'discord.js';
import { token, prefix } from './config.json';

const client = new Client();

client.once('ready', () => {
    console.log('Bot online.');
});

client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    message.channel.send("Echo: " + message.toString());  
});

client.login(token);
