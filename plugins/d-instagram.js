import axios from 'axios';

let handler = async (m, { conn, usedPrefix, args, command, text }) => {
if (!args[0]) {
return conn.sendMessage(m.chat, { text: `*[ ? ]*  Ingrese el comando mas un enlace de un video o imagen de *Instagram* para descargarlo.` }, { quoted: m });
}
const igUrlRegex = /^https?:\/\/www\.instagram\.com\/([a-zA-Z0-9_-]+)\/.*$/;
if (!igUrlRegex.test(args[0])) {
return conn.sendMessage(m.chat, { text: `*[ ✘ ]*  Verifica si el enlace es de un video o imagenn de *Instagram* para descargarlo.`}, { quoted: m });
}

try {
await conn.sendMessage(m.chat, { text: `ⴵ _Descargando el pedido, espere un momento..._` }, { quoted: m });
const response = await axios.get(
`https://restapi-v2.simplebot.my.id/download/instagram?url=${encodeURIComponent(args[0])}`
);

const data = response.data;
if (!data.status || !data.result || !data.result.downloadUrls) throw new Error('Respuesta inválida de la API');

const { title, downloadUrls } = data.result;
const sentUrls = new Set();

for (let url of downloadUrls) {
if (sentUrls.has(url)) continue;
sentUrls.add(url);

const isImage = /\.(jpe?g|png|webp|heic|tiff|bmp)(\?|$)/i.test(url);
if (isImage) {
await conn.sendMessage(m.chat, { image: { url: downloadUrls }, caption: `🖼️  ( *${title}.jpg* )` }, { quoted: m });
} else {
await conn.sendMessage(m.chat, { video: { url: downloadUrls }, caption: `🎬  ( *${title}.mp4* )` }, { quoted: m });
}}
} catch (error) {
console.error(error);
return conn.sendMessage(m.chat, { text: `⦗ ✘ ⦘ _Ocurrio un error con el comando: *${usedPrefix + command}*_\n- _Reporta el error al grupo de asistencia o usa el comando: *${usedPrefix}report*_` }, { quoted: m });
}
};
handler.command = ["ig", "instagram"];

export default handler;


/*
import axios from 'axios';
let handler = async (m, { conn, usedPrefix, args, command, text }) => {
if (!args[0]) {
return conn.sendMessage(m.chat, { text: `*[ ? ]*  Ingrese el comando mas un enlace de un video o imagen de *Instagram* para descargarlo.` }, { quoted: m });
}
if (!args[0].match(new RegExp('^https?:\\/\\/www\\.instagram\\.com\\/([a-zA-Z0-9_-]+)\\/.*$'))) {
return conn.sendMessage(m.chat, { text: `*[ ✘ ]*  El enlace proporcionado no es valido, verifique si es un enlace de *Instagram* y vuelva a intentarlo.`}, { quoted: m });
}
try {
await conn.sendMessage(m.chat, { text: `ⴵ _Descargando el pedido, espere un momento..._` }, { quoted: m });
let api = await axios.get(`https://apidl.asepharyana.cloud/api/downloader/igdl?url=${args[0]}`);
let processedUrls = new Set();
for (let a of api.data.data) {
if (!processedUrls.has(a.url)) {
processedUrls.add(a.url);
if (a.url.includes('jpg') || a.url.includes('png') || a.url.includes('jpeg') || a.url.includes('webp') || a.url.includes('heic') || a.url.includes('tiff') || a.url.includes('bmp')) {
let tipoImgs = `
•─• •⟤ \`INSTAGRAM\` ⟥• •─•

⊸⊹ *Descargado en:* WhatsApp
⊸⊹ *Plataforma:* Instagram
⊸⊹ *Descargador:* Bot
⊸⊹ *Tipo:* Imagen`;
await conn.sendMessage(m.chat, { image: { url: a.url }, caption: tipoImgs }, { quoted: m });
} else {
let tipoVids = `
•─• •⟤ \`INSTAGRAM\` ⟥• •─•

⊸⊹ *Descargado en:* WhatsApp
⊸⊹ *Plataforma:* Instagram
⊸⊹ *Descargador:* Bot
⊸⊹ *Tipo:* Video`;
await conn.sendMessage(m.chat, { video: { url: a.url }, caption: tipoVids }, { quoted: m });
}}}
} catch (error) {
console.log(error);
conn.sendMessage(m.chat, { text: `⦗ ✘ ⦘ _Ocurrio un error con el comando: *${usedPrefix + command}*_\n- _Reporta el error al grupo de asistencia o usa el comando: *${usedPrefix}report*_` }, { quoted: m });
}
};
handler.command = ["ig", "instagram"];
export default handler;
*/

