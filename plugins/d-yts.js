import yts from 'yt-search'
let handler = async (m, {conn, usedPrefix, command, text }) => {
if (!text) return conn.sendMessage(m.chat, { text: `*[ ? ]*  Ingrese el comando y escriba cualquier cosa para buscarlo en *YouTube.*\n\n• *Por ejemplo:*\n${usedPrefix + command} Ethereal` }, { quoted: m })
  let results = await yts(text)
let tes = results.videos
let ms = tes.map(v => `⊸⊹ *Titulo:* ${v.title}
⊸⊹ *Duracion:* ${v.timestamp}
⊸⊹ *Publicado en:* ${v.ago}
⊸⊹ *Vistas:* ${v.views.toLocaleString()}
⊸⊹ *Enlace:* ${v.url}`.trim()).join('\n\n')
let teks = `•─• •⟤ \`YOUTUBE • PLAYS\` ⟥• •─•\n- _Resultados encontrados en *YouTube.*\n\n*[ 📍 ]* Puedes copiar el enlace y usar el comando *${usedPrefix}mp3* o *${usedPrefix}mp4* para descargarlo.\n⊹───────────────⊹\n\n${ms}`
teks += `\n\n> ${textoInfo}`
conn.sendMessage(m.chat, { text: teks, contextInfo: { externalAdReply: { title: wm, body: textoInfo, thumbnailUrl: tes[0].image, sourceUrl: null, mediaType: 1, showAdAttribution: true, renderLargerThumbnail: true }}} , { quoted: m })
}
handler.command = ['playlist', 'yts'] 

export default handler
//Undefined.
