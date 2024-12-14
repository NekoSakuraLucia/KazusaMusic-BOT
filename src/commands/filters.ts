import { Command } from "src/types";
import {
        SlashCommandBuilder,
        CommandInteractionOptionResolver,
        GuildMember
} from "discord.js";
import {
        JoinVoiceChannel,
        NotConnectVoice,
        NotPlaying,
        SameRoom
} from "@utils/embedEvents";
import { musicFilterEmbed } from "@embeds/filters";

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
                        if (!player) return interaction.editReply({ embeds: [NotConnectVoice({ interaction, client })] });
                        if (!voiceId) return interaction.editReply({ embeds: [JoinVoiceChannel({ interaction, client })] });
                        if (player.voiceChannelId !== voiceId) return interaction.editReply({ embeds: [SameRoom({ interaction, client })] });

                        if (!player.queue.current) return interaction.editReply({ embeds: [NotPlaying({ interaction, client })] });

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

                        await interaction.editReply({
                                embeds: [musicFilterEmbed({ interaction, client }, response)]
                        });
                } catch (error) {
                        console.error(error)
                }
        }
} as Command
