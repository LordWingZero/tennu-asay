# tennu-asay

A more advanced say command for the [tennu](https://github.com/Tennu/tennu) IRC bot framework.

Important: If youre using [tennu-control](https://github.com/Tennu/tennu) you must use commang-ignore-list to disable tennu-control's say command. Example:

```Javascript
"command-ignore-list": [
    ["say", "control"]
],
```

### Features

- **Rainbow**: streatches the rainbow out to cover the whole sentence, doesnt color spaces. ![Image of !rainbow](http://s24.postimg.org/twpx2w6kl/1232342.png)
- **Rainbow 2** : the default rainbow that comes with https://www.npmjs.com/package/irc-colors ![Image of !rainbow2](http://s27.postimg.org/931gwdrdv/2015_11_09_14_46_04_2_successreactor_Game_Su.png)
- **Greentext** : Outputs text as 4chan style greentext.![Image of !greentext](http://i.imgur.com/GtdtEQb.jpg)
- **Channel** : Lets you specify a channel. It is important to note, that if you PM the bot !say and DO NOT epscify a channel, the bot will send the say to every single channel defined in the tennu config array.
- **say** : Regular say command

### Configuration

```javascript
"say": {
    "greentextmax": 5,
},
```

- **greentextmax**: The max amount of messages that is allowed for greentext. ```!greentext 1/2/3/4/5```


### Installation

See Downloadable Plugins here https://tennu.github.io/plugins/

### Plugins
Requires [admin](https://tennu.github.io/plugins/admin).
 This is compatible with [tennu-admin-cooldown](https://github.com/LordWingZero/tennu-admin-cooldown). Install the cooldown plugin to let regular users run it every X seconds.
 
### Todo:
- Tests
