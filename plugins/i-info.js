let handler = async (m, { conn, command, usedPrefix, args }) => {
let user = db.data.users[m.sender]
if (!args[0]) {
let informacion = `
· •──• ✦ *INFORMACION* ✦ •──• ·
- Aqui tienes una lista de comandos para ver la informacion del bot o datos.

${usedPrefix + command} donar
${usedPrefix + command} tyc
${usedPrefix + command} grupos
${usedPrefix + command} cuentas
${usedPrefix + command} creador
`
await conn.sendMessage(m.chat, { text: informacion }, { quoted: m })
} else if (args[0] === 'donar' || args[0] === 'donacion') {
let donar = `· •──• ✦ *DONACION* ✦ •──• ·
- Puedes hacer una donacion voluntaria para saber que te gusta el proyecto o su uso facil y sorprendente.

- Agradecemos que puedas usar este proyecto con sus funciones mas detallados y utiles, sobre todo en descargas o alguna otra interaccion.

- Puedes ver mas informacion sobre el bot y su uso de privacidad incluyendo a la de los usuarios con este comando: *${usedPrefix + command} terminos* o *${usedPrefix + command} tyc*

> ❤️ Se le agradece mucho si el proyecto te agrada, aqui puedes hacer una pequeña donacion voluntaria.

${mrpago}`
conn.sendMessage(m.chat, { text: donar, contextInfo: { externalAdReply: { title: wm, body: textoInfo, thumbnailUrl: mxMenu2, sourceUrl: null, mediaType: 1, showAdAttribution: true, renderLargerThumbnail: true }}} , { quoted: m })
} else if (args[0] === 'tyc' || args[0] === 'terminos') {
let terminos = `
· •──• *INFORMACION* •──• ·
» *TERMINOS Y CONDICIONES*

\`PRIVACIDAD:\`
> *Privacidad:* El bot no tiene acceso a las contraseñas secretas de los usuarios, no puede detallar datos personales a los usuarios, sea como *detalle familiar*, *documento*, *cuil*, *ip* o otros detalles personales del mismo individuo, no existen comandos que puedan dar información previa del individuo, tampoco es aceptable que algunos usuarios usen este bot para cosas indebidas y mentir diciendo que puede ayudar a ver información personal del usuario para una denuncia o robos, sin embargo en este texto se enfatiza que no existen comandos que den resultados detallados del usuario y que los usuarios sepan para no ser estafados.

> *Juegos y entretenimiento:* El bot en si, tiene algunos juegos modo *RPG* o juegos de entretenimiento en chats grupales, puede ser usado tanto en subir de nivel que ganar puntos o recompensas y al momento de usar el comando *${usedPrefix}perfil* puedes ver tus recursos y puntos, o mas cosas que puedes hacer en el modo *RPG*, sin embargo a veces puede ser molesto para otros, pero existe la opcion de apagar el modo *RPG* para que puedan tener un chat mas ligero y con menos spam.

> *Lo que puede y tiene:* El bot puede guardar datos personalizados, es decir, datos que no incluyen datos personales, ya que puedes registrarte usando el comando *${usedPrefix}registrar* y poner tu nombre y edad, el nombre es editable, por lo cual puedes editarlo siempre, la edad tambien es editable y puedes cambiarlo en cualquier momento, tambien existiran algunas cosas que podras editar, pero recuerda no usar datos que puedan ser importantes, ya que la seguridad de este bot podra eliminar tu perfil en el bot y comenzar de nuevo tanto en el modo *RPG* que la cantidad de uso de los comandos.

> *Reinicios:* El bot suele reiniciarse completamente para eliminar espacios ocupados y asi ser estable en su uso y comodidad, tambien habra veces en las cuales podra apagarse por un tiempo, debido a actualizaciones o optimización de los datos del bot propio para tener mas estabilidad de uso.

\`TERMINOS DE USO:\`
> *Menores:* Se recomienda que los menores de edad de bajo conocimiento no tengan que usar este bot, esto para impedir el uso de comandos importantes con uso estricto y formado.

> *Uso inadecuado:* Esta estrictamente usar el bot para hacer cosas inapropiadas al usuario, decir que el bot puede ayudar a detallar información personal es una gran estafa para los que quieran una denuncia por alguien, ya que el bot no tiene acceso a ningun dato personal, esta prohibido buscar contenidos inapropiados en la busqueda de ( XXX ), o contenido pornográfico, cualquiera que haga una petición similar a los comandos de búsqueda, sera bloqueado de inmediato en la base del bot.

> *Vender el proyecto:* Esta prohibido revender este proyecto, solo el propietario del proyecto puede revenderlo, esta prohibido su venta, debe de tener cuidado de las personas estafadoras que piden un pago mayor que el pago normal al bot.

> *¿Hay que pagar su uso?:* En todos los demas comandos que hay en el menu usando el comando *${usedPrefix}menu all* o *${usedPrefix}menu completo*, sin embargo hay comandos que solo son de paga en una sola vez por caducidad, por ejemplo los comandos para usuarios *Premium*, *Moderador* y *Administrador del bot*, los demas comandos son gratuitos sin tener que pagar un solo centavo, asi que no tenga que preocuparse por nada de eso, pero si quiere comandos premium o de moderador o administrador puede comprar un plan para tener aun mas comandos disponibles.

> *Premium:* El modo premium del bot puede ser alquilado o comprado por plan en un mes o mas, esta función te brinda mas comandos en la lista de menus exclusivamente para ti, todo aquel que compre un plan premium, tiene acceso a nuevas opciones por descubrir.

> *Opciones:* El bot tiene múltiples funciones que hacen mucho en uno solo, puede descargar contenidos sea videos, imagenes, documentos, stickers o musicas, tambien tiene opciones de busqueda para una mejor comodidad y tiene opciones de personalización de grupos, comandos grupales o para configurar tu grupo o mucho mas o tambien puedes probar los comandos usando el comando *${usedPrefix + command}menu all* o *${usedPrefix + command}menu completo* y mira que cosas puedes hacer o interesarte.

> *Alquilar el bot:* Puedes incluso alquilar el bot, con un plan de muy buen precio o dependiendo de cuantos meses quieres, el pago es de transferencia, pero tambien hay para pagos personales con el equipo de asistencia en este proyecto.
`
conn.sendMessage(m.chat, { text: terminos, contextInfo: { externalAdReply: { title: wm, body: textoInfo, thumbnailUrl: mxMenu2, sourceUrl: null, mediaType: 1, showAdAttribution: true, renderLargerThumbnail: true }}} , { quoted: m })
} else if (args[0] === 'grupos' || args[0] === 'groups') {
let misgrupos = `*[ 📍 ]* Aqui tienes los grupos principales y la comunidad de Alan.Js
- Puedes entrar, recuerda respetar cada regla establecida en el grupo.

• *Grupo » Principal:*
# ${grupo1}

• *Grupo » Shop:*
# ${grupo2}

• *Grupo » Games:*
# ${grupo3}

• *Grupo » Victoria:*
# ${grupo4}

• *Grupo » Soporte:*
# ${grupo5}`
await conn.sendMessage(m.chat, { text: misgrupos }, { quoted: m })
} else if (args[0] === 'cuentas' || args[0] === 'redes') {
let cuentas = `*[ 📍 ]* Aqui tienes las cuentas principales de Alan.Js
- Puedes seguirlo para unirte a la familia, consulta si tienes problemas.

• *Instagram:*
# ${ceoig}

• *Facebook:*
# ${ceofb}

• *Threads:*
# ${ceothd}

• *Atom-Bio:*
# ${ceoatom}

• *WhatsApp:*
# ${ceowa}

• *Canal Telegram:*
# ${canaltg}

• *Canal Principal:*
# ${canalwa}

• *Canal Informatico:*
# ${canalwa2}`
await conn.sendMessage(m.chat, { text: cuentas }, { quoted: m })
} else if (args[0] === 'creador' || args[0] === 'dueño' || args[0] === 'creator') {
let creador = `*[ 📍 ]* Aqui tienes el contacto del creador, puedes agregarlo para saber mas sobre el tema o consultarlo de algun problema del proyecto.
- Recuerda leer el texto abajo.

• *WhatsApp Messenger:*
${ceowa}

• *Telegram:*
${ceotg}

\`NOTA:\`
> Para hablar, debes tener el respeto necesario, consultar problemas del proyecto o cualquier otra duda sobre el tema, es posible que no conteste consultas relacionadas consigo mismo o tambien contesta informacion seria o ayuda confiable.`
await conn.sendMessage(m.chat, { text: creador }, { quoted: m })
};
};

handler.command = ["i", "info"]
export default handler

