import { 
        CommandInteractionOptionResolver, 
        EmbedBuilder, 
        GuildMember, 
        SlashCommandBuilder 
} from "discord.js";
import { Command } from "../types";
import { MusicTime } from "../utils/MusicTimeUtils";
import { 
        JoinVoiceChannel, 
        NotConnectVoice, 
        NotPlaying, 
        PinkColor, 
        SameRoom 
} from "../utils/embedEvents";

const data = new SlashCommandBuilder()
        .setName('seek').setDescription('กรอเพลงไปยังเวลาปัจจุบัน')
        .addIntegerOption(o => o.setName('เวลา').setDescription('ป้อนเวลาเป็น วินาที เพื่อกรอเพลง').setRequired(true))

module.exports = {
        data: data,
        async execute(client, interaction) {
                try {
                        if (!interaction.guildId) return;

                        await interaction.deferReply();

                        const voiceId = (interaction.member as GuildMember).voice.channelId
                        if (!voiceId) return interaction.editReply({ embeds: [JoinVoiceChannel] })

                        const player = client.lavalink.getPlayer(interaction.guildId);
                        if (!player) return interaction.editReply({ embeds: [NotConnectVoice] });
                        if (player.voiceChannelId !== voiceId) return interaction.editReply({ embeds: [SameRoom] })
                        if (!player.queue.current) return interaction.editReply({ embeds: [NotPlaying] })

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
                        })

                        await player.seek(time);

                        const EmbedMusicSeek = new EmbedBuilder()
                                .setAuthor({ name: interaction.user.displayName, iconURL: interaction.user.displayAvatarURL() ?? '' }).setTitle('กรอเวลาเพลง').setDescription(`ทำการกรอเวลาไปยัง: **${MusicTime(player.position)}** แล้วค่ะ !`).setColor(PinkColor).setTimestamp();

                        await interaction.editReply({ embeds: [EmbedMusicSeek] })
                } catch (error) {
                        console.error(error)
                }
        }
} as Command
