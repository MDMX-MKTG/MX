let handler = async (m, { conn, command }) => {
if (!m.quoted) return conn.sendMessage(m.chat, { text: `*[ ? ]*  Ingrese el comando y responda a un mensaje para ${command === '+m' ? 'fijarlo' : 'desfijarlo'} en el grupo.` }, { quoted: m });
try {
let messageKey = {remoteJid: m.chat,
fromMe: m.quoted.fromMe,
id: m.quoted.id,
participant: m.quoted.sender
};

if (command === '+m') {
await conn.sendMessage(m.chat, { pin: messageKey,type: 1, time: 604800 })
}

if (command === '-m') {
await conn.sendMessage(m.chat, { pin: messageKey,type: 2, time: 86400 })
}

if (command === '++m') {
conn.sendMessage(m.chat, {keep: messageKey, type: 1, time: 15552000 })
}

if (command === '--m') {
conn.sendMessage(m.chat, {keep: messageKey, type: 2, time: 86400 })
}
} catch (error) {
console.error(error);
}};
handler.command = ['-m', '+m', '++m', '--m'] 
handler.admin = true
handler.group = true
handler.botAdmin = true
export default handler
