import axios from 'axios'
import fetch from 'node-fetch'
import cheerio from 'cheerio'
let handler = async (m, { conn, args, usedPrefix, command }) => {
if (!args[0]) return conn.sendMessage(m.chat, { text: `*[ ? ]*  Ingrese el comando mas un enlace valido de un archivo de *Mediafire* para descargarlo.` }, { quoted: m })
await conn.sendMessage(m.chat, { text: `ⴵ _Buscando resultados, espere un momento..._` }, { quoted: m })
try {  
const res = await fetch(`https://api.agatz.xyz/api/mediafire?url=${args}`)
const data = await res.json();
const caption = `•─• •⟤ \`MEDIAFIRE\` ⟥• •─•
- _Resultados sobre la busqueda en *Mediafire*._

⊸⊹ *Descargado en:* WhatsApp
⊸⊹ *Plataforma:* Mediafire
⊸⊹ *Descargador:* Bot
⊸⊹ *Nombre:* ${data.data.nama}
⊸⊹ *Peso:* ${data.data.size}
⊸⊹ *Paquete:* ${data.data.mime}
`.trim();
conn.sendMessage(m.chat, { text: caption, contextInfo: { externalAdReply: { title: wm, body: '✓ Descargando archivo, espere un momento por favor...', thumbnailUrl: mxLogo, sourceUrl: null, mediaType: 1, showAdAttribution: true, renderLargerThumbnail: true }}} , { quoted: m });
conn.sendFile(m.chat, data.data.link, data.data.nama, '', m, null, {mimetype: data.data.mime, asDocument: true, 
});
} catch {
try {
const res = await fetch(`${global.APIs.fgmods.url}/downloader/mediafire?url=${args[0]}&apikey=${global.APIs.fgmods.key}`);
const data = await res.json();
const fileData = data.result;
const caption = `•─• •⟤ \`MEDIAFIRE\` ⟥• •─•
- _Resultados sobre la busqueda en *Mediafire*._

⊸⊹ *Descargado en:* WhatsApp
⊸⊹ *Plataforma:* Mediafire
⊸⊹ *Descargador:* Bot
⊸⊹ *Nombre:* ${fileData.title}
⊸⊹ *Peso:* ${fileData.filesize}
⊸⊹ *Paquete:* ${fileData.mimetype}
`.trim();
conn.sendMessage(m.chat, { text: caption, contextInfo: { externalAdReply: { title: wm, body: '✓ Descargando archivo, espere un momento por favor...', thumbnailUrl: mxLogo, sourceUrl: null, mediaType: 1, showAdAttribution: true, renderLargerThumbnail: true }}} , { quoted: m });
await conn.sendFile(m.chat, fileData.url, fileData.title, '', m, null, {mimetype: fileData.mimetype, asDocument: true });
} catch (error) {
try {
const res = await fetch(`https://api.siputzx.my.id/api/d/mediafire?url=${args[0]}`);
if (!res.ok) throw new Error(`Error en la API 1: ${res.statusText}`);
const data = await res.json();
if (!data.status || !data.data) return 
const fileDataArray = data.data;
for (const fileData of fileDataArray) {
const caption = `•─• •⟤ \`MEDIAFIRE\` ⟥• •─•
- _Resultados sobre la busqueda en *Mediafire*._

⊸⊹ *Descargado en:* WhatsApp
⊸⊹ *Plataforma:* Mediafire
⊸⊹ *Descargador:* Bot
⊸⊹ *Nombre:* ${fileData.filename}
⊸⊹ *Peso:* ${fileData.size}
⊸⊹ *Peso:* ${fileData.mime}`.trim(); 
conn.sendMessage(m.chat, { text: caption, contextInfo: { externalAdReply: { title: wm, body: '✓ Descargando archivo, espere un momento por favor...', thumbnailUrl: mxLogo, sourceUrl: null, mediaType: 1, showAdAttribution: true, renderLargerThumbnail: true }}} , { quoted: m });
await conn.sendFile(m.chat, fileData.link, fileData.filename, '', m, null, {mimetype: fileData.mime, asDocument: true });
}
} catch (error) {
try {
const res = await fetch(`${apis}/api/mediafire?url=${args[0]}`);
if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
const data = await res.json();
const fileDataArray = data.data;
fileDataArray.forEach((fileData) => {
let caption = `•─• •⟤ \`MEDIAFIRE\` ⟥• •─•
- _Resultados sobre la busqueda en *Mediafire*._

⊸⊹ *Descargado en:* WhatsApp
⊸⊹ *Plataforma:* Mediafire
⊸⊹ *Descargador:* Bot
⊸⊹ *Nombre:* ${fileData.filename}
⊸⊹ *Peso:* ${fileData.size}
⊸⊹ *Paquete:* ${fileData.mime}`.trim()
conn.sendMessage(m.chat, { text: caption, contextInfo: { externalAdReply: { title: wm, body: '✓ Descargando archivo, espere un momento por favor...', thumbnailUrl: mxLogo, sourceUrl: null, mediaType: 1, showAdAttribution: true, renderLargerThumbnail: true }}} , { quoted: m });
conn.sendFile(m.chat, fileData.link, fileData.filename, '', m, null, {mimetype: fileData.mime, asDocument: true, 
});
});
} catch (error) {
try {
let res = await mediafireDl(args[0])
let { name, size, date, mime, link } = res
let caption = `•─• •⟤ \`MEDIAFIRE\` ⟥• •─•
- _Resultados sobre la busqueda en *Mediafire*._

⊸⊹ *Descargado en:* WhatsApp
⊸⊹ *Plataforma:* Mediafire
⊸⊹ *Descargador:* Bot
⊸⊹ *Nombre:* ${name}
⊸⊹ *Peso:* ${size}
⊸⊹ *Paquete:* ${mime}`.trim()
conn.sendMessage(m.chat, { text: caption, contextInfo: { externalAdReply: { title: wm, body: '✓ Descargando archivo, espere un momento por favor...', thumbnailUrl: mxLogo, sourceUrl: null, mediaType: 1, showAdAttribution: true, renderLargerThumbnail: true }}} , { quoted: m });
await conn.sendFile(m.chat, link, name, '', m, null, { mimetype: mime, asDocument: true })
} catch (e) {
await conn.sendMessage(m.chat, { text: `⦗ ✘ ⦘ _Ocurrio un error con el comando: *${usedPrefix + command}*_\n- _Reporta el error al grupo de asistencia o usa el comando: *${usedPrefix}report*_` }, { quoted: m })
console.log(e)
}}}}}}
handler.command = ["mediafire"]
export default handler

async function mediafireDl(url) {
const res = await axios.get(`https://www-mediafire-com.translate.goog/${url.replace('https://www.mediafire.com/','')}?_x_tr_sl=en&_x_tr_tl=fr&_x_tr_hl=en&_x_tr_pto=wapp`)
const $ = cheerio.load(res.data)
const link = $('#downloadButton').attr('href')
const name = $('body > main > div.content > div.center > div > div.dl-btn-cont > div.dl-btn-labelWrap > div.promoDownloadName.notranslate > div').attr('title').replaceAll(' ','').replaceAll('\n','')
const date = $('body > main > div.content > div.center > div > div.dl-info > ul > li:nth-child(2) > span').text()
const size = $('#downloadButton').text().replace('Download', '').replace('(', '').replace(')', '').replace('\n', '').replace('\n', '').replace('                         ', '').replaceAll(' ','')
let mime = ''
let rese = await axios.head(link)
mime = rese.headers['content-type']
return { name, size, date, mime, link }
}
