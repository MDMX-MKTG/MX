import fetch from 'node-fetch'
import yts from 'yt-search'
let handler = async (m, { conn, text, args, usedPrefix, command }) => {
if (!text) {
return conn.sendMessage(m.chat, { text: `*[ ? ]*  Ingrese el comando mas el nombre de la cancion que busca.\n\n• *Por ejemplo:*\n${usedPrefix + command} Ethereal` }, { quoted: m })
}
let ytres = await search(args.join(" "))
if (!ytres.length) {
return conn.sendMessage(m.chat, { text: `*[ ✘ ]*  No se han encontrado resultados de la busqueda.\n- Intentalo de nuevo con otro nombre.`}, { quoted: m })
}

await conn.sendMessage(m.chat, { text: `ⴵ _Descargando el pedido, espere un momento..._` }, { quoted: m })
let mdmx = ytres[0]
let txt = `•─• •⟤ \`MP4 • YOUTUBE\` ⟥• •─•

⊸⊹ *Titulo:* ${mdmx.title}
⊸⊹ *Duracion:* ${mdmx.timestamp}
⊸⊹ *Publicado:* ${mdmx.ago}
⊸⊹ *Autor/a:* ${mdmx.author.name || 'Desconocido'}
⊸⊹ *Enlace:* ${mdmx.url}`
//await conn.sendFile(m.chat, mdmx.image, 'thumbnail.jpg', txt, m)

try {
const resolution = '360'
const response = await fetch(`https://cloudkutube.eu/api/ytv?url=${encodeURIComponent(mdmx.url)}&resolution=${resolution}`)
const data = await response.json()

if (data.status !== 'success') throw new Error('Fallo al obtener el vídeo.')

const title = data.result.title
const videoUrl = data.result.url

await conn.sendMessage(m.chat, { video: { url: videoUrl }, mimetype: "video/mp4", caption: `🎬 *Descargado* ( ${title}.mp4 )` }, { quoted: m })
} catch (error) {
console.error(error)
conn.sendMessage(m.chat, { text: `⦗ ✘ ⦘ _Ocurrio un error con el comando: *${usedPrefix + command}*_\n- _Reporta el error al grupo de asistencia o usa el comando: *${usedPrefix}report*_` }, { quoted: m })
}
}

handler.command = ["mp4", "video"]
export default handler

async function search(query, options = {}) {
let search = await yts.search({ query, hl: "es", gl: "ES", ...options })
return search.videos
}

/*
import fetch from "node-fetch";
import axios from 'axios';

let handler = async (m, { conn, text, usedPrefix, command, args }) => {
try {
if (!text) {
return conn.sendMessage(m.chat, { text: `*[ ? ]*  Ingrese el comando mas un enlace de un video de *YouTube* para descargarlo.` }, { quoted: m })
}

if (!/^(?:https?:\/\/)?(?:www\.|m\.|music\.)?youtu\.?be(?:\.com)?\/?.*(?:watch|embed)?(?:.*v=|v\/|\/)([\w\-_]+)\&?/.test(args[0])) {
return conn.sendMessage(m.chat, { text: `*[ ✘ ]*  El enlace que has ingresado no es valido, recuerde copiar un enlace de un video de *YouTube.*`}, { quoted: m });
}
await conn.sendMessage(m.chat, { text: `ⴵ _Buscando resultados, espere un momento..._` }, { quoted: m });
let json = await ytdl(args[0]);
let limit = 10485760;
let size = await getSize(json.url);
const cap = `
•─• •⟤ \`YOUTUBE • MP4\` ⟥• •─•

⊸⊹ *Descargado en:* WhatsApp
⊸⊹ *Plataforma:* YouTube
⊸⊹ *Descargador:* Bot
⊸⊹ *Titulo:* ${json.title}
⊸⊹ *Enlace:* ${args[0]}
:
*[ 📍 ]* Para descargar audios, usen el comando *${usedPrefix}mp3* junto con el enlace.`;
conn.sendMessage(m.chat, { text: cap, contextInfo: { externalAdReply: { title: wm, body: '✓ Descargando video, espere un momento...', thumbnailUrl: json.url, sourceUrl: null, mediaType: 1, showAdAttribution: true, renderLargerThumbnail: true }}} , { quoted: m });
conn.sendFile(m.chat, await (await fetch(json.url)).buffer(), `${json.title}.mp4`, '', m, null, { asDocument: true, mimetype: "video/mp4" });
} catch (e) {
?conn.sendMessage(m.chat, { text: `⦗ ✘ ⦘ _Ocurrio un error con el comando: *${usedPrefix + command}*_\n- _Reporta el error al grupo de asistencia o usa el comando: *${usedPrefix}report*_` }, { quoted: m });
}};
handler.command = ['video', 'mp4'];
export default handler;

async function ytdl(url) {
const headers = {
"accept": "**",
"accept-language": "id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7",
"sec-ch-ua": "\"Not A(Brand\";v=\"8\", \"Chromium\";v=\"132\"",
"sec-ch-ua-mobile": "?1",
"sec-ch-ua-platform": "\"Android\"",
"sec-fetch-dest": "empty",
"sec-fetch-mode": "cors",
"sec-fetch-site": "cross-site",
"Referer": "https://id.ytmp3.mobi/",
"Referrer-Policy": "strict-origin-when-cross-origin"
};
const initial = await fetch(`https://d.ymcdn.org/api/v1/init?p=y&23=1llum1n471&_=${Math.random()}`, { headers });
const init = await initial.json();
const id = url.match(/(?:youtu\.be\/|youtube\.com\/(?:.*v=|.*\/|.*embed\/))([^&?/]+)/)?.[1];
const convertURL = init.convertURL + `&v=${id}&f=mp4&_=${Math.random()}`;

const converts = await fetch(convertURL, { headers });
const convert = await converts.json();

let info = {};
for (let i = 0; i < 3; i++) {
const progressResponse = await fetch(convert.progressURL, { headers });
info = await progressResponse.json();
if (info.progress === 3) break;
}

const result = {
url: convert.downloadURL,
title: info.title
};
return result;
}

async function formatSize(bytes) {
const units = ['B', 'KB', 'MB', 'GB', 'TB'];
let i = 0;
bytes = Number(bytes);

if (isNaN(bytes)) {
return 'Tamaño de bytes inválido'
}

while (bytes >= 1024 && i < units.length - 1) {
bytes /= 1024;
i++;
}

return `${bytes.toFixed(2)} ${units[i]}`;
}

async function getSize(url) {
try {
const response = await axios.head(url);
const contentLength = response.headers['content-length'];
return contentLength ? parseInt(contentLength, 10) : null;
} catch (error) {
return error;
}
}
*/
