let handler = async (m, { conn, text, args, usedPrefix, command }) => {
let fotoo = mxMenu3
let { name, registered } = global.db.data.users[conn.user.jid]
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
let mentionedJid = [who]
let username = conn.getName(who)
let mxBot = '@' + conn.user.jid.split`@`[0]
let taguser = '@' + m.sender.split("@s.whatsapp.net")[0]

//if (!db.data.chats[m.chat].simpleMenu && m.isGroup) return conn.reply(m.chat, `${lenguajeGB['smsContAdult']()}`, m)

if (!args[0]) {
let menu = `⟣────•【 MENU : LISTA 】•────⟢
❒ *Usuario:* ${taguser}
❒ *Bot:* ${wm}
❒ *Baileys:* @mdmx-socket.ls
❒ *Version:* ${vs}
❒ *Modo:* Publico


⟡ Puedes mensionarme para hablar.
⤷ *Por ejemplo:* ${mxBot} Hola ¿Como estas?

${readMore}
╭• *${usedPrefix + command}* 1 =  *<info>*
╭• *${usedPrefix + command}* 2 =  *<base>*
╭• *${usedPrefix + command}* 3 =  *<ajustes>*
╭• *${usedPrefix + command}* 4 =  *<buscador>*
╭• *${usedPrefix + command}* 5 =  *<descargas>*
╭• *${usedPrefix + command}* 6 =  *<convertidor>*
╭• *${usedPrefix + command}* 7 ⧾  *<stickers>*
╭• *${usedPrefix + command}* 8 =  *<grupos>*
╭• *${usedPrefix + command}* 9 =  *<rpg>*
╭• *${usedPrefix + command}* 10 =  *<juegos>*
╭• *${usedPrefix + command}* 11 =  *<perfil>*
╭• *${usedPrefix + command}* 12 =  *<socket>*
╭• *${usedPrefix + command}* 13 =  *<maker>*
╭• *${usedPrefix + command}* 14 =  *<wallp>*
╭• *${usedPrefix + command}* 15 =  *<logos>*
╭• *${usedPrefix + command}* 16 =  *<anime>*
╭• *${usedPrefix + command}* 17 =  *<random>*
╭• *${usedPrefix + command}* 18 =  *<ia>*
╭• *${usedPrefix + command}* 19 =  *<sistema>*
╭• *${usedPrefix + command}* 20 =  *<premium>*
╭• *${usedPrefix + command}* 21 =  *<mod>*
╭• *${usedPrefix + command}* 22 =  *<admin>*
╭• *${usedPrefix + command}* 23 =  *<util>*
╭• *${usedPrefix + command}* 24 =  *<extras>*
╭• *${usedPrefix + command}* 25 =  *<owner>*
╭• *${usedPrefix + command}* 26 =  *<actions>*
╭• *${usedPrefix + command}* 27 =  *<shop>*
╰───────────────•`
conn.sendMessage(m.chat, { text: menu, mentions: [m.sender, conn.user.jid] }, { quoted: m })
} else if (args[0] === '1' || args[0] === 'info') {
let menu1 = `*⟣──•【  M E N U  :  1  】•──⟢*
❒ *Usuario:* ${taguser} 
❒ *Bot:* ${wm}
❒ *Baileys:* @mdmx-socket.ls
❒ *Version:* ${vs}
❒ *Modo:* Publico


${readMore}
> *[  𝐈𝐍𝐅𝐎𝐑𝐌𝐀𝐂𝐈𝐎𝐍  ]*
─⊹ _${usedPrefix}creador_
─⊹ _${usedPrefix}canales_
─⊹ _${usedPrefix}cuentas_
─⊹ _${usedPrefix}donar_
─⊹ _${usedPrefix}stat_
─⊹ _${usedPrefix}grupos_
─⊹ _${usedPrefix}ifbot_
─⊹ _${usedPrefix}usos_
─⊹ _${usedPrefix}ping_
─⊹ _${usedPrefix}server_
─⊹ _${usedPrefix}run_`.trim();
conn.sendMessage(m.chat, { text: `${menu1}`, mentions: conn.conn.parseMention(menu1), contextInfo: { externalAdReply: { title: '⫶☰ 𝖨 𝖭 𝖥 𝖮 𝖱 Μ Λ 𝖢 𝖨 𝖮 𝖭', body: '✎ ᴍɪʀᴀ ʟᴀ ɪɴғᴏʀᴍᴀᴄɪᴏɴ ᴄᴏᴍᴘʟᴇᴛᴀ.', thumbnailUrl: mxMenu3, sourceUrl: null, mediaType: 1, showAdAttribution: true, renderLargerThumbnail: true }}} , { quoted: m }); //Imagen personalizada con una imagen grande.
} else if (args[0] === '2' || args[0] === 'base') {
let menu2 = `*⟣──•【  M E N U  :  2  】•──⟢*
❒ *Usuario:* ${taguser} 
❒ *Bot:* ${wm}
❒ *Baileys:* @mdmx-socket.ls
❒ *Version:* ${vs}
❒ *Modo:* Publico


${readMore}
> *[  𝐁𝐀𝐒𝐄 𝐃𝐄 𝐃𝐀𝐓𝐎𝐒  ]*
─⊹ _${usedPrefix}npm_ ⧾ *<query>*
─⊹ _${usedPrefix}npms_ ⧾ *<query>*
─⊹ _${usedPrefix}clima_ ⧾ *<query>*
─⊹ _${usedPrefix}infoff_ ⧾ *<id>*
─⊹ _${usedPrefix}terremoto_
─⊹ _${usedPrefix}cai_ ⧾ *<query>*
─⊹ _${usedPrefix}tkvc_ ⧾ *<url>*
─⊹ _${usedPrefix}upload_ ⧾ *<image>*
─⊹ _${usedPrefix}videy_ ⧾ *<url>*
─⊹ _${usedPrefix}ds_lang_
`.trim();
conn.sendMessage(m.chat, { text: `${menu2}`, mentions: conn.parseMention(menu2), contextInfo: { externalAdReply: { title: '⫶☰ 𝖡 Λ 𝖲 Ξ', body: '✎ ᴄᴏᴍᴀɴᴅᴏs ᴜᴛɪʟᴇs ᴇɴ ʟᴀ ᴅᴀᴛᴀʙᴀsᴇ.', thumbnailUrl: mxMenu3, sourceUrl: null, mediaType: 1, showAdAttribution: true, renderLargerThumbnail: true }}} , { quoted: m }); //Imagen personalizada con una imagen grande.
} else if (args[0] === '3' || args[0] === 'ajustes') {
let menu3 = `*⟣──•【  M E N U  :  3  】•──⟢*
❒ *Usuario:* ${taguser} 
❒ *Bot:* ${wm}
❒ *Baileys:* @mdmx-socket.ls
❒ *Version:* ${vs}
❒ *Modo:* Publico


${readMore}
> *[  𝐇𝐄𝐑𝐑𝐀𝐌𝐈𝐄𝐍𝐓𝐀𝐒  ]*
─⊹ _${usedPrefix}yurl_ ⧾ *<url>*
─⊹ _${usedPrefix}statusbot_ ⧾ *<reply>*
─⊹ _${usedPrefix}hours_
─⊹ _${usedPrefix}ver_ ⧾ *<reply view>*
─⊹ _${usedPrefix}newgroup_ ⧾ *<text>*
─⊹ _${usedPrefix}ofuscar_ ⧾ *<reply>*
─⊹ _${usedPrefix}smsfake_ ⧾ *<reply>*
─⊹ _${usedPrefix}traducir_ ⧾ *<text/reply>*
─⊹ _${usedPrefix}calcular_ ⧾ *<query>*
─⊹ _${usedPrefix}getbio_
`.trim();
conn.sendMessage(m.chat, { text: `${menu3}`, mentions: conn.parseMention(menu3), contextInfo: { externalAdReply: { title: '⫶☰ Λ 𝖩 𝖴 𝖲 𝖳 Ξ 𝖲', body: '✎ ᴍɪʀᴀ ʟᴀs ʜᴇʀʀᴀᴍɪᴇɴᴛᴀs ʀᴇǫᴜᴇʀɪᴅᴀs ᴘᴀʀᴀ ᴛɪ.', thumbnailUrl: mxMenu3, sourceUrl: null, mediaType: 1, showAdAttribution: true, renderLargerThumbnail: true }}} , { quoted: m }); //Imagen personalizada con una imagen grande.
} else if (args[0] === '4' || args[0] === 'buscador') {
let menu4 = `*⟣──•【  M E N U  :  4  】•──⟢*
❒ *Usuario:* ${taguser} 
❒ *Bot:* ${wm}
❒ *Baileys:* @mdmx-socket.ls
❒ *Version:* ${vs}
❒ *Modo:* Publico


${readMore}
> *[  𝐁𝐔𝐒𝐂𝐀𝐃𝐎𝐑𝐄𝐒  ]*
─⊹ _${usedPrefix}pinimg_ ⧾ *<text>*
─⊹ _${usedPrefix}pinvid_ ⧾ *<text>*
─⊹ _${usedPrefix}infogit_ ⧾ *<user>*
─⊹ _${usedPrefix}imagen_ ⧾ *<text>*
─⊹ _${usedPrefix}yts_ ⧾ *<text>*
─⊹ _${usedPrefix}google_ ⧾ *<text>*
─⊹ _${usedPrefix}librarys_ ⧾ *<text>*
─⊹ _${usedPrefix}pelis_ ⧾ *<query>*
─⊹ _${usedPrefix}fdrive_ ⧾ *<url>*
─⊹ _${usedPrefix}infobin_ ⧾ *<query>*
─⊹ _${usedPrefix}animeinfo_ ⧾ *<query>*
─⊹ _${usedPrefix}usergit_ ⧾ *<query>*
─⊹ _${usedPrefix}lyrics_ ⧾ *<text>*
─⊹ _${usedPrefix}lyrics2_ ⧾ *<text>*
─⊹ _${usedPrefix}wmusic_ ⧾ *reply>*
─⊹ _${usedPrefix}pixabays_ ⧾ *<text>*
─⊹ _${usedPrefix}reddits_ ⧾ *<text>*
─⊹ _${usedPrefix}spotifys_ ⧾ *<text>*
─⊹ _${usedPrefix}wikipedia_ ⧾ *<text>*
`.trim();
conn.sendMessage(m.chat, { text: `${menu4}`, mentions: conn.parseMention(menu4), contextInfo: { externalAdReply: { title: '⫶☰ 𝖡 𝖴 𝖲 𝖢 Λ 𝖣 𝖮 𝖱', body: '✎ ʙᴜsᴄᴀ ʟᴏ ǫᴜᴇ ǫᴜɪᴇʀᴀs ᴇɴ ᴇsᴛᴀ ʟɪsᴛᴀ.', thumbnailUrl: mxMenu3, sourceUrl: null, mediaType: 1, showAdAttribution: true, renderLargerThumbnail: true }}} , { quoted: m }); //Imagen personalizada con una imagen grande.
} else if (args[0] === '5' || args[0] === 'descargas') {
let menu5 = `*⟣──•【  M E N U  :  5  】•──⟢*
❒ *Usuario:* ${taguser} 
❒ *Bot:* ${wm}
❒ *Baileys:* @mdmx-socket.ls
❒ *Version:* ${vs}
❒ *Modo:* Publico


${readMore}
> *[  𝐃𝐄𝐒𝐂𝐀𝐑𝐆𝐀𝐃𝐎𝐑𝐄𝐒  ]*
─⊹ _${usedPrefix}apk_ ⧾ *<text>*
─⊹ _${usedPrefix}apk2_ ⧾ *<text>*
─⊹ _${usedPrefix}facebook_ ⧾ *<url>*
─⊹ _${usedPrefix}instagram_ ⧾ *<url>*
─⊹ _${usedPrefix}twitter_ ⧾ *<url>*
─⊹ _${usedPrefix}tiktok_ ⧾ *<url>*
─⊹ _${usedPrefix}pinterest_ ⧾ *<url>*
─⊹ _${usedPrefix}github_ ⧾ *<url>*
─⊹ _${usedPrefix}mp3_ ⧾ *<url/text>*
─⊹ _${usedPrefix}mp4_ ⧾ *<url/text>*
─⊹ _${usedPrefix}mp3 doc_ ⧾ *<url/text>*
─⊹ _${usedPrefix}mp4 doc_ ⧾ *<url/text>*
─⊹ _${usedPrefix}play_ ⧾ *<url/text>*
─⊹ _${usedPrefix}play2_ ⧾ *<url/text>*
─⊹ _${usedPrefix}kwaii_ ⧾ *<url>*
─⊹ _${usedPrefix}likee_ ⧾ *<url>*
─⊹ _${usedPrefix}mediafire_ ⧾ *<url>*
─⊹ _${usedPrefix}mega_ ⧾ *<url>*
─⊹ _${usedPrefix}playstore_ ⧾ *<url>*
─⊹ _${usedPrefix}playlist_ ⧾ *<text>*
─⊹ _${usedPrefix}terabox_ ⧾ *<url>*
─⊹ _${usedPrefix}spotify_ ⧾ *<text>*
`.trim();
conn.sendMessage(m.chat, { text: `${menu5}`, mentions: conn.parseMention(menu5), contextInfo: { externalAdReply: { title: '⫶☰ 𝖣 Ξ 𝖲 𝖢 Λ 𝖱 𝖦 Λ 𝖲', body: '✎ ᴅᴇsᴄᴀʀɢᴀ ᴄᴏɴᴛᴇɴɪᴅᴏs sɪɴ ʀᴇsᴛʀɪᴄᴄɪᴏɴᴇs.', thumbnailUrl: mxMenu3, sourceUrl: null, mediaType: 1, showAdAttribution: true, renderLargerThumbnail: true }}} , { quoted: m }); //Imagen personalizada con una imagen grande.
} else if (args[0] === '6' || args[0] === 'convertidor') {
let menu6 = `*⟣──•【  M E N U  :  6  】•──⟢*
❒ *Usuario:* ${taguser} 
❒ *Bot:* ${wm}
❒ *Baileys:* @mdmx-socket.ls
❒ *Version:* ${vs}
❒ *Modo:* Publico


${readMore}
> *[  𝐂𝐎𝐍𝐕𝐄𝐑𝐓𝐈𝐃𝐎𝐑𝐄𝐒  ]*
─⊹ _${usedPrefix}conv url_ ⧾ *<reply>*
─⊹ _${usedPrefix}conv url2_ ⧾ *<reply>*
─⊹ _${usedPrefix}conv url3_ ⧾ *<reply>*
─⊹ _${usedPrefix}conv timg_ ⧾ *<reply>*
─⊹ _${usedPrefix}conv mp3_ ⧾ *<reply>*
─⊹ _${usedPrefix}conv note_ ⧾ *<reply>*
─⊹ _${usedPrefix}conv gif_ ⧾ *<reply>*
─⊹ _${usedPrefix}conv cap_ ⧾ *<url>*
─⊹ _${usedPrefix}conv style_ ⧾ *<text>*
─⊹ _${usedPrefix}conv length_ ⧾ *<reply>*
─⊹ _${usedPrefix}conv hd_ ⧾ *<reply>*
─⊹ _${usedPrefix}conv digit_ ⧾ *<text>*
─⊹ _${usedPrefix}conv view_ ⧾ *<reply>*
─⊹ _${usedPrefix}conv vcard_ ⧾ *<mention>*
`.trim();
conn.sendMessage(m.chat, { text: `${menu6}`, mentions: conn.parseMention(menu6), contextInfo: { externalAdReply: { title: '⫶☰ 𝖢 𝖮 𝖭 𝖵 Ξ 𝖱 𝖳 𝖨 𝖣 𝖮 𝖱', body: '✎ ᴄᴏɴᴠɪᴇʀᴛᴇ ᴄᴏɴᴛᴇɴɪᴅᴏs ᴏ ᴍᴀs ᴇɴ ᴇsᴛᴀ ʟɪsᴛᴀ.', thumbnailUrl: mxMenu3, sourceUrl: null, mediaType: 1, showAdAttribution: true, renderLargerThumbnail: true }}} , { quoted: m }); //Imagen personalizada con una imagen grande.
} else if (args[0] === '7' || args[0] === 'stickers') {
let menu7 = `*⟣──•【  M E N U  :  7  】•──⟢*
❒ *Usuario:* ${taguser} 
❒ *Bot:* ${wm}
❒ *Baileys:* @mdmx-socket.ls
❒ *Version:* ${vs}
❒ *Modo:* Publico


${readMore}
> *[  𝐋𝐈𝐒𝐓𝐀 𝐏𝐀𝐑𝐀 𝐒𝐓𝐈𝐂𝐊𝐄𝐑𝐒  ]*
─⊹ _${usedPrefix}sticker_ ⧾ *<reply img>*
─⊹ _${usedPrefix}sticker2_ ⧾ *<reply img>*
─⊹ _${usedPrefix}emojix_ ⧾ *<emoji+emoji>*
─⊹ _${usedPrefix}trigger_
─⊹ _${usedPrefix}sdarck_ ⧾ *<text>*
─⊹ _${usedPrefix}stext_ ⧾ *<text>*
─⊹ _${usedPrefix}stg_ ⧾ *<url>*
─⊹ _${usedPrefix}stg2_ ⧾ *<url>*
─⊹ _${usedPrefix}brat_ ⧾ *<text>*
─⊹ _${usedPrefix}brat2_ ⧾ *<text>*
─⊹ _${usedPrefix}stickm_ ⧾ *<effect>*
─⊹ _${usedPrefix}sget_ ⧾ *<text>*
─⊹ _${usedPrefix}footer_ ⧾ *<text|text>*
─⊹ _${usedPrefix}footer2_ ⧾ *<text|text>*
─⊹ _${usedPrefix}scircle_ ⧾ *<img>*
─⊹ _${usedPrefix}exif_ ⧾ *<text|text>*
─⊹ _${usedPrefix}smeme_ ⧾ *<img>*
─⊹ _${usedPrefix}dado_
`.trim();
conn.sendMessage(m.chat, { text: `${menu7}`, mentions: conn.parseMention(menu7), contextInfo: { externalAdReply: { title: '⫶☰ 𝖲 𝖳 𝖨 𝖢 𝖪 Ξ 𝖱 𝖲', body: '✎ ᴄʀᴇᴀ ᴛᴜ ᴘʀᴏᴘɪᴏs sᴛɪᴄᴋᴇʀs ᴇɴ ᴇsᴛᴀ ʟɪsᴛᴀ.', thumbnailUrl: mxMenu3, sourceUrl: null, mediaType: 1, showAdAttribution: true, renderLargerThumbnail: true }}} , { quoted: m }); //Imagen personalizada con una imagen grande.
} else if (args[0] === '8' || args[0] === 'grupos') {
let menu8 = `*⟣──•【  M E N U  :  8  】•──⟢*
❒ *Usuario:* ${taguser} 
❒ *Bot:* ${wm}
❒ *Baileys:* @mdmx-socket.ls
❒ *Version:* ${vs}
❒ *Modo:* Publico


${readMore}
> *[  𝐋𝐈𝐒𝐓𝐀 𝐏𝐀𝐑𝐀 𝐆𝐑𝐔𝐏𝐎𝐒  ]*
─⊹ _${usedPrefix}newlink_
─⊹ _${usedPrefix}admins_ ⧾ *<text>*
─⊹ _${usedPrefix}+user_ ⧾ *<number>*
─⊹ _${usedPrefix}-user_ ⧾ *<mention>*
─⊹ _${usedPrefix}promote_ ⧾ *<mention>*
─⊹ _${usedPrefix}demote_ ⧾ *<mention>*
─⊹ _${usedPrefix}+banchat_
─⊹ _${usedPrefix}-banchat_
─⊹ _${usedPrefix}cwelcom_ ⧾ *<text>*
─⊹ _${usedPrefix}cbye_ ⧾ *<text>*
─⊹ _${usedPrefix}cname_ ⧾ *<text>*
─⊹ _${usedPrefix}cdesc_ ⧾ *<text>*
─⊹ _${usedPrefix}cfoto_ ⧾ *<reply img>*
─⊹ _${usedPrefix}group open_
─⊹ _${usedPrefix}group close_
─⊹ _${usedPrefix}+warn_ ⧾ *<mention>*
─⊹ _${usedPrefix}-warn_ ⧾ *<mention>*
─⊹ _${usedPrefix}dnums_ ⧾ *<number>*
─⊹ _${usedPrefix}kicknrs_ ⧾ *<number>*
─⊹ _${usedPrefix}delete_ ⧾ *<reply>*
─⊹ _${usedPrefix}link_
─⊹ _${usedPrefix}inum_
─⊹ _${usedPrefix}kicknum_
─⊹ _${usedPrefix}infogroup_
─⊹ _${usedPrefix}tags_
─⊹ _${usedPrefix}mute_ ⧾ *<mention>*
─⊹ _${usedPrefix}unmute_ ⧾ *<mention>*
─⊹ _${usedPrefix}tagline_
─⊹ _${usedPrefix}tage_ ⧾ *<reply>*
`.trim();
conn.sendMessage(m.chat, { text: `${menu8}`, mentions: conn.parseMention(menu8), contextInfo: { externalAdReply: { title: '⫶☰ 𝖦 𝖱 𝖴 𝖯 𝖮 𝖲', body: '✎ ᴄᴏɴғɪɢᴜʀᴀ ᴛᴜ ɢʀᴜᴘᴏ ᴘᴀʀᴀ ǫᴜᴇ sᴇᴀ ᴍᴇᴊᴏʀ.', thumbnailUrl: mxMenu3, sourceUrl: null, mediaType: 1, showAdAttribution: true, renderLargerThumbnail: true }}} , { quoted: m }); //Imagen personalizada con una imagen grande.
} else if (args[0] === '9' || args[0] === 'rpg') {
let menu9 = `*⟣──•【  M E N U  :  9  】•──⟢*
❒ *Usuario:* ${taguser} 
❒ *Bot:* ${wm}
❒ *Baileys:* @mdmx-socket.ls
❒ *Version:* ${vs}
❒ *Modo:* Publico


${readMore}
> *[  𝐋𝐈𝐒𝐓𝐀 𝐃𝐄 𝐑𝐏𝐆  ]*
─⊹ _${usedPrefix}rpg cofre_
─⊹ _${usedPrefix}rpg curar_
─⊹ _${usedPrefix}rpg adventure_
─⊹ _${usedPrefix}rpg wallet_
─⊹ _${usedPrefix}rpg claim_
─⊹ _${usedPrefix}rpg hour_
─⊹ _${usedPrefix}rpg week_
─⊹ _${usedPrefix}rpg day_
─⊹ _${usedPrefix}rpg month_
─⊹ _${usedPrefix}infodep_ 
─⊹ _${usedPrefix}inforet_
─⊹ _${usedPrefix}rpg dep_ ⧾ *<count>*
─⊹ _${usedPrefix}rpg dep2_ ⧾ *<count>*
─⊹ _${usedPrefix}rpg dep3_ ⧾ *<count>*
─⊹ _${usedPrefix}rpg ret_ ⧾ *<count>*
─⊹ _${usedPrefix}rpg ret2_ ⧾ *<count>*
─⊹ _${usedPrefix}rpg ret3_ ⧾ *<count>*
─⊹ _${usedPrefix}share_
─⊹ _${usedPrefix}shop buy_ ⧾ *<query>*
─⊹ _${usedPrefix}shop sell_ ⧾ *<query>*
─⊹ _${usedPrefix}shop store_
`.trim();
conn.sendMessage(m.chat, { text: `${menu9}`, mentions: conn.parseMention(menu9), contextInfo: { externalAdReply: { title: '⫶☰ 𝖱 𝖯 𝖦', body: '✎ ᴊᴜᴇɢᴀ ᴊᴜᴇɢᴏs ʀᴘɢ ᴘᴀʀᴀ ᴄᴏɴsᴇɢᴜɪᴇ ʀᴇᴄᴜʀsᴏs ᴅɪᴠᴇʀᴛɪᴅᴏs.', thumbnailUrl: mxMenu3, sourceUrl: null, mediaType: 1, showAdAttribution: true, renderLargerThumbnail: true }}} , { quoted: m }); //Imagen personalizada con una imagen grande.
} else if (args[0] === '10' || args[0] === 'juegos') {
let menu10 = `*⟣──•【  M E N U  :  10  】•──⟢*
❒ *Usuario:* ${taguser} 
❒ *Bot:* ${wm}
❒ *Baileys:* @mdmx-socket.ls
❒ *Version:* ${vs}
❒ *Modo:* Publico


${readMore}
> *[  𝐋𝐈𝐒𝐓𝐀 𝐃𝐄 𝐉𝐔𝐄𝐆𝐎𝐒  ]*
─⊹ _${usedPrefix}acertijo_
─⊹ _${usedPrefix}parejas_
─⊹ _${usedPrefix}person_ ⧾ *<mention>*
─⊹ _${usedPrefix}ship_ ⧾ *<mention/mention>*
─⊹ _${usedPrefix}hacking_ ⧾ *<mention>*
─⊹ _${usedPrefix}rulet_
─⊹ _${usedPrefix}gay_ ⧾ *<mention>*
─⊹ _${usedPrefix}gay2_ ⧾ *<mention>*
─⊹ _${usedPrefix}lesbiana_ ⧾ *<mention>*
─⊹ _${usedPrefix}manco_ ⧾ *<mention>*
─⊹ _${usedPrefix}manca_ ⧾ *<mention>*
─⊹ _${usedPrefix}pajero_ ⧾ *<mention>*
─⊹ _${usedPrefix}pajera_ ⧾ *<mention>*
─⊹ _${usedPrefix}sabio_ ⧾ *<mention>*
─⊹ _${usedPrefix}inteligente_ ⧾ *<mention>*
─⊹ _${usedPrefix}maduro_ ⧾ *<mention>*
─⊹ _${usedPrefix}hot_ ⧾ *<mention>*
─⊹ _${usedPrefix}topgays_
─⊹ _${usedPrefix}toplindos_
─⊹ _${usedPrefix}tophots_
─⊹ _${usedPrefix}topvagos_
─⊹ _${usedPrefix}topinteligentes_
─⊹ _${usedPrefix}topsabios_
─⊹ _${usedPrefix}topfamosos_
─⊹ _${usedPrefix}topamores_
─⊹ _${usedPrefix}suitpvp_ ⧾ *<mention>*
─⊹ _${usedPrefix}tictactoe_ ⧾ *<mention>*
`.trim();
conn.sendMessage(m.chat, { text: `${menu10}`, mentions: conn.parseMention(menu10), contextInfo: { externalAdReply: { title: '⫶☰ 𝖩 𝖴 Ξ 𝖦 𝖮 𝖲', body: '✎ ᴊᴜᴇɢᴀ ᴊᴜᴇɢᴏs ᴘʀᴇᴅᴇᴛᴇʀᴍɪɴᴀᴅᴏs ᴄᴏɴ ᴛᴜs ᴀᴍɪɢᴏs.', thumbnailUrl: mxMenu3, sourceUrl: null, mediaType: 1, showAdAttribution: true, renderLargerThumbnail: true }}} , { quoted: m }); //Imagen personalizada con una imagen grande.
} else if (args[0] === '11' || args[0] === 'perfil') {
let menu11 = `*⟣──•【  M E N U  :  11  】•──⟢*
❒ *Usuario:* ${taguser} 
❒ *Bot:* ${wm}
❒ *Baileys:* @mdmx-socket.ls
❒ *Version:* ${vs}
❒ *Modo:* Publico


${readMore}
> *[  𝐋𝐈𝐒𝐓𝐀 𝐃𝐄 𝐏𝐄𝐑𝐅𝐈𝐋  ]*
─⊹ _${usedPrefix}perfil_
─⊹ _${usedPrefix}perfil birth_ ⧾ *<query>*
─⊹ _${usedPrefix}perfil -birth_
─⊹ _${usedPrefix}perfil bio_ ⧾ *<text>*
─⊹ _${usedPrefix}perfil -bio_
─⊹ _${usedPrefix}perfil gender_ ⧾ *<text>*
─⊹ _${usedPrefix}perfil -gender_
─⊹ _${usedPrefix}perfil link_ ⧾ *<url>*
─⊹ _${usedPrefix}perfil -link_
─⊹ _${usedPrefix}perfil age_ ⧾ *<query>*
─⊹ _${usedPrefix}perfil -age_
─⊹ _${usedPrefix}perfil img_ ⧾ *<ulr>*
─⊹ _${usedPrefix}perfil -img_
─⊹ _${usedPrefix}perfil footer_ ⧾ *<text>*
─⊹ _${usedPrefix}perfil -footer_
─⊹ _${usedPrefix}perfil title_ ⧾ *<text>*
─⊹ _${usedPrefix}perfil -title_
─⊹ _${usedPrefix}perfil web_ ⧾ *<url>*
─⊹ _${usedPrefix}perfil -web_
─⊹ _${usedPrefix}perfil all_
`.trim();
conn.sendMessage(m.chat, { text: `${menu11}`, mentions: conn.parseMention(menu11), contextInfo: { externalAdReply: { title: '⫶☰ 𝖯 Ξ 𝖱 𝖥 𝖨 𝖫', body: '✎ ᴍɪʀᴀ ʟᴏ ǫᴜᴇ ᴘᴜᴇᴅᴇs ʜᴀᴄᴇʀ ᴄᴏɴ ᴛᴜ ᴘᴇʀғɪʟ ᴇɴ ᴇsᴛᴀ ʟɪsᴛᴀ.', thumbnailUrl: mxMenu3, sourceUrl: null, mediaType: 1, showAdAttribution: true, renderLargerThumbnail: true }}} , { quoted: m }); //Imagen personalizada con una imagen grande.
} else if (args[0] === '12' || args[0] === 'socket') {
let menu12 = `*⟣──•【  M E N U  :  8  】•──⟢*
❒ *Usuario:* ${taguser} 
❒ *Bot:* ${wm}
❒ *Baileys:* @mdmx-socket.ls
❒ *Version:* ${vs}
❒ *Modo:* Publico


${readMore}
> *[  𝐋𝐈𝐒𝐓𝐀 𝐃𝐄 𝐒𝐎𝐂𝐊𝐄𝐓𝐒  ]*
─⊹ _${usedPrefix}mysock private_
─⊹ _${usedPrefix}mysock id_
─⊹ _${usedPrefix}sockets_
─⊹ _${usedPrefix}delsock_
─⊹ _${usedPrefix}sockfd_
─⊹ _${usedPrefix}stopk_
─⊹ _${usedPrefix}sockid_
`.trim();
conn.sendMessage(m.chat, { text: `${menu12}`, mentions: conn.parseMention(menu12), contextInfo: { externalAdReply: { title: '⫶☰ 𝖲 𝖮 𝖢 𝖪 Ξ 𝖳', body: '✎ ᴄᴏɴᴇᴄᴛᴀᴛᴇ ᴄᴏᴍᴏ sᴏᴄᴋᴇᴛ (ᴘʀᴇ-ʙᴏᴛ) ʏ ᴅɪsғʀᴜᴛᴀ ᴜsᴀɴᴅᴏ ᴇʟ ʙᴏᴛ.', thumbnailUrl: mxMenu3, sourceUrl: null, mediaType: 1, showAdAttribution: true, renderLargerThumbnail: true }}} , { quoted: m }); //Imagen personalizada con una imagen grande.
} else if (args[0] === '13' || args[0] === 'maker') {
let menu13 = `*⟣──•【  M E N U  :  8  】•──⟢*
❒ *Usuario:* ${taguser} 
❒ *Bot:* ${wm}
❒ *Baileys:* @mdmx-socket.ls
❒ *Version:* ${vs}
❒ *Modo:* Publico


${readMore}
> *[  𝐋𝐈𝐒𝐓𝐀 𝐌𝐀𝐊𝐄𝐑  ]*
─⊹ _${usedPrefix}maker pixel_
─⊹ _${usedPrefix}maker ytc_ ⧾ *<text>*
─⊹ _${usedPrefix}maker simp_ ⧾ *<mention>*
─⊹ _${usedPrefix}maker blur_
─⊹ _${usedPrefix}maker stupid_ ⧾ *<mention>*
─⊹ _${usedPrefix}maker horny_ ⧾ *<mention>*
─⊹ _${usedPrefix}maker lolice_ ⧾ *<mention>*
─⊹ _${usedPrefix}maker basura_ ⧾ *<mention>*
─⊹ _${usedPrefix}maker gay_ ⧾ *<mention>*
─⊹ _${usedPrefix}maker rip_ ⧾ *<mention>*
─⊹ _${usedPrefix}maker shit_ ⧾ *<mention>*
─⊹ _${usedPrefix}maker spank_ ⧾ *<mention>*
─⊹ _${usedPrefix}maker delete_ ⧾ *<mention>*
─⊹ _${usedPrefix}maker bea_ ⧾ *<mention>*
`.trim();
conn.sendMessage(m.chat, { text: `${menu13}`, mentions: conn.parseMention(menu13), contextInfo: { externalAdReply: { title: '⫶☰ 𝖬 Λ 𝖪 𝖤 𝖱', body: '✎ ᴄᴏᴍᴀɴᴅᴏs ᴅᴇ ɪɴᴛᴇʀᴀᴄᴄɪᴏɴ ʙᴀsɪᴄᴀ ᴘᴀʀᴀ ᴛᴜs ᴀᴍɪɢᴏs.', thumbnailUrl: mxMenu3, sourceUrl: null, mediaType: 1, showAdAttribution: true, renderLargerThumbnail: true }}} , { quoted: m }); //Imagen personalizada con una imagen grande.
} else if (args[0] === '14' || args[0] === 'wallp') {
let menu14 = `*⟣──•【  M E N U  :  14  】•──⟢*
❒ *Usuario:* ${taguser} 
❒ *Bot:* ${wm}
❒ *Baileys:* @mdmx-socket.ls
❒ *Version:* ${vs}
❒ *Modo:* Publico


${readMore}
> *[  𝐋𝐈𝐒𝐓𝐀 𝐃𝐄 𝐅𝐎𝐍𝐃𝐎𝐒  ]*
─⊹ _${usedPrefix}wallp girl_
─⊹ _${usedPrefix}wallp boy_
─⊹ _${usedPrefix}wallp rd_
─⊹ _${usedPrefix}wallpc girl_
─⊹ _${usedPrefix}wallpc boy_
─⊹ _${usedPrefix}wallpc rd_
`.trim();
conn.sendMessage(m.chat, { text: `${menu14}`, mentions: conn.parseMention(menu14), contextInfo: { externalAdReply: { title: '⫶☰ 𝖶 Λ 𝖫 𝖫 𝖯 Λ 𝖯 Ξ 𝖱 𝖲', body: '✎ ᴅɪsᴘᴏɴɪʙɪʟɪᴅᴀᴅ ᴇɴ ғᴏɴᴅᴏs ᴅᴇ ᴘᴀɴᴛᴀʟʟᴀ ᴘᴀʀᴀ ᴍᴏᴠɪʟ ᴏ ᴘᴄ.', thumbnailUrl: mxMenu3, sourceUrl: null, mediaType: 1, showAdAttribution: true, renderLargerThumbnail: true }}} , { quoted: m }); //Imagen personalizada con una imagen grande.
} else if (args[0] === '15' || args[0] === 'logos') {
let menu15 = `*⟣──•【  M E N U  :  15  】•──⟢*
❒ *Usuario:* ${taguser} 
❒ *Bot:* ${wm}
❒ *Baileys:* @mdmx-socket.ls
❒ *Version:* ${vs}
❒ *Modo:* Publico


${readMore}
> *[  𝐋𝐈𝐒𝐓𝐀 𝐃𝐄 𝐋𝐎𝐆𝐎𝐒  ]*
─⊹ _${usedPrefix}logo1_ ⧾ *<text>*
─⊹ _${usedPrefix}logo2_ ⧾ *<text>*
─⊹ _${usedPrefix}logo3_ ⧾ *<text>*
─⊹ _${usedPrefix}logo4_ ⧾ *<text>*
─⊹ _${usedPrefix}logo5_ ⧾ *<text>*
─⊹ _${usedPrefix}logo6_ ⧾ *<text>*
─⊹ _${usedPrefix}logo7_ ⧾ *<text>*
─⊹ _${usedPrefix}logo8_ ⧾ *<text>*
─⊹ _${usedPrefix}logo9_ ⧾ *<text>*
─⊹ _${usedPrefix}logo10_ ⧾ *<text>*
─⊹ _${usedPrefix}logo11_ ⧾ *<text>*
─⊹ _${usedPrefix}logo12_ ⧾ *<text>*
─⊹ _${usedPrefix}logo13_ ⧾ *<text>*
─⊹ _${usedPrefix}logo14_ ⧾ *<text>*
─⊹ _${usedPrefix}logo15_ ⧾ *<text>*
─⊹ _${usedPrefix}logo16_ ⧾ *<text>*
─⊹ _${usedPrefix}logo17_ ⧾ *<text>*
─⊹ _${usedPrefix}logo18_ ⧾ *<text>*
─⊹ _${usedPrefix}logo19_ ⧾ *<text>*
─⊹ _${usedPrefix}logo20_ ⧾ *<text>*
─⊹ _${usedPrefix}logo21_ ⧾ *<text>*
─⊹ _${usedPrefix}logo22_ ⧾ *<text>*
─⊹ _${usedPrefix}logo23_ ⧾ *<text>*
─⊹ _${usedPrefix}logo24_ ⧾ *<text>*
─⊹ _${usedPrefix}logo25_ ⧾ *<text>*
─⊹ _${usedPrefix}logo26_ ⧾ *<text>*
─⊹ _${usedPrefix}logo27_ ⧾ *<text>*
─⊹ _${usedPrefix}logo28_ ⧾ *<text>*
─⊹ _${usedPrefix}logo29_ ⧾ *<text>*
─⊹ _${usedPrefix}logo30_ ⧾ *<text>*
─⊹ _${usedPrefix}logo31_ ⧾ *<text>*
─⊹ _${usedPrefix}logo32_ ⧾ *<text>*
─⊹ _${usedPrefix}logo33_ ⧾ *<text>*
─⊹ _${usedPrefix}logo34_ ⧾ *<text>*
─⊹ _${usedPrefix}logo35_ ⧾ *<text>*
─⊹ _${usedPrefix}logo36_ ⧾ *<text>*
─⊹ _${usedPrefix}logo37_ ⧾ *<text>*
`.trim();
conn.sendMessage(m.chat, { text: `${menu15}`, mentions: conn.parseMention(menu15), contextInfo: { externalAdReply: { title: '⫶☰ 𝖫 𝖮 𝖦 𝖮 𝖲', body: '✎ ᴄʀᴇᴀ ʟᴏɢᴏs ᴜɴɪᴄᴏs ᴇɴ ᴇsᴛᴀ ʟɪsᴛᴀ.', thumbnailUrl: mxMenu3, sourceUrl: null, mediaType: 1, showAdAttribution: true, renderLargerThumbnail: true }}} , { quoted: m }); //Imagen personalizada con una imagen grande.
} else if (args[0] === '16' || args[0] === 'anime') {
let menu16 = `*⟣──•【  M E N U  :  16  】•──⟢*
❒ *Usuario:* ${taguser} 
❒ *Bot:* ${wm}
❒ *Baileys:* @mdmx-socket.ls
❒ *Version:* ${vs}
❒ *Modo:* Publico


${readMore}
> *[  𝐋𝐈𝐒𝐓𝐀 𝐃𝐄 𝐀𝐍𝐈𝐌𝐄𝐒  ]*
─⊹ _${usedPrefix}anime naruto_
─⊹ _${usedPrefix}anime minato_
─⊹ _${usedPrefix}anime sakura_
─⊹ _${usedPrefix}anime takeda_
─⊹ _${usedPrefix}anime itachi_
─⊹ _${usedPrefix}anime sasuke_
─⊹ _${usedPrefix}anime goku_
─⊹ _${usedPrefix}anime miku_
`.trim();
conn.sendMessage(m.chat, { text: `${menu16}`, mentions: conn.parseMention(menu16), contextInfo: { externalAdReply: { title: '⫶☰ Λ 𝖭 𝖨 𝖬 Ξ 𝖲', body: '✎ ᴍɪʀᴀ ʟᴏs ᴀɴɪᴍᴇs ᴇɴ ғᴏʀᴍᴀᴛᴏ ᴀʟᴇᴀᴛᴏʀɪᴏ ᴏ ʙᴜsᴄᴀ ᴛᴜ ғᴀᴠᴏʀɪᴛᴏ.', thumbnailUrl: mxMenu3, sourceUrl: null, mediaType: 1, showAdAttribution: true, renderLargerThumbnail: true }}} , { quoted: m }); //Imagen personalizada con una imagen grande.
} else if (args[0] === '17' || args[0] === 'random') {
let menu17 = `*⟣──•【  M E N U  :  17  】•──⟢*
❒ *Usuario:* ${taguser} 
❒ *Bot:* ${wm}
❒ *Baileys:* @mdmx-socket.ls
❒ *Version:* ${vs}
❒ *Modo:* Publico


${readMore}
> *[  𝐋𝐈𝐒𝐓𝐀 𝐀𝐋𝐄𝐀𝐓𝐎𝐑𝐈𝐀  ]*
─⊹ _${usedPrefix}rd messi_
─⊹ _${usedPrefix}rd cr7_
─⊹ _${usedPrefix}rd neymar_
─⊹ _${usedPrefix}rd bts_
─⊹ _${usedPrefix}rd navidad_
─⊹ _${usedPrefix}rd universo_
`.trim();
conn.sendMessage(m.chat, { text: `${menu17}`, mentions: conn.parseMention(menu17), contextInfo: { externalAdReply: { title: '⫶☰ 𝖱 Λ 𝖭 𝖣 𝖮 𝖬', body: '✎ ᴍɪʀᴀ ғᴏᴛᴏs ᴅᴇ ғᴀᴍᴏsᴏs ᴏ ʙᴜsᴄᴀ ᴛᴜ ʀᴀɴᴅᴏᴍ ғᴀᴠᴏʀɪᴛᴏ ᴇɴ ᴇsᴛᴀ ʟɪsᴛᴀ.', thumbnailUrl: mxMenu3, sourceUrl: null, mediaType: 1, showAdAttribution: true, renderLargerThumbnail: true }}} , { quoted: m }); //Imagen personalizada con una imagen grande.
} else if (args[0] === '18' || args[0] === 'ia') {
let menu18 = `*⟣──•【  M E N U  :  18  】•──⟢*
❒ *Usuario:* ${taguser} 
❒ *Bot:* ${wm}
❒ *Baileys:* @mdmx-socket.ls
❒ *Version:* ${vs}
❒ *Modo:* Publico


${readMore}
> *[  𝐋𝐈𝐒𝐓𝐀 𝐃𝐄 𝐈𝐀𝐒  ]*
─⊹ _${usedPrefix}chatgpt_ ⧾ *<text>*
─⊹ _${usedPrefix}gemini_ ⧾ *<text>*
─⊹ _${usedPrefix}copilot_ ⧾ *<text>*
─⊹ _${usedPrefix}bing_ ⧾ *<text>*
─⊹ _${usedPrefix}dalle_ ⧾ *<text>*
─⊹ _${usedPrefix}mdmx_ ⧾ *<text>*
─⊹ _${usedPrefix}blackbox_ ⧾ *<text>*
─⊹ _${usedPrefix}imagina_ ⧾ *<text>*
`.trim();
conn.sendMessage(m.chat, { text: `${menu18}`, mentions: conn.parseMention(menu18), contextInfo: { externalAdReply: { title: '⫶☰ Λ 𝖱 𝖳 𝖨 𝖥 𝖨 𝖢 𝖨 Λ 𝖫', body: '✎ ɪɴᴛᴇʀᴀᴄᴛᴜᴀ ᴄᴏɴ ɪɴᴛᴇʟɪɢᴇɴᴄɪᴀ ᴀʀᴛɪғɪᴄɪᴀʟ ᴇɴ ᴇsᴛᴀ ʟɪsᴛᴀ.', thumbnailUrl: mxMenu3, sourceUrl: null, mediaType: 1, showAdAttribution: true, renderLargerThumbnail: true }}} , { quoted: m }); //Imagen personalizada con una imagen grande.
} else if (args[0] === '19' || args[0] === 'sistema') {
let menu19 = `*⟣──•【  M E N U  :  19  】•──⟢*
❒ *Usuario:* ${taguser} 
❒ *Bot:* ${wm}
❒ *Baileys:* @mdmx-socket.ls
❒ *Version:* ${vs}
❒ *Modo:* Publico


${readMore}
> *[  𝐋𝐈𝐒𝐓𝐀 𝐃𝐄 𝐒𝐈𝐒𝐓𝐄𝐌𝐀  ]*
─⊹ *=>*
─⊹ *$*
─⊹ _${usedPrefix}cbot_ ⧾ *<text>*
─⊹ _${usedPrefix}system_
─⊹ _${usedPrefix}aweb_ ⧾ *<url>*
`.trim();
conn.sendMessage(m.chat, { text: `${menu19}`, mentions: conn.parseMention(menu19), contextInfo: { externalAdReply: { title: '⫶☰ 𝖲 𝖨 𝖲 𝖳 Ξ 𝖬 Λ', body: '✎ ᴍɪʀᴀ ʟᴏ ǫᴜᴇ ʜᴀʏ ᴇɴ ᴇsᴛᴀ sɪsᴛᴇᴍᴀ ᴘʀᴇ ᴀsɪɢɴᴀᴅᴀs ᴇɴ ᴇsᴛᴀ ʟɪsᴛᴀ.', thumbnailUrl: mxMenu3, sourceUrl: null, mediaType: 1, showAdAttribution: true, renderLargerThumbnail: true }}} , { quoted: m }); //Imagen personalizada con una imagen grande.
} else if (args[0] === '20' || args[0] === 'premium') {
let menu20 = `*⟣──•【  M E N U  :  20  】•──⟢*
❒ *Usuario:* ${taguser} 
❒ *Bot:* ${wm}
❒ *Baileys:* @mdmx-socket.ls
❒ *Version:* ${vs}
❒ *Modo:* Publico


${readMore}
> *[  𝐋𝐈𝐒𝐓𝐀 𝐏𝐑𝐄𝐌𝐈𝐔𝐌  ]*
─⊹ _${usedPrefix}prem_ ⧾ *<>*
─⊹ _${usedPrefix}prem_ ⧾ *<>*
─⊹ _${usedPrefix}_ ⧾ *<>*
─⊹ _${usedPrefix}_ ⧾ *<>*
`.trim();
conn.sendMessage(m.chat, { text: `${menu20}`, mentions: conn.parseMention(menu20), contextInfo: { externalAdReply: { title: '⫶☰ 𝖯 𝖱 Ξ 𝖬 𝖨 𝖴 𝖬', body: '✎ ᴍɪʀᴀ ʟᴀ ʟɪsᴛᴀ ᴅᴇ ᴄᴏᴍᴀɴᴅᴏs sᴏʟᴏ ᴘᴀʀᴀ ᴜsᴜᴀʀɪᴏs ᴘʀᴇᴍɪᴜᴍ.', thumbnailUrl: mxMenu3, sourceUrl: null, mediaType: 1, showAdAttribution: true, renderLargerThumbnail: true }}} , { quoted: m }); //Imagen personalizada con una imagen grande.
} else if (args[0] === '21' || args[0] === 'mod') {
let menu21 = `*⟣──•【  M E N U  :  21  】•──⟢*
❒ *Usuario:* ${taguser} 
❒ *Bot:* ${wm}
❒ *Baileys:* @mdmx-socket.ls
❒ *Version:* ${vs}
❒ *Modo:* Publico


${readMore}
> *[  𝐋𝐈𝐒𝐓𝐀 𝐌𝐎𝐃𝐄𝐑𝐀𝐃𝐎𝐑  ]*

`.trim();
conn.sendMessage(m.chat, { text: `${menu21}`, mentions: conn.parseMention(menu21), contextInfo: { externalAdReply: { title: '⫶☰ 𝖬 𝖮 𝖣 Ξ 𝖱 Λ 𝖣 𝖮 𝖱', body: '✎ ᴍɪʀᴀ ʟᴀ ʟɪsᴛᴀ ᴅᴇ ᴄᴏᴍᴀɴᴅᴏs sᴏʟᴏ ᴘᴀʀᴀ ᴜsᴜᴀʀɪᴏs ᴍᴏᴅᴇʀᴀᴅᴏʀᴇs.', thumbnailUrl: mxMenu3, sourceUrl: null, mediaType: 1, showAdAttribution: true, renderLargerThumbnail: true }}} , { quoted: m }); //Imagen personalizada con una imagen grande.
} else if (args[0] === '22' || args[0] === 'admin') {
let menu22 = `*⟣──•【  M E N U  :  22  】•──⟢*
❒ *Usuario:* ${taguser} 
❒ *Bot:* ${wm}
❒ *Baileys:* @mdmx-socket.ls
❒ *Version:* ${vs}
❒ *Modo:* Publico


${readMore}
> *[  𝐋𝐈𝐒𝐓𝐀 𝐀𝐃𝐌𝐈𝐍𝐈𝐒𝐓𝐑𝐀𝐃𝐎𝐑  ]*

`.trim();
conn.sendMessage(m.chat, { text: `${menu22}`, mentions: conn.parseMention(menu22), contextInfo: { externalAdReply: { title: '⫶☰ Λ 𝖣 𝖬 𝖨 𝖭 𝖨 𝖲 𝖳 𝖱 Λ 𝖣 𝖮 𝖱', body: '✎ ᴍɪʀᴀ ʟᴀ ʟɪsᴛᴀ ᴅᴇ ᴄᴏᴍᴀɴᴅᴏs sᴏʟᴏ ᴘᴀʀᴀ ᴜsᴜʀɪᴏs ᴀᴅᴍɪɴs ᴅᴇʟ ʙᴏᴛ.', thumbnailUrl: mxMenu3, sourceUrl: null, mediaType: 1, showAdAttribution: true, renderLargerThumbnail: true }}} , { quoted: m }); //Imagen personalizada con una imagen grande.
} else if (args[0] === '23' || args[0] === 'util') {
let menu23 = `*⟣──•【  M E N U  :  23  】•──⟢*
❒ *Usuario:* ${taguser} 
❒ *Bot:* ${wm}
❒ *Baileys:* @mdmx-socket.ls
❒ *Version:* ${vs}
❒ *Modo:* Publico


${readMore}
> *[  𝐋𝐈𝐒𝐓𝐀 𝐃𝐄 𝐔𝐓𝐈𝐋𝐄𝐑𝐈𝐀  ]*

`.trim();
conn.sendMessage(m.chat, { text: `${menu23}`, mentions: conn.parseMention(menu23), contextInfo: { externalAdReply: { title: '⫶☰ 𝖴 𝖳 𝖨 𝖫 𝖨 𝖣 Λ 𝖣', body: '✎ ᴍɪʀᴀ ʟᴀ ʟɪsᴛᴀ ᴅᴇ ᴄᴏᴍᴀɴᴅᴏs ᴜᴛɪʟᴇs ᴘᴀʀᴀ ᴇʟ ᴜsᴏ ᴅᴇʟ ᴜsᴜᴀʀɪᴏ.', thumbnailUrl: mxMenu3, sourceUrl: null, mediaType: 1, showAdAttribution: true, renderLargerThumbnail: true }}} , { quoted: m }); //Imagen personalizada con una imagen grande.
} else if (args[0] === '24' || args[0] === 'extras') {
let menu24 = `*⟣──•【  M E N U  :  24  】•──⟢*
❒ *Usuario:* ${taguser} 
❒ *Bot:* ${wm}
❒ *Baileys:* @mdmx-socket.ls
❒ *Version:* ${vs}
❒ *Modo:* Publico


${readMore}
> *[  𝐋𝐈𝐒𝐓𝐀 𝐄𝐗𝐓𝐑𝐀  ]*

`.trim();
conn.sendMessage(m.chat, { text: `${menu24}`, mentions: conn.parseMention(menu24), contextInfo: { externalAdReply: { title: '⫶☰ Ξ 𝖷 𝖳 𝖱 Λ 𝖲', body: '✎ ᴍɪʀᴀ ʟᴀ ʟɪsᴛᴀ ᴅᴇ ᴄᴏᴍᴀɴᴅᴏs ᴇxᴛʀᴀs ʏ ᴏᴄᴜʟᴛᴀs ᴇɴ ᴇʟ ʙᴏᴛ.', thumbnailUrl: mxMenu3, sourceUrl: null, mediaType: 1, showAdAttribution: true, renderLargerThumbnail: true }}} , { quoted: m }); //Imagen personalizada con una imagen grande.
} else if (args[0] === '25' || args[0] === 'owner') {
let menu25 = `*⟣──•【  M E N U  :  25  】•──⟢*
❒ *Usuario:* ${taguser} 
❒ *Bot:* ${wm}
❒ *Baileys:* @mdmx-socket.ls
❒ *Version:* ${vs}
❒ *Modo:* Publico


${readMore}
> *[  𝐏𝐑𝐎𝐏𝐈𝐄𝐓𝐀𝐑𝐈𝐎  ]*

`.trim();
conn.sendMessage(m.chat, { text: `${menu25}`, mentions: conn.parseMention(menu25), contextInfo: { externalAdReply: { title: '⫶☰ 𝖯 𝖱 𝖮 𝖯 𝖨 Ξ 𝖳 Λ 𝖱 𝖨 𝖮', body: '✎ ᴇsᴛᴀ ʟɪsᴛᴀ sᴏʟᴏ ᴘᴜᴇᴅᴇ sᴇʀ ᴜsᴀᴅᴀ ᴘᴏʀ ᴇʟ ᴘʀᴏᴘɪᴇᴛᴀʀɪᴏ ᴅᴇʟ ʙᴏᴛ.', thumbnailUrl: mxMenu3, sourceUrl: null, mediaType: 1, showAdAttribution: true, renderLargerThumbnail: true }}} , { quoted: m }); //Imagen personalizada con una imagen grande.
} else if (args[0] === '26' || args[0] === 'actions') {
let menu26 = `*⟣──•【  M E N U  :  26  】•──⟢*
❒ *Usuario:* ${taguser} 
❒ *Bot:* ${wm}
❒ *Baileys:* @mdmx-socket.ls
❒ *Version:* ${vs}
❒ *Modo:* Publico


${readMore}
> *[  𝐋𝐈𝐒𝐓𝐀 𝐃𝐄 𝐀𝐂𝐂𝐈𝐎𝐍𝐄𝐒  ]*
─⊹ _${usedPrefix}sv clap_
─⊹ _${usedPrefix}sv caffee_
─⊹ _${usedPrefix}sv step_
─⊹ _${usedPrefix}sv eat_
─⊹ _${usedPrefix}sv happy_
─⊹ _${usedPrefix}sv hug_ ⧾ *<mention>*
─⊹ _${usedPrefix}sv pat_ ⧾ *<mention>*
─⊹ _${usedPrefix}sv kiss_ ⧾ *<mention>*
─⊹ _${usedPrefix}sv carry_ ⧾ *<mention>*
─⊹ _${usedPrefix}sv feed_ ⧾ *<mention>*
─⊹ _${usedPrefix}sv kill_ ⧾ *<mention>*
─⊹ _${usedPrefix}greet_ ⧾ *<mention>*
`.trim();
conn.sendMessage(m.chat, { text: `${menu26}`, mentions: conn.parseMention(menu26), contextInfo: { externalAdReply: { title: '⫶☰ 𝖯 𝖱 𝖮 𝖯 𝖨 Ξ 𝖳 Λ 𝖱 𝖨 𝖮', body: '✎ ᴇsᴛᴀ ʟɪsᴛᴀ sᴏʟᴏ ᴘᴜᴇᴅᴇ sᴇʀ ᴜsᴀᴅᴀ ᴘᴏʀ ᴇʟ ᴘʀᴏᴘɪᴇᴛᴀʀɪᴏ ᴅᴇʟ ʙᴏᴛ.', thumbnailUrl: mxMenu3, sourceUrl: null, mediaType: 1, showAdAttribution: true, renderLargerThumbnail: true }}} , { quoted: m }); //Imagen personalizada con una imagen grande.
} else if (args[0] === '27' || args[0] === 'shop') {
let menu27 = `*⟣──•【  M E N U  :  27  】•──⟢*
❒ *Usuario:* ${taguser} 
❒ *Bot:* ${wm}
❒ *Baileys:* @mdmx-socket.ls
❒ *Version:* ${vs}
❒ *Modo:* Publico


${readMore}
> *[  𝐋𝐈𝐒𝐓𝐀 𝐃𝐄 𝐂𝐎𝐌𝐏𝐑𝐀  ]*
─⊹ _${usedPrefix}usd premium_ ⧾ *<days>*
─⊹ _${usedPrefix}usd moderator_ ⧾ *<days>*
─⊹ _${usedPrefix}usd admin_ ⧾ *<days>*
─⊹ _${usedPrefix}ars premium_ ⧾ *<days>*
─⊹ _${usedPrefix}ars moderator_ ⧾ *<days>*
─⊹ _${usedPrefix}ars admin_ ⧾ *<days>*
`.trim();
conn.sendMessage(m.chat, { text: `${menu27}`, mentions: conn.parseMention(menu27), contextInfo: { externalAdReply: { title: '⫶☰ 𝖯 𝖱 𝖮 𝖯 𝖨 Ξ 𝖳 Λ 𝖱 𝖨 𝖮', body: '✎ ᴇsᴛᴀ ʟɪsᴛᴀ sᴏʟᴏ ᴘᴜᴇᴅᴇ sᴇʀ ᴜsᴀᴅᴀ ᴘᴏʀ ᴇʟ ᴘʀᴏᴘɪᴇᴛᴀʀɪᴏ ᴅᴇʟ ʙᴏᴛ.', thumbnailUrl: mxMenu3, sourceUrl: null, mediaType: 1, showAdAttribution: true, renderLargerThumbnail: true }}} , { quoted: m }); //Imagen personalizada con una imagen grande.
} else if (args[0] === '28' || args[0] === 'edits') {
let menu28 = `*⟣──•【  M E N U  :  28  】•──⟢*
❒ *Usuario:* ${taguser} 
❒ *Bot:* ${wm}
❒ *Baileys:* @mdmx-socket.ls
❒ *Version:* ${vs}
❒ *Modo:* Publico


${readMore}
> *[  𝐋𝐈𝐒𝐓𝐀 𝐃𝐄 𝐄𝐃𝐈𝐂𝐈𝐎𝐍  ]*
─⊹ _${usedPrefix}set money_ ⧾ *<text>*
─⊹ _${usedPrefix}set limit_ ⧾ *<text>*
─⊹ _${usedPrefix}set exp_ ⧾ *<text>*
─⊹ _${usedPrefix}set footer_ ⧾ *<text>*
─⊹ _${usedPrefix}set author_ ⧾ *<text>*
─⊹ _${usedPrefix}set name_ ⧾ *<text>*
─⊹ _${usedPrefix}set channel_ ⧾ *<url>*
─⊹ _${usedPrefix}set group_ ⧾ *<url>*
─⊹ _${usedPrefix}setmenu_ ⧾ *<reply img>*
─⊹ _${usedPrefix}setmenu2_ ⧾ *<reply img>*
─⊹ _${usedPrefix}setmenu3_ ⧾ *<reply img>*
─⊹ _${usedPrefix}setimg_ ⧾ *<reply img>*
─⊹ _${usedPrefix}setimg2_ ⧾ *<reply img>*
─⊹ _${usedPrefix}setimg3_ ⧾ *<reply img>*
`.trim();
conn.sendMessage(m.chat, { text: `${menu28}`, mentions: conn.parseMention(menu28), contextInfo: { externalAdReply: { title: '⫶☰ 𝖯 𝖱 𝖮 𝖯 𝖨 Ξ 𝖳 Λ 𝖱 𝖨 𝖮', body: '✎ ᴇsᴛᴀ ʟɪsᴛᴀ sᴏʟᴏ ᴘᴜᴇᴅᴇ sᴇʀ ᴜsᴀᴅᴀ ᴘᴏʀ ᴇʟ ᴘʀᴏᴘɪᴇᴛᴀʀɪᴏ ᴅᴇʟ ʙᴏᴛ.', thumbnailUrl: mxMenu3, sourceUrl: null, mediaType: 1, showAdAttribution: true, renderLargerThumbnail: true }}} , { quoted: m }); //Imagen personalizada con una imagen grande.
}
};

handler.command = ["menu", "help"]
export default handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)
