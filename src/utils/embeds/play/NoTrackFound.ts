import { EmbedBuilder } from "discord.js";
import { PinkColor } from "../../embedEvents";
import { InteractionEmbed } from "../../../types";

export function noTracksFoundEmbedPlay(embedData: InteractionEmbed, song: string): EmbedBuilder {
    const { interaction, client } = embedData

    return new EmbedBuilder()
        .setAuthor({ name: interaction.user.displayName, iconURL: interaction.user.displayAvatarURL() ?? '' })
        .setColor(PinkColor)
        .setDescription(`ไม่พบเพลงที่คุณกำลังค้นหา:・${song}`)
        .setFooter({ text: client.user?.displayName as string, iconURL: client.user?.displayAvatarURL() ?? '' })
        .setTimestamp()
}