import axios from "axios";
import cheerio from "cheerio";

let handler = async (m, { conn, text, usedPrefix, command }) => {
if (!text) {
return conn.sendMessage(m.chat, { text: `*[ ? ]*  Ingrese el comando mas un enlace de un video o imagenes de *TikTok* para descargarlo.` }, { quoted: m });
}
try {
await conn.sendMessage(m.chat, { text: `ⴵ _Descargando el pedido, espere un momento..._` }, { quoted: m });
const videoResult = await ttsave.video(text);
const { type, nickname, username, description, videoInfo, slides, audioUrl } = videoResult;
let resultadoMetodo = `•─• •⟤ \`TIKTOK • DL\` ⟥• •─•

⊸⊹ *Nombre:* ${nickname || "-"}
⊸⊹ *Usuario:* ${username || "-"}
⊸⊹ *Descripcion:* ${description || "-"}`.trim();

if (type === "slide") {
resultadoMetodo += "\n⊸⊹ *Tipo:* Imagenes";
await conn.reply(m.chat, message, m);

for (let slide of slides) {
await conn.sendFile(m.chat, slide.url, `tiktok-${slide.number}.jpg`, "", m);
}
} 
else if (type === "video") {
resultadoMetodo += "\n⊸⊹ *Tipo:* Video";
if (videoInfo.nowm) {
await conn.sendMessage(m.chat, { video: { url: videoInfo.nowm }, caption: resultadoMetodo }, { quoted: m });
} else {
conn.sendMessage(m.chat, { text: `*[ ✘ ]*  No se ha encontrado resultados del enlace enviado.`}, { quoted: m });
}}

if (audioUrl) {
}
} catch (error) {
console.error(error);
conn.sendMessage(m.chat, { text: `⦗ ✘ ⦘ _Ocurrio un error con el comando: *${usedPrefix + command}*_\n- _Reporta el error al grupo de asistencia o usa el comando: *${usedPrefix}report*_` }, { quoted: m });
}
};

handler.command = ["tiktok", "tt"];
export default handler;

const headers = {
authority: "ttsave.app",
accept: "application/json, text/plain, */*",
origin: "https://ttsave.app",
referer: "https://ttsave.app/en",
"user-agent": "Postify/1.0.0",
};

const ttsave = {
submit: async function (url, referer) {
const headerx = { ...headers, referer };
const data = { query: url, language_id: "1" };
return axios.post("https://ttsave.app/download", data, { headers: headerx });
},

parse: function ($) {
const uniqueId = $("#unique-id").val();
const nickname = $("h2.font-extrabold").text();
const profilePic = $("img.rounded-full").attr("src");
const username = $("a.font-extrabold.text-blue-400").text();
const description = $("p.text-gray-600").text();

const dlink = {
nowm: $("a.w-full.text-white.font-bold").first().attr("href"),
wm: $("a.w-full.text-white.font-bold").eq(1).attr("href"),
audio: $("a[type='audio']").attr("href"),
profilePic: $("a[type='profile']").attr("href"),
cover: $("a[type='cover']").attr("href"),
};

const stats = {
reproducciones: "",
meGusta: "",
comentarios: "",
compartidos: "",
};

$(".flex.flex-row.items-center.justify-center").each((index, element) => {
const $element = $(element);
const svgPath = $element.find("svg path").attr("d");
const value = $element.find("span.text-gray-500").text().trim();

if (svgPath && svgPath.startsWith("M10 18a8 8 0 100-16")) {
stats.reproducciones = value;
} else if (svgPath && svgPath.startsWith("M3.172 5.172a4 4 0 015.656")) {
stats.meGusta = value || "0";
} else if (svgPath && svgPath.startsWith("M18 10c0 3.866-3.582")) {
stats.comentarios = value;
} else if (svgPath && svgPath.startsWith("M17.593 3.322c1.1.128")) {
stats.compartidos = value;
}
});

const tituloCancion = $(".flex.flex-row.items-center.justify-center.gap-1.mt-5")
.find("span.text-gray-500")
.text()
.trim();

const slides = $("a[type='slide']")
.map((i, el) => ({
number: i + 1,
url: $(el).attr("href"),
}))
.get();

return {
uniqueId,
nickname,
profilePic,
username,
description,
dlink,
stats,
tituloCancion,
slides,
};
},

video: async function (link) {
try {
const response = await this.submit(link, "https://ttsave.app/en");
const $ = cheerio.load(response.data);
const result = this.parse($);

if (result.slides && result.slides.length > 0) {
return { type: "slide", ...result };
}

return {
type: "video",
...result,
videoInfo: {
nowm: result.dlink.nowm,
wm: result.dlink.wm,
},
};
} catch (error) {
console.error(error);
throw error;
}
},
};


