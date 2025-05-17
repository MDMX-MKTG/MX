let handler = async(m, { isOwner, isAdmin, conn, text, participants, args, command }) => {
if (!(isAdmin || isOwner)) {
global.dfail('admin', m, conn)
throw false
}

if (command == 'tags' || command == 'tage' || command == 'todos' || command == 'invocación' || command == 'invocacion') {
let pesan = args.join` `
let teks = `• ── • ✦ *\`MENSAJE\`* ✦ • ──•\n- ${pesan || '¡Hola!'}\n\n`
for (let mem of participants) {
teks += `· ⟢  @${mem.id.split('@')[0]}\n`}
conn.sendMessage(m.chat, { text: teks, mentions: [ participants.map(a => a.id) ], contextInfo: { externalAdReply: { title: wm, body: textoInfo, thumbnailUrl: mxMenu1, sourceUrl: null, mediaType: 1, showAdAttribution: true, renderLargerThumbnail: true }}} , { quoted: m })
}

if (command == 'v.tag' || command == 'v.tags') {
let memberData = participants.map(mem => {
let userId = mem.id;
let userData = global.db.data.users[userId] || {};
let msgCount = userData.mensaje && userData.mensaje[m.chat] ? userData.mensaje[m.chat] : 0;
return { id: userId, messages: msgCount };
});
memberData.sort((a, b) => b.messages - a.messages);
let activeCount = memberData.filter(mem => mem.messages > 0).length;
let inactiveCount = memberData.filter(mem => mem.messages === 0).length;
  
let teks = `• ── • ✦ *\`MENTIONS\`* ✦ • ──•\n\n`;
teks += `⊸⊹ *Miembros:* ${participants.length}\n`;
teks += `⊸⊹ *Activos:* ${activeCount}\n`;
teks += `⊸⊹ *Inactivos:* ${inactiveCount}\n\n*[ 📍 ]* Informacion del grupo a los miembros.`;
  
/*for (let mem of memberData) {
teks += `@${mem.id.split('@')[0]} ${mem.messages}\n`;
}*/
conn.sendMessage(m.chat, { text: teks, mentions: [ memberData.map(a => a.id) ] }, { quoted: m });
}
}
handler.command = ["tags", "tage", "v.tag", "v.tags"]
handler.admin = true
handler.group = true
handler.botAdmin = true
export default handler
