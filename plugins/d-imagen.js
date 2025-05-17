import fetch from 'node-fetch'
const { generateWAMessageContent, generateWAMessageFromContent, proto } = (await import('@whiskeysockets/baileys')).default

let handler = async (m, { conn, text }) => {
if (!text) return conn.sendMessage(m.chat, { text: `*[ ? ]*  Ingrese el comando y escriba lo que quiera buscar en *Google*.\n\n? *Por ejemplo:*\n${usedPrefix + command} Arboles` }, { quoted: m });

let contenidos = `
?©¤? ?? \`IMAGEN ? GOOGLE\` ?? ?©¤?

?? *Plataforma:* Google
?? *Descargador:* Bot`;
try {
async function createImage(url) {
const { imageMessage } = await generateWAMessageContent({ image: { url } }, { upload: conn.waUploadToServer });
return imageMessage;
}

let push = [];
let api = await fetch(`https://api.diioffc.web.id/api/search/gimage?query=${encodeURIComponent(text)}`);
let json = await api.json();

for (let result of json.result) {
let image = await createImage(result.link);

push.push({
body: proto.Message.InteractiveMessage.Body.fromObject({
text: `${contenidos}\n?? *T¨ªtulo:* ${result.title}\n?? *Descripci¨®n:* ${result.snippet}`
}),
footer: proto.Message.InteractiveMessage.Footer.fromObject({ text: '' }),
header: proto.Message.InteractiveMessage.Header.fromObject({
title: '',
hasMediaAttachment: true,
imageMessage: image
}),
nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
buttons: [
{
"name": "cta_url",
"buttonParamsJson": `{"display_text":"? VER","url":"${result.image.contextLink}"}`
}
]
})
});
}

const msg = generateWAMessageFromContent(m.chat, {
viewOnceMessage: {
message: {
messageContextInfo: {
deviceListMetadata: {},
deviceListMetadataVersion: 2
},
interactiveMessage: proto.Message.InteractiveMessage.fromObject({
body: proto.Message.InteractiveMessage.Body.create({ text: `? \`IMAGEN ? GOOGLE\` ?` }),
footer: proto.Message.InteractiveMessage.Footer.create({ text: '- _Resultado encontrado en google._' }),
header: proto.Message.InteractiveMessage.Header.create({ hasMediaAttachment: false }),
carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({ cards: [...push] })
})
}
}
}, { 'quoted': m });
await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id });
} catch (error) {
console.error(error);
}
}

handler.command = ["img", "imagen"]

export default handler;
