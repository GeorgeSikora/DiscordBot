
let player = {x: 0, y: 0};

const MAP_W = 17, MAP_H = 7;
let map = [MAP_W];

const Discord = require('discord.js');
const client = new Discord.Client();  

client.once('ready',() => {     
    for(var x = 0; x < MAP_W; x++) {
        map[x] = [MAP_H];
        for(var y = 0; y < MAP_H; y++) {
            map[x][y] = Math.random() > 0.5 ? 10 : 0;
        }   
    }
    player.x = Math.floor(MAP_W/2);
    player.y = Math.floor(MAP_H/2);

    console.log('Zucker je na planetě zemi'); 
}); 

client.on('message', message => {

    if (message.author.bot) return;

    var msg = message.content;

    // chars to lower case
    msg = msg.toLowerCase();
    console.log('lower case: ', msg);

    // remove repeating characters
    for (var i = msg.length-1; i >= 1; i--) {
        if (msg.charAt(i-1) == msg.charAt(i) && msg.length > 2)
            msg = msg.removeCharAt(i);
    }
    console.log('repeating removed: ', msg);

    // replace czech chars to clasic
    var out = '';
    for (var i = 0; i < msg.length; i++) {
        var c = msg.charAt(i);
        switch (c) {
            case 'ě': c = 'e'; break;
            case 'š': c = 's'; break;
            case 'č': c = 'c'; break;
            case 'ř': c = 'r'; break;
            case 'ž': c = 'z'; break;
            case 'ý': c = 'y'; break;
            case 'í': c = 'i'; break;
            case 'é': c = 'e'; break;
        }
        out += c;
    }
    msg = out;
    console.log('czech chars removed:', msg);

    for (var i = msg.length-1; i >= 0; i--) {
        var c = msg.charAt(i);
        if (!(c >= 'a' && c <= 'z') && !(c >= 'A' && c <= 'Z')) {
            msg = msg.removeCharAt(i);
        }
    }
    console.log('not allowed removed:', msg);
    

    switch(msg) {
        case 'xd':
            
            var randomID = Math.floor(Math.random() * 5);

            switch (randomID) {
                case 0: message.channel.send('<@' + message.author + '> něco k smíchu?'); break;
                case 1: message.channel.send('<@' + message.author + '> dneska jste nějaký vysmátý kolego :)'); break;
                case 2: message.channel.send('<@' + message.author + '> hahahaaa'); break;
                case 3: message.channel.send('<@' + message.author + '> až se za bčicho popadám'); break;
                case 4: message.channel.send('<@' + message.author + '> moooc vtipné'); break;
            }
            
            break;
        case 'nvm':
        case 'nwm':
        case 'nevim':
        case 'nevím':
        case 'netusim':
        case 'netuším':

            message.channel.send('<@' + message.author + '> a jako kdo to má vědět?');

            break;

        case 'ahoj':
        case 'ahojky':
        case 'ahojda':
        case 'cc':
        case 'cs':
        case 'cus':
        case 'cusek':
        case 'cjus':
        case 'cest':
        case 'dobry':
        case 'dobrý den':
        case 'dobry den':
        case 'hello':
        case 'nazdar':
        case 'te pero':
        case 'zdar':
        case 'zdur':

            greetUser(message);
            
            break;
        case 'a':
            player.x--;
            drawMap(message.channel);
            break;
        case 'd':
            player.x++;
            drawMap(message.channel);
            break;
        case 'w':
            player.y--;
            drawMap(message.channel);
            break;
        case 's':
            player.y++;
            drawMap(message.channel);
            break;
        case 'hrát':
            drawMap(message.channel);
            msg = '';
            msg += '```W: up\n';
            msg += 'A: left\n';
            msg += 'S: down\n';
            msg += 'D: right\n```';
            message.channel.send(msg);
            break;
    }
});

String.prototype.removeCharAt = function (i) {
    var tmp = this.split(''); // convert to an array
    tmp.splice(i - 1 , 1); // remove 1 element from the array (adjusting for non-zero-indexed counts)
    return tmp.join(''); // reconstruct the string
}


const greetMessages = [
    'zdravím tě kolego',
    'napijme se dumoviny',
    'taky tě zdravím! :)',
    'čus',
    'no nazdar',
    'no čeeest',
    'nazdaaar vole',
    'ahoj budulínku',
    'welcome there :d',
    'ahojky <3',
    'legenda se vrátila!',
];
function greetUser(message) {
    var randomID = Math.floor(Math.random() * greetMessages.length);
    message.channel.send('<@' + message.author + '> ' + greetMessages[randomID]);
}

function drawMap(channel) {
    var mapStr = '';

    mapStr += 'Biome: ';
    mapStr += ':regional_indicator_s:';
    mapStr += ':regional_indicator_p:';
    mapStr += ':regional_indicator_a:';
    mapStr += ':regional_indicator_w:';
    mapStr += ':regional_indicator_n:';
    mapStr += '\n';

    for(var y = 0; y < MAP_H; y++) {
        for(var x = 0; x < MAP_W; x++) {
            if(player.x == x && player.y == y) {
                mapStr += ':fencer:';
                continue;
            }

            switch(map[x][y]) {
                case 1:
                    mapStr += ':yellow_square:';
                    break;
                case 10:
                    mapStr += ':evergreen_tree:';
                    break;
                default:
                    mapStr += '      ';
                    break;
            }
        }   
        mapStr += '\n';
    }
    channel.send(mapStr);
}

client.login('Nzg3MDgxODA3NTg0NTU5MTI2.X9PxDg.ejklSgYkCcKybOlSu0AmwZtPTgk');