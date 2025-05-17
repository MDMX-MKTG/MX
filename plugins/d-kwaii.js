import axios from 'axios';

const handler = async (m, { text, conn, usedPrefix, command, args }) => {
  if (!args[0]) {
    return conn.sendMessage(m.chat, { text: `*[ ? ]*  Ingrese el comando mas un enlace de un video de *Kwaii* para descargarlo.` }, { quoted: m });
  }
  const kwaiUrl = args[0];
  let res;

await conn.sendMessage(m.chat, { text: `ⴵ _Descargando el pedido, espere un momento..._` }, { quoted: m });
  try {
    res = await axios.get(`https://api.nexfuture.com.br/api/downloads/kwai/dl?url=${kwaiUrl}`);
  } catch (e) {
    return conn.sendMessage(m.chat, { text: `*[ ✘ ]*  Ocurrio un error, verifuque si el enlace es de un video de *Kwaii.*`}, { quoted: m });
  }

  const result = res.data;
  if (!result.status) {
    return conn.sendMessage(m.chat, { text: `*[ ✘ ]*  No se han encontrado resultados sobre la busqueda o hay un error.`}, { quoted: m });
  }

  const videoTitle = result.resultado.titulo;
  const videoDescription = result.resultado.descricao;
  const videoCreator = result.resultado.criador.nome;
  const videoUrl = result.resultado.video;
  const fotoEncontrada = result.resultado.thumbnail;

  if (!videoUrl) {
    return conn.sendMessage(m.chat, { text: `*[ ✘ ]*  No hay resultados o video no encontrado, recuerde usar un enlace de *Kwaii*.`}, { quoted: m })
  }
const caption = `
•─• •⟤ \`KWAII\` ⟥• •─•

⊸⊹ *Título:* ${videoTitle}
⊸⊹ *Descripción:* ${videoDescription}
⊸⊹ *Creado por:* ${videoCreator}
⊸⊹ *Publicado en:* ${new Date(result.resultado.publicado).toLocaleString()}
  `.trim();

  const maxRetries = 3;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
  await conn.sendMessage(m.chat, { video: { url: videoUrl }, caption: caption }, { quoted: m });
      //await conn.sendMessage(m.chat, { video: { url: videoUrl }, caption: '_Aqui tiene su video de *Kwaii* descargado._', thumbnail: thumbnailUrl, mimetype: 'video/mp4' }, { quoted: m });

      break;
    } catch (e) {
      if (attempt === maxRetries) {
        return conn.sendMessage(m.chat, { text: `⦗ ✘ ⦘ _Ocurrio un error con el comando: *${usedPrefix + command}*_\n- _Reporta el error al grupo de asistencia o usa el comando: *${usedPrefix}report*_` }, { quoted: m });
      }
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
}


handler.command = ['kwaii', 'kw'];
export default handler;
