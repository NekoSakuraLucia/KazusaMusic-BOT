import { KazusaClient } from "../types";
import chalk from 'chalk';

export function PlayerEvents(client: KazusaClient) {
        client.lavalink.on('trackStart', (player, track) => {
                console.log(chalk.green(`[${chalk.white('KazusaMusic')}] -> [${chalk.white('MUSIC')}] -> [${chalk.white('Music Started')}] -> ${chalk.magenta(`${track?.info.title}`)} -> [${chalk.white('Guilds')}] -> ${chalk.magenta(player.guildId)} -> [${chalk.white('Volume')}] -> ${chalk.cyan(`${player.volume}%`)}`))
        }).on('trackEnd', (player, track) => {
                console.log(chalk.green(`[${chalk.white('KazusaMusic')}] -> [${chalk.white('MUSIC')}] -> [${chalk.white('Music Ended')}] -> ${chalk.magenta(`${track?.info.title}`)} -> [${chalk.white('Guilds')}] -> ${chalk.magenta(player.guildId)}`))
        }).on('trackError', (player, track) => {
                console.log(chalk.green(`[${chalk.white('KazusaMusic')}] -> [${chalk.white('MUSIC')}] -> [${chalk.white('Music Error')}] -> ${chalk.red(`${track?.info?.title}`)} -> [${chalk.white('Guilds')}] -> ${chalk.magenta(player.guildId)}`))
        }).on('trackStuck', (player, track) => {
                console.log(chalk.green(`[${chalk.white('KazusaMusic')}] -> [${chalk.white('MUSIC')}] -> [${chalk.white('Music Stuck')}] -> ${chalk.yellow(`${track?.info?.title}`)} -> [${chalk.white('Guilds')}] -> ${chalk.magenta(player.guildId)}`))
        }).on('queueEnd', (player, track) => {
                console.log(chalk.green(`[${chalk.white('KazusaMusic')}] -> [${chalk.white('MUSIC')}] -> [${chalk.white('Music QueueEnd')}] -> ${chalk.yellow(`${track?.info?.title}`)} -> [${chalk.white('Guilds')}] -> ${chalk.magenta(player.guildId)}`))
        })
}