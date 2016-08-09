fs = require('fs');
client = require('node-wolfram');
async = require('async');
//on loadup, read api key, then use it to query website for command.
compute_expression = function(bot, exp) {
	var ans = "";
	//console.log(arguments);
	try{
		data = fs.readFileSync('auth.json', 'utf8');
		var json_data = JSON.parse(data);
		api_key = json_data.wolfram_api_key;
		//console.log('api key for wolfram: ' + api_key);
		Wolfram = new client(api_key);
		Wolfram.query(exp, function(err, result) {
				if(err)
					return console.log (err);
				for(var a=0; a<result.queryresult.pod.length; a++){
		            var pod = result.queryresult.pod[a];
		            ans += '\n' + pod.$.title + ": ";
		            for(var b=0; b<pod.subpod.length; b++)
		            {
		                var subpod = pod.subpod[b];
		                for(var c=0; c<subpod.plaintext.length; c++)
		                {
		                    var text = subpod.plaintext[c];
		                    ans += '\t' + text;
		                }
		            }
		            
	    		}
	    		//console.log("done.");
	    		//console.log(ans);
	    		bot.msg(ans);
		});
	}
	catch (err){
		//console.log('error');
		console.log(err);
	}
		
}

module.exports.commands = [];

module.exports.commands[0] = {
	command_name: 'speak',
	command_desc: 'speaks a word',
	command_func: function () {
		console.log('speak');
	}
}

module.exports.commands[1] = {
	command_name: 'wolfram',
	command_desc: 'Solve all your math problems! ex: !wolfram x + 243 = 4',
	command_func: function() {
		//console.log(arguments);
		compute_expression.apply(this, arguments);
	}
}
