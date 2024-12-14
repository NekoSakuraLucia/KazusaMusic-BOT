import { Command } from "src/types";
import {
        SlashCommandBuilder,
        GuildMember
} from "discord.js";
import {
        JoinVoiceChannel,
        NotConnectVoice,
        NotPlaying,
        SameRoom
} from "@utils/embedEvents";

import { musicLeaveEmbed } from "@embeds/leave";

const data = new SlashCommandBuilder()
        .setName('leave').setDescription('ทำลายเพลงและออกจากห้องเสียง')

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

                        await player.destroy();

                        await interaction.editReply({ embeds: [musicLeaveEmbed({ interaction, client })] });
                } catch (error) {
                        console.error(error)
                }
        }
} as Command
