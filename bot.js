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

const token = process.env.TOKEN;
const prefix = '!';

const commandList = [
    'hello',
    'ping'
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

    const commands = commandList.includes(message.content.slice(1));
    var command = message.content.slice(1);
    
    console.log(`[${Date.now()}] - ${message.author.username}: ${message.content}`);


    if (commands) {
        switch (command) {
            case "hello":
                await message.reply({content: 'hello world'})
                break;
            case "ping":
                await message.reply()
        }
    } else {
        await message.reply({content: 'Comando desconhecido pelo bot'});
    }
});

client.login(token);