import { EmbedBuilder, SlashCommandBuilder } from 'discord.js';
import { Command } from 'src/types';

const data = new SlashCommandBuilder()
    .setName('ping')
    .setDescription('pong');

module.exports = {
    data: data,
    async execute(client, interaction) {
        try {
            const start = Date.now();
            const ping = Date.now() - start;
            const pingBOT = client.ws.ping;

            const embedPing = new EmbedBuilder()
                .setAuthor({ name: interaction.user.displayName, iconURL: interaction.user.displayAvatarURL() ?? '' }).setTitle('เช็คความหน่วง').setDescription(`ค่าความหน่วงปัจจุบัน: ${ping}ms | ค่าความหน่วงบอท: ${pingBOT}ms`).setColor('#F472B6').setTimestamp();

            await interaction.reply({ embeds: [embedPing] });
        } catch (error) {
            console.error(error)
        }
    },
} as Command