var fs = require('fs');
var path = require('path');

var require_objs = [];
var require_i = 0;
cmds = module.exports.commands = [];
var cmds_i = 0;
//for each plugin folder, open up and commit all js cmds into cmds array. aka consolodate commands.
function load_commands_from_plugins() {}
try {
	var plugin_folders = fs.readdirSync('./plugins');
}
catch(er) {
	console.log(er);
}
if(plugin_folders && plugin_folders.length != 0){

	for(var i = 0; i < plugin_folders.length; i++) {
		folder_path = path.join('./plugins', plugin_folders[i]);
		var folder = fs.statSync(folder_path);
		if(folder.isDirectory()) {
			//for every file in folder, check to find commands to add to cmd array.
			try{
				var plugin_folder = fs.readdirSync(folder_path);
			}
			catch(err) {
				console.log(err);
			}

			if(plugin_folder && plugin_folder.length != 0) {
				
				var len_folder = plugin_folder.length;
				for(var j = 0; j < len_folder; j++) {
					file_path = path.join(folder_path, plugin_folder[j]);

					//if its js file, and has commands, then load them.
					if(path.extname(file_path) === ".js") {
						var cmd = require('./' + file_path);
						if(cmd.commands && cmd.commands.length != 0){
							var len = cmd.commands.length;
							for(var k = 0; k < len; k++) {
								cmds.push(cmd.commands[k]);
							}
						}
					}
				}
			}
		}
	}
}
load_commands_from_plugins();
console.log("Plugins loaded.");

//executes given command, returns content from command, passes along args.
module.exports.do_command = function() {
	for(var i = 0; i < cmds.length; i++) {
		if(arguments[0] === cmds[i].command_name) {
			for(var j = 1; j < arguments.length; j++) {
				arguments[j-1] = arguments[j];
			}
			delete arguments[j];
			cmds[i].command_func.apply(this, arguments);
		}
	}
}
