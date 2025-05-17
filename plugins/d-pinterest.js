import axios from "axios";
import * as cheerio from "cheerio";

const pindl = {
video: async (url) => {
try {
let { data: html } = await axios.get(url);
let $ = cheerio.load(html);

const mediaDataScript = $('script[data-test-id="video-snippet"]');
if (mediaDataScript.length) {
const mediaData = JSON.parse(mediaDataScript.html());

if (
mediaData["@type"] === "VideoObject" &&
mediaData.contentUrl &&
mediaData.contentUrl.endsWith(".mp4")
) {
return {
type: "video",
name: mediaData.name,
description: mediaData.description,
contentUrl: mediaData.contentUrl,
thumbnailUrl: mediaData.thumbnailUrl,
uploadDate: mediaData.uploadDate,
duration: mediaData.duration,
commentCount: mediaData.commentCount,
likeCount: mediaData.interactionStatistic?.find(
(stat) =>
stat.InteractionType["@type"] === "https://schema.org/LikeAction"
)?.InteractionCount,
watchCount: mediaData.interactionStatistic?.find(
(stat) =>
stat.InteractionType["@type"] ===
"https://schema.org/WatchAction"
)?.InteractionCount,
creator: mediaData.creator?.name,
creatorUrl: mediaData.creator?.url,
keywords: mediaData.keywords,
};
}
}
return null;
} catch (error) {
return {
error: "Error al obtener los datos del video"
};
}
},

image: async (url) => {
try {
let { data: html } = await axios.get(url);
let $ = cheerio.load(html);

const mediaDataScript = $('script[data-test-id="leaf-snippet"]');
if (mediaDataScript.length) {
const mediaData = JSON.parse(mediaDataScript.html());

if (
mediaData["@type"] === "SocialMediaPosting" &&
mediaData.image &&
(mediaData.image.endsWith(".png") ||
mediaData.image.endsWith(".jpg") ||
mediaData.image.endsWith(".jpeg") ||
mediaData.image.endsWith(".webp")) &&
!mediaData.image.endsWith(".gif")
) {
return {
type: "image",
author: mediaData.author?.name,
authorUrl: mediaData.author?.url,
headline: mediaData.headline,
articleBody: mediaData.articleBody,
image: mediaData.image,
datePublished: mediaData.datePublished,
sharedContentUrl: mediaData.sharedContent?.url,
isRelatedTo: mediaData.isRelatedTo,
mainEntityOfPage: mediaData.mainEntityOfPage?.["@id"],
};
}
}
return null;
} catch (error) {
return {
error: "Error al obtener los datos de la imagen"
};
}
},

gif: async (url) => {
try {
let { data: html } = await axios.get(url);
let $ = cheerio.load(html);

const mediaDataScript = $('script[data-test-id="leaf-snippet"]');
if (mediaDataScript.length) {
const mediaData = JSON.parse(mediaDataScript.html());

if (
mediaData["@type"] === "SocialMediaPosting" &&
mediaData.image &&
mediaData.image.endsWith(".gif")
) {
return {
type: "gif",
author: mediaData.author?.name,
authorUrl: mediaData.author?.url,
headline: mediaData.headline,
articleBody: mediaData.articleBody,
gif: mediaData.image,
datePublished: mediaData.datePublished,
sharedContentUrl: mediaData.sharedContent?.url,
isRelatedTo: mediaData.isRelatedTo,
mainEntityOfPage: mediaData.mainEntityOfPage?.["@id"],
};
}
}
return null;
} catch (error) {
return {
error: "Error al obtener los datos del GIF"
};
}
},

download: async (urlPin) => {
let result = await pindl.video(urlPin);
if (result) return result;

result = await pindl.image(urlPin);
if (result) return result;

result = await pindl.gif(urlPin);
return result || {
error: "No se encontró ningún medio"
};
},
};

const handler = async (m, { conn, usedPrefix, command, text }) => {
if (!text) return conn.sendMessage(m.chat, { text: `*[ ? ]*  Ingrese el comando mas un enlace de un video, imagen o gif de *Pinterest* para descargarlo.` }, { quoted: m });
try {
await conn.sendMessage(m.chat, { text: `ⴵ _Descargando el pedido, espere un momento..._` }, { quoted: m });
const result = await pindl.download(text);
if (result.error) throw result.error;
if (result.type === "video") {
let tipoVids = `
•─• •⟤ \`PINTEREST\` ⟥• •─•

⊸⊹ *Titulo:* ${result.name}
⊸⊹ *Descripcion:* ${result.description}
⊸⊹ *Duracion:* ${result.duration}
⊸⊹ *Likes:* ${result.likeCount}
⊸⊹ *Comentarios:* ${result.commentCount}
⊸⊹ *Publicado:* ${uploadDate}
⊸⊹ *Enlace:* ${result.contentUrl}`;
await conn.sendMessage(m.chat, { video: { url: result.contentUrl }, caption: tipoVids }, { quoted: m });
} else if (result.type === "image") {
let tipoImgs = `
•─• •⟤ \`PINTEREST\` ⟥• •─•

⊸⊹ *Titulo:* ${result.headline}
⊸⊹ *Autor/a:* ${result.author}
⊸⊹ *Descripcion:* ${result.articleBody}
⊸⊹ *Publicado:* ${result.datePublished}
⊸⊹ *Compartidos:* ${result.sharedContentUrl}
⊸⊹ *ID:* ${result.mainEntityOfPage}
⊸⊹ *Enlace:* ${result.image}`;
await conn.sendMessage(m.chat, { image: { url: result.image }, caption: tipoImgs }, { quoted: m });
} else if (result.type === "gif") {
let tipoGifs = `
•─• •⟤ \`PINTEREST\` ⟥• •─•

⊸⊹ *Titulo:* ${result.headline}
⊸⊹ *autor/a:* ${result.author}
⊸⊹ *Descripcion:* ${result.articleBody}
⊸⊹ *Publicado:* ${result.datePublished}
⊸⊹ *Compartidos:* ${result.sharedContentUrl}
⊸⊹ *ID:* ${result.mainEntityOfPage}
⊸⊹ *Enlace:* ${result.gif}`;
await conn.sendMessage(m.chat, { video: { url: result.gif }, caption: tipoGifs }, { quoted: m });
}
} catch (error) {
await conn.sendMessage(m.chat, { text: `⦗ ✘ ⦘ _Ocurrio un error con el comando: *${usedPrefix + command}*_\n- _Reporta el error al grupo de asistencia o usa el comando: *${usedPrefix}report*_` }, { quoted: m });
}
};
handler.command = ["pinterest", "pint"];
export default handler;
