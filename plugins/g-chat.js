let handler = async (m, { conn, isAdmin, isROwner, command }) => {
global.db = global.db || { data: { chats: {} } };
global.db.data.chats = global.db.data.chats || {};
global.db.data.chats[m.chat] = global.db.data.chats[m.chat] || {};
if (command === '+chat') {
global.db.data.chats[m.chat].isBanned = true;
await conn.sendMessage(m.chat, { text: `*[ ✅ ]*  Este chat fue bloqueado, el bot no podra ser utilizado hasta ser desbloqueado.` }, { quoted: m });
} else if (command === '-chat') {
global.db.data.chats[m.chat].isBanned = false;
await conn.sendMessage(m.chat, { text: `*[ ✅ ]*  Este chat fue desbloqueado, todos pueden usar el bot ahora.` }, { quoted: m });
}};
handler.command = ['-chat', '+chat'];
handler.group = true;
handler.admin = true;
handler.botAdmin = true;

export default handler;
