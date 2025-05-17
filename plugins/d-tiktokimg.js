import fetch from 'node-fetch'

let handler = async(m, { conn, text, usedPrefix, command }) => {
if (!text) return conn.sendMessage(m.chat, { text: `*[ ? ]*  Ingrese el comando mas un enlace de imagenes en *TikTok* para descargarlos.` }, { quoted: m })
if (!(text.includes('http://') || text.includes('https://'))) return conn.sendMessage(m.chat, { text: `*[ ✘ ]*  El enlace que has ingresado no es valido, intentelo de nuevo.`}, { quoted: m })
if (!text.includes('tiktok.com')) return conn.sendMessage(m.chat, { text: `*[ ✘ ]*  El enlace que has ingresado no es un enlace de *TikTok*, intentalo de nuevo.`}, { quoted: m })
let contenido = `
•─• •⟤ \`TIKTOK • IMAGE\` ⟥• •─•
- _Resultados encontrados en *TikTok*._

⊸⊹ *Descargado en:* WhatsApp
⊸⊹ *Plataforma:* TikTok
⊸⊹ *Descargador:* Bot
⊸⊹ *Fecha:* ${botdate}
⊸⊹ *Formato:* Imagenes`
try {
let res = await fetch(`https://api.lolhuman.xyz/api/tiktokslide?apikey=${global.lolkeysapi}&url=${text}`)
let anu = await res.json()
if (anu.status != '200') throw Error(anu.message)
anu = anu.result
if (anu.length == 0) throw Error('Error : no data')
let c = 0 
for (let x of anu) {
if (c == 0) await conn.sendMessage(m.chat, { image: { url: x }, caption: contenido }, { quoted : m })
else await conn.sendMessage(m.sender, { image: { url: x } }, { quoted : m })
c += 1
}
} catch (e) {
await conn.sendMessage(m.chat, { text: `⦗ ✘ ⦘ _Ocurrio un error con el comando: *${usedPrefix + command}*_\n- _Reporta el error al grupo de asistencia o usa el comando: *${usedPrefix}report*_` }, { quoted: m })
console.log(e)

}}
handler.command = ["tti", "tiktokimg"]
export default handler
