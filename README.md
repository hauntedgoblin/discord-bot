# Custom Discord Moderator Bot

Hello this is my homemade Discord moderation bot! Feel free to take a look at the ReadMe and the source code. Feel free to reach out to me on Discord (Cameron#2466) with any questions and I will get back to you as soon as possible! :)

## Commands

**Ban/Kick:** Pretty self-explanatory, these remove a user from the server and record the action and reason in the server's audit log.  
**Mute:** Server-mutes a user for a number of minutes, meaning they cannot use text or voice communications until the _muted_ role is removed at the end of the specified time.  
**Report:** Lets a user send a report to a servers moderation team in a channel called #reports. If this channel doesn't exist, one will be created the first time the command is issued (it will have no permission based restrictions, so set those as you want).  Also sends a DM to the user who uses the command confirming the report was sent.  
**Help:** Lists all available commands that the bot can use. It can also provide the user with command-specific information (usage, cooldowns, etc.) by using the command followed by another command name.   
**Prune:** Deletes text messages from a channel (max. 100 at a time; use -help prune for a list of aliases).
**Reload:** Reloads a command if it isn't working properly.  
**Embed:** Sends an embedded message to the text channel. Currently, the message must be customized directly in the _embed.js_ file, but I am working on making it more dynamic.  
**Ping:** Pings the bot and gets a response back. Can be used to test if bot is online.  
**Role:** Gives or takes a role from a user.  
**Verify:** Gives users a verified role and removes temporary "_guest_" role given to them on server join. Basically a server verification system command.  

## Files  

#### bot.js
The bot logic is located in the ___bot.js___ file. Basically, it sorts out command calls from other messages and can filter explicit content from text channels. All the heavy lifting is done here.  

#### commands
This folder contains all the commands that the bot can use. These command files handle all the command-specific logic that each requires.  

#### package.json/package-lock.json
Standard _.json_ files that specify dependencies and the like.  

#### node_modules
All the modules needed to make the _.js_ files work, namely **Discord.JS** and a package called "__bad-words__" thats used to filter messages for explicit content.  


## Add bot link
***Link:*** https://discordapp.com/oauth2/authorize?client_id=726143386356154448&scope=bot&permissions=2146958847  
