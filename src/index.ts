import { 
        ActivityType, 
        Client, 
        Collection, 
        GatewayIntentBits, 
        REST, 
        Routes 
} from 'discord.js';
import fse from 'fs-extra';
import path from 'path';
import chalk from 'chalk';
import { BOTConfig } from './config/config';
import { PlayerEvents } from './nodesEvents/Player';
import { NodesEvents } from './nodesEvents/Nodes';
import { KazusaLavaConfig } from './nodesEvents/KazusaConfig';
import { KazusaInteraction } from './utils/Interaction';
import { KazusaClient } from './types';

const client = new Client({
        intents: [
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.GuildVoiceStates,
        ]
}) as KazusaClient

KazusaLavaConfig(client);

client.commands = new Collection();

client.on('raw', d => client.lavalink.sendRawData(d));

client.once('ready', async () => {
        console.log(`${chalk.green(`[${chalk.white('KazusaMusic')}] -> [${chalk.white('INFO')}] -> ${chalk.magenta(`Logged in as ${client.user?.tag}`)}`)}`)
        client.lavalink.init({ ...client.user! });
        client.user?.setActivity('ไม่รู้จะเขียนอะไร', { type: ActivityType.Watching });

        const commands = [];
        const commandDir = path.join(__dirname, 'commands')
        const commandFiles = fse.readdirSync(commandDir).filter(file => file.endsWith('.js') || file.endsWith('.ts'));

        for (const file of commandFiles) {
                try {
                        const command = require(path.join(commandDir, file));

                        if (command.data) {
                                client.commands.set(command.data.name, command);
                                commands.push(command.data.toJSON());
                                console.log(chalk.green(`[${chalk.white('KazusaMusic')}] -> [${chalk.white('INFO')}] -> ${chalk.cyan(`Loading Slash Commands ${command.data.name} !`)}`));
                        } else {
                                console.log(chalk.green(`[${chalk.white('KazusaMusic')}] -> [${chalk.white('INFO')}] -> ${chalk.red(`Loading Slash Failed ${file}: Missing data property`)}`));
                        }
                } catch (error) {
                        console.error(`Error loading command ${file}: ${error}`);
                        console.log(chalk.green(`[${chalk.white('KazusaMusic')}] -> [${chalk.white('INFO')}] -> ${chalk.red(`Loading Slash Failed ${file}`)}`));
                }
        }

        const guildId: string = BOTConfig.guildId

        const rest = new REST({ version: '10' }).setToken(BOTConfig.token);

        try {
                await rest.put(
                        guildId ?
                                Routes.applicationGuildCommands(client.user!.id, guildId) :
                                Routes.applicationCommands(client.user!.id),
                        { body: commands },
                );

                console.log(chalk.green(`[${chalk.white('KazusaMusic')}] -> [${chalk.white('INFO')}] -> Loading All Commands Successfully !`));
        } catch (error) {
                console.error(error);
        }
});

KazusaInteraction(client);
PlayerEvents(client);
NodesEvents(client);

client.login(BOTConfig.token)
