var c = require('irc-colors');

function toRainbow(targetStr) {
    // Rainbow order            
    var rainbowColorCodes = [c.red, c.olive, c.yellow, c.lime, c.cyan, c.blue, c.purple];
    var returnStr = '';

    var letterArray = [];
    var targetNoSpaces = targetStr.split(" ").join('');
    for (var i = 0; i < targetNoSpaces.length; i++) {
        letterArray.push((targetStr.length - i) % rainbowColorCodes.length);
    }
    
    letterArray.sort();

    var j = 0;
    for (var i = 0; i < targetStr.length; i++) {
        if (targetStr[i] !== " ") {
            returnStr += rainbowColorCodes[letterArray[j]](targetStr[i]);
            j++;
        } else {
            returnStr += " ";
        }
    }

    return returnStr;
}

module.exports = toRainbow;