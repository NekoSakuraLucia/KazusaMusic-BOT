import { ChatInputCommandInteraction, Client, Collection, CommandInteraction, Interaction, SlashCommandBuilder } from "discord.js";
import { LavalinkManager } from "lavalink-client/dist/types";

declare type InteractionExecute = (client: KazusaClient, interaction: ChatInputCommandInteraction<"cached">) => Promise<void> | void;

export interface Command {
        data: SlashCommandBuilder;
        execute: InteractionExecute;
};

export interface KazusaClient extends Client {
        lavalink: LavalinkManager;
        commands: Collection<string, any>
};

export interface InteractionEmbed {
        interaction: Interaction;
        client: Client
};