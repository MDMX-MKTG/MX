import fetch from 'node-fetch'

let handler = async (m, { conn, usedPrefix, command, args }) => {
if (!args[0]) return conn.sendMessage(m.chat, { text: `*[ ? ]*  Ingrese el comando mas un enlace de un video o imagenes de *TikTok* para descargarlo.` }, { quoted: m })
await conn.sendMessage(m.chat, { text: `ⴵ _Buscando resultados, espere un momento..._` }, { quoted: m })
try {
let api = await fetch(`https://deliriussapi-oficial.vercel.app/download/tiktok?url=${args[0]}`)
let json = await api.json()
let { data, process } = json
let contenidos = `
•─• •⟤  \`TIKTOK • VIDEO\`  ⟥• •─•
- ${data.title || "Sin titulo."}

⊸⊹ *Autor/a:* ${data.author.username} ( @${data.author.nickname} )
⊸⊹ *Duración:* ${data.duration}
⊸⊹ *Repro:* ${data.repro}
⊸⊹ *Likes:* ${data.like}
⊸⊹ *Compartidos:* ${data.share}
⊸⊹ *Comentarios:* ${data.comment}
⊸⊹ *Descargas:* ${data.download}
⊸⊹ *Publicado:* ${data.published}
⊸⊹ *Tipo:* Video

•─• ⟤ *MUSICA:*
⊸⊹ *Titulo:* ${data.music.title}
⊸⊹ *Autor/a:* ${data.music.author}
⊸⊹ *Duración:* ${data.music.duration}`

let tipoArchivo = data.meta.media[0].type

if (tipoArchivo === "video") {
await conn.sendFile(m.chat, data.meta.media[0].hd, 'video.mp4', contenidos, m)
} else if (tipoArchivo === "image") {
let numeroImgs = ``
let images = data.meta.media[0].images
for (let i = 0; i < images.length; i++) {
await conn.sendFile(m.chat, images[i], `image${i + 1}.jpeg`, ``, m)
}}

} catch (error) {
console.error(error)
}}

handler.command = /^(tiktok|tt)$/i;

export default handler

