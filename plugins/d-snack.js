import axios from 'axios';
let handler = async (m, { conn, args, usedPrefix, command }) => {
if (!args[0]) {
return conn.sendMessage(m.chat, { text: `*[ ? ]*  Ingrese el comando mas un enlace de un video de *SnackVideo* para descargarlo.` }, { quoted: m });
}
if (!args[0].match(/snackvideo/gi)) {
return conn.sendMessage(m.chat, { text: `*[ ✘ ]*  Ocurrio un error, verifique si el enlace es de *SnackVideo* para descargarlo.`}, { quoted: m });
}
await conn.sendMessage(m.chat, { text: `ⴵ _Buscando resultados, espere un momento..._` }, { quoted: m });
try {
const response = await axios.get(`https://api.siputzx.my.id/api/d/snackvideo?url=${encodeURIComponent(args[0])}`);
const data = response.data;
if (data.status) {
const { videoUrl, title, description, creator, interaction } = data.data;
const videoResponse = await axios.get(videoUrl, { responseType: 'arraybuffer' });
// Mensaje detallado
const message = `
•─• •⟤ \`SNACK VIDEO\` ⟥• •─•

⊸⊹ *Título:* ${title}
⊸⊹ *Descripción:* ${description}
⊸⊹ *Creador:* ${creator.name}
⊸⊹ *Likes:* ${interaction.likes}
⊸⊹ *Vistas:* ${interaction.views}
⊸⊹ *Enlace:* ${data.data.url}`;
await conn.sendMessage(m.chat, { text: message, contextInfo: { externalAdReply: { title: wm, body: textoInfo, thumbnailUrl: creator.profileUrl, sourceUrl: null, mediaType: 1, showAdAttribution: true, renderLargerThumbnail: true }}} , { quoted: m });
conn.sendMessage(m.chat, { video: { url: videoResponse.data }, caption: `` }, { quoted: m });
//await conn.sendFile(m.chat, videoResponse.data, 'video.mp4', message, m, { quoted: m });
} else {
await conn.sendMessage(m.chat, { text: `*[ ✘ ]*  Ocurrio un error, eso tal vez se deba al enlace proporcionado o un error de syntaxis.`}, { quoted: m });
}
} catch (error) {
console.error(error);
conn.sendMessage(m.chat, { text: `⦗ ✘ ⦘ _Ocurrio un error con el comando: *${usedPrefix + command}*_\n- _Reporta el error al grupo de asistencia o usa el comando: *${usedPrefix}report*_` }, { quoted: m });
}};

handler.command = ['snack'];
export default handler;
