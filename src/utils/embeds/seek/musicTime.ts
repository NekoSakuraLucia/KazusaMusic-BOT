import { PinkColor } from "@utils/embedEvents";
import { MusicTime } from "@utils/MusicTimeUtils";
import { EmbedBuilder } from "discord.js";
import { Queue } from "lavalink-client/dist/types";
import { InteractionEmbed } from "src/types";

export default function musicTimeEmbed(embedData: InteractionEmbed, queue: Queue): EmbedBuilder {
    const { interaction, client } = embedData;

    if (!queue.current) {
        return new EmbedBuilder()
            .setAuthor({ name: interaction.user.displayName, iconURL: interaction.user.displayAvatarURL() ?? '' })
            .setTitle('กรอเวลาเพลง')
            .setDescription('ไม่พบข้อมูลเพลงที่กำลังเล่นอยู่')
            .setColor(PinkColor)
            .setFooter({ text: client.user?.displayName as string, iconURL: client.user?.displayAvatarURL() ?? '' });
    }

    return new EmbedBuilder()
        .setAuthor({ name: interaction.user.displayName, iconURL: interaction.user.displayAvatarURL() ?? '' })
        .setTitle('กรอเวลาเพลง')
        .setDescription(`
            แย่จัง เวลาที่คุณจะกรอมันเกินเวลาจริงของเพลงน่ะสิ 
            ${Math.floor(queue.current.info.duration / 1000)} วินาที | 
            เวลาเพลงจริง ${MusicTime(queue.current.info.duration)} ลองใหม่อีกทีนะ
        `)
        .setColor(PinkColor)
        .setFooter({ text: client.user?.displayName as string, iconURL: client.user?.displayAvatarURL() ?? '' });
}
