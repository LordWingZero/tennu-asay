# tennu-asay

A more advanced say command for the [tennu](https://github.com/Tennu/tennu) IRC bot framework.

Optionally use [tennu-cooldown](https://github.com/LordWingZero/tennu-cooldown). Lets regular users run it every X seconds.

Important: If youre using [tennu-control](https://github.com/Tennu/tennu) you must use commang-ignore-list to disable tennu-control's say command. Example:

```Javascript
"command-ignore-list": [
    ["say", "control"]
],
```

### Features

- **Rainbow**: streatches the rainbow out to cover the whole sentence, doesnt color spaces.
- **Rainbow 2** : the default rainbow that comes with https://www.npmjs.com/package/irc-colors
- **Greentext** : Outputs text as 4chan style greentext.
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
 
### Todo:
- Tests
