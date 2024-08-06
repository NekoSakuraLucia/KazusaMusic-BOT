- # KazusaMusic-BOT

- #### เป็นโค้ดบอทเพลงดิสคอร์ดที่ตอนแรกจะทำขาย แต่ขายไม่ออก เลยแจกแม่งเลย 55555555555

- #### วิธีการใช้งาน และ ติดตั้ง

- **1. ติดตั้ง**
```base
pnpm install
```

- **2. คอนฟิกไฟล์ของบอท**
```javascript
export const BOTConfig = {
        token: "", // ใส่โทเค้นของบอท
        bot_client_id: "", // ใส่ client id ของบอท
        bot_username: "KazusaTest", // ไม่ต้องสนใจตรงส่วนนี้
        guildId: "", // ใส่ guild id ที่ต้องการทดสอบคำสั่ง Slash Commands หรือ ไม่ต้องใส่ก็ได้
        // Lavalink รองรับเฉพาะ V4 เท่านั้น
        nodes: {
                authorization: "", // ใส่รหัสของ Lavalink 
                hostname: "", // ใส่ Hostname ของ Lavalink
                port: 80, // ใส่ Port ของ Lavalink
                id: "KazusaTest" // ไม่ต้องสนใจส่วนนี้
        }
}
```

- **3. หากตั้งค่าครบหมดแล้ว ก็รันบอทใช้คำสั่ง**
```base
pnpm run build // เพื่อทำการคอมไพล์จาก TypeScript เป็น JavaScript เพื่อสำหรับการใช้งานจริง

// หลักจากคอมไพล์เสร็จแล้วให้ใช้คำสั่ง

pnpm run start // เพื่อรันบอท
```

---
- หากยังไม่มี pnpm ให้ใช้คำสั่ง npm install -g pnpm ด้วยนะอย่าลืม
---

#### เพียงเท่านี้คุณ enjoy กับบอทเพลงของคุณได้อย่างสนุกสนานแล้ว ขอบคุณครับ / ค่ะ
