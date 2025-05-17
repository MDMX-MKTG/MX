let handler = async (m, { conn, text, command, usedPrefix }) => {
let who 
if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text
else who = m.chat
let name = await conn.getName(m.sender)	

let user = global.db.data.users[who]
if (!who) return conn.sendMessage(m.chat, { text: `*[ ? ]*  Ingrese el comando y mensione a una persona mas el contexto de su mala accion para darle una advertencia.\n\n• *Por ejemplo:*\n${usedPrefix + command} @${name} Malas palabras.` }, { quoted: m })
let txt = text.replace('@' + who.split`@`[0], '').trim()
if (!txt) return conn.sendMessage(m.chat, { text: `*[ ✘ ]*  Debe de ingresar el comando mensionando a una persona mas el contexto de su mala accion para darle una advertencia.\n\n• *Por ejemplo:*\n${usedPrefix + command} @${name} Malas palabras.`}, { quoted: m })
try {
user.warn += 1
await conn.sendMessage(m.chat, { text: `✓  Se agregado una advertencia a ${ user.warn == ? `@${who.split('@')[0]}` : `@${who.split('@')[0]}`} con exito.\n\n• *Advertencias:*\n> *Motivo:* ${text}\n> *${user.warn}* de 5\n\n*[ 📍 ]* Si tiene el maximo de 5 advertencias, sera eliminado del grupo inmediatamente.`, mentions: [who] }, { quoted: m });
if (user.warn >= 5) {
user.warn = 0
await conn.sendMessage(m.chat, { text: `*[ 📍 ]*  Hola @${who.split('@')[0]}, se te ha advertido varias veces.\n- Alcanzaste las 5 advertencias maximas en este grupo, seras eliminado.`, mentions: [who] }, { quoted: m })
user.banned = true
await conn.groupParticipantsUpdate(m.chat, [who], 'remove')
}	
return !1
} catch (e) {
await conn.sendMessage(m.chat, { text: `⦗ ✘ ⦘ _Ocurrio un error con el comando: *${usedPrefix + command}*_\n- _Reporta el error al grupo de asistencia o usa el comando: *${usedPrefix}report*_` }, { quoted: m })
console.log(e)
}}
handler.command = ["+warn", "warn"]
handler.group = true
handler.admin = true
handler.botAdmin = true
export default handler
