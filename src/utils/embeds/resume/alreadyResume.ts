import { PinkColor } from '@utils/embedEvents';
import { EmbedBuilder } from 'discord.js';
import { Queue } from 'lavalink-client/dist/types';
import type { InteractionEmbed } from 'src/types';

/**
 *
 * @param embedData
 * @param song
 * @returns
 */
export default function alreadyResumeEmbed(
    embedData: InteractionEmbed,
    song: Queue
): EmbedBuilder {
    const { interaction, client } = embedData;
    return new EmbedBuilder()
        .setAuthor({
            name: interaction.user.displayName,
            iconURL: interaction.user.displayAvatarURL() ?? '',
        })
        .setColor(PinkColor)
        .setDescription(
            `เพลง:・${song.current?.info.title} ยังไม่ได้ถูกหยุดชั่วคราวเลยนะ ตอนนี้คุณใช้คำสั่งซ้ำโดยเพลงยังไม่ได้หยุดนะ!!`
        )
        .setFooter({
            text: client.user?.displayName as string,
            iconURL: client.user?.displayAvatarURL() ?? '',
        })
        .setTimestamp();
}
