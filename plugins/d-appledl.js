import axios from 'axios'
let handler = async (m, { conn, args, usedPrefix, command }) => {
if (!args[0]) return conn.sendMessage(m.chat, { text: `*[ ? ]*  Ingrese el comando mas un enlace de un audio de *Apple Music* para descargarlo.` }, { quoted: m })
try {
await conn.sendMessage(m.chat, { text: `ⴵ _Buscando resultados, espere un momento..._` }, { quoted: m })
let api = await axios.get(`https://restapi.apibotwa.biz.id/api/appledl?url=${args[0]}`)
let json = api.data
let { name, albumname, artist, thumb, duration, url, download } = json.result
let tipoAuds = `
•─• •⟤ \`APPLE MUSIC\` ⟥• •─•

⊸⊹ *Titulo:* ${name}
⊸⊹ *Artista:* ${artist}
⊸⊹ *Duracion:* ${duration}
⊸⊹ *Album:* ${albumname}
⊸⊹ *Enlace:* ${url}

*[ 📍 ]* Enviando el audio, espere un momento...`
conn.sendMessage(m.chat, { text: tipoAuds, contextInfo: { externalAdReply: { title: wm, body: textoInfo, thumbnailUrl: thumb, sourceUrl: null, mediaType: 1, showAdAttribution: true, renderLargerThumbnail: true }}} , { quoted: m }) 
conn.sendMessage(m.chat, { audio: { url: download } }, caption: null { quoted: m })
} catch (error) {
console.error(error)
conn.sendMessage(m.chat, { text: `⦗ ✘ ⦘ _Ocurrio un error con el comando: *${usedPrefix + command}*_\n- _Reporta el error al grupo de asistencia o usa el comando: *${usedPrefix}report*_` }, { quoted: m })
}}

handler.command = ['appledl', 'apple']

export default handler
