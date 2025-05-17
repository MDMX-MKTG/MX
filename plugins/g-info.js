let handler = async (m, { conn, participants, groupMetadata }) => {
const groupAdmins = participants.filter(p => p.admin) 
const listAdmin = groupAdmins.map((v, i) => `• @${v.id.split('@')[0]}`).join('\n')
const owner = groupMetadata.owner || groupAdmins.find(p => p.admin === 'superadmin')?.id || m.chat.split`-`[0] + '@s.whatsapp.net'
let texto = `*[ 📍 ]* Informacion grupal completo.

⊸⊹ *ID:* ${groupMetadata.id}
⊸⊹ *Nombre:* ${groupMetadata.subject}
⊸⊹ *Descripcion:* ${groupMetadata.desc?.toString() || 'Descripcion.'}
⊸⊹ *Miembros:* ${participants.length}
⊸⊹ *Creador:* @${owner.split('@')[0]}

*[ ADMINISTRADORES ]:*
${listAdmin}`.trim()
await conn.sendMessage(m.chat, { text: texto, mentions: [...groupAdmins.map(v => v.id), owner], contextInfo: { externalAdReply: { title: wm, body: textoInfo, thumbnailUrl: mxLogo, sourceUrl: null, mediaType: 1, showAdAttribution: true, renderLargerThumbnail: true }}} , { quoted: m })
}
handler.command = ["infogrupo", "infog"]
handler.group = true
export default handler
