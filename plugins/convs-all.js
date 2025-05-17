let { downloadContentFromMessage } = (await import('@whiskeysockets/baileys'));
import fs from 'fs';
import { ffmpeg, toAudio } from '../lib/converter.js';
import FormData from 'form-data';
import axios from 'axios';
import fetch from 'node-fetch';
import jimp from "jimp";
import { JSDOM } from 'jsdom';
import uploadFile from '../lib/uploadFile.js';
import upload from '../lib/uploadFile2.js';
import uploadImage from '../lib/uploadImage.js';
import { toDataURL } from 'qrcode';
import { webp2png } from '../lib/webp2mp4.js';
let handler = async (m, { conn, text, args, usedPrefix, command }) => {
const q = m.quoted ? m.quoted : m;
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender

if (!args[0]) {
let listaConv = `⫶☰ *CONVERTIDORES:*

● *${usedPrefix + command}* url
● *${usedPrefix + command}* url2
● *${usedPrefix + command}* url3
● *${usedPrefix + command}* timg
● *${usedPrefix + command}* mp3
● *${usedPrefix + command}* note
● *${usedPrefix + command}* gif
● *${usedPrefix + command}* cap
● *${usedPrefix + command}* style
● *${usedPrefix + command}* length
● *${usedPrefix + command}* hd
● *${usedPrefix + command}* digit
● *${usedPrefix + command}* view
● *${usedPrefix + command}* vcard`
await conn.sendMessage(m.chat, { text: `● _Ingrese el comando mas el tipo de convertidor para usarlo._\n- _Te dejo una lista de todos los convertidores posibles para que puedas probar._\n\n${listConv}\n\n• *Por ejemplo:*\n${usedPrefix + command} style MDMX` }, { quoted: m })
} else if (args[0] === 'url' || args[0] === 'enlace' || args[0] === 'link') {
const mime = (q.msg || q).mimetype || '';
let resEnlace = `
•─• •⟤ \`CONVERTIDOR\` ⟥• •─•

⊸⊹ *Comando:* ${usedPrefix + command} ${args[0]}
⊸⊹ *Tipo:* Imagen
⊸⊹ *Fecha:* ${botdate}
⊸⊹ *Hecho:* Enlace`
if (!mime) return conn.sendMessage(m.chat, { text: `● _Ingrese el comando y responda a una imagen para convertirlo en un enlace._` }, { quoted: m });
const media = await q.download();
try {
await conn.sendMessage(m.chat, { text: `ⴵ _Obteniendo resultados, espere un momento..._` }, { quoted: m });
const isTele = /image\/(png|jpe?g|gif)|video\/mp4/.test(mime);
const link = await (isTele ? uploadImage : uploadFile)(media);
conn.sendMessage(m.chat, { text: `${resEnlace}\n⊸⊹ *Enlace:* ${link}` }, { quoted: m });
} catch (e) {
try {
const link = await upload(media);
conn.sendMessage(m.chat, { text: `${resEnlace}\n⊸⊹ *Enlace:* ${link}` }, { quoted: m });
} catch (e) {
conn.sendMessage(m.chat, { text: `⦗ ✘ ⦘ _Ocurrio un error con el comando: *${usedPrefix + command} ${args[0]}*_\n- _Reporta el error al grupo de asistencia o usa el comando: *${usedPrefix}report*_` }, { quoted: m });
console.log(e)
}}
} else if (args[0] === 'url2' || args[0] === 'enlace2' || args[0] === 'link2') {
let mime = (q.msg || q).mimetype || ''
if (!mime) return conn.sendMessage(m.chat, {text: `● _Ingrese el comando y responda a una imagen para convertirlo en un enlace._`}, { quoted: m })
await conn.sendMessage(m.chat, { text: `ⴵ _Obteniendo resultados, espere un momento..._` }, { quoted: m })
let media = await q.download()
let isMedia = /image\/(png|jpe?g|gif)|video\/mp4/.test(mime)
let link = await (isMedia ? uploadImage : uploadImage)(media)
let source = await jimp.read(await link)
let height = await source.getHeight()
let width = await source.getWidth()
let xXRelt = `•─• •⟤ \`CONVERTIDOR\` ⟥• •─•

⊸⊹ *Comando:* ${usedPrefix + command} ${args[0]}
⊸⊹ *Tipo:* Imagen
⊸⊹ *Fecha:* ${botdate}
⊸⊹ *Anchura:* ${width}
⊸⊹ *Altura:* ${height}
⊸⊹ *Enlace:* ${link}`
await conn.sendMessage(m.chat, {text: xXRelt}, { quoted: m })
} else if (args[0] === 'url3' || args[0] === 'enlace3' || args[0] === 'link3') {
let mime = (q.msg || q).mimetype || ''
if (!mime.startsWith('image/')) {
return conn.sendMessage(m.chat, { text: `● _Ingrese el comando y responda a una imagen para convertirlo en un enlace._` }, { quoted: m })
await conn.sendMessage(m.chat, { text: `ⴵ _Obteniendo resultados, espere un momento..._` }, { quoted: m })
}
let media = await q.download()
let formData = new FormData()
formData.append('image', media, { filename: 'file' })
let api = await axios.post('https://api.imgbb.com/1/upload?key=10604ee79e478b08aba6de5005e6c798', formData, {
headers: { ...formData.getHeaders() }
})
if (api.data.data) {
let txt = `•─• •⟤ \`URL • IMAGE\` ⟥• •─•

⊸⊹ *Titulo:* ${q.filename || 'Undefined'}
⊸⊹ *ID:* ${api.data.data.id}
⊸⊹ *Enlace:* ${api.data.data.url}
⊸⊹ *Paquete:* ${mime}
⊸⊹ *Archivo:* ${q.filename || 'mdmx.jpg'}
⊸⊹ *Formato:* ${api.data.data.image.extension}
⊸⊹ *Ver:* ${api.data.data.url_viewer}`
await conn.sendMessage(m.chat, { text: txt }, { quoted: m })
} else {
await conn.sendMessage(m.chat, { text: `⦗ ✘ ⦘ _Ocurrio un error con el comando: *${usedPrefix + command} ${args[0]}*_\n- _Reporta el error al grupo de asistencia o usa el comando: *${usedPrefix}report*_` }, { quoted: m })
}
} else if (args[0] === 'timg' || args[0] === 'jpg') {
const mime = q.mediaType || ''
if (!/sticker/.test(mime)) return conn.sendMessage(m.chat, {text: `● _Ingrese el comando y responda a un sticker sin movimiento para convertirlo en imagen._`}, {quoted: m})
await conn.sendMessage(m.chat, { text: `ⴵ _Cargando imagen, espere un momento..._` }, { quoted: m })
const media = await q.download()
let out = await webp2png(media).catch(_ => null) || Buffer.alloc(0)
let toinmg = `•─• •⟤ \`STICKER • IMAGE\` ⟥• •─•

⊸⊹ *Tipo:* Sticker
⊸⊹ *Fecha:* ${botdate}
⊸⊹ *Hecho:* Imagen`
await conn.sendMessage(m.chat, { image: { url: out }, caption: toinmg }, { quoted: m })
} else if (args[0] === 'qr' || args[0] === 'codeqr') {
if (!text) return conn.sendMessage(m.chat, { text: `● _Ingrese el comando y escriba un texto para convertirlo en un codigo QR._` }, { quoted: m })
await conn.sendMessage(m.chat, { text: `ⴵ _Generando codigo *QR*, espere un momento..._` }, { quoted: m })
let resultQrr = `•─• •⟤ \`TEXT • QR\` ⟥• •─•

⊸⊹ *Tipo:* Texto
⊸⊹ *Fecha:* ${botdate}
⊸⊹ *Hecho:* QR`
conn.sendMessage(m.chat, { image: { url: toDataURL(text.slice(0, 2048), { scale: 8 }) }, caption: resultQrr }, { quoted: m })
} else if (args[0] === 'mp4' || args[0] === 'video') {
if (!m.quoted) return conn.sendMessage(m.chat, { text: `● _Ingrese el comando y responda a un sticker en movimiento para convertirlo en video._` }, { quoted: m })
await conn.sendMessage(m.chat, { text: `ⴵ _Generando el video, espere un momento..._` }, { quoted: m })
let mime = m.quoted.mimetype || ''
if (!/webp|audio/.test(mime)) return conn.sendMessage(m.chat, { text: `✘ _Solo puedes responder videos, nada de imagenes o otro tipo de formato que no sea un video._` }, { quoted: m })
let media = await m.quoted.download()
let out = Buffer.alloc(0)
if (/webp/.test(mime)) {
out = await webp2mp4(media)
} else if (/audio/.test(mime)) {
out = await ffmpeg(media, ['-filter_complex', 'color', '-pix_fmt', 'yuv420p', '-crf', '51', '-c:a', 'copy', '-shortest' ], 'mp3', 'mp4')
}
let resultSv = `
•─• •⟤ \`STICKEE • VIDEO\` ⟥• •─•

⊸⊹ *Tipo:* Sticker
⊸⊹ *Fecha:* ${botdate}
⊸⊹ *Hecho:* Video`
await conn.sendMessage(m.chat, { video: { url: out }, caption: resultSv }, { quoted: m })
} else if (args[0] === 'mp3' || args[0] === 'audio') {
let mime = (m.quoted ? m.quoted : m.msg).mimetype || ''
if (!/video|audio/.test(mime)) return conn.sendMessage(m.chat, { text: `● _Ingrese el comando y responda a una nota de voz o un video para convertirlo en audio mp3._` }, { quoted: m })
await conn.sendPresenceUpdate('recording', m.chat)
await conn.sendMessage(m.chat, { text: `ⴵ _Generando el audio, espere un momento..._` }, { quoted: m })
let media = await q.download?.()
if (!media && !/video/.test(mime)) return conn.sendMessage(m.chat, { text: `✘ _Ocurrio un error durante el proceso, intentalo de nuevo._` }, { quoted: m })
if (!media && !/audio/.test(mime)) return conn.sendMessage(m.chat, { text: `✘ _Ocurrio un error durante el proceso, intentelo de nuevo._` }, { quoted: m })
let audio = await toAudio(media, 'mp4')
if (!audio.data && !/audio/.test(mime)) return conn.sendMessage(m.chat, { text: `✘ _Ocurrio un error durante el proceso, intentalo de nuevo._` }, { quoted: m })
if (!audio.data && !/video/.test(mime)) return conn.sendMessage(m.chat, { text: `✘ _Ocurrio un error durante el proceso, intentelo de nuevo._` }, { quoted: m })
conn.sendMessage(m.chat, { audio: { url: audio.data } }, caption: null { quoted: m }) //Audio mp3
} else if (args[0] === 'nv' || args[0] === 'note') {
let mime = (m.quoted ? m.quoted : m.msg).mimetype || ''
if (!/video|audio/.test(mime)) return conn.sendMessage(m.chat, { text: `● _Ingrese el comando y responda a un video o audio mp3 para convertirlo en una nota de voz._` }, { quoted: m })
let media = await q.download?.()
await conn.sendMessage(m.chat, { text: `ⴵ _Generando la nota de voz, espere un momento..._` }, { quoted: m })
if (!media && !/video/.test(mime)) return conn.sendMessage(m.chat, { text: `✘ _Ocurrio un error durante el proceso, intentalo de nuevo._` }, { quoted: m })
if (!media && !/audio/.test(mime)) return conn.sendMessage(m.chat, { text: `✘ _Ocurrio un error durante el proceso, intentalo de nuevo._` }, { quoted: m })
let audio = await toPTT(media, 'mp4')
if (!audio.data && !/audio/.test(mime)) return conn.sendMessage(m.chat, { text: `✘ _Ocurrio un error durante el proceso, intentalo de nuevo._` }, { quoted: m })
if (!audio.data && !/video/.test(mime)) return conn.sendMessage(m.chat, { text: `✘ _Ocurrio un error durante el proceso, intentalo de nuevo._` }, { quoted: m })
conn.sendFile(m.chat, audio.data, 'error.mp3', '', m, true, { mimetype: 'audio/mp4' }, { quoted: m })
} else if (args[0] === 'gif' || args[0] === 'gifaud') {
if (!m.quoted) return conn.sendMessage(m.chat, { text: `● _Ingrese el comando y responda a un video para convertirlo en un gif._` }, { quoted: m })
await conn.sendMessage(m.chat, { text: `ⴵ _Generando el gif, espere un momento..._` }, { quoted: m })
const q = m.quoted || m
let mime = (q.msg || q).mimetype || ''
if (!/(mp4)/.test(mime)) return conn.sendMessage(m.chat, { text: `✘ _El formato no es compatible, debe de responder a un video para convertirlo en gif._` }, { quoted: m })
let media = await q.download()
let resultQrr = `•─• •⟤ \`VIDEO • GIF\` ⟥• •─•

⊸⊹ *Tipo:* Video
⊸⊹ *Fecha:* ${botdate}
⊸⊹ *Hecho:* Gif`
conn.sendMessage(m.chat, { video: media, gifPlayback: true, caption: '『 ✓ 』Aqui tiene su video convertido en gif.' }, { quoted: m })
} else if (args[0] === 'web' || args[0] === 'cap') {
if (!text) return conn.sendMessage(m.chat, { text: `● _Ingrese el comando mas un enlace de cualquier pagina web para sacarle una captura._` }, { quoted: m })
await conn.sendMessage(m.chat, { text: `ⴵ _Generando la captura, espere un momento..._` }, { quoted: m })
let full = /f$/i.test(command)
let url = /https?:\/\//.test(args[0]) ? args[0] : 'https://' + args[0]
let ss = await (await fetch(global.API('nrtm', '/api/ssweb', { delay: 1000, url: url }))).buffer()
await conn.sendMessage(m.chat, { image: { url: ss }, caption: `『 ✓ 』Aqui tiene su imagen capturada en la web.` }, { quoted: m }) //Imagen normal.
} else if (args[0] === 'text' || args[0] === 'style') {
if (!text) return conn.sendMessage(m.chat, { text: `● _Ingrese el comando y escriba cualquir texto para aplicar diseños diferentes._\n\n• *Por ejemplo:*\n${usedPrefix + command} ${args[0]} MDMX` }, { quoted: m })
await conn.sendMessage(m.chat, { text: `『 ✓ 』Aqui tiene su texto rediseñado.\n\n` + Object.entries(await stylizeText(text ? text : m.quoted && m.quoted.text ? m.quoted.text : m.text)).map(([name, value]) => `❒ *${name}* = ${value}`).join`\n` }, { quoted: m })
conn.reply(m.chat, Object.entries(await stylizeText(text ? text : m.quoted && m.quoted.text ? m.quoted.text : m.text)).map(([name, value]) => `*${name}*\n${value}`).join`\n\n`, m)
} else if (args[0] === 'tamaño' || args[0] === 'length') {
let mime = (q.msg || q).mimetype || ''
if (!mime) return conn.sendMessage(m.chat, { text: `● _Ingrese el comando y responda a una imagen o video para cambiar el tamaño (peso del video o imagen)._` }, { quoted: m })
if (!text) return conn.sendMessage(m.chat, { text: `✘ _Ingrese el nuevo peso o tamaño del contendo._` }, { quoted: m })
try {
if (isNaN(text)) return conn.sendMessage(m.chat, { text: `✘ _Solo se aceptan numeros, nada de letras ni simbolos, intentalo de nuevo._` }, { quoted: m })
await conn.sendMessage(m.chat, { text: `ⴵ _Cargando nuevo tamaño, espere un momento..._` }, { quoted: m })
if (!/image\/(jpe?g|png)|video|document/.test(mime)) return conn.sendMessage(m.chat, { text: `✘ _Responda solo videos o imagenes para usar este comando._` }, { quoted: m })
let img = await q.download()
let url = await uploadImage(img)
if (/image\/(jpe?g|png)/.test(mime)) {
await conn.sendMessage(m.chat, { image: {url: url}, caption: ``, fileLength: `${text}`, mentions: [m.sender] }, { ephemeralExpiration: 24*3600, quoted: m})
} else if (/video/.test(mime)) {
return conn.sendMessage(m.chat, { video: {url: url}, caption: ``, fileLength: `${text}`, mentions: [m.sender] }, { ephemeralExpiration: 24*3600, quoted: m })
}
} catch {
await conn.sendMessage(m.chat, { text: `⦗ ✘ ⦘ _Ocurrio un error con el comando: *${usedPrefix + command} ${args[0]}*_\n- _Reporta el error al grupo de asistencia o usa el comando: *${usedPrefix}report*_` }, { quoted: m })
}
} else if (args[0] === 'hd' || args[0] === 'remini') {
try {
let mime = (q.msg || q).mimetype || q.mediaType || ""
if (!mime) return conn.sendMessage(m.chat, { text: `*[ ? ]*  Ingrese el comando y responda a una imagen para aumentar la calidad.` }, { quoted: m })
await conn.sendMessage(m.chat, { text: `ⴵ _Cargando imagen, espere un momento..._` }, { quoted: m })
let img = await q.download?.()
let pr = await remini(img, "enhance")
conn.sendMessage(m.chat, { image: { url: pr }, caption: `✓ Aqui tiene su imagen con mas calidad.\n- Puedes responder a esta imagen con el mismo comando para mas calidad.` }, { quoted: m }) //Imagen normal.
} catch {
await conn.sendMessage(m.chat, { text: `⦗ ✘ ⦘ _Ocurrio un error con el comando: *${usedPrefix + command} ${args[0]}*_\n- _Reporta el error al grupo de asistencia o usa el comando: *${usedPrefix}report*_` }, { quoted: m })
}
} else if (args[0] === 'morse' || args[0] === 'digit') {
let enc = {
"a": "•-", "b": "-•••", "c": "-•-•", "d": "-••", "e": "•", "f": "••-•", "g": "--•", "h": "••••", "i": "••", "j": "•---", "k": "-•-", "l": "•-••", "m": "--", "n": "-•", "o": "---", "p": "•--•", "q": "--•-", "r": "•-•", "s": "•••", "t": "-",
"u": "••-", "v": "•••-", "w": "•--", "x": "-••-", "y": "-•--", "z": "--••", "0": "-----","1": "•----", "2": "••---", "3": "•••--", "4": "••••-", "5": "•••••", "6": "-••••", "7": "--•••", "8": "---••", "9": "----•", "?": "••--••", "!": "-•-•--", ".": "•-•-•-",
",": "--••--", ";": "-•-•-•", ":": "---•••", "+": "•-•-•", "-": "-••••-", "/": "-••-•", "=": "-•••-", " ": "/"
}
let dec = {
"-----": "0", "•----": "1", "••---": "2", "•••--": "3", "••••-": "4", "•••••": "5", "-••••": "6", "--•••": "7", "---••": "8", "----•": "9", "•-": "a", "-•••": "b", "-•-•": "c", "-••": "d", "•": "e", "••-•": "f", "--•": "g", "••••": "h", "••": "i", "•---": "j", "-•-": "k",
"•-••": "l", "--": "m", "-•": "n", "---": "o", "•--•": "p", "--•-": "q", "•-•": "r", "•••": "s", "-": "t", "••-": "u", "•••-": "v", "•--": "w", "-••-": "x", "-•--": "y", "--••": "z", "••--••": "?", "-•-•--": "!", "•-•-•-": ".",
"--••--": ",", "-•-•-•": ";", "---•••": ":", "•-•-•": "+", "-••••-": "-", "-••-•": "/", "-•••-": "=", "/": " "
}

let selected = text.toLowerCase().split(" ")[0] + " "
if(selected == "code ") {
let str = text.replace(selected, "").toLowerCase()
let Output_Morse = ""
for(let i of str) {
if(!enc[i]) Output_Morse += i
for(let j in enc) {
if(j == i) Output_Morse += enc[i] + " "
}
}
conn.sendMessage(m.chat, { text: Output_Morse }, { quoted: m })
} else if(selected == "decode ") {
let str = text.replace(selected, "").replace(/[.]/g, "•")
let Output_String = ""
for(let i of str.split(" ")) {
if(!dec[i]) Output_String += i
for(let j in dec) {
if(j == i) Output_String += dec[i]
}
}
conn.sendMessage(m.chat, { text: Output_String }, { quoted: m })
} else {
conn.sendMessage(m.chat, { text: `● _Ingrese el comando y escriba un texto para crear un codigo morse._\n\n• *Por ejemplo:*\n${usedPrefix + command} ${args[0]} code Hola MDMX` }, { quoted: m })
}
} else if (args[0] === 'view' || args[0] === 'ver') {
if (!m.quoted) return conn.sendMessage(m.chat, { text: `*[ ? ]*  Ingrese el comando y responda a un video o imagen en formato ultima vez para verla.` }, { quoted: m })
if (m.quoted.mtype !== 'viewOnceMessageV2') return conn.sendMessage(m.chat, { text: `*[ ✘ ]*  Debe de responer a un video o imagen ( Ver una vez ) para verla.` }, { quoted: m })
let msg = m.quoted.message
let type = Object.keys(msg)[0]
let media = await downloadContentFromMessage(msg[type], type == 'imageMessage' ? 'image' : 'video')
let buffer = Buffer.from([])
for await (const chunk of media) {
buffer = Buffer.concat([buffer, chunk])
}
if (/video/.test(type)) {
return conn.sendMessage(m.chat, { image: { url: buffer }, caption: msg[type].caption || '『 ✓ 』Aqui tiene la imagen vista.' }, { quoted: m }) //Imagen normal.
} else if (/image/.test(type)) {
return conn.sendMessage(m.chat, { video: { url: buffer }, caption: msg[type].caption || '『 ✓ 』Aqui tiene ell video visto.' }, { quoted: m }) //Video normal.
}
} else if (args[0] === 'vcard' || args[0] === 'contacto') {
if (!text) return conn.sendMessage(m.chat, { text: `*[ ? ]*  Ingrese el comando y mensione a una persona sacar su contacto.\n\n• *Por ejemplo:*\n${usedPrefix + command} ${args[0]} @${m.sender.split('@')[0]}`, mentions: [who] }, { quoted: m })
  let bio = await conn.fetchStatus(who).catch(_ => 'undefined')
  let biot = bio.status?.toString() || 'Sin Info'
 // let biot = bio.Status(who).catch(_ => 'Sin Bio')
  let user = global.db.data.users[who]
let name = await conn.getName(who)
const vcard = `BEGIN:VCARD\nVERSION:3.0\nN:;${name};;;\nFN:${name}\nORG:${name}\nTITLE:\nitem1.TEL;waid=${who.split`@`[0]}:+${who.split`@`[0]}\nitem1.X-ABLabel:${name}\nX-WA-BIZ-DESCRIPTION:${biot}\nX-WA-BIZ-NAME:${name}\nEND:VCARD`
    conn.sendMessage(m.chat, { contacts: { displayName: `${name}`, contacts: [{ vcard }] }}, { quoted: m, contextInfo: { externalAdReply: { showAdAttribution: true }}})
}}
handler.command = /^(conv|tols|tools)$/i
export default handler

