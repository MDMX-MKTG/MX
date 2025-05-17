import yts from 'yt-search';
import fetch from 'node-fetch';

const handler = async (m, { conn, text, usedPrefix, command }) => {
if (!text) return conn.sendMessage(m.chat, { text: `*[ ? ]*  Ingrese el comando y escriba el nombre de la musica que busca.\n\n• *Por ejemplo:*\n${usedPrefix + command} Ethereal` }, { quoted: m });

const isVideo = /vid|2|mp4|v$/.test(command);
const search = await yts(text);

if (!search.all || search.all.length === 0) {
return conn.sendMessage(m.chat, { text: `*[ ✘ ]*  No se han encontrado resultados de la busqueda ( *${text}* ).`}, { quoted: m });
}

const videoInfo = search.all[0];
const bodys = `•─• •⟤ \`PLAY • YOUTUBE\` ⟥• •─•

⊸⊹ *Buscado en:* WhatsApp
⊸⊹ *Plataforma:* YouTube
⊸⊹ *Titulo:* ${videoInfo.title}
⊸⊹ *Vistas:* ${videoInfo.views}
⊸⊹ *Duracion:* ${videoInfo.timestamp}
⊸⊹ *Publicado:* ${videoInfo.ago}
⊸⊹ *Enlace:* ${videoInfo.url}`

if (m.isWABusiness) {
await conn.sendMessage(m.chat, { text: bodys + `\n\n*[ 📍 ]*  Puedes copiar el enlace y usar el comando *${usedPrefix}mp3* o *${usedPrefix}mp4* para descargarlo.`, contextInfo: { externalAdReply: { title: wm, body: '✓ Aplicacion encontrada.', thumbnailUrl: videoInfo.thumbnail, sourceUrl: null, mediaType: 1, showAdAttribution: true, renderLargerThumbnail: true }}} , { quoted: m });
} else {
await conn.sendMessage(m.chat, { image: { url: videoInfo.thumbnail }, caption: bodys, footer: '\n\n[ 📍 ]  Presione el boton segun lo que quieres.', buttons: [{ buttonId: `${usedPrefix}mp4 ${videoInfo.url}`, buttonText: { displayText: "⎋ VIDEO" }, type: 1 }, { buttonId: `${usedPrefix}mp3 ${videoInfo.url}`, buttonText: { displayText: "⎋ AUDIO" }, type: 1 }], viewOnce: true, headerType: 4 }, { quoted: m });
}};
handler.command = ["play", "yt"]
export default handler;

const getVideoId = (url) => {
const regex = /(?:v=|\/)([0-9A-Za-z_-]{11}).*/;
const match = url.match(regex);
if (match) {
return match[1];
}
throw new Error("Invalid YouTube URL");
};



