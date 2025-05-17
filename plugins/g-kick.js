const handler = async (m, {conn, participants, usedPrefix, command}) => {
if (!global.db.data.settings[conn.user.jid].restrict) return conn.sendMessage(m.chat, { text: `*[ 📍 ]*  Lo siento, las restricciones estan desactivadas en este bot.\n- Solo los administradores del bot pueden activar esta opcion.`}, { quoted: m })
if (!m.mentionedJid[0] && !m.quoted) return conn.sendMessage(m.chat, { text: `*[ ? ]*  Ingrese el comando y responda o mensione a un usuario para eliminarlo del grupo.\n\n• *Por ejemplo:*\n${usedPrefix + command} @${m.sender.split('@')[0]}`, mentions: [m.sender] }, { quoted: m })
if (m.mentionedJid.includes(conn.user.jid)) return
const user = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted.sender
const owr = m.chat.split`-`[0]
await conn.groupParticipantsUpdate(m.chat, [user], 'remove')}
handler.command = ["-user", "kick"]
handler.admin = true
handler.group = true
handler.botAdmin = true
export default handler