let handler = async (m, { conn, args, text, usedPrefix, command }) => {
let who 
if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text
else who = m.chat
let name = await conn.getName(m.sender)	
let user = global.db.data.users[who]
if (!global.db.data.settings[conn.user.jid].restrict) return conn.sendMessage(m.chat, { text: `*[ 📍 ]*  Lo siento, las restricciones estan desactivadas en este bot.\n- Solo los administradores del bot pueden activar esta opcion.`}, { quoted: m })
if (!text) return conn.sendMessage(m.chat, { text: `*[ ? ]*  Ingrese el comando y escriba el numero para invitar al usuario en este grupo.\n- Recuerde no usar el simbolo internacionl ( + ).\n\n• *Por ejemplo:*\n${usedPrefix + command} 5493873655135` }, { quoted: m })
if (text.includes('+')) return conn.sendMessage(m.chat, { text: `*[ ✘ ]*  Recuerde no usar el simbolo internacion ( + ), solo agregue numeros.\n\n• *Por ejemplo:*\n${usedPrefix + command} 5493873655135`}, { quoted: m })
let group = m.chat
let link = 'https://chat.whatsapp.com/' + await conn.groupInviteCode(group)
let linkDesc = `👋🏻 ¡Hola! Soy ${wm}, un bot de WhatsApp
¡Alguien te invito a unirte a este grupo!

¡Te esperamos en este grupo, no tardes! 😄
- ${link}`
await conn.sendMessage(text+'@s.whatsapp.net', { text: linkDesc, mentions: [m.sender] }, { quoted: fkontak } )
conn.sendMessage(m.chat, { text: `*[ ✅ ]*  Se ha enviado la invitacion grupal al numero con exito.` }, { quoted: m })
}
handler.command = ["+user", "add"]
handler.group = true
handler.admin = true
handler.botAdmin = true
export default handler
 