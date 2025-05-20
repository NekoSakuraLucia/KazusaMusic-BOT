import { EmbedBuilder, SlashCommandBuilder } from 'discord.js';
import type { Command } from 'src/types';
import { formatUptime } from '@utils/MusicTimeUtils';

const data = new SlashCommandBuilder()
    .setName('nodes')
    .setDescription('ดึงข้อมูลของ Lavalink Node');

module.exports = {
    data: data,
    async execute(client, interaction) {
        try {
            const lavalink = client.lavalink.nodeManager.leastUsedNodes();

            const nodeEmbed = new EmbedBuilder()
                .setTitle('ข้อมูลโหนดทั้งหมด')
                .setColor('Blue')
                .setTimestamp()
                .setFooter({
                    text: `Requested by ${interaction.user.tag}`,
                    iconURL: interaction.user.displayAvatarURL(),
                });

            if (lavalink.length === 0) {
                nodeEmbed.setDescription('ไม่พบโหนด');
            } else {
                const nodeInfo = lavalink
                    .map((node) => {
                        const stats = node.stats;
                        return `
                        \`\`\`css
                        ${node.options.id}
                        สถานะ: ${
                            node.connected ? 'เชื่อมต่อแล้ว' : 'ไม่ได้เชื่อมต่อ'
                        }
                        ผู้เล่น: ${stats.players} / ${stats.playingPlayers}
                        CPU: ${stats.cpu.systemLoad.toFixed(
                            2
                        )}% (System) | ${stats.cpu.lavalinkLoad.toFixed(2)}%
                        RAM: ${(stats.memory.used / 1024 / 1024).toFixed(
                            2
                        )} MB / ${(
                            stats.memory.reservable /
                            1024 /
                            1024
                        ).toFixed(2)} MB
                        อัพไทม์: ${formatUptime(stats.uptime)}
                        \`\`\`
                    `.replace(/^\s+|\s+$/gm, '');
                    })
                    .join('\n\n');

                nodeEmbed.setDescription(nodeInfo);
            }

            await interaction.reply({ embeds: [nodeEmbed] });
        } catch (error) {
            console.error(error);
        }
    },
} as Command;
