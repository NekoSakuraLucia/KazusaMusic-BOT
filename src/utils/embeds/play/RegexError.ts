import { PinkColor } from '@utils/embedEvents';
import { EmbedBuilder } from 'discord.js';
import type { InteractionEmbed } from 'src/types';

/**
 *
 * @param embedData
 * @param link
 * @returns
 */
export default function RegexPlayError(
    embedData: InteractionEmbed,
    link: string
): EmbedBuilder {
    const { interaction, client } = embedData;

    return new EmbedBuilder()
        .setAuthor({
            name: interaction.user.displayName,
            iconURL: interaction.user.displayAvatarURL() ?? '',
        })
        .setColor(PinkColor)
        .setDescription(
            `กรุณาป้อนลิงก์จาก YouTube หรือ SoundCloud หรือ Youtube Music หรือ Spotify เท่านั้น!:・${link}`
        )
        .setFooter({
            text: client.user?.displayName as string,
            iconURL: client.user?.displayAvatarURL() ?? '',
        })
        .setTimestamp();
}
