import fetch from 'node-fetch'
let handler = async (m, { conn, usedPrefix, command, text }) => {
if (!text) return conn.sendMessage(m.chat, { text: `*[ ? ]*  Ingrese el comando mas un enlace de un video de *Likee* para descargarlo.` }, { quoted: m })
try {
await conn.sendMessage(m.chat, { text: `ⴵ _Descargando el pedido, espere un momento..._` }, { quoted: m })
let app = await fetch(`https://apis-starlights-team.koyeb.app/starlight/like-downloader?url=${text}`, { headers: { 'Content-Type': 'application/json' }})
let json = await app.json()
let video = json.links['no watermark']
let tipoVids = `•─• •⟤ \`LIKEE\` ⟥• •─•

⊸⊹ *Descargado en:* WhatsApp
⊸⊹ *Plataforma:* Likee
⊸⊹ *Descargador:* Bot
⊸⊹ *Tipo:* Video`
await conn.sendMessage(m.chat, { video: { url: video }, caption: tipoVids }, { quoted: m })
} catch {
conn.sendMessage(m.chat, { text: `⦗ ✘ ⦘ _Ocurrio un error con el comando: *${usedPrefix + command}*_\n- _Reporta el error al grupo de asistencia o usa el comando: *${usedPrefix}report*_` }, { quoted: m })
}}

handler.command = ["likee", "lk"]
export default handler

