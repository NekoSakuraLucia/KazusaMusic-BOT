import { PinkColor } from '@utils/embedEvents';
import { EmbedBuilder } from 'discord.js';
import type { InteractionEmbed } from 'src/types';

/**
 *
 * @param embedData
 * @param response
 * @returns
 */
export default function musicFilterEmbed(
    embedData: InteractionEmbed,
    response: string
): EmbedBuilder {
    const { interaction, client } = embedData;

    return new EmbedBuilder()
        .setAuthor({
            name: interaction.user.displayName,
            iconURL: interaction.user.displayAvatarURL() ?? '',
        })
        .setDescription(`**${response}**`)
        .setColor(PinkColor)
        .setFooter({
            text: client.user?.displayName as string,
            iconURL: client.user?.displayAvatarURL() ?? '',
        })
        .setTimestamp();
}
