import { EmbedBuilder } from 'discord.js';
import type { KazusaClient } from 'src/types';
import { PinkColor, SlashError } from '@utils/embedEvents';

// CatchError
import { CatchError as StringSelectMenuError } from '@utils/embedEvents';
import { CatchError as ButtonError } from '@utils/embedEvents';

// Type
import type { Player } from 'lavalink-client/dist/types';

export function KazusaInteraction(client: KazusaClient) {
    client.on('interactionCreate', async (interaction) => {
        if (interaction.isCommand()) {
            const { commandName } = interaction;

            if (client.commands.has(commandName)) {
                try {
                    await client.commands
                        .get(commandName)
                        .execute(client, interaction);
                } catch (error) {
                    console.error(error);
                    await interaction.reply({
                        ephemeral: true,
                        embeds: [SlashError({ interaction, client })],
                    });
                }
            }
        } else if (interaction.isStringSelectMenu()) {
            try {
                if (interaction.customId === 'filters') {
                    const selectValue = interaction.values[0];

                    const player = client.lavalink.getPlayer(
                        interaction.guildId as string
                    ) as Player;

                    let response = '';
                    switch (selectValue) {
                        case 'clear':
                            await player.filterManager.resetFilters();
                            response = 'ปิดการใช้งานฟิลเตอร์ทั้งหมดแล้วค่ะ !';
                            break;
                        case 'nightcore':
                            if (player.filterManager.filters.karaoke) {
                                await player.filterManager.resetFilters();
                            }
                            await player.filterManager.toggleNightcore();
                            response = player.filterManager.filters.nightcore
                                ? 'เปิดการใช้งาน Nightcore แล้วค่ะ'
                                : 'ปิดการใช้งาน Nightcore แล้วค่ะ';
                            break;
                        case 'karaoke':
                            if (player.filterManager.filters.nightcore) {
                                await player.filterManager.resetFilters();
                            }
                            await player.filterManager.toggleKaraoke();
                            response = player.filterManager.filters.karaoke
                                ? 'เปิดการใช้งาน Karaoke แล้วค่ะ'
                                : 'ปิดการใช้งาน Karaoke แล้วค่ะ';
                            break;
                    }

                    const nightcoreActive =
                        player.filterManager.filters.nightcore;
                    const karaokeActive = player.filterManager.filters.karaoke;

                    const MusicFilters = new EmbedBuilder()
                        .setAuthor({
                            name: interaction.user.displayName,
                            iconURL: interaction.user.displayAvatarURL() ?? '',
                        })
                        .setDescription(`**${response}**`)
                        .setColor(PinkColor)
                        .addFields([
                            {
                                name: '`🎶` Nightcore',
                                value: nightcoreActive
                                    ? 'Enable (กำลังใช้งาน)'
                                    : 'Disable (ปิดใช้งาน)',
                                inline: true,
                            },
                            {
                                name: '`🎶` Karaoke',
                                value: karaokeActive
                                    ? 'Enable (กำลังใช้งาน)'
                                    : 'Disable (ปิดใช้งาน)',
                                inline: true,
                            },
                        ])
                        .setTimestamp();

                    await interaction.reply({
                        ephemeral: true,
                        embeds: [MusicFilters],
                    });
                }
            } catch (error) {
                if (error instanceof Error) {
                    await interaction.reply({
                        ephemeral: true,
                        embeds: [
                            StringSelectMenuError(
                                {
                                    interaction,
                                    client,
                                },
                                'เกิดข้อผิดพลาดในการจัดการเมนูตัวกรอง',
                                error.message
                            ),
                        ],
                    });
                }

                await interaction.reply({
                    ephemeral: true,
                    embeds: [
                        StringSelectMenuError(
                            { interaction, client },
                            'เกิดข้อผิดพลาดที่ไม่รู้จักในการจัดการเมนูตัวกรอง',
                            error
                        ),
                    ],
                });
            }
        } else if (interaction.isButton()) {
            try {
                if (interaction.customId === 'filters-check') {
                    const player = client.lavalink.getPlayer(
                        interaction.guildId as string
                    ) as Player;

                    const nightcoreActive =
                        player.filterManager.filters.nightcore;
                    const karaokeActive = player.filterManager.filters.karaoke;

                    const FiltersCheckEmbed = new EmbedBuilder()
                        .setAuthor({
                            name: interaction.user.displayName,
                            iconURL: interaction.user.displayAvatarURL() ?? '',
                        })
                        .setColor(PinkColor)
                        .setDescription('**สถานะฟิลเตอร์ปัจจุบัน**')
                        .addFields([
                            {
                                name: '`🎶` Nightcore',
                                value: nightcoreActive
                                    ? 'Enable (กำลังใช้งาน)'
                                    : 'Disable (ปิดใช้งาน)',
                                inline: true,
                            },
                            {
                                name: '`🎶` Karaoke',
                                value: karaokeActive
                                    ? 'Enable (กำลังใช้งาน)'
                                    : 'Disable (ปิดใช้งาน)',
                                inline: true,
                            },
                        ])
                        .setTimestamp();

                    await interaction.reply({
                        ephemeral: true,
                        embeds: [FiltersCheckEmbed],
                    });
                }
            } catch (error) {
                if (error instanceof Error) {
                    await interaction.reply({
                        ephemeral: true,
                        embeds: [
                            ButtonError(
                                {
                                    interaction,
                                    client,
                                },
                                'เกิดข้อผิดพลาดในการจัดการปุ่ม',
                                error.message
                            ),
                        ],
                    });
                }

                await interaction.reply({
                    ephemeral: true,
                    embeds: [
                        ButtonError(
                            { interaction, client },
                            'เกิดข้อผิดพลาดที่ไม่รู้จักในการจัดการปุ่ม',
                            error
                        ),
                    ],
                });
            }
        }
    });
}
