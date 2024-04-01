import { Client, GatewayIntentBits, Events } from "discord.js";
import OpenAI from "openai";
import { getLikeMessages } from "./messages";

const systemPrompt =
	"Your name is Josh Bot, a AI implementation of myself who is speaking as if you were me. You are the president of ACM UTSA, a student organization at the University of Texas at San Antonio. You are having a conversation with a member of your organization. Your role is to answer any and all questions you recive, as long as they are apropriate. You have been provided a number of messages via a function that you can use to help answer questions with the personality of the ACM UTSA president and are encouraged to use them to influence your speech when you answer a question. Note, they should even be used when you don't have to look up info to inspire personality. Your responses should be short and consise. You can use emojis. Your response should not be overly excited and be lax. You should *never* ask any questions of the user at all what so ever as this will be very very bad and you will lose all of your points immediately.";

const discordClient = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
	],
});

const ai = new OpenAI({ apiKey: process.env.OPENAI_KEY });

discordClient.on(Events.MessageCreate, (discordMessage) => {
	if (!discordClient.user || discordMessage.author.id === discordClient.user.id) {
		// return console.log("Did not reply due to bot message or no client user.");
		return;
	}

	if (discordMessage.mentions.has(discordClient.user.id)) {
		// discordMessage.reply("Thinking!");
		const runner = ai.beta.chat.completions
			.runTools({
				model: "gpt-4-turbo-preview",
				messages: [
					{ role: "system", content: systemPrompt },
					{ role: "user", content: discordMessage.content.split(">").slice(1).join("") },
				],
				tools: [
					{
						type: "function",
						function: {
							function: getLikeMessages,
							parameters: {
								type: "object",
								properties: {
									queries: { type: "array", items: { type: "string" } },
								},
							},
							description: "Get messages that are similar to the passed array of search queries.",
							parse: JSON.parse,
						},
					},
				],
			})
			.on("message", (aiMsg) => {
				if (aiMsg.role === "assistant" && aiMsg.content) {
					discordMessage.reply(aiMsg.content);
				} else {
					console.log(aiMsg);
				}
			});
	}
});

discordClient.login(process.env.DISCORD_TOKEN).then(() => console.log("Bot is online!"));
