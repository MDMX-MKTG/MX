import axios from 'axios';
let handler = async (m, { conn, args, usedPrefix, command }) => {
if (!args[0]) {
await m.react('✖️');
return conn.sendMessage(m.chat, { text: `*[ ? ]*  Ingrese el comando mas un enlace de un video o imagen de *Threads* para descargarlo.` }, { quoted: m });
}
if (!args[0].match(/^https?:\/\/www\.threads\.net\/@[\w.]+\/post\/[\w-]+(\?xmt=[\w-]+)?$/)) {
return conn.sendMessage(m.chat, { text: `*[ ✘ ]*  Ocurrio un error, verifique si es un enlace de *Threads* para descargar el contenido.`}, { quoted: m });
}
try {
let { data } = await axios.get(`https://api.agatz.xyz/api/threads?url=${args[0]}`);
let processedUrls = new Set();
if (data.data.image_urls.length > 0) {
for (let imgUrl of data.data.image_urls) {
if (!processedUrls.has(imgUrl)) {
processedUrls.add(imgUrl);
await conn.sendMessage(m.chat, { image: { url: imgUrl }, caption: `🖼️ threads-${wm}.jpg` }, { quoted: m });
}}}
if (data.data.video_urls.length > 0) {
for (let vid of data.data.video_urls) {
if (!processedUrls.has(vid.download_url)) {
processedUrls.add(vid.download_url);
await conn.sendMessage(m.chat, { video: { url: vid.download_url }, caption: `🎬 threads-${wm}.mp4` }, { quoted: m });
}}}
if (processedUrls.size === 0) {
await conn.sendMessage(m.chat, { text: `*[ ✘ ]*  No se han encontrado resultados en el enlace proporcionado.`}, { quoted: m });
} else {
await m.react('✅');
}
} catch (error) {
console.log(error);
return conn.sendMessage(m.chat, { text: `⦗ ✘ ⦘ _Ocurrio un error con el comando: *${usedPrefix + command}*_\n- _Reporta el error al grupo de asistencia o usa el comando: *${usedPrefix}report*_` }, { quoted: m });
}
};

handler.command = ["threads", "td", "thread"]
export default handler;


/*import fetch from 'node-fetch'
import axios from 'axios'
import cheerio from 'cheerio'
const handler = async (m, {conn, text, args, usedPrefix, command}) => {
if (!text) return conn.sendMessage(m.chat, { text: `Ingrese el comando mas un enlace valido de un video de *Threads* para descargarlo.` }, { quoted: m })
await conn.sendMessage(m.chat, { text: `ⴵ _Descargando el pedido, espere un momento..._` }, { quoted: m })
try{ 
const apiUrl = `${apis}/download/threads?url=${encodeURIComponent(text)}`
const response = await fetch(apiUrl)
const jsonData = await response.json()
const threadTitle = jsonData.data.description
const threadVideoUrl = jsonData.data.media[0].url
const shortUrl1 =await (await fetch(`https://tinyurl.com/api-create.php?url=${text}`)).text()
const threadTitleWithoutUrl = threadTitle
const resultado = `•─• •⟤ \`THREADS\` ⟥• •─•
- _Resultado encontrado en *Threads*._

⊸⊹ *Titulo:* ${threadTitleWithoutUrl}
⊸⊹ *Enlace:* ${shortUrl1}
⊸⊹ *Descargado en:* WhatsApp
⊸⊹ *Platafoma:* Threads
⊸⊹ *Descargador:* Bot`.trim()
await conn.sendMessage(m.chat, { video: { url: threadVideoUrl }, caption: resultado }, { quoted: m })
} catch (e) {
await conn.sendMessage(m.chat, { text: `⦗ ✘ ⦘ _Ocurrio un error con el comando: *${usedPrefix + command}*_\n- _Reporta el error al grupo de asistencia o usa el comando: *${usedPrefix}report*_` }, { quoted: m })
console.log(e)
}}
handler.command = ["td", "thread", "threads"]
export default handler
const delay = time => new Promise(res => setTimeout(res, time))
*/



