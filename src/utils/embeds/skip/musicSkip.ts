import { PinkColor } from "@utils/embedEvents";
import { EmbedBuilder } from "discord.js";
import { Queue } from "lavalink-client/dist/types";
import { InteractionEmbed } from "src/types";

export default function musicSkipEmbed(embedData: InteractionEmbed, currentTrack: Queue, nextTrack: Queue): EmbedBuilder {
    const { interaction, client } = embedData;

    return new EmbedBuilder()
        .setAuthor({ name: interaction.user.displayName, iconURL: interaction.user.displayAvatarURL() ?? '' })
        .setDescription(
            currentTrack ?
                `**ข้ามเพลงแล้ว ${currentTrack.current?.info.title} ไปยัง ${nextTrack.tracks[0].info.title}**`
                : `**ข้ามคิวแล้ว ${nextTrack.tracks[0].info.title}**`,
        )
        .setColor(PinkColor)
        .setFooter({ text: client.user?.displayName as string, iconURL: client.user?.displayAvatarURL() ?? '' })
        .setTimestamp();
}