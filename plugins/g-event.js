const handler = async (m, {conn, usedPrefix, command}) => {
const args = m.text.split(' ').slice(1); 
if (args.length < 2) return conn.sendMessage(m.chat, { text: `*[ ? ]*  Ingrese el comando y escriba el inicio y fin del evento separando con coma o mas.\n\n• *Por ejemplo:*\n${usedPrefix + command} 06:00, 23:00` }, { quoted: m });
let inicio, fin;
const regex1 = /^(\d{2}:\d{2})\s*+\s*(\d{2}:\d{2})$/; 
const regex2 = /^(\d{2}:\d{2})\s*a\s*(\d{2}:\d{2})$/; 
const regex3 = /^(\d{2}:\d{2})\s*,\s*(\d{2}:\d{2})$/;
let match;
if (match = args.join(' ').match(regex1)) {
inicio = match[1];
fin = match[2];
} else if (match = args.join(' ').match(regex2)) {
inicio = match[1];
fin = match[2];
} else if (match = args.join(' ').match(regex3)) {
inicio = match[1];
fin = match[2];
} else {
return conn.sendMessage(m.chat, { text: `*[ ✘ ]*  Ajuste horaria de eventos incorrecto.\n- Debe de ingresar la hora de inicio y fin.\n\n• *Por ejemplo:*\n${usedPrefix + command} 06:00, 23:00`}, { quoted: m });
}
db.data.chats[m.chat].hsEvento = { inicio, fin };
return conn.sendMessage(m.chat, { text: `✓  La hora de eventos se establecio con exito a comienzos de ${inicio}A.M a ${fin}P.M` }, { quoted: m });
}
handler.command = ["event", "eventos", "evento"]
handler.admin = true
handler.group = true
export default handler
