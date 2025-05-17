import axios from 'axios'
let handler = async (m, { conn, text, usedPrefix, command }) => {
if (!text) return conn.sendMessage(m.chat, { text: `*[ ? ]*  Ingrese el comando y escriba el nombre del usuario para ver su informacion.\n\n• *Por ejemplo:*\n${usedPrefix + command} lol_sd` }, { quoted: m })
await conn.sendMessage(m.chat, { text: `ⴵ _Buscando resultados, espere un momento..._` }, { quoted: m })
try {
  let api = await axios.get(`https://vapis.my.id/api/tt-stalk?username=${text}`)
  let json = api.data
  if (!json.status) return conn.sendMessage(m.chat, { text: `*[ ✘ ]*  No se han encontrado resultados, verifique si el usuario existe en *TikTok.*`}, { quoted: m })

  let { user, stats } = json.data
  let { uniqueId, nickname, avatarLarger, avatarMedium, avatarThumb, signature, createTime, verified, secUid, region, language, privateAccount, followingVisibility } = user
  
  let { followerCount, followingCount, heartCount, videoCount } = stats
  let MDMX = `
•─• •⟤ \`TIKTOK • INFO\` ⟥• •─•

⊸⊹ *Nombre:* ${uniqueId}
⊸⊹ *Usuario:* @${nickname}
⊸⊹ *Descripcion:* ${signature || "Sin descripcion."}
⊸⊹ *Cuenta Verificada:* ${verified ? "Sí" : "No"}
⊸⊹ *Región:* ${region}
⊸⊹ *Idioma:* ${language}
⊸⊹ *Cuenta Privada:* ${privateAccount ? "Sí" : "No"}
⊸⊹ *Visibilidad de Seguidores:* ${followingVisibility === 2 ? "Visible" : "No Visible"}
⊸⊹ *Cuenta creada en:* ${new Date(createTime * 1000).toLocaleString()}

•─• ⟤ *DETALLE:*

⊸⊹ *Seguidores:* ${followerCount}
⊸⊹ *Seguidos:* ${followingCount}
⊸⊹ *Likes:* ${heartCount}
⊸⊹ *Videos:* ${videoCount}`
  await conn.sendMessage(m.chat, { image: { url: avatarLarger }, caption: MDMX }, { quoted: m })
} catch (error) {
conn.sendMessage(m.chat, { text: `⦗ ✘ ⦘ _Ocurrio un error con el comando: *${usedPrefix + command}*_\n- _Reporta el error al grupo de asistencia o usa el comando: *${usedPrefix}report*_` }, { quoted: m })
console.error(error)
}}

handler.command = ['utt', 'usertiktok']

export default handler
