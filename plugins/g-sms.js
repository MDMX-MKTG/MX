import _0x19a3e4 from 'node-fetch';
const handler = async (_0x5b04ea, {
conn: _0x24d45b,
command: _0x38ad25,
text: _0x29b0ac,
isAdmin: _0x9e35ac
}) => {
if (_0x38ad25 === "+sms") {
if (!_0x9e35ac) {
return conn.sendMessage(m.chat, { text: `*[ ? ]*  Ingrese el comando y mensione a una persona o responda a una persona para eliminar o conservar sus mensajes.` }, { quoted: m });
}
const _0x45f556 = global.owner[0x0][0x0] + "@s.whatsapp.net";
if (_0x5b04ea.mentionedJid[0x0] === _0x45f556) {
return conn.sendMessage(m.chat, { text: `*[ ✘ ]*  Este comando no puede ser usado contra el creador del bot.`}, { quoted: m });
}
let _0x329969 = _0x5b04ea.mentionedJid[0x0] ? _0x5b04ea.mentionedJid[0x0] : _0x5b04ea.quoted ? _0x5b04ea.quoted.sender : _0x29b0ac;
if (_0x329969 === _0x24d45b.user.jid) {
return conn.sendMessage(m.chat, { text: `*[ ✘ ]*  No puedes usar este comando con el mismo bot.`}, { quoted: m });
}
const _0xeea06e = await _0x24d45b.groupMetadata(_0x5b04ea.chat);
const _0x69b64a = _0xeea06e.owner || _0x5b04ea.chat.split`-`[0x0] + "@s.whatsapp.net";
if (_0x5b04ea.mentionedJid[0x0] === _0x69b64a) {
return conn.sendMessage(m.chat, { text: `*[ ✘ ]*  Este comando no puede ser usado contra el creador del bot.`}, { quoted: m });
}
let _0xc6ae1d = global.db.data.users[_0x329969];
if (!_0x5b04ea.mentionedJid[0x0] && !_0x5b04ea.quoted) {
return conn.sendMessage(m.chat, { text: `*[ ? ]*  Ingrese el comando y mensione a una persona o responda a una persona para eliminar sus mensajes.` }, { quoted: m });
}
if (_0xc6ae1d.muto === true) {
return conn.sendMessage(m.chat, { text: `*[ ✘ ]*  Este usuario ya tiene los mensajes restringidos.`}, { quoted: m });
}
conn.sendMessage(m.chat, { text: `✓  Los mensajes del usuario @${m.sender.split('@')[0]} seran eliminados.\n- Acaba de ser restringido en este chat.`, mentions: [m.sender]}, { quoted: m });
global.db.data.users[_0x329969].muto = true;
} else {
if (_0x38ad25 === "-sms") {
if (!_0x9e35ac) {
return conn.sendMessage(m.chat, { text: `*[ ✘ ]*  Solo los administradores pueden desactivar la restriccion del mensaje.`}, { quoted: m });
}
let _0x12128f = _0x5b04ea.mentionedJid[0x0] ? _0x5b04ea.mentionedJid[0x0] : _0x5b04ea.quoted ? _0x5b04ea.quoted.sender : _0x29b0ac;
let _0x498844 = global.db.data.users[_0x12128f];
if (_0x12128f === _0x5b04ea.sender) {
return conn.sendMessage(m.chat, { text: `*[ ✘ ]*  Solo los administradores pueden desactivar la restriccion del mensaje.`}, { quoted: m });
}
if (!_0x5b04ea.mentionedJid[0x0] && !_0x5b04ea.quoted) {
return conn.sendMessage(m.chat, { text: `*[ ? ]*  Ingrese el comando y mensione o responda a una persona para desactivar la restriccion de sus mensajes.` }, { quoted: m });
}
if (_0x498844.muto === false) {
return conn.sendMessage(m.chat, { text: `*[ ✘ ]*  El usuario no ha sido restringido de este comando.\n- Verifique o recuerde a un usuario restringido.` }, { quoted: m });
}
global.db.data.users[_0x12128f].muto = false;
conn.sendMessage(m.chat, { text: `✓  Los mensajes del usuario restringido ya no seran eliminados.`}, { quoted: m });
}
}
};
handler.command = ['+sms', '-sms'];
handler.group = true;
handler.admin = true;
handler.botAdmin = true;
export default handler;