const { SlashCommandBuilder } = require('discord.js');
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
		roster.then(function(result) {
			

			(async () => {
				const browser = await puppeteer.launch();
				const page = await browser.newPage();
				await page.goto('https://www.raidbots.com/simbot/droptimizer');
				await page.screenshot({path: 'example.png'});
			  
				await browser.close();
			  })();

			// result.forEach(element => {
			// 	console.log(element);
			// });
			

		})
		await interaction.reply('Job done!');
	},
	
};
