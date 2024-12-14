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

import { musicResumeEmbed, alreadyResumeEmbed, musicResumeErrorEmbed } from "@embeds/resume";

const data = new SlashCommandBuilder()
        .setName('resume').setDescription('เล่นเพลงต่อหลังจากหยุดชั่วคราว')

module.exports = {
        data: data,
        async execute(client, interaction) {
                try {
                        if (!interaction.guildId) return;

                        await interaction.deferReply();

                        const voiceId = (interaction.member as GuildMember).voice.channelId;
                        if (!voiceId) return interaction.editReply({ embeds: [JoinVoiceChannel({ interaction, client })] });

                        const player = client.lavalink.getPlayer(interaction.guildId);
                        if (!player) return interaction.editReply({ embeds: [NotConnectVoice({ interaction, client })] });
                        if (player.voiceChannelId !== voiceId) return interaction.editReply({ embeds: [SameRoom({ interaction, client })] });
                        if (!player.queue.current) return interaction.editReply({ embeds: [NotPlaying({ interaction, client })] });

                        if (player.paused) {
                                try {
                                        await player.resume();
                                        await interaction.editReply({ embeds: [musicResumeEmbed({ interaction, client }, player.queue)] })
                                } catch (error) {
                                        console.error(error);
                                        await interaction.editReply({ embeds: [musicResumeErrorEmbed({ interaction, client }, player.queue)] })
                                }
                        } else {
                                await interaction.editReply({ embeds: [alreadyResumeEmbed({ interaction, client }, player.queue)] });
                        }
                } catch (error) {
                        console.error(error)
                }
        }
} as Command
