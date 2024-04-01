import Fuse from "fuse.js";

export const messages = [
	{
		context:
			"We'll just see what all the hype is about (Plus I kind want to use Copilot there, Spyder doesn't have a relevant extension that I know of)",
		response: "Have you been using Spider? 😭",
	},
	{
		context: "Well... I'm installing VS Code",
		response: "As you should Sean (not sponsored by Microsoft)",
	},
	{
		context: null,
		response: "Happy π Day! 🎉",
	},
	{
		context: "ACM hangout night at Round1?",
		response: "@Paolo || Social Officer thoughts? 👀",
	},
	{
		context: "How can I invite someone to the discord?",
		response: "They can go to https://discord.acmutsa.org/",
	},
	{
		context: "I saw the mention of an open house, but I’ll unfortunately be working at that time",
		response: "No worries. It’s also going to be streamed and recorded on YouTube!",
	},
	{
		context: "it wouldnt be back to school at UTSA without AirRowdy being wonky 😩",
		response: "Frrr, guess we’re just not sending emails today 🥲",
	},
	{
		context: null,
		response: "Imagine having classes on Tuesday",
	},
	{
		context: "Mornin",
		response: "Mornin 🤠 How we doin?",
	},
	{
		context: null,
		response:
			"Rabbit sells out 10,000 units of its R1 pocket AI companion in one day - The Verge https://www.theverge.com/2024/1/10/24033498/rabbit-r1-sold-out-ces-ai",
	},
	{
		context: "Your boy is TAing for calculus 2 again whaaaaaa",
		response: "Let’s gooo They need you Sean",
	},
	{
		context: "wen eta acm esports team",
		response:
			"I’ll have to bring it up at the next meeting 😂 Roadrunner gaming is not gonna be happy with us 💀",
	},
	{
		context: null,
		response:
			"Postman made a mobile game 💀 https://apps.apple.com/us/app/postman-api-first-journey/id6470000113",
	},
	{
		context: "Rowdydatathon",
		response:
			"Planning will probably start later in the semester, as I don’t think we have a director for next year yet. Roni did a phenomenal job the last two years, but she is graduating! We definitely will have a datathon in the Fall though",
	},
	{
		context: null,
		response:
			"Tesla to offer package that turns Cybertruck into an actual boat | Electrek https://electrek.co/2023/12/18/tesla-package-turns-cybertruck-into-boat/ Who even asked them to do this?😭",
	},
	{
		context: "web3 talk these days are embers of the crypto scams of 2020/2021",
		response:
			"I mean I figured it was mostly BS so I never looked into it. I just think it’s crazy that this idea of a financial revolution through crypto currency become such a mainstream topic for a while. And somehow that was supposed to impact the way we browse the web? Never made sense to me",
	},
	{
		context: "web3",
		response:
			"Guys can someone please explain to me how the average person is expected to interact with Web3 on a daily basis? 😭 Like I still don’t get why it matters to regular consumers.",
	},
	{
		context: null,
		response: "Nevermind guys, we're purging all other channels and keeping ⁠🔢counting 🤣",
	},
	{
		context: "advent of code",
		response:
			"Def check it out. Kinda hard to jump in on day 18 but it's usually pretty fun https://adventofcode.com/",
	},
	{
		context: "dont you have anything else to do",
		response: "Making the officer meeting agenda atm 😭",
	},
	{
		context:
			"that was actually insane tho because you ended up at #1 from me and anusha competing against each other",
		response: "It's called strat 🤷‍♂️",
	},
	{
		context: "It wasn't toooo bad, but I'm hoping I can move to the second assessment",
		response: "Good luck man 🤞",
	},
	{
		context: " maybe put a small Jeopardy thing on my github",
		response: "Nice! Gotta make that commit calendar look nice and pretty",
	},
	{
		context: "It isn't open source 😡",
		response:
			"And? As a MacOS user, I'm no stranger to closed software systems. As such, you can imagine that I'm actually a quite fond of them",
	},
	{
		context: "arc",
		response: "ARC ON WINDOWS ARC ON WINDOWS ARC ON WINDOWS 🗣️🔊",
	},
	{
		context: "I made my first rust program yesterday I’m on my way to learning",
		response: "So proud 🥹",
	},
	{
		context: "rust",
		response: "Yesssssss. I’m Rustacean for life ❤️",
	},
	{
		context: null,
		response:
			"Wait they grew so fast. They quadrupled the amount of topics they have in like 6 months. That's insane 🤯",
	},
	{
		context: null,
		response: "Good luck to ever on their finals this week!! 🙏🤞",
	},
	{
		context:
			"Hey everyone, I found this git repo of underclassmen internships if anyone is looking to apply: https://github.com/codicate/underclassmen-internships",
		response: "🔥 resource",
	},
	{
		context: "counting",
		response:
			"Guys I’m scared. This is the second server where the counting bot did not count my number 😖",
	},
	{
		context: "Hey would there be enough meetings for me to make up 5 points?",
		response:
			"We should have at least five more events worth one point each. If you did attend a meeting and the check-in closed on you, talk to the director of that event and they can add your check-in manually!",
	},
	{
		context: "also not using full words? Sir what happened",
		response: "I’m sick and I’m tired. But most of all, I’m sick and tired!",
	},
	{
		context: null,
		response: "Ummmmm what the fick",
	},
	{
		context: "josh hush it.",
		response: "I didn't even say anything 😭",
	},
	{
		context:
			"wow, so glad no one here would do that! like imagine if everyone kept saying it was morning when it was evening",
		response: "Liam please stop gaslighting",
	},
	{
		context: "flex",
		response: "https://youtu.be/r6tH55syq0o",
	},
	{
		context: "corn",
		response: "🌽",
	},
	{
		context: null,
		response: "I could feel my pupils dilating when I scrolled across that screenshot",
	},
];

interface GetLikeMessagesParameters {
	queries: string[];
}

export const getLikeMessages = ({ queries }: GetLikeMessagesParameters) => {
	console.log("doing look up with queries", queries);
	const finalResult = new Set<(typeof messages)[number]>();
	const fuse = new Fuse(messages, {
		keys: ["context", "response"],
	});
	for (const prompt of queries) {
		const promptResult = fuse.search(prompt);
		for (const { item } of promptResult) {
			finalResult.add(item);
		}
	}
	console.log("result of lookup", Array.from(finalResult));
	return Array.from(finalResult);
};
