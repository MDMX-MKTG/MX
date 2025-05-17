import uploadImage from '../lib/uploadImage.js';
const handler = async (m, {conn, text, args, usedPrefix, command}) => {
const q = m.quoted ? m.quoted : m;
const mime = (q.msg || q).mimetype || q.mediaType || '';

if (!args[0]) {
let txttt = `⫶☰ *CONVERTIDORES:*

● *${usedPrefix + command}* url
● *${usedPrefix + command}* url2
● *${usedPrefix + command}* url3
● *${usedPrefix + command}* timg
● *${usedPrefix + command}* mp3
● *${usedPrefix + command}* note
● *${usedPrefix + command}* gif
● *${usedPrefix + command}* cap
● *${usedPrefix + command}* style
● *${usedPrefix + command}* length
● *${usedPrefix + command}* hd
● *${usedPrefix + command}* anime
● *${usedPrefix + command}* digit
● *${usedPrefix + command}* view
● *${usedPrefix + command}* vcard`
await conn.sendMessage(m.chat, { text: `*[ ? ]*  Ingrese el comando y la opcion a convertir.\n\n• *Por ejemplo:*\n${usedPrefix + command} anime\n\n${txttt}` }, { quoted: m })
}else if (args[0] === 'anime') {
if (!/image/g.test(mime)) return conn.sendMessage(m.chat, { text: `*[ ? ]*  Ingrese el comando y responda a una imagen para convertirlo en anime.\n- Recuerde que tiene que tener la cara fija, para convertirlo en anime.` }, { quoted: m });
await conn.sendMessage(m.chat, { text: `ⴵ _Detallando, espere un momento..._` }, { quoted: m });
const data = await q.download?.();
const image = await uploadImage(data);
let conAnime = `
•─• •⟤ \`CONVERTIDOR\` ⟥• •─•

⊸⊹ *Comando:* ${usedPrefix + command}
⊸⊹ *Nombre:* Anime AI
⊸⊹ *Tipo:* Imagen
⊸⊹ *Hecho:* Anime
⊸⊹ *Autor/a:* @${m.sender.split('@')[0]}
`;
try {
const anime = `https://api.lolhuman.xyz/api/imagetoanime?apikey=${lolkeysapi}&img=${image}`;
await conn.sendMessage(m.chat, { image: { url: anime }, caption: conAnime, mentions: [m.sender] }, { quoted: m });
//await conn.sendFile(m.chat, anime, 'error.jpg', null, m);
} catch (i) {
try {
const anime2 = `https://api.zahwazein.xyz/photoeditor/jadianime?url=${image}&apikey=${keysxxx}`;
await conn.sendMessage(m.chat, { image: { url: anime2 }, caption: conAnime, mentions: [m.sender] }, { quoted: m });
//conn.sendFile(m.chat, anime2, 'error.jpg', null, m);
} catch (a) {
try {
const anime3 = `https://api.caliph.biz.id/api/animeai?img=${image}&apikey=caliphkey`;
await conn.sendMessage(m.chat, { image: { url: anime3 }, caption: conAnime, mentions: [m.sender] }, { quoted: m });
//conn.sendFile(m.chat, anime3, 'error.jpg', null, m);
} catch (e) {
return conn.sendMessage(m.chat, { text: `*[ ✘ ]*  Ocurrio un error, esto se debe a que la imagen no tiene una mejor visibilodad de la cara o se deba a un error.`}, { quoted: m });
}}}
 }
}
handler.command = ["conv", "cv"]
export default handler;

