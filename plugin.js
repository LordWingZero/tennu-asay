var parseArgs = require("minimist"),
    Promise = require('bluebird'),
    toRainbow = require('./rainbow'),
    greentextBuilder = require('./greentext'),
    c = require('irc-colors');

// Will not change if 2 instances of tennu launched
const helps = {
    "rainbow": [
        "{{!}}rainbow [-c=#channel] <message1/message2/message3>",
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

    "say": [
        "{{!}}say [-c=#channel] <message>",
        "Says something to the channel.",
        "Modifiers:",
        "-c=#channel"
    ]
};

var TennuSay = {
    configDefaults: {
        "asay": {
            "greentextmax": 5
        },
    },
    init: function(client, imports) {

        var aSayConfig = client.config("asay");

        const channels = client.config("channels");
        const greentext = greentextBuilder(aSayConfig.greentextmax);

        var minimistConfig = {
            string: ['channel'],
            alias: {
                'channel': ['c'],
            }
        };

        function say(messageParser) {
            return function(command) {

                var sayArgs = parseArgs(command.args, minimistConfig);
                var target = getTarget(sayArgs, command.channel);

                var rawMessage = sayArgs._.join(' ');
                var messages = messageParser(rawMessage);

                // Private message with no channel specified goes out to everyone
                if (command.isQuery && !sayArgs.channel) {
                    Promise.each(channels, function(channel) {
                        client.say(channel, messages);
                    });
                }
                else {
                    return {
                        "target": target,
                        "message": messages
                    }
                }

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

        function adminFail(err) {
            return {
                intent: 'notice',
                query: true,
                message: err
            };
        }

        return {
            handlers: {
                "!sayr !rainbow": say(toRainbow),
                "!sayr2 !rainbow2": say(c.rainbow),
                "!sayg !greentext": say(greentext),
                "!say": say(function(text) {
                    return text;
                })
            },
            commands: ["rainbow", "rainbow2", "greentext", "say"],
            help: {
                "rainbow": helps.rainbow,
                "sayr": helps.rainbow,
                "rainbow2": helps.rainbow2,
                "sayr2": helps.rainbow2,
                "greentext": helps.greentext,
                "sayg": helps.greentext,
                "say": helps.say
            }
        };

    }
};

module.exports = TennuSay;