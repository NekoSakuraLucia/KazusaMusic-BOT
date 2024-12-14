import {
        SlashCommandBuilder,
        CommandInteractionOptionResolver,
        GuildMember,
} from "discord.js";
import { Command } from "src/types";
import {
        JoinVoiceChannel,
        NotConnectVoice,
        SameRoom
} from "@utils/embedEvents";

import { noSongSkipEmbed, musicSkipEmbed } from "@embeds/skip";

const data = new SlashCommandBuilder()
        .setName('skip').setDescription('ข้ามไปยังเพลงถัดไป')
        .addIntegerOption(o => o.setName('ข้ามคิว').setDescription('ข้ามไปยังคิวเพลงอื่น').setRequired(false))

module.exports = {
        data: data,
        async execute(client, interaction) {
                try {
                        if (!interaction.guildId) return;

                        await interaction.deferReply();

                        const voiceId = (interaction.member as GuildMember).voice.channelId;
                        const player = client.lavalink.getPlayer(interaction.guildId);
                        if (!player) return interaction.editReply({ embeds: [NotConnectVoice({ interaction, client })] });
                        if (!voiceId) return interaction.editReply({ embeds: [JoinVoiceChannel({ interaction, client })] });
                        if (player.voiceChannelId !== voiceId) return interaction.editReply({ embeds: [SameRoom({ interaction, client })] });

                        if (!player.queue.tracks[0]) return interaction.editReply({ embeds: [noSongSkipEmbed({ interaction, client })] });

                        await player.skip((interaction.options as CommandInteractionOptionResolver).getInteger('ข้ามคิว') || 0);

                        await interaction.editReply({
                                embeds: [musicSkipEmbed({ interaction, client }, player.queue)]
                        });
                } catch (error) {
                        console.error(error)
                }
        }
} as Command
