# Custom Discord Moderator Bot

Hello this is my home-made Discord moderation bot. I started it to learn more about JavaScript and Discord.JS. I don't have it running on a server permanently, so don't add it to any servers unless you want a useless bot hanging around. 

## Commands

**1. Ban/Kick:** Pretty self-explanatory, these remove a user from the server and record the action and reason in the server's audit log. 
**2. Report:** Lets a user send a report to a servers moderation team in a channel called #reports. If this channel doesn't exist, one will be created the first time the command is issued (it will have no permission based restrictions, so set those as you want).  Also sends a DM to the user who uses the command confirming the report was sent. 
**3. Help:** Lists all available commands that the bot can use. It can also provide the user with command-specific information (usage, cooldowns, etc.) by using the command followed by another command name.  
**4. Prune:** Deletes text messages from a channel (max. 100 at a time; use -help prune for a list of aliases).
**5. Reload:** Reloads a command if it isn't working properly. 
**6. Embed:** Sends an embedded message to the text channel. Currently, the message must be customized directly in the _embed.js_ file, but I am working on making it more dynamic. 
**7. Ping:** Pings the bot and gets a response back. Can be used to test if bot is online.
**8. Role:** Gives a user a role. Cannot remove roles, but I am planning on implementing that as well. 
**9. Verify:** Gives users a verified role and removes temporary "_guest_" role given to them on server join. Basically a server verification system command.

## Files

#### bot.js
The bot logic is located in the ___bot.js___ file. Basically, it sorts out command calls from other messages and can filter explicit content from text channels. All the heavy lifting is done here. 

#### commands
This folder contains all the commands that the bot can use. These command files handle all the command-specific logic that each requires. 

#### package.json/package-lock.json
Standard _.json_ files that specify dependencies and the like. 

#### node_modules
All the modules needed to make the _.js_ files work, namely **Discord.JS** and a package called "__bad-words__" thats used to filter messages for explicit content. 
