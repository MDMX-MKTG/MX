import axios from 'axios'

let handler = async (m, { conn, text }) => {
if (!text) return conn.sendMessage(m.chat, { text: `_¡Hola!_\n- _¡Para crear una imagen puedes mensionarme y escribir tu solicitud!_` }, { quoted: m })
await conn.sendMessage(m.chat, { text: `Voy a intentar crear eso, espere un momento...` }, { quoted: m })
try {
let img = await axios.get(`https://api.agungny.my.id/api/text2img?prompt=${text}`, { responseType: 'arraybuffer' })
await conn.sendMessage(m.chat, { image: Buffer.from(img.data), caption: `¡Aqui tienes tu imagen, espero te guste!\n- Si quieres mas, puedes solicitarmelos.` }, { quoted: m })
} catch (error) {
conn.sendMessage(m.chat, { text: `Lo siento, por el momento no puedo crear imagenes, intentalo pronto.` }, { quoted: m })
console.error(error)
}}

//handler.customPrefix = /@+54 9 3873 65-5135|@+5493873655135|@imagina/i
handler.command = ["imagina", "imagine"]
  //new RegExp

export default handler

