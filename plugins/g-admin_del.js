let handler = async (m, { conn,usedPrefix, text, command }) => {
if(isNaN(text) && !text.match(/@/g)){
} else if(isNaN(text)) {
var number = text.split`@`[1]
} else if(!isNaN(text)) {
var number = text
}
if (!text && !m.quoted) return conn.sendMessage(m.chat, { text: `*[ ? ]*  Ingrese el comando y mensione a un administrador grupal para quitarle el pueto admin.\n\n• *Por ejemplo:*\n${usedPrefix + command} @${m.sender.split('@')[0]}`, mentions: [m.sender] }, { quoted: m })
if (number.length > 13 || (number.length < 11 && number.length > 0)) return conn.sendMessage(m.chat, { text: `*[ ✘ ]*  Debe ingresar el comando y mensionar a un administrador grupal para quitar su puesto admin.\n\n• *Por ejemplo:*\n${usedPrefix + command} @${m.sender.split('@')[0]}`, mentions: [m.sender] }, { quoted: m })
try {
if(text) {
var user = number + '@s.whatsapp.net'
} else if(m.quoted.sender) {
var user = m.quoted.sender
} else if(m.mentionedJid) {
var user = number + '@s.whatsapp.net'
}} catch (e) {
} finally {
conn.groupParticipantsUpdate(m.chat, [user], 'demote')
conn.sendMessage(m.chat, { text: `✓  Se ha descartado el puesto de administrador grupal a @${user.split('@')[0]} con exito.`, mentions: [user] }, { quoted: m })
}}
handler.command = ["-admin", "demote"]
handler.group = true
handler.admin = true
handler.botAdmin = true
export default handler
