const { SlashCommandBuilder, EmbedBuilder  } = require('discord.js');
const axios = require('axios');
const puppeteer = require('puppeteer');
const { apiKey } = require('../config.json');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('wishsroster')
		.setDescription('Update roster\'s wishs'),
	async execute(interaction) {

		
		async function getRoster() {
			const response = await axios.get('https://wowaudit.com/v1/characters', {
			headers: {
				'authorization': apiKey
			}
			});
			return response.data
		
		}

		let roster =  getRoster()

		const embed = new EmbedBuilder()
			.setColor(0x0099FF)
			.setTitle('Roster Exitium')
			.setDescription('Mise à jour des wishslists')
			.setThumbnail('https://i.imgur.com/AfFp7pu.png')
			.setTimestamp();

		await interaction.reply({embeds: [embed]});


		roster.then(function(result) {
			

			// (async () => {
			// 	const browser = await puppeteer.launch();
			// 	const page = await browser.newPage();
			// 	await page.goto('https://www.raidbots.com/simbot/droptimizer');
			// 	await page.screenshot({path: 'example.png'});
			  
			// 	await browser.close();
			//   })();

			result.forEach(element => {
				embed.addFields({name: element.name, value: ':white_check_mark:'});
				interaction.editReply({embeds: [embed]});
			});
			return embed;

		})

	},
	
};
