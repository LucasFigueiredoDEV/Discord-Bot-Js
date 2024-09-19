'use strict'

import { ActivityType, Client, GatewayIntentBits, ReactionEmoji } from 'discord.js';
import { config } from 'dotenv';

// dotenv is require to use values from .env file
config();

const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

const prefix = '!';

// command list
const commandList = [
    'hello',
    'ping',
];

client.on('ready', () => {
    console.log(`Bot foi iniciado, com ${client.users.cache.size} usuários, ${client.channels.cache.size} canais, em ${client.guilds.cache.size} servidores.`);
    client.user.setActivity(`Conectado atualmente em ${client.guilds.cache.size} servidores😀.`, {type: ActivityType.Watching});
});

client.on('guildCreate', () => {
    console.log(`O bot entrou no servidor ${guild.name} (id: ${guild.id}). Membros: ${guild.membersCount} membros!`);
    client.user.setActivity(`Estou atualmente em ${client.guilds.cache.size} servidores.`,  {type: ActivityType.Watching});
});

client.on('guildDelete', guild => {
    console.log(`O bot foi removido do servidor: ${guild.name} (id: ${guild.id})`);
    client.user.setActivity(`Estou atualmente em ${client.guilds.cache.size} servidores.`, {type: ActivityType.Watching});
});

client.on('messageCreate', async (message) => {
    if(!message.content.startsWith(prefix) || message.author.bot || !message.guild){
        console.log(`[${Date.now()}] - ${message.author.username}: ${message.content}`)
        return;
    };
 
    // Verify if message content have in command list
    var command = '';
    for (let i = 0; i <= commandList.length - 1; i++){
        var size = commandList[i].length;
        // repair a function to verify command
        if (commandList.includes(message.content.slice(1, size+1))){
            command = message.content.slice(1, size+1);
        }
    }
    const commands = commandList.includes(command);
    console.log(command);
    
    console.log(`[${Date.now()}] - ${message.author.username}: ${message.content}`);

    if (commands) {
        // switch case to return a reponse of a command request existent in command list
        switch (command) {
            case "hello":
                await message.reply({content: 'hello world'})
                break;
            case "ping":
                const response = await message.channel.send('Ping?');
                response.edit(`Pong! A latência é de ${response.createdTimestamp - message.createdTimestamp}ms. A latência da API é de ${Math.round(client.ws.ping)}`)
                break;       
        }
    } else {
        await message.reply({content: 'Comando desconhecido pelo bot'});
    }
});

const token = process.env.TOKEN;

client.login(token);