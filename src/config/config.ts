import dotenv from 'dotenv';
dotenv.config();

export const BOTConfig = {
    token: process.env.BOT_TOKEN as string,
    bot_client_id: process.env.BOT_CLIENT_ID as string,
    bot_username: process.env.BOT_USERNAME as string,
    guildId: process.env.GUILD_ID as string,
    nodes: [
        {
            authorization: '',
            hostname: '',
            port: 3000,
            id: 'KazusaTest',
        },
    ],
};
