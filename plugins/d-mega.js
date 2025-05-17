import { File } from "megajs";
import mime from 'mime-types';
let handler = async (m, { conn, args, usedPrefix, text, command }) => {
try {
if (!text) return conn.sendMessage(m.chat, { text: `*[ ? ]*  Ingrese el comando mas un enlace de un archivo de *Mega* para descargarlo.` }, { quoted: m });
const file = File.fromURL(text);
await file.loadAttributes();
const fileExtension = file.name.split('.').pop().toLowerCase();
const mimeType = mime.lookup(fileExtension);
let caption = `•─• •⟤ \`MEGA\` ⟥• •─•
- _Resultado encontrado en *Mega*._

⊸⊹ *Nombre:* ${file.name}
⊸⊹ *Peso:* ${formatBytes(file.size)}
⊸⊹ *Paquete:* ${mimeType}
⊸⊹ *Descargado en:* WhatsApp
⊸⊹ *Plataforma:* Mega`.trim();
conn.sendMessage(m.chat, { text: caption, contextInfo: { externalAdReply: { title: wm, body: '✓ Descargando archivo, espere un momento...', thumbnailUrl: mxLogo, sourceUrl: null, mediaType: 1, showAdAttribution: true, renderLargerThumbnail: true }}} , { quoted: m });
if (file.size >= 1800000000 && !file.directory) return conn.sendMessage(m.chat, { text: `*[ ✘ ]*  Lo siento, el peso del archivo es mucho, no podra ser enviado.`}, { quoted: m });
const data = await file.downloadBuffer();
await conn.sendFile(m.chat, data, file.name, null, m, null, { mimeType, asDocument: true });
} catch (error) {
return conn.sendMessage(m.chat, { text: `⦗ ✘ ⦘ _Ocurrio un error con el comando: *${usedPrefix + command}*_\n- _Reporta el error al grupo de asistencia o usa el comando: *${usedPrefix}report*_` }, { quoted: m });
}
}

handler.command = /^(mega)$/i
export default handler

function formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}
