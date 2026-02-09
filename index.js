const { Client, GatewayIntentBits } = require('discord.js');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });
const genAI = new GoogleGenerativeAI(process.env.CHAVE_GEMINI);

client.on('messageCreate', async (message) => {
    if (message.author.bot) return;
        try {
                const model = genAI.getGenerativeModel({ model: "gemini-pro" });
                        const result = await model.generateContent(message.content);
                                const response = await result.response;
                                        message.reply(response.text());
                                            } catch (error) {
                                                    console.error(error);
                                                        }
                                                        });

                                                        client.login(process.env.TOKEN_DISCORD);
                                                        