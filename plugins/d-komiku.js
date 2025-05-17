import axios from "axios";
import * as cheerio from "cheerio";
import fs from "fs";
import archiver from "archiver";
import { join } from "path";
const handler = async (m, { text, usedPrefix, command, conn }) => {
if (!text || !/^https?:\/\/[^\s]+$/.test(text)) {
return conn.sendMessage(m.chat, { text: `*[ ? ]*  Ingrese el comando mas un enlace de un archivo de *Komiku* para descargarlo.` }, { quoted: m });
}
const targetUrl = text.trim();
try {
await conn.sendMessage(m.chat, { text: `ⴵ _Descargando el pedido, espere un momento..._` }, { quoted: m });
const response = await axios.get(targetUrl, {
headers: {
"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:117.0) Gecko/20100101 Firefox/117.0",
"Accept-Language": "es-ES,es;q=0.9"
}
});

const $ = cheerio.load(response.data);
const images = [];
$("img[itemprop='image']").each((_, el) => {
const imgUrl = $(el).attr("src");
if (imgUrl) images.push(imgUrl);
});

if (images.length === 0) {
return conn.sendMessage(m.chat, { text: `*[ ✘ ]*  No se han encontrado imagenes en el enlace proporcionado.\n- Recuerde usar un enlace que tenga imagenes en Komiku.`}, { quoted: m });
}
await conn.sendMessage(m.chat, { text: `ⴵ _Descargando ${images.length}, espere un momento..._` }, { quoted: m });
const tempDir = "tmp";
if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir);
for (let i = 0; i < images.length; i++) {
const imgUrl = images[i];
const filename = `🖼️ komiku-${i + 1}.jpg`;
const filepath = join(tempDir, filename);
const imgResponse = await axios.get(imgUrl, { responseType: "arraybuffer" });
fs.writeFileSync(filepath, imgResponse.data);
}

const zipFilename = `komiku-${wm}.zip`;
const output = fs.createWriteStream(zipFilename);
const archive = archiver("zip", { zlib: { level: 9 } });
let resultadoss = `
•─• •⟤ \`KOMIKU\` ⟥• •─•

⊸⊹ *Descargado en:* WhatsApp
⊸⊹ *Plataforma:* Komiku
⊸⊹ *Tipo:* Imagenes
⊸⊹ *Cantidad:* ${images.length}`;
output.on("close", async () => {
await conn.sendFile(m.chat, zipFilename, zipFilename, resultadoss, m);
setTimeout(() => {
fs.unlinkSync(zipFilename);
fs.rmSync(tempDir, { recursive: true, force: true });
}, 10000);
});

archive.on("error", (err) => {
throw err;
});

archive.pipe(output);
archive.directory(tempDir, false);
archive.finalize();
} catch (error) {
console.error("Error:", error.message);
conn.sendMessage(m.chat, { text: `⦗ ✘ ⦘ _Ocurrio un error con el comando: *${usedPrefix + command}*_\n- _Reporta el error al grupo de asistencia o usa el comando: *${usedPrefix}report*_` }, { quoted: m });
}
};

handler.command = ["komiku"];

export default handler;
