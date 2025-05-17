let handler = async (m, { conn, text, args, usedPrefix, command, groupMetadata }) => {
await conn.sendPresenceUpdate('composing', m.chat)

const lama = 86400000 * 7
const now = new Date().toLocaleString("en-US", { timeZone: "Asia/Jakarta" })
const milliseconds = new Date(now).getTime()

let member = groupMetadata.participants.map(v => v.id)
let total = 0
const sider = []

for (let i = 0; i < member.length; i++) {
let users = groupMetadata.participants.find(u => u.id === member[i])
if ((typeof global.db.data.users[member[i]] === 'undefined' || milliseconds - global.db.data.users[member[i]].lastseen > lama) && !users.isAdmin && !users.isSuperAdmin) {
if (typeof global.db.data.users[member[i]] !== 'undefined') {
if (global.db.data.users[member[i]].banned === true) {
total++
sider.push(member[i])
}
} else {
total++
sider.push(member[i])
}}}

if (!args[0]) {
return conn.sendMessage(m.chat, { text: `*[ ? ]*  Ingrese el comando y use una opcion valida para su uso.\n- Existen dos opciones operativas.\n\n• *Usos disponibles:*\n\`${usedPrefix + command} list\`\n> ╰ ≻ _Ver una lista completa de los inactivos en este grupo._\n\`${usedPrefix + command} kill\`\n> ╰ ≻ _Eliminar todos los inactivos en este grupo._\n\n• *Por ejemplo:*\n${usedPrefix + command} list` }, { quoted: m })
}

if (args[0] === 'list' || args[0] === 'lista') {
if (total === 0) return conn.sendMessage(m.chat, { text: `*[ ✘ ]*  No hay contadores bajo cero en este grupo.\n- Vuelva pronto a ver nuevamente la lista.\n\n*[ 📍 ]* El bot comienza el conteo al entrar en el grupo y cada persona nueva tendra su conteo de mensajeria grupal en el bot.\n- Si permanece inactivo, tiene 0 conteos de mensajeria y sera eliminado.`}, { quoted: m })
const groupName = await conn.getName(m.chat)
const message = `*[ 📍 ]* Aqui esta la lists de miembros inactivos.
⊸⊹ *Inactivos:* ${total}
⊸⊹ *Miembros:* ${member.length}

*[ LISTA DE INACTIVOS ]:*
${sider.map(v => '• @' + v.replace(/@.+/, '')).join('\n')}`
return conn.sendMessage(m.chat, { text: message, { contextInfo: { mentionedJid: sider }}}, { quoted: m })
}

if (args[0] === 'kick' || args[0] === 'kill') {
if (total === 0) return conn.sendMessage(m.chat, { text: `*[ ✘ ]*  No hay miembros inactivos para eliminar por el momento, vuelva a intentarlo pronto.`}, { quoted: m })
for (const user of sider) {
try {
await conn.groupParticipantsUpdate(m.chat, [user], 'remove')
} catch (e) {
return conn.sendMessage(m.chat, { text: `⦗ ✘ ⦘ _Ocurrio un error con el comando: *${usedPrefix + command}*_\n- _Reporta el error al grupo de asistencia o usa el comando: *${usedPrefix}report*_` }, { quoted: m })
}
}
return conn.sendMessage(m.chat, { text: `✓  Se han eliminado ${total} miembros inactivos en este grupo exitosamente.` }, { quoted: m })
}
return conn.sendMessage(m.chat, { text: `*[ ✘ ]*  La opcion es invalida, ingrese el comando y sus funciones disponibles.\n\n• *Usos disponibles:*\n\`${usedPrefix + command} list\`\n> ╰ ≻ _Ver una lista completa de los inactivos en este grupo._\n\`${usedPrefix + command} kill\`\n> ╰ ≻ _Eliminar todos los inactivos en este grupo._\n\n• *Por ejemplo:*\n${usedPrefix + command} list`}, { quoted: m })
}

handler.help = ['inactivos']
handler.tags = ['group']
handler.command = /^(inactivos|gcinactivos)$/i
handler.group = true
handler.admin = true
handler.botAdmin = true

export default handler