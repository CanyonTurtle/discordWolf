This is a discord bot that is meant to do math. This is intended to be a very light discord bot; just a test for me to familiarize with the api and learn a little.
run an npm install in the directory to use. 

To setup:
clone repo, run npm install inside. 
Now set up auth.JSON
It's easy! but you need your own app id for wolfram. So not that easy. :)

The way it works:
1. plugins are called to reference (each plugin gives an object with all of the plugin's commands and descriptions)
2. connection with dicord gateway via discord.io api is obtained.
3. commands from user are processed in sent info from gateway, and messages are sent back to the discord server, viewable by clients.

Files:
auth.json: contains auth keys to needed rescources. See example and create your own.
plugins: all of the bot functionality.
main.js: init connection with discord gateway and process commands. 	

How to add plugins:
make commands that will be accessable to the bot! simply 
include your dependancies in package.json, then
add your commands in the form of command objects, which look like this:

module.exports.commands[i] = {
	command_name: "blah",
	command_desc: "prints some jargon",
	command_func: readFile()
}

where i is 0 for first of your commands, 1 is next, ect... 
command_name is the name of your command to the users on discord,
command_desc shows what the command does,
and command_func is the function to run.

You can use arguements in command_func. a ref. to bot will always be passed as first arg. to allow messages to be sent.

foo = function(bot) {
	bot.msg("hello.");
}

