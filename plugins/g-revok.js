var handler = async (m, { conn }) => {
let res = await conn.groupRevokeInvite(m.chat)
let gruf = m.chat
let ggg = `
*[ 📍 ]* Se ha restablecido el enlace grupal.

⊸⊹ *Enlace:* https://chat.whatsapp.com/${await conn.groupInviteCode(gruf)}`
conn.sendMessage(m.chat, { text: ggg }, { quoted: m })
handler.command = ['revoke', 'newlink']
handler.group = true
handler.admin = true
handler.botAdmin = true
export default handler
