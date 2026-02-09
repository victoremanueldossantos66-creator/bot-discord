const { Client, GatewayIntentBits } = require('discord.js');
const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

// Configuração do Bot do Discord
const client = new Client({
  intents: [
      GatewayIntentBits.Guilds,
          GatewayIntentBits.GuildMessages,
              GatewayIntentBits.MessageContent
                ]
                });

                // Configuração da IA (Gemini)
                const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
                const model = genAI.getGenerativeModel({ model: "gemini-pro" });

                client.once('ready', () => {
                  console.log(`✅ IA online como: ${client.user.tag}`);
                  });

                  client.on('messageCreate', async (message) => {
                    // Ignora mensagens do próprio bot ou se não começar com '!ia'
                      if (message.author.bot || !message.content.startsWith('!ia')) return;

                        const prompt = message.content.slice(4).trim(); // Remove o '!ia '
                          
                            if (!prompt) return message.reply("Manda uma pergunta depois do !ia!");

                              try {
                                  // Mostra que o bot está "digitando..."
                                      await message.channel.sendTyping();

                                          const result = await model.generateContent(prompt);
                                              const response = await result.response;
                                                  const text = response.text();

                                                      // O Discord tem limite de 2000 caracteres por mensagem
                                                          if (text.length > 2000) {
                                                                  message.reply(text.substring(0, 1900) + "...");
                                                                      } else {
                                                                              message.reply(text);
                                                                                  }

                                                                                    } catch (error) {
                                                                                        console.error("Erro na IA:", error);
                                                                                            message.reply("Ops, deu um erro aqui na minha cabeça virtual. 🤯");
                                                                                              }
                                                                                              });

                                                                                              client.login(process.env.DISCORD_TOKEN);
                                                                                              