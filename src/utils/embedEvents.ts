import { EmbedBuilder } from "discord.js";

// Embed การทำงานฟังชั่น

export const PinkColor = '#F9A8D4'

export const JoinVoiceChannel = new EmbedBuilder()
        .setTitle('เกิดข้อผิดพลาด')
        .setDescription('**กรุณาเข้าห้องเสียงก่อนค่ะ !**')
        .setColor(PinkColor)
        .setTimestamp();

export const SameRoom = new EmbedBuilder()
        .setTitle('เกิดข้อผิดพลาด')
        .setDescription('**คุณต้องอยู่ในห้องเสียงเดียวกับหนูนะ !**')
        .setColor(PinkColor)
        .setTimestamp();

export const NotPlaying = new EmbedBuilder()
        .setTitle('เกิดข้อผิดพลาด')
        .setDescription('**ไม่มีเพลงอะไรเล่นตอนนี้ !**')
        .setColor(PinkColor)
        .setTimestamp();

export const NotConnectVoice = new EmbedBuilder()
        .setTitle('เกิดข้อผิดพลาด')
        .setDescription('**หนูไม่ได้เชื่อมต่อกับห้องเสียง !**')
        .setColor(PinkColor)
        .setTimestamp();

export const SearchError = new EmbedBuilder()
        .setTitle('เกิดข้อผิดพลาด')
        .setDescription('**เกิดข้อผิดพลาดระหว่างการค้นหาเพลง !**')
        .setColor(PinkColor)
        .setTimestamp();

export const SlashError = new EmbedBuilder()
        .setTitle('เกิดข้อผิดพลาด')
        .setDescription('**เกิดข้อผิดพลาดขณะดำเนินการคำสั่งนี้!**')
        .setColor(PinkColor)
        .setTimestamp();