/*
import fetch from 'node-fetch'

let handler = async (m, { conn, usedPrefix, command, args }) => {
if (!args[0]) return conn.sendMessage(m.chat, { text: `*[ ? ]*Ingrese el comando mas un enlace de un video o imagenes de *TikTok* para descargarlo.` }, { quoted: m })
await conn.sendMessage(m.chat, { text: `ⴵ _Buscando resultados, espere un momento..._` }, { quoted: m })
try {
let api = await fetch(`https://deliriussapi-oficial.vercel.app/download/tiktok?url=${args[0]}`)
let json = await api.json()
let { data, process } = json
let contenidos = `
•─• •⟤\`TIKTOK • VIDEO\`⟥• •─•
- ${data.title || "Sin titulo."}

⊸⊹ *Autor/a:* ${data.author.username} ( @${data.author.nickname} )
⊸⊹ *Duración:* ${data.duration}
⊸⊹ *Repro:* ${data.repro}
⊸⊹ *Likes:* ${data.like}
⊸⊹ *Compartidos:* ${data.share}
⊸⊹ *Comentarios:* ${data.comment}
⊸⊹ *Descargas:* ${data.download}
⊸⊹ *Publicado:* ${data.published}
⊸⊹ *Tipo:* Video

•─• ⟤ *MUSICA:*
⊸⊹ *Titulo:* ${data.music.title}
⊸⊹ *Autor/a:* ${data.music.author}
⊸⊹ *Duración:* ${data.music.duration}`

let tipoArchivo = data.meta.media[0].type

if (tipoArchivo === "video") {
await conn.sendFile(m.chat, data.meta.media[0].hd, 'video.mp4', contenidos, m)
} else if (tipoArchivo === "image") {
let numeroImgs = ``
let images = data.meta.media[0].images
for (let i = 0; i < images.length; i++) {
await conn.sendFile(m.chat, images[i], `image${i + 1}.jpeg`, ``, m)
}}

} catch (error) {
console.error(error)
}}

handler.command = /^(tiktok|tt)$/i;

export default handler
*/

/*
import axios from "axios"
import fg from 'api-dylux';
import cheerio from 'cheerio';
import { Tiktok } from '../lib/tiktok.js';
let handler = async (m, { conn, text, args, usedPrefix, command}) => {
if (!text) return conn.sendMessage(m.chat, { text: `*[ ? ]*Ingrese el comando mas un enlace de un video de *TikTok* para descargarlo.` }, { quoted: m })
if (!/(?:https:?\/{2})?(?:w{3}|vm|vt|t)?\.?tiktok.com\/([^\s&]+)/gi.test(text)) return conn.sendMessage(m.chat, { text: `*[ ✘ ]*El enlace que ingresaste no es valido, recuerde usar un enlace de un video de *TikTok* para descargarlo.`}, { quoted: m })
await conn.sendMessage(m.chat, { text: `ⴵ _Buscando resultados, espere un momento..._` }, { quoted: m })
let contenidos = `•─• •⟤ \`TIKTOK\` ⟥• •─•
- _Resultado encontrado en *TikTok*._

⊸⊹ *Descargado en:* WhatsApp
⊸⊹ *Plataforma:* TikTok
⊸⊹ *Descargador:* Bot
⊸⊹ *Fecha:* ${botdate}
⊸⊹ *Formato:* Video`
try {
const data = await Tiktok(args)
conn.sendMessage(m.chat, {video: {url: data.nowm}, caption: contenidos}, {quoted: m})
} catch {
try {
const tTiktok = await tiktokdlF(args[0]);
await conn.sendMessage(m.chat, {video: {url: tTiktok.video}, caption: contenidos}, {quoted: m});
} catch {
try {
const response = await axios.get(`https://api.dorratz.com/v2/tiktok-dl?url=${args}`);
if (response.data.status && response.data.data) {
const videoData = response.data.data.media;
const videoUrl = videoData.org; 
await conn.sendMessage(m.chat, { video: { url: videoUrl }, caption: contenidos }, { quoted: m });
}} catch {
try {
const p = await fg.tiktok(args[0]);
await conn.sendMessage(m.chat, {video: {url: p.nowm}, caption: contenidos }, {quoted: m}); 
} catch (e) {
conn.sendMessage(m.chat, { text: `⦗ ✘ ⦘ _Ocurrio un error con el comando: *${usedPrefix + command}*_\n- _Reporta el error al grupo de asistencia o usa el comando: *${usedPrefix}report*_` }, { quoted: m })
console.log(e) 
}}}}}
handler.command = ['tt', 'tiktok']
export default handler

async function tiktokdlF(url) {
if (!/tiktok/.test(url)) return `*Ejemplo:* _${usedPrefix + command} https://vm.tiktok.com/ZM686Q4ER/_`;
const gettoken = await axios.get('https://tikdown.org/id');
const $ = cheerio.load(gettoken.data);
const token = $('#download-form > input[type=hidden]:nth-child(2)').attr( 'value' );
const param = {url: url, _token: token};
const {data} = await axios.request('https://tikdown.org/getAjax?', {method: 'post', data: new URLSearchParams(Object.entries(param)), headers: {'content-type': 'application/x-www-form-urlencoded; charset=UTF-8', 'user-agent': 'Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.88 Safari/537.36'}});
const getdata = cheerio.load(data.html);
if (data.status) {
return {status: true, thumbnail: getdata('img').attr('src'), video: getdata('div.download-links > div:nth-child(1) > a').attr('href'), audio: getdata('div.download-links > div:nth-child(2) > a').attr('href')};
} else {
return {status: false};
}
}
*/
