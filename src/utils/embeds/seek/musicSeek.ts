import { PinkColor } from "@utils/embedEvents";
import { MusicTime } from "@utils/MusicTimeUtils";
import { EmbedBuilder } from "discord.js";
import { Player } from "lavalink-client/dist/types";
import { InteractionEmbed } from "src/types";

export default function musicSeekEmbed(embedData: InteractionEmbed, player: Player): EmbedBuilder {
    const { interaction, client } = embedData;
    
    return new EmbedBuilder()
        .setAuthor({ name: interaction.user.displayName, iconURL: interaction.user.displayAvatarURL() ?? '' })
        .setTitle('กรอเวลาเพลง')
        .setDescription(`ทำการกรอเวลาไปยัง: **${MusicTime(player.position)}** แล้วค่ะ !`)
        .setColor(PinkColor)
        .setFooter({ text: client.user?.displayName as string, iconURL: client.user?.displayAvatarURL() ?? '' })
        .setTimestamp();
}