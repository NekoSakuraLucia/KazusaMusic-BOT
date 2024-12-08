import { KazusaClient } from "src/types";
import chalk from 'chalk';

export function NodesEvents(client: KazusaClient) {
        client.lavalink.nodeManager.on('connect', (node) => {
                console.log(chalk.green(`[${chalk.white(`KazusaMusic`)}] -> [${chalk.white('NODES')}] -> ${chalk.magenta(`${node.id} connected!`)}`))
        }).on('disconnect', (node) => {
                console.log(chalk.green(`[${chalk.white('KazusaMusic')}] -> [${chalk.white('NODES')}] -> ${chalk.magenta(`${node.id} disconected!`)}`))
        }).on('reconnecting', (node) => {
                console.log(chalk.green(`[${chalk.white('KazusaMusic')}] -> [${chalk.white('NODES')}] -> ${chalk.magenta(`${node.id} reconnecting!`)}`))
        })
}