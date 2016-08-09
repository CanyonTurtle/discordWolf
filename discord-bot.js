var plugins = require('./plugin_manager.js');
var Discord = require('discord.js');
var fs = require('fs');
var bot = new Discord.Client();
var ch;

bot.msg = function(msg) {
	bot.sendMessage(ch, msg);
}

bot.show_descriptions = function() {
	var str = "Commands with descriptions:" + '\n';
	for(var i = 0; i < bot.plugins.commands.length; i++) {
		str += ('\t' + "!" + bot.plugins.commands[i].command_name + " : " + bot.plugins.commands[i].command_desc + '\n');
	}
	bot.msg(str);
}

bot.plugins = plugins;
//plugins.do_command('wolfram', bot, "2+2");

var auth_info = JSON.parse(fs.readFileSync('./auth.JSON'));
bot.on('ready', function() {
	console.log('ready');
	ch = bot.servers.get("name", "DVHS Robotics").channels.get("name", "general");
});

bot.on('message', function(message) {
	var m = ("" + message);
	if(m.substring(0,5) === "!help") {
		bot.show_descriptions();
	}
	
	if(m.substring(0,1) === "!") {
		var c = 1;
		if(m.charAt(c) != " ") {
			c++;
			while(c < m.length) {
				if(m.charAt(c) === " "){
					console.log('doing command: '+ m.substring(1, c));
					bot.plugins.do_command(m.substring(1, c), bot, m.substring(++c, m.length));
					c = m.length;
				} else {
					c++;
				}
			}
		}
	}

	
})
bot.loginWithToken(auth_info.token);