/*import fetch from 'node-fetch';
import axios from 'axios';
const handler = async (m, {conn, args, command, usedPrefix}) => {
if (!args[0]) return conn.sendMessage(m.chat, { text: `*[ ? ]*  Ingrese el comando mas un enlace de un video o imagen de *Instagram* para descargarlo.` }, { quoted: m });
await conn.sendMessage(m.chat, { text: `ⴵ _Buscando resultados, espere un momento..._` }, { quoted: m })
let contenidos = `
•─• •⟤ \`INSTAGRAM\` ⟥• •─•
- _Resultado encontrado en *Instagram*._

⊸⊹ *Descargado en:* WhatsApp
⊸⊹ *Plataforma:* Instagram
⊸⊹ *Descargador:* Bot
⊸⊹ *Fecha:* ${botdate}`;
try {
const res = await fetch(`https://api.siputzx.my.id/api/d/igdl?url=${args}`);
const data = await res.json();
const fileType = data.data[0].url.includes('.webp') ? 'image' : 'video'; 
const downloadUrl = data.data[0].url;
if (fileType === 'image') {
await conn.sendMessage(m.chat, { image: { url: downloadUrl }, caption: contenidos + '\n⊸⊹ *Formato:* Imagen' }, { quoted: m });
} else if (fileType === 'video') {
awat conn.sendMessage(m.chat, { video: { url: downloadUrl }, caption: contenidos + '\n⊸⊹ *Formato:* Video' }, { quoted: m });
}
} catch {   
try {
const apiUrl = `${apis}/download/instagram?url=${encodeURIComponent(args[0])}`;
const apiResponse = await fetch(apiUrl);
const delius = await apiResponse.json();
if (!delius || !delius.data || delius.data.length === 0) return m.react("❌");
const downloadUrl = delius.data[0].url;
const fileType = delius.data[0].type;
if (!downloadUrl) return m.react("❌");
if (fileType === 'image') {
await conn.sendMessage(m.chat, { image: { url: downloadUrl }, caption: contenidos + '\n⊸⊹ *Formato:* Imagen' }, { quoted: m });
} else if (fileType === 'video') {
awat conn.sendMessage(m.chat, { video: { url: downloadUrl }, caption: contenidos + '\n⊸⊹ *Formato:* Video' }, { quoted: m });
} else {
return m.react("❌"); 
}} catch {   
try {
const apiUrll = `https://api.betabotz.org/api/download/igdowloader?url=${encodeURIComponent(args[0])}&apikey=bot-secx3`;
const responsel = await axios.get(apiUrll);
const resultl = responsel.data;
for (const item of resultl.message) {
const shortUrRRl = await (await fetch(`https://tinyurl.com/api-create.php?url=${item.thumbnail}`)).text();
await conn.sendMessage(m.chat, { image: { url: item._url }, caption: contenidos + '\n⊸⊹ *Formato:* Imagen' }, { quoted: m });
await new Promise((resolve) => setTimeout(resolve, 10000));
}} catch {
try {
const datTa = await instagram.v1(args[0]);
for (const urRRl of datTa) {
const shortUrRRl = await (await fetch(`https://tinyurl.com/api-create.php?url=${args[0]}`)).text();
conn.sendMessage(m.chat, { video: { url: urRRl }, caption: contenidos + '\n⊸⊹ *Formato:* Video' }, { quoted: m });
await new Promise((resolve) => setTimeout(resolve, 10000));
}} catch {
try {
const resultss = await instagramGetUrl(args[0]).url_list[0];
const shortUrl2 = await (await fetch(`https://tinyurl.com/api-create.php?url=${args[0]}`)).text();
await conn.sendFile(m.chat, resultss, 'error.mp4', txt2, m);
awat conn.sendMessage(m.chat, { video: { url: resultss }, caption: contenidos + '\n⊸⊹ *Formato:* Video' }, { quoted: m });
} catch {
try {
const resultssss = await instagramdl(args[0]);
const shortUrl3 = await (await fetch(`https://tinyurl.com/api-create.php?url=${args[0]}`)).text();
for (const {url} of resultssss) awat conn.sendMessage(m.chat, { video: { url: url }, caption: contenidos + '\n⊸⊹ *Formato:* Video' }, { quoted: m });
} catch {
try {
const human = await fetch(`https://api.lolhuman.xyz/api/instagram?apikey=${lolkeysapi}&url=${args[0]}`);
const json = await human.json();
const videoig = json.result;
const shortUrl1 = await (await fetch(`https://tinyurl.com/api-create.php?url=${args[0]}`)).text();
awat conn.sendMessage(m.chat, { video: { url: videoig }, caption: contenidos + '\n⊸⊹ *Formato:* Video' }, { quoted: m });
} catch (e) {
await conn.sendMessage(m.chat, { text: `⦗ ✘ ⦘ _Ocurrio un error con el comando: *${usedPrefix + command}*_\n- _Reporta el error al grupo de asistencia o usa el comando: *${usedPrefix}report*_` }, { quoted: m });
console.log(e)
}}}}}}}}
handler.command = ["instagram", "ig"]
export default handler
*/
