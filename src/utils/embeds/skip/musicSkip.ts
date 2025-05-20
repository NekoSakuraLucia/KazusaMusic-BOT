import { PinkColor } from '@utils/embedEvents';
import { EmbedBuilder } from 'discord.js';
import { Queue } from 'lavalink-client/dist/types';
import type { InteractionEmbed } from 'src/types';

/**
 *
 * @param embedData
 * @param queue
 * @returns
 */
export default function musicSkipEmbed(
    embedData: InteractionEmbed,
    queue: Queue
): EmbedBuilder {
    const { interaction, client } = embedData;

    return new EmbedBuilder()
        .setAuthor({
            name: interaction.user.displayName,
            iconURL: interaction.user.displayAvatarURL() ?? '',
        })
        .setDescription(
            queue.current
                ? `**ข้ามเพลงแล้ว ${queue.current?.info.title} ไปยัง ${queue.tracks[0]?.info.title}**`
                : `**ข้ามคิวแล้ว ${queue.tracks[0]?.info.title}**`
        )
        .setColor(PinkColor)
        .setFooter({
            text: client.user?.displayName as string,
            iconURL: client.user?.displayAvatarURL() ?? '',
        })
        .setTimestamp();
}
