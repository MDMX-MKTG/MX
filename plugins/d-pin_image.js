import axios from 'axios'
let handler = async (m, { conn, text, usedPrefix, command }) => {
if (!text) return conn.sendMessage(m.chat, { text: `*[ ? ]*  Ingrese el comando y escriba lo que quiera buscar en *Pinterest*.\n\n• *Por ejemplo:*\n${usedPrefix + command} Universo.` }, { quoted: m })
await conn.sendMessage(m.chat, { text: `ⴵ _Buscando resultados, espere un momento..._` }, { quoted: m })
try {
let api = await axios.get(`https://api.siputzx.my.id/api/s/pinterest?query=${text}`)
let json = api.data
let data = json.data[Math.floor(Math.random() * json.data.length)]

let { pin, created_at, images_url, grid_title } = data
let MDMX = `
•─• •⟤ \`PINTEREST • IMAGE\` ⟥• •─•

⊸⊹ *Titulo:* ${grid_title}
⊸⊹ *Publicado en:* ${created_at}
⊸⊹ *Enlace:* ${pin}`
let numeroImgs = ``
let images = data.meta.media[0].images
conn.sendMessage(m.chat, { text: MDMX }, { quoted: m })
for (let i = 0; i < images.length; i++) {
await conn.sendMessage(m.chat, { image: { url: images[i] }, caption: `*[ 🖼️ ]* pinterest-${i + 1}.jpg` }, { quoted: m })
}
//await conn.sendFile(m.chat, images[i], `image${i + 1}.jpeg`, ``, m)
//await conn.sendMessage(m.chat, { image: images_url, caption: HS, footer: '', buttons: [ { buttonId: `.pinterest ${text}`, buttonText: { displayText: 'Siguiente' } }, ], viewOnce: true, headerType: 4 }, { quoted: m })
} catch (error) {
conn.sendMessage(m.chat, { text: `⦗ ✘ ⦘ _Ocurrio un error con el comando: *${usedPrefix + command}*_\n- _Reporta el error al grupo de asistencia o usa el comando: *${usedPrefix}report*_` }, { quoted: m })
console.error(error)
}}

handler.command = ['pinimg']
export default handler


/*
import axios from 'axios'
let handler = async(m, { conn, text, usedPrefix, command }) => {
if (!text) return conn.sendMessage(m.chat, { text: `*[ ? ]*  Ingrese el comando y escriba lo que quiera buscar en *Pinterest.*\n\n• *Por ejemplo:*\n${usedPrefix + command} Fondo de paisajes.` }, { quoted: m })
await conn.sendMessage(m.chat, { text: `ⴵ _Buscando resultados, espere un momento..._` }, { quoted: m });
let contenidos = `
•─• •⟤ \`PINTEREST\` ⟥• •─•
- _Resultados encontrados en *Pinterest.*_

⊸⊹ *Descargador:* Bot
⊸⊹ *Plataforma:* Pinterest
⊸⊹ *Tipo:* Buscador`;
try {
let response = await axios.get(`https://api.dorratz.com/v2/pinterest?q=${text}`);
let searchResults = response.data; 
let selectedResults = searchResults.slice(0, 9); 
if (m.isWABusiness) {
const medias = selectedResults.map(result => ({image: { url: result.image }, caption: wm || text }));
await conn.sendAlbumMessage(m.chat, medias, { quoted: m, delay: 2000, caption: `${contenidos}` });
} else {
let messages = selectedResults.map(result => [
``,
`${contenidos}\n⊸⊹ *Usuario:* ${result.fullname || text}\n⊸⊹ *Autor/a:* ${result.upload_by}\n⊸⊹ *Seguidores:* ${result.followers}`, 
result.image 
]);
await conn.sendCarousel(m.chat, `⊸⎔ BUSCADOR : PINTEREST`, "- Resultados encontrados.", messages, m);
}
} catch {
try {
let response = await axios.get(`https://api.siputzx.my.id/api/s/pinterest?query=${encodeURIComponent(text)}`);
if (!response.data.status) return await conn.sendMessage(m.chat, { text: `*[ ✘ ]*  No se han encontrado resultados sobre ( *${text}* ), intente con otra busqueda.`}, { quoted: m });
let searchResults = response.data.data; 
let selectedResults = searchResults.slice(0, 6); 
let messages = selectedResults.map(result => [result.grid_title || text, gt, result.images_url]);
await conn.sendCarousel(m.chat, `⊸⎔ BUSCADOR : PINTEREST`, "- Resultados encontrados.", messages, m);
} catch {
try {
let { data: response } = await axios.get(`${apis}/search/pinterestv2?text=${encodeURIComponent(text)}`);
if (!response.status || !response.data || response.data.length === 0) return conn.sendMessage(m.chat, { text: `*[ ✘ ]*  No se han encontrado resultados sobre ( *${text}* ), intente con otra busqueda.`}, { quoted: m });
let searchResults = response.data;
let selectedResults = searchResults.slice(0, 6);
let messages = selectedResults.map(result => [
wm || null, `${contenidos}\n⊸⊹ *Autor/a:* ${result.name}\n⊸⊹ *Usuario:* @${result.username}`, result.image]);
await conn.sendCarousel(m.chat, `⊸⎔ BUSCADOR : PINTEREST`, "- Resultados encontrados.", messages, m);
} catch (e) {
await conn.sendMessage(m.chat, { text: `⦗ ✘ ⦘ _Ocurrio un error con el comando: *${usedPrefix + command}*_\n- _Reporta el error al grupo de asistencia o usa el comando: *${usedPrefix}report*_` }, { quoted: m });
console.log(e)

}}}}
handler.command = ["pin", "pinterest"]
export default handler
*/