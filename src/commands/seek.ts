import {
        CommandInteractionOptionResolver,
        EmbedBuilder,
        GuildMember,
        SlashCommandBuilder
} from "discord.js";
import { Command } from "src/types";
import { MusicTime } from "@utils/MusicTimeUtils";
import {
        JoinVoiceChannel,
        NotConnectVoice,
        NotPlaying,
        SameRoom
} from "@utils/embedEvents";
import { musicSeekEmbed } from "@embeds/seek";

const data = new SlashCommandBuilder()
        .setName('seek').setDescription('กรอเพลงไปยังเวลาปัจจุบัน')
        .addIntegerOption(o => o.setName('เวลา').setDescription('ป้อนเวลาเป็น วินาที เพื่อกรอเพลง').setRequired(true))

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

                        const TimeEmbed = new EmbedBuilder()
                                .setAuthor({ name: interaction.user.displayName, iconURL: interaction.user.displayAvatarURL() ?? '' })
                                .setTitle('กรอเวลาเพลง')
                                .setDescription(`แย่จัง เวลาที่คุณจะกรอมันเกินเวลาจริงของเพลงน่ะสิ 
                                ${Math.floor(player.queue.current.info.duration / 1000)} วินาที | 
                                เวลาเพลงจริง ${MusicTime(player.queue.current.info.duration)} ลองใหม่อีกทีนะ`)
                                .setColor('#F472B6')

                        const time = ((interaction.options as CommandInteractionOptionResolver).getInteger('เวลา') as number) * 1000;
                        if (time > player.queue.current.info.duration || time < 0) return interaction.editReply({
                                embeds: [TimeEmbed]
                        });

                        await player.seek(time);

                        await interaction.editReply({ embeds: [musicSeekEmbed({ interaction, client }, player)] });
                } catch (error) {
                        console.error(error)
                }
        }
} as Command
