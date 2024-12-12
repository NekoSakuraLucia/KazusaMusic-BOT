# KazusaMusic-BOT

> **Open Source Discord Music Bot**  
> (แจกจ่ายได้ฟรี แต่โปรดให้เครดิตผู้พัฒนา)

KazusaMusic-BOT เป็นบอทเพลงสำหรับ Discord ที่ถูกพัฒนาขึ้นมาเพื่อใช้งานส่วนตัว ตอนนี้พร้อมแจกจ่ายให้กับทุกคนที่สนใจใช้งาน! 🎵

---

## คุณสมบัติ
- รองรับการเชื่อมต่อกับ Lavalink (V4 เท่านั้น)
- ใช้คำสั่ง Slash Commands สำหรับควบคุมบอท
- พัฒนาโดยใช้ TypeScript เพื่อความทันสมัยและยืดหยุ่น

---

## วิธีติดตั้งและใช้งาน

### 1. ติดตั้ง Dependencies
ตรวจสอบว่าคุณติดตั้ง `pnpm` แล้ว หากยังไม่มี ให้ติดตั้งโดยใช้คำสั่ง:
```bash
npm install -g pnpm
```
### 2. จากนั้นติดตั้ง dependencies ของโปรเจกต์:
```base
pnpm install
```

### 3. ตั้งค่าคอนฟิก
แก้ไขไฟล์คอนฟิกให้เหมาะสมกับการใช้งานของคุณ: <br/>
สร้างไฟล์ `BOTConfig.ts` หรือแก้ไขตามตัวอย่างด้านล่าง:
```ts
export const BOTConfig = {
    token: "", // ใส่โทเค้นของบอท
    bot_client_id: "", // ใส่ client ID ของบอท
    bot_username: "KazusaTest", // ไม่ต้องแก้ไขหากไม่จำเป็น
    guildId: "", // (ไม่บังคับ) ใส่ guild ID สำหรับทดสอบ Slash Commands

    // Lavalink Configuration
    nodes: {
        authorization: "", // รหัสผ่านของ Lavalink
        hostname: "", // Hostname ของ Lavalink
        port: 80, // Port ของ Lavalink
        id: "KazusaTest" // ไม่ต้องแก้ไขหากไม่จำเป็น
    }
};
```

### 4.รันบอท
เมื่อกำหนดค่าเสร็จแล้ว ใช้คำสั่งต่อไปนี้: <br/>
1. คอมไพล์โค้ดจาก TypeScript เป็น JavaScript
```base
pnpm run build
```
2. รันบอท
```base
pnpm run start
```

## หมายเหตุ
- รองรับเฉพาะ Lavalink V4 เท่านั้น
- อย่าลืมตรวจสอบว่าเซิร์ฟเวอร์ Lavalink ของคุณทำงานปกติและกำหนดค่าอย่างถูกต้อง

## Enjoy Your Music! 🎶
เพียงเท่านี้คุณก็สามารถสนุกกับบอทเพลง KazusaMusic ได้แล้ว ขอบคุณที่ใช้งาน! <br/>
หากมีคำถามหรือพบปัญหา โปรดติดต่อผู้พัฒนาได้เลยค่ะ หรือ Fork และเปิด PR

## การให้เครดิต
- โปรดให้เครดิตผู้พัฒนาในกรณีที่นำไปใช้งานหรือแจกจ่ายต่อ 🙏
```mdx
### การให้เครดิต
โปรดให้เครดิตผู้พัฒนาในกรณีที่นำไปใช้งานหรือแจกจ่ายต่อ โดยสามารถเพิ่มข้อความดังนี้:

- **ผู้พัฒนา**: [NekoSakuraLucia](https://github.com/NekoSakuraLucia)  
- **ลิงก์โปรเจกต์ต้นฉบับ**: [KazusaMusic-BOT](https://github.com/NekoSakuraLucia/KazusaMusic-BOT)  

ตัวอย่างการให้เครดิต:  
> "พัฒนาโดย [NekoSakuraLucia](https://github.com/NekoSakuraLucia) จากโปรเจกต์ [KazusaMusic-BOT](https://github.com/NekoSakuraLucia/KazusaMusic-BOT)"
```