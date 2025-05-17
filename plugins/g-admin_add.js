let handler = async (m, { conn,usedPrefix, command, text }) => {
if(isNaN(text) && !text.match(/@/g)){
} else if(isNaN(text)) {
var number = text.split`@`[1]
} else if(!isNaN(text)) {
var number = text
}
if(!text && !m.quoted) return conn.sendMessage(m.chat, { text: `*[ ? ]*  Ingrese el comando y mensione a una persona para darle un puesto de administrador grupal.\n\n• *Por ejemplo:*\n${usedPrefix + command} @${m.sender.split('@')[0]}`, mentions: [m.sender] }, { quoted: m })
if(number.length > 13 || (number.length < 11 && number.length > 0)) return conn.sendMessage(m.chat, { text: `*[ ✘ ]*  Debe de igresar el comando y mensionar a una persona para darle administracion grupal.\n\n• *Por ejemplo:*\n${usedPrefix + command} @${m.sender.split('@')[0]}`, mentions: [m.sender] }, { quoted: m })
try {
if(text) {
var user = number + '@s.whatsapp.net'
} else if(m.quoted.sender) {
var user = m.quoted.sender
} else if(m.mentionedJid) {
var user = number + '@s.whatsapp.net'
} } catch (e) {
} finally {
conn.groupParticipantsUpdate(m.chat, [user], 'promote')
conn.sendMessage(m.chat, { text: `✓  Se ha asignado como administrador grupal a @${user.split('@')[0]} con exito.`, mention: [user] }, { quoted: m })
}}
handler.command = ["+admin", "promote"]
handler.group = true
handler.admin = true
handler.botAdmin = true
export default handler 
