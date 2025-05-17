import axios from 'axios';
let handler = async (m, { conn, text, usedPrefix, command, participants }) => {
const groupAdmins = participants.filter(p => p.admin);
const botId = conn.user.jid;
const groupOwner = groupAdmins.find(p => p.isAdmin)?.id;
const groupNoAdmins = participants.filter(p => p.id !== botId && p.id !== groupOwner && !p.admin).map(p => p.id);
if (groupNoAdmins.length === 0) return conn.sendMessage(m.chat, { text: `*[ ✘ ]*  No hay usuarios por eliminar.`}, { quoted: m });
for (let userId of groupNoAdmins) {
await conn.groupParticipantsUpdate(m.chat, [userId], 'remove');
await new Promise(resolve => setTimeout(resolve, 3000));
}
conn.sendMessage(m.chat, { text: `✓  Se ha realizado la eliminacion con exito.`}, { quoted: m });
}

handler.command = ["kick_all", "+kill"]
handler.group = true;
handler.admin = true;
handler.botAdmin = true;

export default handler;
