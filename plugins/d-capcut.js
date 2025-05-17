import fetch from "node-fetch";
import cheerio from "cheerio";
const handler = async (m, { conn, usedPrefix, command, text }) => {
if (!text) {
return conn.sendMessage(m.chat, { text: `*[ ? ]*  Ingrese el comando mas un enlace de un video de *CapCut* para descargarlo.` }, { quoted: m });
}
try {
await conn.sendMessage(m.chat, { text: `ⴵ _Descargando el pedido, espere un momento..._` }, { quoted: m });
const result = await capcutdl(text);
if (!result) {
return conn.sendMessage(m.chat, { text: `*[ ✘ ]*  El enlace proporcionado no es valida, verifique si el enlace es de *CapCut.*`}, { quoted: m });
}
let tipoVids = `•─• •⟤ \`CAP CUT\` ⟥• •─•

⊸⊹ *Título:* ${result.title}
⊸⊹ *Publicado:* ${result.date}
⊸⊹ *Usuario:* ${result.pengguna}
⊸⊹ *Likes:* ${result.likes}
⊸⊹ *Autor/a:* ${result.author.name}`;
await conn.sendMessage(m.chat, { video: { url: result.videoUrl }, caption: tipoVids }, { quoted: m })
//conn.sendFile(m.chat, result.videoUrl, '', cpt, m, { thumbnail: await fetch(result.posterUrl).then(res => res.buffer()) });
} catch (error) {
console.error(error);
conn.sendMessage(m.chat, { text: `⦗ ✘ ⦘ _Ocurrio un error con el comando: *${usedPrefix + command}*_\n- _Reporta el error al grupo de asistencia o usa el comando: *${usedPrefix}report*_` }, { quoted: m });
}};

handler.command = ["capcut", "ct"];
export default handler;

async function capcutdl(url) {
try {
const response = await fetch(url);
const html = await response.text();
const $ = cheerio.load(html);
const videoElement = $('video.player-o3g3Ag');
const videoSrc = videoElement.attr('src');
const posterSrc = videoElement.attr('poster');
const title = $('h1.template-title').text().trim();
const actionsDetail = $('p.actions-detail').text().trim();
const [date, uses, likes] = actionsDetail.split(',').map(item => item.trim());
const authorAvatar = $('span.lv-avatar-image img').attr('src');
const authorName = $('span.lv-avatar-image img').attr('alt');

if (!videoSrc || !posterSrc || !title || !date || !uses || !likes || !authorAvatar || !authorName) {
throw new Error('Algunos elementos importantes no se encontraron en la página.');
}

return {
title: title,
date: date,
pengguna: uses,
likes: likes,
author: {
name: authorName,
avatarUrl: authorAvatar
},
videoUrl: videoSrc,
posterUrl: posterSrc
};
} catch (error) {
console.error('Error al obtener los detalles del video:', error.message);
return null;
}
}
