import { PinkColor } from "@utils/embedEvents";
import { EmbedBuilder } from "discord.js";
import { Track, UnresolvedTrack } from "lavalink-client/dist/types";
import { InteractionEmbed } from "src/types";

/**
 * **addedToQueueEmbedPlay** คืออิมเบ็ตสำหรับแสดงข้อความว่าเพิ่มคิวเพลงใหม่แล้ว
 * 
 * @param embedData 
 * @param tracks 
 * @param tracksLength 
 * @returns 
 */
export default function addedToQueueEmbedPlay(embedData: InteractionEmbed, tracks: UnresolvedTrack | Track, tracksLength: number): EmbedBuilder {
    const { interaction, client } = embedData;

    return new EmbedBuilder()
        .setAuthor({ name: interaction.user.displayName, iconURL: interaction.user.displayAvatarURL() ?? '' })
        .setColor(PinkColor)
        .setDescription(`เพิ่มคิวเพลงใหม่แล้ว ${tracks.info.title} บนคิวที่ ${tracksLength}`)
        .setFooter({ text: client.user?.displayName as string, iconURL: client.user?.displayAvatarURL() ?? '' })
        .setTimestamp()
}