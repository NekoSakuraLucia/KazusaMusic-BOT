import { Command } from "../types";
import { 
        SlashCommandBuilder,
        CommandInteractionOptionResolver,
        GuildMember,
        EmbedBuilder 
} from "discord.js";
import { 
        JoinVoiceChannel, 
        NotConnectVoice,
        NotPlaying, 
        PinkColor,
        SameRoom 
} from "../utils/embedEvents";

const data = new SlashCommandBuilder()
        .setName('filters').setDescription('ฟิลเตอร์สำหรับเพลง')
        .addStringOption(o => o.setName('เลือก').setDescription('เลือกฟิลเตอร์สำหรับเพลง').addChoices(
                { name: 'Clear (ล้างฟิลเตอร์ทั้งหมด)', value: 'clear' },
                { name: 'Nightcore', value: 'nightcore' },
                { name: 'Karaoke', value: 'karaoke' }
        ).setRequired(true))

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

                        if (!player.queue.current) return interaction.editReply({ embeds: [NotPlaying] })

                        let response = "";

                        const selectFilters = (interaction.options as CommandInteractionOptionResolver).getString('เลือก');

                        switch (selectFilters) {
                                case 'clear':
                                        await player.filterManager.resetFilters();
                                        response = 'ปิดใช้งานฟิลเตอร์ทั้งหมดแล้วค่ะ';
                                        break;
                                case 'nightcore':
                                        await player.filterManager.toggleNightcore();
                                        response = player.filterManager.filters.nightcore ? 'เปิดการใช้งาน Nightcore แล้วค่ะ หากเปิด Karaoke อยู่แนะนำให้ปิดนะคะ !' : 'ปิดการใช้งาน Nightcore แล้วค่ะ'
                                        break;
                                case 'karaoke':
                                        await player.filterManager.toggleKaraoke();
                                        response = player.filterManager.filters.karaoke ? 'เปิดการใช้งาน Karaoke แล้วค่ะ หากเปิด Nightcore อยู่แนะนำให้ปิดนะคะ' : 'ปิดการใช้งาน Karaoke แล้วค่ะ'
                                        break;
                        }

                        const embedMusicFilters = new EmbedBuilder()
                                .setAuthor({ name: interaction.user.displayName, iconURL: interaction.user.displayAvatarURL() ?? '' })
                                .setDescription(`**${response}**`)
                                .setColor(PinkColor)
                                .setTimestamp();

                        await interaction.editReply({
                                embeds: [embedMusicFilters]
                        });
                } catch (error) {
                        console.error(error)
                }
        }
} as Command
