import { Command } from "src/types";
import {
        SlashCommandBuilder,
        GuildMember,
        EmbedBuilder
} from "discord.js";
import {
        JoinVoiceChannel,
        NotConnectVoice,
        NotPlaying,
        PinkColor,
        SameRoom
} from "@utils/embedEvents";

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

                        const embedMusicLeave = new EmbedBuilder()
                                .setAuthor({ name: interaction.user.displayName, iconURL: interaction.user.displayAvatarURL() ?? '' }).setDescription('**ออกจากห้องเสียงแล้ว หากต้องการเล่นเพลงอีกครั้งสามารถสั่งหนูได้เลยนะคะ**').setColor(PinkColor).setTimestamp();

                        await interaction.editReply({ embeds: [embedMusicLeave] });
                } catch (error) {
                        console.error(error)
                }
        }
} as Command
