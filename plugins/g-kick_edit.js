let handler = async (m, { conn, args, groupMetadata, participants, usedPrefix, command, isBotAdmin, isSuperAdmin }) => {
if (!args[0]) return conn.sendMessage(m.chat, { text: `*[ ? ]*  Ingrese el comando y escriba el numero nacional para ver una lista o eliminarlos.\n\n• *Por ejemplo:*\n${usedPrefix + command} 52` }, { quoted: m })
if (isNaN(args[0])) return conn.sendMessage(m.chat, { text: `*[ ✘ ]*  Debe de ingresar un numero nacion para ver una lista o eliminarlos.\n\n• *Por ejemplo:*\n${usedPrefix + command} 52`}, { quoted: m })
let lol = args[0].replace(/[+]/g, '')
let ps = participants.map(u => u.id).filter(v => v !== conn.user.jid && v.startsWith(lol || lol)) 
let bot = global.db.data.settings[conn.user.jid] || {}
if (ps == '') return conn.sendMessage(m.chat, { text: `*[ ✘ ]*  En este grupo no hay ningun numero nacion con el prefijo: +${lol}\n- Intente con otro numero existente este grupo.`}, { quoted: m })
let numeros = ps.map(v=> '⊸⊹ @' + v.replace(/@.+/, ''))
const delay = time => new Promise(res=>setTimeout(res,time));
switch (command) {
case "listnr": 
let listaNum = `
*[ 📂 ]* Lista de los numeros +${lol} encontrados en este grupo.
- Puedes eliminarlos usando el comando: *${usedPrefix}-users* ${lol}

· ─ • ⟤ \`LISTA:\`
${numeros.join(`\n`)}`
break   
case "-users":  
if (!bot.restrict) return conn.sendMessage(m.chat, { text: `*[ 📍 ]*  Lo siento, las restricciones estan desactivadas en este bot.\n- Solo los administradores del bot pueden activar esta opcion.`}, { quoted: m })
if (!isBotAdmin) return conn.sendMessage(m.chat, { text: `*[ 📍 ]*  Lo siento, este comando solo puede ser utilizado si soy admin del grupo.\n- No puedo realizar acciones que solo los administradores pueden.` }, { quoted: m })
await conn.sendMessage(m.chat, { text: `ⴵ Iniciando eliminacion de numeros +${lol}\n- Se eliminara uno cada 10 segundos...` }, { quoted: m })
let ownerGroup = m.chat.split`-`[0] + '@s.whatsapp.net'
let users = participants.map(u => u.id).filter(v => v !== conn.user.jid && v.startsWith(lol || lol))
for (let user of users) {
if (user !== ownerGroup + '@s.whatsapp.net' && user !== global.conn.user.jid && user !== global.owner + '@s.whatsapp.net' && user.startsWith(lol || lol) && user !== isSuperAdmin && isBotAdmin && bot.restrict) { 
await delay(2000)    
let responseb = await conn.groupParticipantsUpdate(m.chat, [user], 'remove')
if (responseb[0].status === "404") return await conn.sendMessage(m.chat, { text: `*[ 📍 ]* El participante @${user.split('@')[0]} ya ha sido eliminado o se ha salido del grupo.`, mentions: [user]}, { quoted: m })
await delay(10000)
} else return conn.sendMessage(m.chat, { text: `⦗ ✘ ⦘ _Ocurrio un error con el comando: *${usedPrefix + command}*_\n- _Reporta el error al grupo de asistencia o usa el comando: *${usedPrefix}report*_` }, { quoted: m })}
break            
}}
handler.command = ["listnr", "-users"]
handler.group = handler.botAdmin = handler.admin = true
handler.fail = null
export default handler
