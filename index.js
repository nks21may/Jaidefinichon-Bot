'use strict';

// Require the necessary discord.js classes
// const { Client, Intents } = require('discord.js');
const { token } = require('./config.json');
const Discord = require('discord.js');
const { getMeme, loadMoreLinks} = require('./scrap.js');

const client = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILDS] }); //create new client

const activeChannels = [];

// Create a new client instance
// const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// When the client is ready, run this code (only once)
client.once('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const { commandName, channelId } = interaction;
	const i = activeChannels.indexOf(channelId);

	switch (true) {
	case commandName === 'arrancajulian':
		if (activeChannels.indexOf(channelId) === -1) activeChannels.push(channelId);
		await interaction.reply('Bancanme 5 rufian.');
		break;
	case commandName === 'yamete':
		if (i > -1) activeChannels.splice(i, 1);
		await interaction.reply('Bue no te la bancas.');
		break;
	}
});

const sendAllMemes = async () => {
	if (activeChannels.length > 0) {
		const memeUrl = getMeme();
		activeChannels.forEach(channelId => client.channels.cache.get(channelId).send(memeUrl));
	}
};

setInterval(sendAllMemes, 30000);

loadMoreLinks();
// Login to Discord with your client's token
client.login(token);