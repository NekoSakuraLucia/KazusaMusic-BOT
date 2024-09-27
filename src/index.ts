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
import { KazusaClient, Command } from './types';

class KazusaMusicBot {
        private client: KazusaClient;

        constructor() {
                this.client = new Client({
                        intents: [
                                GatewayIntentBits.Guilds,
                                GatewayIntentBits.GuildMessages,
                                GatewayIntentBits.GuildVoiceStates,
                        ]
                }) as KazusaClient;

                this.client.commands = new Collection();
                KazusaLavaConfig(this.client);
                this.initializeEvents();
        }

        private initializeEvents(): void {
                this.client.on('raw', d => this.client.lavalink.sendRawData(d));

                this.client.once('ready', async () => {
                        await this.onReady();
                });

                KazusaInteraction(this.client);
                PlayerEvents(this.client);
                NodesEvents(this.client);
        }

        private async onReady(): Promise<void> {
                console.log(`${chalk.green(`[${chalk.white('KazusaMusic')}] -> [${chalk.white('INFO')}] -> ${chalk.magenta(`Logged in as ${this.client.user?.tag}`)}`)}`)
                this.client.lavalink.init({ ...this.client.user! });
                this.client.user?.setActivity('ไม่รู้จะเขียนอะไร', { type: ActivityType.Watching })

                const commands = await this.loadCommands();
                await this.registerCommands(commands);
        }

        private async loadCommands(): Promise<Command[]> {
                const commands: Command[] = [];
                const commandDir = path.join(__dirname, 'commands');
                const commandFiles = fse.readdirSync(commandDir).filter(file => file.endsWith('.js') || file.endsWith('.ts'));

                for (const file of commandFiles) {
                        try {
                                const command = require(path.join(commandDir, file));

                                if (command.data) {
                                        this.client.commands.set(command.data.name, command);
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
                return commands;
        }

        private async registerCommands(commands: Command[]): Promise<void> {
                const guildId: string = BOTConfig.guildId;
                const rest = new REST({ version: '10' }).setToken(BOTConfig.token);

                try {
                        await rest.put(
                                guildId ?
                                        Routes.applicationGuildCommands(this.client.user!.id, guildId) :
                                        Routes.applicationCommands(this.client.user!.id),
                                { body: commands },
                        );

                        console.log(chalk.green(`[${chalk.white('KazusaMusic')}] -> [${chalk.white('INFO')}] -> Loading All Commands Successfully !`));
                } catch (error) {
                        console.error(error);
                }
        }

        public login(): void {
                this.client.login(BOTConfig.token)
        }
}

const KazusaBot = new KazusaMusicBot();
KazusaBot.login();