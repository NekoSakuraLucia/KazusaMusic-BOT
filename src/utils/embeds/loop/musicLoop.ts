import { PinkColor } from '@utils/embedEvents';
import { EmbedBuilder } from 'discord.js';
import { Player } from 'lavalink-client/dist/types';
import type { InteractionEmbed } from 'src/types';

/**
 *
 * @param embedData
 * @param player
 * @returns
 */
export default function musicLoopEmbed(
    embedData: InteractionEmbed,
    player: Player
): EmbedBuilder {
    const { interaction, client } = embedData;

    return new EmbedBuilder()
        .setAuthor({
            name: interaction.user.displayName,
            iconURL: interaction.user.displayAvatarURL() ?? '',
        })
        .setDescription(`**เปิดการใช้งานลูป ${player.repeatMode} แล้วค่ะ**`)
        .setColor(PinkColor)
        .setFooter({
            text: client.user?.displayName as string,
            iconURL: client.user?.displayAvatarURL() ?? '',
        })
        .setTimestamp();
}
