import { Command } from "../types";
import { SlashCommandBuilder, EmbedBuilder } from "discord.js";

const data = new SlashCommandBuilder()
    .setName('search').setDescription('ค้นหาเพลงโดยการป้อนข้อความแทน URL')
    .addStringOption(o => o.setName('song').setDescription('ป้อนชื่อเพลงเพื่อค้นหาแทน URL').setRequired(true))

module.exports = {
    data: data,
    async execute(client, interaction) {
        try {
            const embedPing = new EmbedBuilder()
                .setAuthor({ name: interaction.user.displayName, iconURL: interaction.user.displayAvatarURL() ?? '' })
                .setTitle('ทดสอบคำสั่ง')
                .setDescription(`ค้นหาเพลง...`)
                .setColor('#F472B6')
                .setFooter({ text: client.user?.displayName as string, iconURL: client.user?.displayAvatarURL() ?? '' })
                .setTimestamp();

            await interaction.reply({ embeds: [embedPing] });
        } catch (error) {
            console.error(error)
        }
    }
} as Command