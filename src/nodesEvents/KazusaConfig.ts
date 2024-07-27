import { KazusaClient } from "../types";
import { LavalinkManager } from "lavalink-client";
import { BOTConfig } from "../config/config";

export function KazusaLavaConfig(client: KazusaClient) {
        client.lavalink = new LavalinkManager({
                nodes: [
                        {
                                authorization: BOTConfig.nodes.authorization,
                                host: BOTConfig.nodes.hostname,
                                port: BOTConfig.nodes.port,
                                id: BOTConfig.nodes.id
                        }
                ],
                sendToShard: (guildId, payload) =>
                        client.guilds.cache.get(guildId)?.shard?.send(payload),
                client: {
                        id: BOTConfig.bot_client_id,
                        username: BOTConfig.bot_username,
                },
                autoSkip: true,
                playerOptions: {
                        clientBasedPositionUpdateInterval: 150,
                        defaultSearchPlatform: 'ytsearch',
                        volumeDecrementer: 0.75,
                        onDisconnect: {
                                autoReconnect: false,
                                destroyPlayer: true,
                        },
                        onEmptyQueue: {
                                destroyAfterMs: 30_000,
                        }
                },
                queueOptions: {
                        maxPreviousTracks: 25
                },
        });
}