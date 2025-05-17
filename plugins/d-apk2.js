import {search, download} from 'aptoide-scraper';
import axios from 'axios';
import cheerio from 'cheerio';
const handler = async (m, {conn, usedPrefix, command, text}) => {
if (!text) return conn.sendMessage(m.chat, { text: `*[ ? ]*  Ingrese el comando y escriba el nombre de la aplicacion para buscarlo.\n\n• *Por ejemplo:*\n${usedPrefix + command} WhatsApp` }, { quoted: m });
await conn.sendMessage(m.chat, { text: `_ⴵ Buscando resultados, espere un momento..._` }, { quoted: m });
let tituloseg = `•─• •⟤ \`PLAY • STORE 2\` ⟥• •─•`
try {    
const res = await fetch(`https://api.dorratz.com/v2/apk-dl?text=${text}`);
const data = await res.json();
let response = `${tituloseg}
- _Resultado encontrado en *Play Store*._

⊸⊹ *Nombre:* ${data.name}
⊸⊹ *Paquete:* ${data.package}
⊸⊹ *Actualizado en:* ${data.lastUpdate}
⊸⊹ *Peso:* ${data.size}`
await conn.sendFile(m.chat, data.icon, 'error.jpg', response, m);
const apkSize = data.size.toLowerCase();
if (apkSize.includes('gb') || (apkSize.includes('mb') && parseFloat(apkSize) > 999)) {
return await conn.sendMessage(m.chat, { text: `*[ ✘ ]*  Lo siento, el apk es demasiado pesada, ingrese otro nombre de aplicacion que su peso no supere a los 999MB.`}, { quoted: m })
}
await conn.sendMessage(m.chat, {document: { url: data.dllink }, mimetype: 'application/vnd.android.package-archive', fileName: `${data.name}.apk`, caption: null }, { quoted: m });
} catch {
try {
const res = await fetch(`${apis}/download/apk?query=${text}`);
const data = await res.json();
if (!data.status || !data.data) throw 'error'
const apkData = data.data;
let response = `${tituloseg}
- _Resultado encontrado en *Play Store*._

⊸⊹ *Nombre:* ${apkData.name}
⊸⊹ *Paquete:* ${apkData.developer}
⊸⊹ *Actualizado en:* ${apkData.publish}
⊸⊹ *Peso:* ${apkData.size}`
await conn.sendMessage(m.chat, {image: {url: apkData.image}, caption: response}, {quoted: m});
if (apkData.size.includes('GB') || parseFloat(apkData.size.replace(' MB', '')) > 999) {
return await conn.sendMessage(m.chat, { text: `*[ ✘ ]*  Lo siento, el apk es demasiado pesada, ingrese otro nombre de aplicacion que su peso no supere a los 999MB.`}, { quoted: m })}
await conn.sendMessage(m.chat, {document: { url: apkData.download }, mimetype: 'application/vnd.android.package-archive', fileName: `${apkData.name}.apk`, caption: null }, { quoted: m });
} catch (error) {
try {
const searchA = await search(text);
const data5 = await download(searchA[0].id);
let response = `${tituloseg}
- _Resultado encontrado en *Play Store*._

⊸⊹ *Nombre:* ${data5.name}
⊸⊹ *Paquete:* ${data5.package}
⊸⊹ *Actualizado en:* ${data5.lastup}
⊸⊹ *Peso:* ${data5.size}`
await conn.sendMessage(m.chat, {image: {url: data5.icon}, caption: response}, {quoted: m});
if (data5.size.includes('GB') || data5.size.replace(' MB', '') > 999) {
return await conn.sendMessage(m.chat, { text: `*[ ✘ ]*  Lo siento, el apk es demasiado pesada, ingrese otro nombre de aplicacion que su peso no supere a los 999MB.`}, { quoted: m })}
await conn.sendMessage(m.chat, {document: {url: data5.dllink}, mimetype: 'application/vnd.android.package-archive', fileName: data5.name + '.apk', caption: null}, {quoted: m}); 
} catch (e) {
await conn.sendMessage(m.chat, { text: `⦗ ✘ ⦘ _Ocurrio un error con el comando: *${usedPrefix + command}*_\n- _Reporta el error al grupo de asistencia o usa el comando: *${usedPrefix}report*_` }, { quoted: m })
console.log(e)
}}}}
handler.command = /^(apk2|aplicacion2|app2)$/i;
export default handler;

async function searchApk(text) {
  const response = await axios.get(`${apkpureApi}${encodeURIComponent(text)}`);
  const data = response.data;
  return data.results;
}

async function downloadApk(id) {
  const response = await axios.get(`${apkpureDownloadApi}${id}`);
  const data = response.data;
  return data;
}
