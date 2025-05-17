import fetch from 'node-fetch'
import yts from 'yt-search'
let handler = async (m, { conn, text, args, usedPrefix, command }) => {
if (!text) {
return conn.sendMessage(m.chat, { text: `*[ ? ]*Ingrese el comando mas el nombre de la cancion que busca.\n\n• *Por ejemplo:*\n${usedPrefix + command} Ethereal` }, { quoted: m })
}
let ytres = await search(args.join(" "))
if (!ytres.length) {
return conn.sendMessage(m.chat, { text: `*[ ✘ ]*  No se han encontrado resultados de la busqueda.\n- Intentalo de nuevo con otro nombre.`}, { quoted: m })
}

await conn.sendMessage(m.chat, { text: `ⴵ _Descargando el pedido, espere un momento..._` }, { quoted: m })
let mdmx = ytres[0]
let txt = `•─• •⟤ \`MP4 • YOUTUBE\` ⟥• •─•

⊸⊹ *Titulo:* ${mdmx.title}
⊸⊹ *Duracion:* ${mdmx.timestamp}
⊸⊹ *Publicado:* ${mdmx.ago}
⊸⊹ *Autor/a:* ${mdmx.author.name || 'Desconocido'}
⊸⊹ *Enlace:* ${mdmx.url}`
await conn.sendFile(m.chat, mdmx.image, 'thumbnail.jpg', txt, m)

try {
const resolution = '360'
const response = await fetch(`https://cloudkutube.eu/api/ytv?url=${encodeURIComponent(izumi.url)}&resolution=${resolution}`)
const data = await response.json()

if (data.status !== 'success') throw new Error('Fallo al obtener el vídeo.')

const title = data.result.title
const videoUrl = data.result.url

await conn.sendMessage(m.chat, { video: { url: videoUrl }, mimetype: "video/mp4", caption: txt }, { quoted: m })
} catch (error) {
console.error(error)
conn.sendMessage(m.chat, { text: `⦗ ✘ ⦘ _Ocurrio un error con el comando: *${usedPrefix + command}*_\n- _Reporta el error al grupo de asistencia o usa el comando: *${usedPrefix}report*_` }, { quoted: m })
}
}

handler.command = ["mp4", "video"]
export default handler

async function search(query, options = {}) {
let search = await yts.search({ query, hl: "es", gl: "ES", ...options })
return search.videos
}
