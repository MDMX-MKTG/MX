var handler = async (m, { conn, args }) => {
let group = m.chat;
let link = `*[ 📍 ]* Aqui tiene el enlace grupal.
- Puedes compartirlo si gustas.

• https://chat.whatsapp.com/${await conn.groupInviteCode(group)}`;
conn.sendMessage(m.chat, { text: link }, { quoted: m });
};
handler.command = ['enlace', 'link'];
handler.group = true;
handler.botAdmin = true;
export default handler;
