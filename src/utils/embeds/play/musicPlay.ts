import { EmbedBuilder } from 'discord.js';
import { PinkColor } from '@utils/embedEvents';
import { MusicTime } from '@utils/MusicTimeUtils';
import {
    Player,
    SearchResult,
    UnresolvedSearchResult,
} from 'lavalink-client/dist/types';
import type { InteractionEmbed } from 'src/types';

/**
 * **musicPlayEmbed คืออิมเบ็ตสำหรับคำสั่งเล่นเพลงโดยเฉพาะ**
 *
 * @param player
 * @param search
 * @param interaction
 * @param client
 * @returns
 */
export default function musicPlayEmbed(
    embedData: InteractionEmbed,
    player: Player,
    search: SearchResult | UnresolvedSearchResult
): EmbedBuilder {
    const { interaction, client } = embedData;

    return new EmbedBuilder()
        .setAuthor({
            name: interaction.user.displayName,
            iconURL: interaction.user.displayAvatarURL() ?? '',
        })
        .setDescription(
            search.loadType === 'playlist'
                ? `เพลย์ลิสต์เพลง: ${search.playlist?.title}\nจำนวนแทร็ก: ${search.tracks.length}`
                : search.loadType === 'track'
                ? `เพลง: [${search.tracks[0].info.title}](<${search.tracks[0].info.uri}>)\nจำนวนเพลง: ${player.queue.tracks.length}`
                : search.loadType === 'search'
                ? `เพลง: [${search.tracks[0].info.title}](<${search.tracks[0].info.uri}>)\nจำนวนเพลง: ${player.queue.tracks.length}`
                : search.loadType === 'error'
                ? 'เกิดข้อผิดพลาดระหว่างการค้นหาเพลง ลองอีกครั้งนะคะ'
                : 'แย่จังไม่พบข้อมูลเพลงที่คุณกำลังขอเลย..'
        )
        .setColor(PinkColor)
        .addFields(
            {
                name: '`🎶` **คิวทั้งหมด**',
                value: `**${player.queue.tracks.length}**`,
                inline: false,
            },
            {
                name: '`🎶` **เจ้าของเพลง**',
                value: `**${search.tracks[0].info.author}**`,
                inline: true,
            },
            {
                name: '`🎶` **ระยะเวลา**',
                value: `**${MusicTime(
                    search.tracks[0].info.duration as number
                )}**`,
                inline: true,
            },
            {
                name: '`🎶` **เล่นบนโหนด**',
                value: `**${player.node.id}**`,
                inline: true,
            }
        )
        .setThumbnail(search.tracks[0].info.artworkUrl ?? '')
        .setFooter({
            text: client.user?.displayName as string,
            iconURL: client.user?.displayAvatarURL() ?? '',
        })
        .setTimestamp();
}
