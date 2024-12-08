import { Client, EmbedBuilder, Interaction } from "discord.js";
import { PinkColor } from "../../embedEvents";
import { MusicTime } from "../../MusicTimeUtils";
import { Player, SearchResult, UnresolvedSearchResult } from "lavalink-client/dist/types";

/**
 * **musicPlayEmbed คืออิมเบ็ตสำหรับคำสั่งเล่นเพลงโดยเฉพาะ**
 * 
 * @param player 
 * @param search 
 * @param interaction 
 * @param client 
 * @returns 
 */
export function musicPlayEmbed(player: Player, search: SearchResult | UnresolvedSearchResult, interaction: Interaction, client: Client): EmbedBuilder {
    return new EmbedBuilder()
        .setAuthor({ name: interaction.user.displayName, iconURL: interaction.user.displayAvatarURL() ?? '' })
        .setTitle(player.queue.tracks[0] ? `**เพิ่มคิวเพลงแล้วจำนวน ${player.queue.tracks.length} คิว**` : null)
        .setDescription(
            search.loadType === 'playlist' ?
                `เพลย์ลิสต์เพลง: ${search.playlist?.title}\nจำนวนแทร็ก: ${search.tracks.length}` :
                search.loadType === 'track' ?
                    `เพลง: [${search.tracks[0].info.title}](<${search.tracks[0].info.uri}>)\nจำนวนเพลง: ${player.queue.tracks.length}` :
                    search.loadType === 'search' ?
                        `เพลง: [${search.tracks[0].info.title}](<${search.tracks[0].info.uri}>)\nจำนวนเพลง: ${player.queue.tracks.length}` :
                        search.loadType === 'error' ?
                            'เกิดข้อผิดพลาดระหว่างการค้นหาเพลง ลองอีกครั้งนะคะ' :
                            'แย่จังไม่พบข้อมูลเพลงที่คุณกำลังขอเลย..'
        )
        .setColor(PinkColor)
        .addFields(
            {
                name: '\`🎶\` **คิวทั้งหมด**',
                value: `**${player.queue.tracks.length}**`,
                inline: false
            },
            {
                name: '\`🎶\` **เจ้าของเพลง**',
                value: `**${search.tracks[0].info.author}**`,
                inline: true
            },
            {
                name: '\`🎶\` **ระยะเวลา**',
                value: `**${MusicTime(search.tracks[0].info.duration as number)}**`,
                inline: true
            },
            {
                name: '\`🎶\` **เล่นบนโหนด**',
                value: `**${player.node.id}**`,
                inline: true
            }
        )
        .setFooter({ text: client.user?.displayName as string, iconURL: client.user?.displayAvatarURL() ?? '' })
        .setTimestamp();
}