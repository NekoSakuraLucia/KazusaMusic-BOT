import { 
        EmbedBuilder, 
        GuildMember, 
        SlashCommandBuilder 
} from "discord.js";
import { Command } from "../types";
import { 
        JoinVoiceChannel, 
        NotConnectVoice, 
        NotPlaying, 
        PinkColor, 
        SameRoom 
} from "@utils/embedEvents";

const data = new SlashCommandBuilder()
        .setName('pause').setDescription('หยุดเพลงชั่วคราว')

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

                        await player.pause();

                        const embedMusicPause = new EmbedBuilder()
                                .setAuthor({ name: interaction.user.displayName, iconURL: interaction.user.displayAvatarURL() })
                                .setDescription('**ทำการหยุดเพลงชั่วคราวแล้วค่ะ หากต้องการเล่นเพลงต่อพิมพ์ /resume**')
                                .setColor(PinkColor)
                                .setTimestamp();

                        await interaction.editReply({ embeds: [embedMusicPause] })
                } catch (error) {
                        console.error(error)
                }
        }
} as Command