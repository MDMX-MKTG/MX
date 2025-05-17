import gplay from 'google-play-scraper';
import fetch from 'node-fetch';
let handler = async (m, { conn, args, usedPrefix, command }) => {
if (!args[0]) {
return conn.sendMessage(m.chat, { text: `*[ ? ]*  Ingrese el comando mas un enlace de una aplicacion en *Play Store* para descargarlo.` }, { quoted: m });
}
const url = args[0];
let packageName;
try {
await conn.sendMessage(m.chat, { text: `ⴵ _Descargando el pedido, espere un momento..._` }, { quoted: m });
packageName = new URL(url).searchParams.get("id");
if (!packageName) throw new Error();
} catch {
return conn.sendMessage(m.chat, { text: `*[ ✘ ]*  El enlace proporcionado no es valido, verifique si es un enlace de la *Play Store.*`}, { quoted: m });
}

console.log(`ID de paquete: ${packageName}`);

let info;
try {
info = await gplay.app({ appId: packageName });
} catch (error) {
console.error(error);
return conn.sendMessage(m.chat, { text: `*[ ✘ ]*  No se pudo encontrar la aplicacion, asegurate de usar un enlace de *Play Store.*`}, { quoted: m });
}

const h = info.title;
let link = `https://d.apkpure.com/b/APK/${info.appId}?version=latest`;
conn.sendFile(m.chat, link, `${h}.apk`, ``, m, false, { mimetype: 'application/vnd.android.package-archive', asDocument: true });
}
handler.command = ["playstore"];
export default handler;

