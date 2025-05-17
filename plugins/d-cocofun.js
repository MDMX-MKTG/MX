import fetch from "node-fetch"
let handler = async (m, { text, conn, args, usedPrefix, command }) => {
if (!args[0]) {
return conn.sendMessage(m.chat, { text: `*[ ? ]*  Ingrese el comando mas un enlace de un video o imagen de *CocoFun* para descargarlo.` }, { quoted: m })
}
try {
await conn.sendMessage(m.chat, { text: `ⴵ _Descargando el pedido, espere un momento..._` }, { quoted: m })
let api = await fetch(`https://api.agatz.xyz/api/cocofundl?url=${args[0]}`)
let json = await api.json()
let { title, description, image, video, topic, caption, play, like, share, duration, thumbnail, watermark, no_watermark } = json.data
let processedUrls = new Set()
for (let a of api.data.data) {
if (!processedUrls.has(a.url)) {
processedUrls.add(a.url)
if (a.url.includes('jpg') || a.url.includes('png') || a.url.includes('jpeg') || a.url.includes('webp') || a.url.includes('heic') || a.url.includes('tiff') || a.url.includes('bmp')) {
let tipoImgs = `
•─• •⟤ \`COCOFUN\` ⟥• •─•

⊸⊹ *Descargado en:* WhatsApp
⊸⊹ *Plataforma:* Instagram
⊸⊹ *Descargador:* Bot
⊸⊹ *Fecha:* ${botdate}
⊸⊹ *Tipo:* Imagen`
await conn.sendMessage(m.chat, { image: { url: a.url }, caption: tipoImgs }, { quoted: m })
} else {
let tipoVids = `
•─• •⟤ \`COCOFUN\` ⟥• •─•

⊸⊹ *Descargado en:* WhatsApp
⊸⊹ *Plataforma:* Instagram
⊸⊹ *Descargador:* Bot
⊸⊹ *Fecha:* ${botdate}
⊸⊹ *Tipo:* Video`;
await conn.sendMessage(m.chat, { video: { url: a.url }, caption: tipoVids }, { quoted: m })
}}}} else {
let tipoImgs2 = `
•─• •⟤ \`COCOFUN\` ⟥• •─•

⊸⊹ *Descargado en:* WhatsApp
⊸⊹ *Plataforma:* Instagram
⊸⊹ *Descargador:* Bot
⊸⊹ *Fecha:* ${botdate}
⊸⊹ *Tipo:* Imagen`
await conn.sendMessage(m.chat, { image: { url: image }, caption: tipoImgs2 }, { quoted: m });
} else { 
let tipoVids2 = `
•─• •⟤ \`COCOFUN\` ⟥• •─•

⊸⊹ *Descargado en:* WhatsApp
⊸⊹ *Plataforma:* Instagram
⊸⊹ *Descargador:* Bot
⊸⊹ *Fecha:* ${botdate}
⊸⊹ *Tipo:* Video`;
await conn.sendMessage(m.chat, { video: { url: no_watermark }, caption: tipoVids2 }, { quoted: m })
} catch (error) {
console.error(error)
conn.sendMessage(m.chat, { text: `⦗ ✘ ⦘ _Ocurrio un error con el comando: *${usedPrefix + command}*_\n- _Reporta el error al grupo de asistencia o usa el comando: *${usedPrefix}report*_` }, { quoted: m })
}
}
handler.command = ['cocofundl']

export default handler