import { PinkColor } from "@utils/embedEvents";
import { EmbedBuilder } from "discord.js";
import { Queue } from "lavalink-client/dist/types";
import { InteractionEmbed } from "src/types";

/**
 * 
 * @param embedData 
 * @param song 
 * @returns 
 */
export default function musicPauseEmbed(embedData: InteractionEmbed, song: Queue): EmbedBuilder {
    const { interaction, client } = embedData

    return new EmbedBuilder()
        .setAuthor({ name: interaction.user.displayName, iconURL: interaction.user.displayAvatarURL() ?? '' })
        .setColor(PinkColor)
        .setDescription(`เพลง:・${song.current?.info.title} ได้ถูกหยุดชั่วคราวแล้ว`)
        .setFooter({ text: client.user?.displayName as string, iconURL: client.user?.displayAvatarURL() ?? '' })
        .setTimestamp()
}