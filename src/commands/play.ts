import { Command } from "src/types";
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
} from "@utils/embedEvents";

import { addedToQueueEmbedPlay, musicPlayEmbed, noTracksFoundEmbedPlay, RegexPlayError } from "@embeds/play";

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

                        const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube|youtu|youtube-nocookie)\.(com|be)\/(watch\?v=|shorts\/|embed\/)[\w-]+/;
                        const soundcloudRegex = /^(https?:\/\/)?(www\.)?soundcloud\.com\/[\w-]+\/[\w-]+/;

                        // เช็คว่า song เป็น URL หรือไม่
                        let isUrl = false;
                        try {
                                new URL(song); // ถ้า song เป็น URL ที่ถูกต้อง จะไม่เกิด error
                                isUrl = true;
                        } catch (e) {
                                isUrl = false;
                        }

                        // ถ้าเป็น URL ให้ตรวจสอบว่าเป็นลิงก์จาก YouTube หรือ SoundCloud
                        if (isUrl) {
                                if (!youtubeRegex.test(song) && !soundcloudRegex.test(song)) {
                                        return interaction.editReply({ embeds: [RegexPlayError({ interaction, client }, song)] });
                                }
                        }

                        const search = await player.search({
                                query: song,
                                source: "scsearch"
                        }, interaction.user);

                        if (!search || !search.tracks.length) {
                                return interaction.editReply({ embeds: [noTracksFoundEmbedPlay({ interaction, client }, song)] });
                        }

                        const track = search.tracks[0]
                        await player.queue.add(track);

                        if (!player.playing) player.play();

                        if (player.queue.tracks.length > 0) {
                                await interaction.editReply({ embeds: [addedToQueueEmbedPlay({ interaction, client }, track, player.queue.tracks.length)] })
                        } else {
                                if (search.loadType === 'playlist' || search.loadType === 'track' || search.loadType === 'search') {
                                        const SelectFilters = new ActionRowBuilder<StringSelectMenuBuilder>()
                                                .addComponents(
                                                        new StringSelectMenuBuilder()
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
                                                                )
                                                );

                                        const FilterRowCheck = new ActionRowBuilder<ButtonBuilder>()
                                                .addComponents(
                                                        new ButtonBuilder()
                                                                .setCustomId('filters-check')
                                                                .setLabel('🎶 สถานะฟิลเตอร์')
                                                                .setStyle(ButtonStyle.Secondary)
                                                )

                                        await interaction.editReply({ embeds: [musicPlayEmbed(player, search, interaction, client)], components: [SelectFilters, FilterRowCheck] });
                                }
                        }

                        if (search.loadType === 'error') return interaction.editReply({ embeds: [SearchError] })
                } catch (error) {
                        console.error(error)
                }
        }
} as Command
