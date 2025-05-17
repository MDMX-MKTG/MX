import fs from 'fs';
import fetch from 'node-fetch';
let apkSession = new Map();
let handler = async (m, { conn, text, usedPrefix, command, args }) => {
  if (command === 'apk' && text) {
const reactionMessage = await conn.sendMessage(m.chat, { text: `_ⴵ Buscando resultados, espere un momento..._` }, { quoted: m })
try {
const response = await fetch(`https://delirius-apiofc.vercel.app/download/apk?query=${encodeURIComponent(text)}`);
const data = await response.json();
if (!data.status || !data.data)
  throw new Error("No se encontró la aplicación.");
const app = data.data;
apkSession.set(m.chat, { app });
let description = `
•─• •⟤ \`PLAY • STORE\` ⟥• •─•

⊸⊹ *Nombre* ${app.name}
⊸⊹ *Paquete:* ${app.id}
⊸⊹ *Actualizado en:* ${app.publish}
⊸⊹ *Tamaño total:* ${app.size}
⊸⊹ *Descargas:* ${app.stats.downloads.toLocaleString()}
⊸⊹ *Estrellas:* ${app.stats.rating.average}`;
if (m.isWABusiness) {
await conn.sendMessage(m.chat, { text: description + `\n\n*[ 📍 ]*  Si esta es la aplicacion que busca, responda a este mensaje con el siguiente comando.\n\n• *Por ejemplo:*\n${usedPrefix + command} si\n${usedPrefix + command} -y`, contextInfo: { externalAdReply: { title: wm, body: '✓ Aplicacion encontrada.', thumbnailUrl: app.image, sourceUrl: null, mediaType: 1, showAdAttribution: true, renderLargerThumbnail: true }}} , { quoted: m });
} else {
await conn.sendMessage(m.chat, { image: { url: app.image }, caption: description, footer: 'Presione el boton de descarga.', buttons: [{ buttonId: `.apk -y`, buttonText: { displayText: "⎋ Descargar" }, type: 1 }], viewOnce: true, headerType: 4 }, { quoted: m });
};
return;
 }

if (args[0] === 'si' || args[0] === '-y') {
let session = apkSession.get(m.chat);
if (!session) {
return conn.sendMessage(m.chat, { text: `*[ ✘ ]*  Debes realizar una busqueda primero para despues descargarlo con este comando.\n\n• *Busque usando el comando:*\n${usedPrefix + command}`}, { quoted: m });
}
let { app } = session;
const downloadUrl = app.download;
await conn.sendMessage(m.chat, { text: `ⴵ _Descargando el pedido, espere un momento..._` }, { quoted: m });
await conn.sendMessage(m.chat, { document: { url: downloadUrl }, mimetype: "application/vnd.android.package-archive", fileName: `${app.name}.apk`, caption: `❒ *Nombre:* ${app.name}\n❒ *Fecha:* ${botdate}\n❒ *Bot:* ${wm}` }, { quoted: m });
return;
  }


  if (command === 'apk' && !text) {
return conn.sendMessage(m.chat, { text: `*[ ? ]*  Ingrese el comando y escriba el nombre de la aplicacion que desea buscar.\n\n• *Por ejemplo:*\n${usedPrefix + command} WhatsApp` }, { quoted: m })
}
};

handler.command = /^(apk|app|aplicacion)$/i;
export default handler;

