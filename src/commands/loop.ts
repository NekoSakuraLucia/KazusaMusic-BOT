import { CommandInteractionOptionResolver, EmbedBuilder, GuildMember, SlashCommandBuilder } from "discord.js";
import { Command } from "src/types";
import { JoinVoiceChannel, NotConnectVoice, NotPlaying, PinkColor, SameRoom } from "@utils/embedEvents";

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
                        if (!voiceId) return interaction.editReply({ embeds: [JoinVoiceChannel] });

                        const player = client.lavalink.getPlayer(interaction.guildId);
                        if (!player) return interaction.editReply({ embeds: [NotConnectVoice] });
                        if (player.voiceChannelId !== voiceId) return interaction.editReply({ embeds: [SameRoom] });
                        if (!player.queue.current) return interaction.editReply({ embeds: [NotPlaying] });

                        await player.setRepeatMode((interaction.options as CommandInteractionOptionResolver).getString('โหมด') as "off" | "track" | "queue");

                        const embedMusicLoop = new EmbedBuilder()
                                .setAuthor({ name: interaction.user.displayName, iconURL: interaction.user.displayAvatarURL() ?? '' }).setDescription(`**เปิดการใช้งานลูป ${player.repeatMode} แล้วค่ะ**`).setColor(PinkColor).setTimestamp();

                        await interaction.editReply({ embeds: [embedMusicLoop] });
                } catch (error) {
                        console.error(error)
                }
        }
} as Command