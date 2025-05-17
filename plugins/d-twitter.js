import axios from 'axios';
import cheerio from 'cheerio';
let handler = async (m, { conn, usedPrefix, command, args }) => {
if (!args[0]) throw conn.sendMessage(m.chat, { text: `*[ ? ]*  Ingrese el comando mas un enlace de un video o imagen de *Twitter* para descargarlo.` }, { quoted: m });
const sender = m.sender.split('@')[0];
const url = args[0];
await conn.sendMessage(m.chat, { text: `ⴵ _Descargando el pedido, espere un momento..._` }, { quoted: m });
try {
let downloadResult = await twitterDL(url);
if (!downloadResult.status || downloadResult.media.length === 0) {
downloadResult = await twitterDLv2(url);
}
if (!downloadResult.status || downloadResult.media.length === 0) {
return conn.sendMessage(m.chat, { text: `*[ ✘ ]*  No se ha podido descargar el contenido, intentelo de nuevo.`}, { quoted: m });
}
for (const media of downloadResult.media) {
const fileUrl = typeof media === 'string' ? media : media.url;
const { data: buffer } = await axios.get(fileUrl, { responseType: 'arraybuffer' });
if (downloadResult.type === 'image' || /\.(jpg|jpeg|png|gif)$/.test(fileUrl)) {
let tipoImgs = `•─• •⟤ \`TWITTER\` ⟥• •─•
- _Resultado encontrado en *Twitter*._

⊸⊹ *Descargado en:* WhatsApp
⊸⊹ *Plataforma:* Twitter ( X )
⊸⊹ *Descargador:* Bot`;
await conn.sendMessage(m.chat, { image: buffer, caption: tipoImgs + `\n⊸⊹ *Formato:* Imagen`, mentions: [m.sender] }, { quoted: m });
} else if (downloadResult.type === 'video' || /\.(mp4|mov|avi|mkv)$/.test(fileUrl)) {
let tipoVids = `•─• •⟤ \`TWITTER\` ⟥• •─•
- _Resultado encontrado en *Twitter*._

⊸⊹ *Descargado en:* WhatsApp
⊸⊹ *Plataforma:* Twitter ( X )
⊸⊹ *Descargador:* Bot`;
await sendMessage(m.chat, { video: { url: buffer }, caption: tipoVids + `\n⊸⊹ *Formato:* Video` }, { quoted: m });
//conn.sendMessage(m.chat, { video: buffer, mimetype: 'video/mp4', fileName: 'video.mp4', caption: caption, mentions: [m.sender] }, { quoted: m });
} else {
conn.sendMessage(m.chat, { text: `*[ ✘ ]*  Formato desconocido, no se podra enviar.`}, { quoted: m });
}
}
} catch (error) {
conn.sendMessage(m.chat, { text: `⦗ ✘ ⦘ _Ocurrio un error con el comando: *${usedPrefix + command}*_\n- _Reporta el error al grupo de asistencia o usa el comando: *${usedPrefix}report*_` }, { quoted: m });
}
};
handler.command = ["tw", "twitter"];
export default handler;
async function twitterDL(url) {
try {
const result = { status: true, type: '', media: [] };
const { data } = await axios(`https://savetwitter.net/api/ajaxSearch`, {
method: 'post',
data: { q: url, lang: 'en' },
headers: {
accept: '*/*',
'user-agent': 'PostmanRuntime/7.32.2',
'content-type': 'application/x-www-form-urlencoded',
},
});

let $ = cheerio.load(data.data);
if ($('div.tw-video').length === 0) {
$('div.video-data > div > ul > li').each(function () {
result.type = 'image';
result.media.push($(this).find('div > div:nth-child(2) > a').attr('href'));
});
} else {
$('div.tw-video').each(function () {
let qualityText = $(this).find('.tw-right > div > p:nth-child(1) > a').text().includes('(')
? $(this).find('.tw-right > div > p:nth-child(1) > a').text().split('(')[1].split('p')[0].trim()
: $(this).find('.tw-right > div > p:nth-child(1) > a').text().trim();

result.type = 'video';
result.media.push({
quality: qualityText,
url: $(this).find('.tw-right > div > p:nth-child(1) > a').attr('href'),
});
});
}

return result;
} catch (err) {
const result = {
status: false,
message: 'Media not found!\n\n' + String(err),
};
console.log(result);
return result;
}
}
async function twitterDLv2(url) {
try {
const { data } = await axios.get(`https://twitsave.com/info?url=${url}`);
let $ = cheerio.load(data);
let result = [];

$('div.origin-top-right > ul > li').each(function () {
const resolutionText = $(this).find('a > div > div > div').text();
if (resolutionText.includes('Resolution: ')) {
const width = resolutionText.split('Resolution: ')[1].split('x')[0];
const height = resolutionText.split('Resolution: ')[1].split('x')[1];
const videoUrl = $(this).find('a').attr('href');
result.push({ width, height, url: videoUrl });
}
});

if (result.length === 0) {
return { status: false, message: 'No se encontró el video' };
}

const sortedResult = result.sort((a, b) => b.height - a.height);
const highestResolution = sortedResult[0].width;
return { status: true, type: 'video', media: sortedResult.filter((video) => video.width === highestResolution) };
} catch (err) {
return { status: false, message: 'Error al obtener datos de twitsave\n\n' + String(err) };
}
}
