var c = require('irc-colors');

function buildGreentext(greentextmax) {
    return function(text) {
        
        var choppedText = text.split('/');
        if (choppedText.length > greentextmax) {
            return {
                intent: 'notice',
                query: true,
                message: 'Max greentext is ' + greentextmax
            };
        }
        
        var responseMsg = choppedText.map(function(text) {
            return c.green('> ' + text.trim());
        });
        
        return responseMsg;
    }
}

module.exports = buildGreentext;