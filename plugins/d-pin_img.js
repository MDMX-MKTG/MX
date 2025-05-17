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
