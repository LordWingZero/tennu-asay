var parseArgs = require('minimist'),
promiseP      = require('bluebird'),
toRainbow     = require('./rainbow'),
c             = require('irc-colors');

var TennuSay = {
    requiresRoles: ["admin"],
    init: function (client, imports) {
        
        var adminCooldown = client._plugins.getRole("admin-cooldown");
        
        var requiresAdminHelp = "Requires admin privileges.";        
        const channels = client.config("channels");
        
        var isAdmin = imports.admin.isAdmin;
        if(adminCooldown)
        {
            var cooldown = client.config("say").cooldown;
            isAdmin = adminCooldown.isAdmin;
            requiresAdminHelp = "You must wait " + cooldown + " seconds between running this command.";
        }
        
        return {
            handlers: {
                "!asay": function(command){
                    return isAdmin(command.hostmask, "say").then(function(isadmin){
                        
                        if(!isadmin)
                        {
                            // Should I log this?
                            return {
                                intent: 'notice',
                                query: true,
                                message: requiresAdminHelp
                            };                            
                        }
                        
                        var sayArgs = parseArgs(command.args, {
                            string: ['channel'],
                            boolean: [
                                'rainbow',
                                'crainbow',
                                'greentext',
                                'act'
                             ],
                            alias: {
                                'channel': ['c'],
                                'rainbow': ['r'],
                                'crainbow': ['w'],
                                'greentext': ['g'],
                                'act': ['a']
                            }
                        });
                        
                        if(sayArgs.rainbow && sayArgs.greentext)
                        {
                            return {
                                target: command.nickname,
                                intent: 'notice',
                                query: true,
                                message: 'Please specify only one modifier for !say.'                                
                            };
                        }
                        
                        var target = '';
                        if(sayArgs.channel)
                        {
                            target = sayArgs.channel;
                        } else {
                            target = command.channel;
                        }
                        
                        var speakDeligate = 'say';
                        if(sayArgs.act)
                        {
                            speakDeligate = 'act';
                        }
                        
                        var responseMessage = sayArgs._.join(' ');
                        
                        if(sayArgs.rainbow)
                        {
                            responseMessage = toRainbow(responseMessage);
                        }
                         
                        if(sayArgs.crainbow)
                        {
                            responseMessage = c.rainbow(responseMessage);
                        }
                        
                        if(sayArgs.greentext)
                        {
                            var choppedText = sayArgs._.join(' ').split('/');
                            var greentextmax = client.config("say").greentextmax;
                            if(choppedText.length > greentextmax)
                            {
                                return {
                                    target: command.nickname,
                                    intent: 'notice',
                                    query: true,
                                    message: 'Max greentext is ' + greentextmax                                
                                };
                            }
                            var responseMsg = choppedText.map(function(text){
                                return c.green('> ' + text.trim());
                            });
                            responseMessage = responseMsg;
                        }
                        
                        // Private message with no channel specified goes out to everyone
                        if (command.isQuery && !sayArgs.channel) {
                            return Promise.each(channels, function(channel){
                                speakDeligate(channel, responseMessage);
                            });
                        }
                        
                        client[speakDeligate](target, responseMessage);                        
                        
                    });
                }
            },
            commands: ["asay"],
            help: {
                "asay": [
                    "{{!}}asay [-c=#channel] [-<crwga>] <message>",
                    requiresAdminHelp,
                    "Says something to the channel.",
                    "Modifiers:",
                    "-c=#channel",
                    "-a : act",
                    "-r : rainbow",
                    "-w : rainbow algorithm 2",
                    "-g : greentext",
                ],
            }
        };
        
    }
};

module.exports = TennuSay;