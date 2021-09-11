'use strict';

// Require the necessary discord.js classes
// const { Client, Intents } = require('discord.js');
const { token } = require('./config.json');

const Discord = require('discord.js'); //import discord.js
const { MessageActionRow, MessageButton } = require('discord.js');

const client = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILDS] }); //create new client


// Create a new client instance
// const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// When the client is ready, run this code (only once)
client.once('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
});


client.on('message', function(msg) {
	console.log(msg);
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const { commandName } = interaction;
	if (commandName === 'nico') {
		const row = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId('primary')
					.setLabel('Primary')
					.setStyle('PRIMARY'),
			);
			
		await interaction.reply({ content: 'Pong!', components: [row] });
	} else if (commandName === 'server') {
		await interaction.reply('Server info.');
	} else if (commandName === 'user') {
		await interaction.reply('User info.');
	}
});

const enviarCoso = () => {
	const channel = client.channels.cache.get("886093464608071702");
	channel.send("https://jaidefinichon.com/wp-content/uploads/2021/09/FB_IMG_1631163853166.jpg");
};


setInterval(enviarCoso, 35000);


// Login to Discord with your client's token
client.login(token);