var parseArgs = require("minimist"),
    promise = require('bluebird'),
    toRainbow = require('./rainbow'),
    greentextBuilder = require('./greentext'),
    c = require('irc-colors');

// Will not change if 2 instances of tennu launched
const helps = {
    "rainbow": [
        "{{!}}rainbow [-c=#channel] <message>",
        "Says something to the channel in spread out rainbow text.",
        "Modifiers:",
        "-c=#channel",
        "Aliases: {{!}}sayr"
    ],

    "rainbow2": [
        "{{!}}rainbow2 [-c=#channel] <message>",
        "Says something to the channel in rainbow text.",
        "Modifiers:",
        "-c=#channel",
        "Aliases: {{!}}sayr2"
    ],

    "greentext": [
        "{{!}}greentext [-c=#channel] <message>",
        "Says something to the channel in 4chan style green quote-text.",
        "Modifiers:",
        "-c=#channel",
        "Aliases: {{!}}sayg"
    ],
};

var TennuSay = {
    requiresRoles: ["admin"],
    init: function(client, imports) {

        var adminCooldown = client._plugins.getRole("admin-cooldown");

        var requiresAdminHelp = "Requires admin privileges.";
        const channels = client.config("channels");
        const greentext = greentextBuilder(client.config("say").greentextmax);

        var isAdmin = imports.admin.isAdmin;
        if (adminCooldown) {
            var cooldown = client.config("say").cooldown;
            isAdmin = adminCooldown.isAdmin;
        }

        var minimistConfig = {
            string: ['channel'],
            alias: {
                'channel': ['c'],
            }
        };

        function say(messageParser) {
            return function(command) {
                return isAdmin(command.hostmask, "say").then(function(isadmin) {

                    if (!isadmin) {
                        client._logger.warn('Unauthorized host `' + command.prefix + '` attempted command: `' + command.message + '`');
                        return {
                            intent: 'notice',
                            query: true,
                            message: requiresAdminHelp
                        };
                    }

                    var sayArgs = parseArgs(command.args, minimistConfig);
                    var target = getTarget(sayArgs, command.channel);
                    var rawMessage = sayArgs._.join(' ');

                    var messages = messageParser(rawMessage);

                    // If the message parser returned an object, than we return it
                    if (typeof(messages) === "object") {
                        return messages;
                    }

                    // Private message with no channel specified goes out to everyone
                    if (command.isQuery && !sayArgs.channel) {
                        return Promise.each(channels, function(channel) {
                            return {
                                "target": channel,
                                "message": messages
                            }
                        });
                    }

                    return {
                        "target": target,
                        "message": messages
                    }
                });
            }
        }

        function getTarget(sayArgs, channel) {
            if (sayArgs.channel) {
                return sayArgs.channel;
            }
            else {
                return channel;
            }
        }

        return {
            handlers: {
                "!sayr !rainbow": say(toRainbow),
                "!sayr2 !rainbow2": say(c.rainbow),
                "!sayg !greentext": say(greentext)
            },
            commands: ["rainbow", "rainbow2", "greentext"],
            help: {
                "rainbow" : helps.rainbow,
                "sayr" : helps.rainbow,
                "rainbow2" : helps.rainbow2,
                "sayr2" : helps.rainbow2,
                "greentext" : helps.greentext,
                "sayg" : helps.greentext
            }
        };

    }
};

module.exports = TennuSay;