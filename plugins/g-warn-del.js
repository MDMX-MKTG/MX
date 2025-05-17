let handler = async (m, { conn, text, command, usedPrefix }) => {
let who
if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text
else who = m.chat
let name = await conn.getName(m.sender)	
let user = global.db.data.users[who]
if (!who) return conn.sendMessage(m.chat, { text: `*[ ? ]*  Ingrese el comando y mensione a una persona que tenga una o mas advertencias para quitar una.\n\n• *Por ejemplo:*\n${usedPrefix + command} @${m.sender.split('@')[0]}`, mentions: [m.sender] }, { quoted: m })
try{
user.warn -= 1
await conn.sendMessage(m.chat, { text: `✓  Se ha quitado una advertencia a @${user.warn == 1 ? `@${who.split('@')[0]}` : `@${who.split('@')[0]}`}\n\n• *Advertencias:*\n> *${warn}* de *5*`, mentions: [who] }, { quoted: m })
} catch (e) {
await conn.sendMessage(m.chat, { text: `⦗ ✘ ⦘ _Ocurrio un error con el comando: *${usedPrefix + command}*_\n- _Reporta el error al grupo de asistencia o usa el comando: *${usedPrefix}report*_` }, { quoted: m })
console.log(e)
}}
handler.command = ["-warn", "delwarn"]
handler.group = true
handler.admin = true
handler.botAdmin = true
export default handler
