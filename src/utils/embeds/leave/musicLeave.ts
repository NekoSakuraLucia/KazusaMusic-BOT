import { PinkColor } from "@utils/embedEvents";
import { EmbedBuilder } from "discord.js";
import { InteractionEmbed } from "src/types";

/**
 * 
 * @param embedData 
 * @returns 
 */
export default function musicLeaveEmbed(embedData: InteractionEmbed): EmbedBuilder {
    const { interaction, client } = embedData;

    return new EmbedBuilder()
        .setAuthor({ name: interaction.user.displayName, iconURL: interaction.user.displayAvatarURL() ?? '' })
        .setDescription('**ออกจากห้องเสียงแล้ว หากต้องการเล่นเพลงอีกครั้งสามารถสั่งหนูได้เลยนะคะ**')
        .setColor(PinkColor)
        .setFooter({ text: client.user?.displayName as string, iconURL: client.user?.displayAvatarURL() ?? '' })
        .setTimestamp();
}