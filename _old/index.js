require('dotenv').config()
const Discord = require('discord.js')
const client = new Discord.Client()

const config = require('./config.json')

const welcome = require('./commands/welcome')
const track = require('./commands/track')

client.on('ready', async () => {
    console.log('The client is ready!')

    track(client)
    welcome(client)
})

//client.login(process.env.DISCORD_BOT_TOKEN)
client.login(config.token)
