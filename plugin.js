var parseArgs = require("minimist");
var Promise = require('bluebird');
var _ = require('lodash');
var textFormat = require('irc-formatters');
var c = require('irc-colors');
const helps = require('./help');

var TennuSay = {
    configDefaults: {
        "asay": {
            "greentextmax": 5
        },
    },
    init: function(client, imports) {

        var aSayConfig = client.config("asay");

        const channels = client.config("channels");
        const greentext = textFormat.greentext(aSayConfig.greentextmax);

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
                    return;
                }

                if (!_.isArray(messages)) {
                    messages = [messages];
                }

                if (_.some(messages, function(message) {
                        return (Buffer.byteLength(message, 'utf8') > 492);
                    })) {
                    return {
                        intent: 'notice',
                        query: true,
                        message: 'Max message length exceeded. Remeber, color codes add a ton of length your messages.'
                    };
                }

                return {
                    "target": target,
                    "message": messages
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
                "!sayr !rainbow": say(textFormat.rainbow),
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