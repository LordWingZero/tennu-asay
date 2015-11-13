# tennu-asay 2.0.0

A more advanced say command for the tennu IRC bot framework.

### Features

- **Rainbow**: streatches the rainbow out to cover the whole sentence, doesnt color spaces. ![Image of !rainbow](http://s24.postimg.org/twpx2w6kl/1232342.png)
- **Rainbow 2** : the default rainbow that comes with https://www.npmjs.com/package/irc-colors ![Image of !rainbow2](http://s27.postimg.org/931gwdrdv/2015_11_09_14_46_04_2_successreactor_Game_Su.png)
- **Greentext** : Outputs text as 4chan style greentext.![Image of !greentext](http://i.imgur.com/GtdtEQb.jpg)
- **Channel** : Lets you specify a channel. It is important to note, that if you PM the bot !say and DO NOT epscify a channel, the bot will sent the say command to the first channel defined in the tennu config array.

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
 
### License

            DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
                    Version 2, December 2004

 Copyright (C) 2015 Victorio Berra

 Everyone is permitted to copy and distribute verbatim or modified
 copies of this license document, and changing it is allowed as long
 as the name is changed.

            DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
   TERMS AND CONDITIONS FOR COPYING, DISTRIBUTION AND MODIFICATION

  0. You just DO WHAT THE FUCK YOU WANT TO.
