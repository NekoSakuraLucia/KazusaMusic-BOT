import {
        GuildMember,
        SlashCommandBuilder
} from "discord.js";
import { Command } from "src/types";
import {
        JoinVoiceChannel,
        NotConnectVoice,
        NotPlaying,
        SameRoom
} from "@utils/embedEvents";

import { alreadyPausedEmbed, musicPauseEmbed, musicPauseErrorEmbed } from "@embeds/pause";

const data = new SlashCommandBuilder()
        .setName('pause').setDescription('หยุดเพลงชั่วคราว')

module.exports = {
        data: data,
        async execute(client, interaction) {
                try {
                        if (!interaction.guildId) return;

                        await interaction.deferReply();

                        const voiceId = (interaction.member as GuildMember).voice.channelId;
                        if (!voiceId) return interaction.editReply({ embeds: [JoinVoiceChannel] });

                        const player = client.lavalink.getPlayer(interaction.guildId);
                        if (!player) return interaction.editReply({ embeds: [NotConnectVoice] });
                        if (player.voiceChannelId !== voiceId) return interaction.editReply({ embeds: [SameRoom] });
                        if (!player.queue.current) return interaction.editReply({ embeds: [NotPlaying] });

                        if (!player.paused) {
                                try {
                                        await player.pause();
                                        await interaction.editReply({ embeds: [musicPauseEmbed({ interaction, client }, player.queue)] });
                                } catch (error) {
                                        console.error(error);
                                        return interaction.editReply({ embeds: [musicPauseErrorEmbed({ interaction, client }, player.queue)] });
                                }
                        } else {
                                await interaction.editReply({ embeds: [alreadyPausedEmbed({ interaction, client }, player.queue)] });
                        }
                } catch (error) {
                        console.error(error);
                }
        }
} as Command