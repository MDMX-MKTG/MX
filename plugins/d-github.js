import fetch from 'node-fetch'
let regex = /(?:https|git)(?::\/\/|@)github\.com[\/:]([^\/:]+)\/(.+)/i
let handler = async (m, { args, usedPrefix, command }) => {
  if (!args[0]) {
    return conn.sendMessage(m.chat, { text: `*[ ? ]*  Ingrese el comando mas un enlace valido de un repositorio de *GitHub* para descargarlo.` }, { quoted: m })
  }
  if (!regex.test(args[0])) {
    return conn.sendMessage(m.chat, { text: `*[ ✘ ]*  Verifica si el enlace ingresado es de un repositorio de *GitHub*.`}, { quoted: m })
  }
  let [_, user, repo] = args[0].match(regex) || []
  let sanitizedRepo = repo.replace(/.git$/, '')
  let repoUrl = `https://api.github.com/repos/${user}/${sanitizedRepo}`
  let zipUrl = `https://api.github.com/repos/${user}/${sanitizedRepo}/zipball`
  await conn.sendMessage(m.chat, { text: `_ⴵ Buscando resultados, espere un momento..._` }, { quoted: m })
  try {
    let [repoResponse, zipResponse] = await Promise.all([
      fetch(repoUrl),
      fetch(zipUrl),
    ])
    let repoData = await repoResponse.json()
    let filename = zipResponse.headers.get('content-disposition').match(/attachment; filename=(.*)/)[1]
    let type = zipResponse.headers.get('content-type')
    let img = 'https://i.ibb.co/tLKyhgM/file.png'
let txt = `•─• •⟤ \`GITHUB\` ⟥• •─•
- _Resultado encontrado en *GitHub*._

⊸⊹ *Usuario:* ${user}
⊸⊹ *Repositorio:* ${sanitizedRepo}
⊸⊹ *Enlace:* ${args[0]}
⊸⊹ *URL Name:* ${filename}

*[ 📍 ]  Descripcion:* ${repoData.description || 'No tiene descripcion.'}`

await conn.sendMessage(m.chat, { text: txt, contextInfo: { externalAdReply: { title: wm, body: '✓ Descargando archivo de GitHub, espere un momento...', thumbnailUrl: mxLogo, sourceUrl: null, mediaType: 1, showAdAttribution: true, renderLargerThumbnail: true }}} , { quoted: m })
await conn.sendFile(m.chat, await zipResponse.buffer(), filename, null, m)
  } catch {
await conn.sendMessage(m.chat, { text: `⦗ ✘ ⦘ _Ocurrio un error con el comando: *${usedPrefix + command}*_\n- _Reporta el error al grupo de asistencia o usa el comando: *${usedPrefix}report*_` }, { quoted: m })
  }
}
handler.command = ["git", "github"]
export default handler