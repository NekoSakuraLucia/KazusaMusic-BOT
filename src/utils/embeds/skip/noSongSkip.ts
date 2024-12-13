import { PinkColor } from "@utils/embedEvents";
import { EmbedBuilder } from "discord.js";
import { InteractionEmbed } from "src/types";

/**
 * 
 * @param embedData 
 * @returns 
 */
export default function noSongSkipEmbed(embedData: InteractionEmbed): EmbedBuilder {
    const { interaction, client } = embedData;

    return new EmbedBuilder()
        .setAuthor({ name: interaction.user.displayName, iconURL: interaction.user.displayAvatarURL() ?? '' })
        .setColor(PinkColor)
        .setDescription('**ไม่พบเพลงที่ต้องข้ามคิว !**')
        .setFooter({ text: client.user?.displayName as string, iconURL: client.user?.displayAvatarURL() ?? '' })
        .setTimestamp()
}