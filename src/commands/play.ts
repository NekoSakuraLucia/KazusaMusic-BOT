import { Command } from "../types";
import {
        SlashCommandBuilder,
        CommandInteractionOptionResolver,
        GuildMember,
        StringSelectMenuBuilder,
        ActionRowBuilder,
        StringSelectMenuOptionBuilder,
        ButtonBuilder,
        ButtonStyle
} from "discord.js";
import { 
        JoinVoiceChannel, 
        SearchError 
} from "../utils/embedEvents";

import { musicPlayEmbed, noTracksFoundEmbedPlay } from "../utils/embeds/play";

const data = new SlashCommandBuilder()
        .setName('play').setDescription('สั่งให้บอทเล่นเพลง')
        .addStringOption(o => o.setName('song').setDescription('ป้อน URL เพื่อเล่นเพลง').setRequired(true))

module.exports = {
        data: data,
        async execute(client, interaction) {
                try {
                        if (!interaction.guildId) return;

                        await interaction.deferReply();

                        const voiceId = (interaction.member as GuildMember).voice.channelId
                        if (!voiceId) return interaction.editReply({ embeds: [JoinVoiceChannel] })

                        const player = client.lavalink.createPlayer({
                                guildId: interaction.guildId,
                                voiceChannelId: voiceId,
                                textChannelId: interaction.channelId,
                                selfDeaf: true,
                                selfMute: false,
                                volume: 100
                        });

                        await player.connect();

                        const song = ((interaction.options as CommandInteractionOptionResolver).getString('song') as string);

                        const search = await player.search({
                                query: song
                        }, interaction.user);

                        if (!search || !search.tracks.length) {
                                return interaction.editReply({ embeds: [noTracksFoundEmbedPlay({ interaction, client }, song)] });
                        }

                        await player.queue.add(search.tracks[0]);

                        if (!player.playing) player.play();

                        if (search.loadType === 'playlist' || search.loadType === 'track' || search.loadType === 'search') {
                                const Filters = new StringSelectMenuBuilder()
                                        .setCustomId('filters')
                                        .setPlaceholder('เลือกฟิลเตอร์เพลง')
                                        .addOptions(
                                                new StringSelectMenuOptionBuilder()
                                                        .setLabel('Clear Filters (ล้างฟิลเตอร์ทั้งหมด)')
                                                        .setDescription('ล้างฟิลเตอร์ทั้งหมดที่คุณเปิดไม่ว่าจะเป็นตัวไหนก็ตาม')
                                                        .setValue('clear'),
                                                new StringSelectMenuOptionBuilder()
                                                        .setLabel('🎶 Nightcore')
                                                        .setDescription('ปรับให้เพลงเร็ว และ เสียงร้องแหลมขึ้น')
                                                        .setValue('nightcore'),
                                                new StringSelectMenuOptionBuilder()
                                                        .setLabel('🎶 Karaoke')
                                                        .setDescription('ตัดเสียงร้องของเพลงออก เหลือแค่ดนตรี')
                                                        .setValue('karaoke')
                                        );
                                const SelectFilters = new ActionRowBuilder<StringSelectMenuBuilder>()
                                        .addComponents(Filters);

                                const FilterRowCheck = new ActionRowBuilder<ButtonBuilder>()
                                        .addComponents(
                                                new ButtonBuilder()
                                                        .setCustomId('filters-check')
                                                        .setLabel('🎶 สถานะฟิลเตอร์')
                                                        .setStyle(ButtonStyle.Secondary)
                                        )

                                await interaction.editReply({ embeds: [musicPlayEmbed(player, search, interaction, client)], components: [SelectFilters, FilterRowCheck] });

                                return;
                        }

                        if (search.loadType === 'error') return interaction.editReply({ embeds: [SearchError] })
                } catch (error) {
                        console.error(error)
                }
        }
} as Command
