import { EmbedBuilder, Interaction } from 'discord.js';
import type { InteractionEmbed } from 'src/types';

// Embed การทำงานฟังชั่น

export const PinkColor = '#F9A8D4';

export function JoinVoiceChannel(embedData: InteractionEmbed): EmbedBuilder {
    const { interaction, client } = embedData;

    return new EmbedBuilder()
        .setAuthor({
            name: interaction.user.displayName,
            iconURL: interaction.user.displayAvatarURL() ?? '',
        })
        .setTitle('เกิดข้อผิดพลาด')
        .setDescription('**กรุณาเข้าห้องเสียงก่อนค่ะ !**')
        .setColor(PinkColor)
        .setFooter({
            text: client.user?.displayName as string,
            iconURL: client.user?.displayAvatarURL() ?? '',
        })
        .setTimestamp();
}

export function selfDeafMember(embedData: InteractionEmbed): EmbedBuilder {
    const { interaction, client } = embedData;

    return new EmbedBuilder()
        .setAuthor({
            name: interaction.user.displayName,
            iconURL: interaction.user.displayAvatarURL() ?? '',
        })
        .setTitle('เกิดข้อผิดพลาด')
        .setDescription(
            '**คุณไม่สามารถใช้คำสั่งนี้ได้ในขณะที่คุณปิดการได้ยินตัวเองอยู่ค่ะ !**'
        )
        .setColor(PinkColor)
        .setFooter({
            text: client.user?.displayName as string,
            iconURL: client.user?.displayAvatarURL() ?? '',
        })
        .setTimestamp();
}

export function SameRoom(embedData: InteractionEmbed): EmbedBuilder {
    const { interaction, client } = embedData;

    return new EmbedBuilder()
        .setAuthor({
            name: interaction.user.displayName,
            iconURL: interaction.user.displayAvatarURL() ?? '',
        })
        .setTitle('เกิดข้อผิดพลาด')
        .setDescription('**คุณต้องอยู่ในห้องเสียงเดียวกับหนูนะ !**')
        .setColor(PinkColor)
        .setFooter({
            text: client.user?.displayName as string,
            iconURL: client.user?.displayAvatarURL() ?? '',
        })
        .setTimestamp();
}

export function NotPlaying(embedData: InteractionEmbed): EmbedBuilder {
    const { interaction, client } = embedData;

    return new EmbedBuilder()
        .setAuthor({
            name: interaction.user.displayName,
            iconURL: interaction.user.displayAvatarURL() ?? '',
        })
        .setTitle('เกิดข้อผิดพลาด')
        .setDescription('**ไม่มีเพลงอะไรเล่นตอนนี้ !**')
        .setColor(PinkColor)
        .setFooter({
            text: client.user?.displayName as string,
            iconURL: client.user?.displayAvatarURL() ?? '',
        })
        .setTimestamp();
}

export function NotConnectVoice(embedData: InteractionEmbed): EmbedBuilder {
    const { interaction, client } = embedData;

    return new EmbedBuilder()
        .setAuthor({
            name: interaction.user.displayName,
            iconURL: interaction.user.displayAvatarURL() ?? '',
        })
        .setTitle('เกิดข้อผิดพลาด')
        .setDescription('**หนูไม่ได้เชื่อมต่อกับห้องเสียง !**')
        .setColor(PinkColor)
        .setFooter({
            text: client.user?.displayName as string,
            iconURL: client.user?.displayAvatarURL() ?? '',
        })
        .setTimestamp();
}

export function SearchError(embedData: InteractionEmbed): EmbedBuilder {
    const { interaction, client } = embedData;

    return new EmbedBuilder()
        .setAuthor({
            name: interaction.user.displayName,
            iconURL: interaction.user.displayAvatarURL() ?? '',
        })
        .setTitle('เกิดข้อผิดพลาด')
        .setDescription('**เกิดข้อผิดพลาดระหว่างการค้นหาเพลง !**')
        .setColor(PinkColor)
        .setFooter({
            text: client.user?.displayName as string,
            iconURL: client.user?.displayAvatarURL() ?? '',
        })
        .setTimestamp();
}

// Interaction

export function SlashError(embedData: InteractionEmbed): EmbedBuilder {
    const { interaction, client } = embedData;

    return new EmbedBuilder()
        .setAuthor({
            name: interaction.user.displayName,
            iconURL: interaction.user.displayAvatarURL() ?? '',
        })
        .setTitle('เกิดข้อผิดพลาด')
        .setDescription('**เกิดข้อผิดพลาดขณะดำเนินการคำสั่งนี้!**')
        .setColor(PinkColor)
        .setFooter({
            text: client.user?.displayName as string,
            iconURL: client.user?.displayAvatarURL() ?? '',
        })
        .setTimestamp();
}

// CatchError

export function CatchError(
    embedData: InteractionEmbed,
    errorDescription: string | null,
    error: string | unknown
): EmbedBuilder {
    const { interaction, client } = embedData;

    return new EmbedBuilder()
        .setAuthor({
            name: interaction.user.displayName,
            iconURL: interaction.user.displayAvatarURL() ?? '',
        })
        .setTitle('เกิดข้อผิดพลาด')
        .setDescription(
            `**${
                errorDescription ?? 'Unknown Error'
            }**\n\`\`\`js\n${error}\n\`\`\``
        )
        .setColor(PinkColor)
        .setFooter({
            text: client.user?.displayName as string,
            iconURL: client.user?.displayAvatarURL() ?? '',
        })
        .setTimestamp();
}
