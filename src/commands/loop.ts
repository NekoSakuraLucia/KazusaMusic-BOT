import {
        CommandInteractionOptionResolver,
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

import { musicLoopEmbed } from "@embeds/loop";

const data = new SlashCommandBuilder()
        .setName('loop').setDescription('วนเพลงซ้ำหลายรอบ')
        .addStringOption(o => o.setName('โหมด').setDescription('เลือกโหมดสำหรับการลูป').addChoices(
                { name: 'Track (วนเพลงเดียว)', value: 'track' },
                { name: 'Queue (วนคิวเพลง)', value: 'queue' },
                { name: 'None (ปิดการลูปทั้งหมด)', value: 'off' }
        ).setRequired(true))

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

                        await player.setRepeatMode((interaction.options as CommandInteractionOptionResolver).getString('โหมด') as "off" | "track" | "queue");

                        await interaction.editReply({ embeds: [musicLoopEmbed({ interaction, client }, player)] });
                } catch (error) {
                        console.error(error)
                }
        }
} as Command