import { 
        SlashCommandBuilder,
        CommandInteractionOptionResolver,
        GuildMember,
        EmbedBuilder 
} from "discord.js";
import { Command } from "../types";
import { 
        JoinVoiceChannel, 
        NextTrack,
        NotConnectVoice, 
        PinkColor,
        SameRoom 
} from "@utils/embedEvents";

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
                        if (!player) return interaction.editReply({ embeds: [NotConnectVoice] });
                        if (!voiceId) return interaction.editReply({ embeds: [JoinVoiceChannel] });
                        if (player.voiceChannelId !== voiceId) return interaction.editReply({ embeds: [SameRoom] })

                        const currentTrack = player.queue.current;
                        const nextTrack = player.queue.tracks[0];

                        if (!nextTrack) return interaction.editReply({ embeds: [NextTrack] });

                        await player.skip((interaction.options as CommandInteractionOptionResolver).getInteger('ข้ามคิว') || 0);

                        const embedMusicSkip = new EmbedBuilder()
                                .setAuthor({ name: interaction.user.displayName, iconURL: interaction.user.displayAvatarURL() ?? '' })
                                .setDescription(
                                        currentTrack ?
                                                `**ข้ามเพลงแล้ว ${currentTrack.info.title} ไปยัง ${nextTrack.info.title}**`
                                                : `**ข้ามคิวแล้ว ${nextTrack.info.title}**`,
                                )
                                .setColor(PinkColor)
                                .setTimestamp();

                        await interaction.editReply({
                                embeds: [embedMusicSkip]
                        })
                } catch (error) {
                        console.error(error)
                }
        }
} as Command