async function stylizeText(text) {
let res = await fetch('http://qaz.wtf/u/convert.cgi?text=' + encodeURIComponent(text))
let html = await res.text()
let dom = new JSDOM(html)
let table = dom.window.document.querySelector('table').children[0].children
let obj = {}
for (let tr of table) {
let name = tr.querySelector('.aname').innerHTML
let content = tr.children[1].textContent.replace(/^\n/, '').replace(/\n$/, '')
obj[name + (obj[name] ? ' Reversed' : '')] = content
}
return obj
}

async function remini(imageData, operation) {
  return new Promise(async (resolve, reject) => {
    const availableOperations = ["enhance", "recolor", "dehaze"]
    if (availableOperations.includes(operation)) {
      operation = operation
    } else {
      operation = availableOperations[0]
    }
    const baseUrl = "https://inferenceengine.vyro.ai/" + operation + ".vyro"
    const formData = new FormData()
    formData.append("image", Buffer.from(imageData), {filename: "enhance_image_body.jpg", contentType: "image/jpeg"})
    formData.append("model_version", 1, {"Content-Transfer-Encoding": "binary", contentType: "multipart/form-data; charset=utf-8"})
    formData.submit({url: baseUrl, host: "inferenceengine.vyro.ai", path: "/" + operation, protocol: "https:", headers: {"User-Agent": "okhttp/4.9.3", Connection: "Keep-Alive", "Accept-Encoding": "gzip"}},
      function (err, res) {
        if (err) reject(err);
        const chunks = [];
        res.on("data", function (chunk) {chunks.push(chunk)});
        res.on("end", function () {resolve(Buffer.concat(chunks))});
        res.on("error", function (err) {
        reject(err);
        });
      },
    )
  })
}
