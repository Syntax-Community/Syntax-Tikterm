import readlineSync from "readline-sync";
import dotenv from 'dotenv';
dotenv.config();
import { WebcastPushConnection } from "tiktok-live-connector";
const username = readlineSync.question("Masukkan username TikTok (tanpa @): ");
const tiktok = new WebcastPushConnection(username, {
  enableWebsocket: true,
  clientParams: { apiKey: process.env.APIKEY }
});
tiktok.connect()
  .then(() => {
    console.log("✅ terhubung ke " + username);
  })
  .catch((err) => {
    console.error(`❌ Gagal terhubung: ${err.message}`);
  });
  tiktok.on("member", (data) => {
    console.log(`[👋] \x1b[32m${data.nickname} joined the live\x1b[0m`);
  });
tiktok.on("chat", (data) => {
  console.log(`[💬] \x1b[31m${data.nickname}\x1b[0m: ` + `\x1b[36m${data.comment}\x1b[0m`);
});
tiktok.on("social", (data)=> {
  console.log(`[❗️]\x1b[95m`, data.nickname, "followed the host\x1b[0m");
});
tiktok.on("gift", (data)=> {
   if (data.giftType === 1 && !data.repeatEnd) {
    console.log(`🎁 ${data.nickname} has sent gift ${data.giftName} x${data.repeatCount}`);
  } else {
     console.log(`🎁 ${data.nickname} has sent gift ${data.giftName} x${data.repeatCount}`);
   }
});
