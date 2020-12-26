const qrcode = require("qrcode-terminal");
const cheerio = require("cheerio");
const imageToBase64 = require('image-to-base64');
const get = require('got')
const fs = require("fs");
const dl = require("./lib/downloadImage.js");
const fetch = require('node-fetch');
const urlencode = require("urlencode");
const axios = require("axios");
const menu = require("./lib/menu.js");
const donasi = require("./lib/donasi.js");
const info = require("./lib/info.js");
const { color, bgcolor } = require('./lib/color')
const { help } = require('./src/help')
const { wait } = require('./lib/functions')
const { getBuffer, fetchJson } = require('./lib/fetcher')
const client = new WAConnection()
const moment = require('moment-timezone')
const { exec } = require('child_process')
const kagApi = require('@kagchi/kag-api')
const fetch = require('node-fetch')
const imgbb = require('imgbb-uploader')
const speed = require('performance-now')
/////////////////
const BotName = 'MorningStar BOT'; 
const instagram = 'https://instagram.com/frostynid'; 
const whatsapp = 'wa.me/+5519996503657'; 
const kapanbotaktif = 'Horário'; 
const grupch1 = 'https://chat.whatsapp.com/DcF66qarH1nJQkGEpoTEPC'; 
//const grupch2 = 'belum ada grup' ; 
const
{
   WAConnection,
   MessageType,
   Presence,
   MessageOptions,
   Mimetype,
   WALocationMessage,
   WA_MESSAGE_STUB_TYPES,
   ReconnectMode,
   ProxyAgent,
   waChatKey,
} = require("@adiwajshing/baileys");
var jam = moment().format("HH:mm");

// OCR Library
const readTextInImage = require('./lib/ocr')

function foreach(arr, func)
{
   for (var i in arr)
   {
      func(i, arr[i]);
   }
}

const readTextInGif = require('./lib/ocr')

function foreach(arr, func)
{
   for (var i in arr)
   {
      func(i, arr[i]);
   }
}

async function start() {
	client.on('qr', () => {
		console.log(color('[','white'), color('!','red'), color(']','white'), color('Scan the qr code above'))
	})

const conn = new WAConnection()
conn.on('qr', qr =>
{
   qrcode.generate(qr,
   {
      small: true
   });
   console.log(`[ ${moment().format("HH:mm:ss")} ] Escaneie O Código Com Seu WhatsApp!`);
});

conn.on('credentials-updated', () =>
{
   // save credentials whenever updated
   console.log(`credentials updated!`)
   const authInfo = conn.base64EncodedAuthInfo() // get all the auth info we need to restore this session
   fs.writeFileSync('./session.json', JSON.stringify(authInfo, null, '\t')) // save this info to a file
})
fs.existsSync('./session.json') && conn.loadAuthInfo('./session.json')
// uncomment the following line to proxy the connection; some random proxy I got off of: https://proxyscrape.com/free-proxy-list
//conn.connectOptions.agent = ProxyAgent ('http://1.0.180.120:8080')
conn.connect();

conn.on('user-presence-update', json => console.log(json.id + ' presence is => ' + json.type)) || console.log('Bot by Frosty')
conn.on('message-status-update', json =>
{
   const participant = json.participant ? ' (' + json.participant + ')' : '' // participant exists when the message is from a group
   console.log(`[ ${moment().format("HH:mm:ss")} ] => bot by Frosty`)
})

client.on('group-participants-update', async (anu) => {
		try {
			const mdata = await client.groupMetadata(anu.jid)
			console.log(anu)
			if (anu.action == 'add') {
				try {
					ppimg = await client.getProfilePicture(`${anu.participants[0].split('@')[0]}@c.us`)
				} catch {
					ppimg = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
				}
				teks = `Halo *${mdata.participants[1].notify}*\nSelamat datang di group *${mdata.subject}*`
				let buff = await getBuffer(ppimg)
				client.sendMessage(mdata.id, buff, MessageType.image, {caption: teks})
			} else if (anu.action == 'remove') {
				try {
					ppimg = await client.getProfilePicture(`${anu.participants[0].split('@')[0]}@c.us`)
				} catch {
					ppimg = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
				}
				teks = `Sayonara 👋`
				let buff = await getBuffer(ppimg)
				client.sendMessage(mdata.id, buff, MessageType.image, {caption: teks})
			}
		} catch (e) {
			console.log('Error : %s', color(e, 'red'))
		}
	})

conn.on('message-new', async(m) =>
{
   const messageContent = m.message
   const text = m.message.conversation
   let id = m.key.remoteJid
   const messageType = Object.keys(messageContent)[0] // message will always contain one key signifying what kind of message
   let imageMessage = m.message.imageMessage;
   console.log(`[ ${moment().format("HH:mm:ss")} ] => Número: ${id.split("@s.whatsapp.net")[0]} => ${text}`);
   if (!mek.message) return
			const content = JSON.stringify(mek.message)
			const from = mek.key.remoteJid
			const type = Object.keys(mek.message)[0]
			const apiKey = 'Api-Key' // You can get Apikey at https://mhankbarbars.herokuapp.com/api
			const msgType = MessageType
			const time = moment.tz('Asia/Jakarta').format('DD/MM HH:mm:ss')
			console.log(color('[','white'), color(time), color(']','white'), 'from', color(from.split('@')[0]), 'type' , color(type))
			if (mek.key.fromMe) return // replace (mek.key.fromMe) to (!mek.key.fromMe) for make self bot
			if (type == 'conversation') {
				const body = mek.message.conversation.toLowerCase()
				const args = body.split(' ')
				if (body.startsWith('!gtts ')) {
					rendom = `${Math.floor(Math.random() * 10000)}.mp3`
					random = `${Math.floor(Math.random() * 20000)}.ogg`
					if (args.length < 1) return client.sendMessage(from, 'Masukkan kode bahasanya juga mas e', msgType.text, {quoted: mek})
					const gtts = require('./lib/gtts')(args[1])
					const dtt = body.slice(8)
					if (!dtt) return client.sendMessage(from, 'Masukkan teks buat di jadiin suaranya juga mas e', msgType.text, {quoted: mek})
					if (dtt.length > 600) return client.sendMessage(from, 'Ngotak mas', msgType.text, {quoted: mek})
					gtts.save(rendom, dtt, function () {
						exec(`ffmpeg -i ${rendom} -ar 48000 -vn -c:a libopus ${random}`, (error, stdout, stder) => {
							let res = fs.readFileSync(random)
							client.sendMessage(from, res, msgType.audio, {ptt: true})
							fs.unlinkSync(random)
							fs.unlinkSync(rendom)
						})
					})
				} else if (body == '!ping') {
					const timestamp = speed();
					const latensi = speed() - timestamp
					client.sendMessage(from, `Speed: ${latensi.toFixed(4)} _Second_`, msgType.text, {quoted: mek})
				} else if (body == '!meme') {
					const meme = await kagApi.memes()
					const buffer = await getBuffer(`https://imgur.com/${meme.hash}.jpg`)
					client.sendMessage(from, buffer, msgType.image, {quoted: mek})
				} else if (body == '!memeindo') {
					const memeindo = await kagApi.memeindo()
					const buffer = await getBuffer(`https://imgur.com/${memeindo.hash}.jpg`)
					client.sendMessage(from, buffer, msgType.image, {quoted: mek})
				} else if (body.startsWith('!nulis ')) {
					try {
						const teks = encodeURIComponent(body.slice(7))
						if (!teks) return client.sendMessage(from, 'Input teks yang ingin di tulis', msgType.text, {quoted: mek})
						const anu = await fetchJson(`https://mhankbarbars.herokuapp.com/nulis?text=${teks}&apiKey=${apiKey}`, {method: 'get'})
						const buffer = await getBuffer(anu.result)
						client.sendMessage(from, buffer, msgType.image, {quoted: mek, caption: 'Sukses nulis ✓'})
					} catch (e) {
						console.log(`Error : ${e}`)
						client.sendMessage(from, 'Gagal nulis *X*', msgType.text, {quoted: mek})
					}
					} else if (body.startsWith('!tsticker ') || body.startsWith('!tstiker ')) {
					const teks = encodeURIComponent(body.slice(args[0].length))
					random = `${Math.floor(Math.random() * 10000)}.png`
					rendom = `${Math.floor(Math.random() * 20000)}.webp`
					if (!teks) return client.sendMessage(from, 'Input teks yang ingin dijadikan stiker', msgType.text, {quoted: mek})
					const anu = await fetchJson(`https://mhankbarbars.herokuapp.com/api/text2image?text=${teks}&apiKey=${apiKey}`, {method: 'get'})
					exec(`wget ${anu.result} -O ${random} && ffmpeg -i ${random} -vcodec libwebp -filter:v fps=fps=20 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${rendom}`, (error, stdout, stderr) => {
						let buffer = fs.readFileSync(rendom)
						client.sendMessage(from, buffer, msgType.sticker, {quoted: mek})
						fs.unlinkSync(random)
						fs.unlinkSync(rendom)
					})

			} else if (type == 'imageMessage') {
				const captimg = mek.message.imageMessage.caption.toLowerCase()
				if (captimg == '!stiker' || captimg == '!sticker') {
					media = await client.downloadAndSaveMediaMessage(mek)
					rendom = `${Math.floor(Math.random() * 10000)}.webp`
					exec(`ffmpeg -i ${media} -vcodec libwebp -filter:v fps=fps=20 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${rendom}`, (error, stdout, stderr) => {
						let buffer = fs.readFileSync(rendom)
						client.sendMessage(from, buffer, msgType.sticker, {quoted: mek})
						fs.unlinkSync(rendom)
						fs.unlinkSync(media)
					})
				} else if (captimg == '!wait') {
					media = await client.downloadAndSaveMediaMessage(mek)
					let buffer = fs.readFileSync(media)
					await wait(buffer).then(res => {
						client.sendMessage(from, res.video, msgType.video, {caption: hasil.teks, quoted: mek})
						fs.unlinkSync(media)
					}).catch(err => {
						client.sendMessage(from, err, msgType.text, {quoted: mek})
						fs.unlinkSync(media)
					})
				} else {
					return
				}

			} else if (type == 'videoMessage') {
				const captvid = mek.message.videoMessage.caption.toLowerCase()
				if (captvid == '!stiker' || captvid == '!sticker') {
					media = await client.downloadAndSaveMediaMessage(mek)
					rendom = `${Math.floor(Math.random() * 10000)}.webp`
					exec(`ffmpeg -i ${media} -vcodec libwebp -filter:v fps=fps=20 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${rendom}`, (error, stdout, stderr) => {
						let buffer = fs.readFileSync(rendom)
						client.sendMessage(from, buffer, msgType.sticker, {quoted: mek})
						fs.unlinkSync(rendom)
						fs.unlinkSync(media)
					})
				} else {
					return
				}

			} else if (type == 'extendedTextMessage') {
				mok = JSON.parse(JSON.stringify(mek).replace('quotedM','m'))
				qtdMsg = mek.message.extendedTextMessage.text.toLowerCase()
				if (qtdMsg == '!stiker' || qtdMsg == '!sticker' && content.includes('imageMessage') || content.includes('videoMessage')) {
					media = await client.downloadAndSaveMediaMessage(mok.message.extendedTextMessage.contextInfo)
					rendom = `${Math.floor(Math.random() * 10000)}.webp`
					exec(`ffmpeg -i ${media} -vcodec libwebp -filter:v fps=fps=20 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${rendom}`, (error, stdout, stderr) => {
						let buffer = fs.readFileSync(rendom)
						client.sendMessage(from, buffer, msgType.sticker, {quoted: mek})
						fs.unlinkSync(rendom)
						fs.unlinkSync(media)
					})
				} else if (qtdMsg == '!wait' && content.includes('imageMessage')) {
					media = await client.downloadAndSaveMediaMessage(mok.message.extendedTextMessage.contextInfo)
					let buffer = fs.readFileSync(media)
					await wait(buffer).then(res => {
						client.sendMessage(from, res.video, msgType.video, {caption: res.hasil, quoted: mek})
						fs.unlinkSync(media)
					}).catch(err => {
						client.sendMessage(from, err, msgType.text, {quoted: mek})
						fs.unlinkSync(media)
					})
				} else if (qtdMsg == '!toimg' && content.includes('stickerMessage')) {
					media = await client.downloadAndSaveMediaMessage(mok.message.extendedTextMessage.contextInfo)
					random = `${Math.floor(Math.random() * 10000)}.png`
					exec(`ffmpeg -i ${media} ${random}`, (error, stdout, stderr) => {
						let buffer = fs.readFileSync(random)
						client.sendMessage(from, buffer, msgType.image, {quoted: mek, caption: 'dah jadi kontol'})
					})
				} else {
					return
				}
			} else {
				return false
			}
		} catch (e) {
			console.log('Error : %s', color(e, 'red'))
		}


// Fitur

if (text.includes('!escrever')){
  var teks = text.replace(/!escrever /, '')
    axios.get('https://bangandre.herokuapp.com/nulis?teks= '+teks)
    .then((res) => {
      imageToBase64(res.data.result)
        .then(
          (ress) => {
            conn.sendMessage(id, '[ESPERE] Em andamento ⏳ aguarde um momento', MessageType.text)
            var buf = Buffer.from(ress, 'base64')
            conn.sendMessage(id, buf, MessageType.image)
        })
    })
}


if (text.includes("!say")){
  const teks = text.replace(/!say /, "")
conn.sendMessage(id, teks, MessageType.text)
}

if (text.includes("!ytmp3")){
const teks = text.replace(/!ytmp3 /, "")
axios.get(`https://alfians-api.herokuapp.com/api/yta?url=${teks}`).then((res) => {
	conn.sendMessage(id, '[ESPERE] Em andamento ⏳ aguarde um momento', MessageType.text)
    let hasil = `✅Lagu Berhasil Di Download, silahkan klik link dan download hasilnya\nKlik link dibawah🗡️\n\nJudul: ${res.data.title}\n\nUkuran audio: ${res.data.filesize}\n\nLink: ${res.data.result}`;
    conn.sendMessage(id, hasil ,MessageType.text);
})
}

if (text.includes("!igstalk")){
  const teks = text.replace(/!igstalk /, "")
  axios.get(`https://alfians-api.herokuapp.com/api/stalk?username=${teks}`).then ((res) =>{
  conn.sendMessage(id, '[ESPERE] Stalkiando...⏳', MessageType.text)
  let hasil = `✨ Stalking De _${teks}_ Completo! \n\n 🧶 *Username* : _${res.data.Username}_ \n 🌀 *Nome* : _${res.data.Name}_ \n 🌟 *Seguidores* : _${res.data.Jumlah_Followers}_ \n 🌠 *Seguindo* : _${res.data.Jumlah_Following}_ \n ⭐ *Número De Posts* : _${res.data.Jumlah_Post}_ `;
  conn.sendMessage(id, hasil, MessageType.text);
})
}

if (text.includes("!ytmp4")){
const teks = text.replace(/!ytmp4 /, "")
axios.get(`https://alfians-api.herokuapp.com/api/ytv?url=${teks}`).then((res) => {
	conn.sendMessage(id, '[ESPERE] Em andamento ⏳ aguarde um momento', MessageType.text)
    let hasil = `✅Video Berhasil Di Download, silahkan klik link dan download hasilnya\nKlik link dibawah🗡️\n\nJudul: ${res.data.title}\n\nUkuran video: ${res.data.filesize}\n\nLink: ${res.data.result}`;
    conn.sendMessage(id, hasil ,MessageType.text);
})
}

if (text.includes("!twt")){
const teks = text.replace(/!twt /, "")
axios.get(`https://mhankbarbar.herokuapp.com/api/twit?url=${teks}&apiKey=zFuV88pxcIiCWuYlwg57`).then((res) => {
	conn.sendMessage(id, '[ESPERE] Em andamento ⏳ aguarde um momento', MessageType.text)
    let hasil = `✅Berhasil! silahkan klik link di bawah untuk mendownload hasilnya!\nKlik link dibawah🗡️\n\nSize: ${res.data.filesize}\n\nLink: ${res.data.result}`;
    conn.sendMessage(id, hasil ,MessageType.text);
})
}

if (text.includes("!tiktok")) {
const tictoc = text.replace(/!tiktok /, "")
axios.get(`https://st4rz.herokuapp.com/api/tiktok?url=${tictoc}`).then((res) => {
	 conn.sendMessage(id, '[ESPERE] Em andamento ⏳ aguarde um momento', MessageType.text)
     let titoe = `✅Berhasil!!! Silahkan klik link dibawah ini untuk mendownload hasilnya! \nKlik link dibawah🗡️\n\nJudul: ${res.data.deskripsi} \n\nDurasi: ${res.data.durasi}\n\nNama: ${res.data.nama}\n\nUrl: ${res.data.urlvideo}`;
conn.sendMessage(id, titoe, MessageType.text);
})
}

if (text.includes("!wiki")){
const teks = text.replace(/!wiki /, "")
axios.get(`https://st4rz.herokuapp.com/api/wiki?q=${teks}`).then((res) => {
	conn.sendMessage(id, '[ESPERE] Em andamento ⏳ aguarde um momento', MessageType.text)
    let hasil = `📝Menurut Wikipedia:\n\n${res.data.result}`;
    conn.sendMessage(id, hasil ,MessageType.text);
})
}

if (text.includes("!sholat")){
  const teks = text.replace(/!sholat /, "")
  axios.get(`https://api.haipbis.xyz/jadwalsholat?daerah=${teks}`).then ((res) =>{
  conn.sendMessage(id, '[ESPERE] Em andamento ⏳ aguarde um momento', MessageType.text)
  let hasil = `Jadwal sholat di ${teks} hari ini adalah\n\n⚡Imsyak : ${res.data.Imsyak}\n⚡Subuh : ${res.data.Subuh} WIB\n⚡Dzuhur : ${res.data.Dzuhur}WIB\n⚡Ashar : ${res.data.Ashar} WIB\n⚡Maghrib : ${res.data.Maghrib}\n⚡Isya : ${res.data.Isya} WIB\n⚡Tengah malam : ${res.data.Dhuha} WIB`;
  conn.sendMessage(id, hasil, MessageType.text);
})
}
if (text == '!menu'){
const corohelp = await get.get('https://covid19.mathdro.id/api/countries/id').json()
var date = new Date();
var tahun = date.getFullYear();
var bulan = date.getMonth();
var tanggal = date.getDate();
var hari = date.getDay();
var jam = date.getHours();
var menit = date.getMinutes();
var detik = date.getSeconds();
switch(hari) {
 case 0: hari = "Domingo"; break;
 case 1: hari = "Segunda"; break;
 case 2: hari = "Terça"; break;
 case 3: hari = "Quarta"; break;
 case 4: hari = "Quinta"; break;
 case 5: hari = "Sexta"; break;
 case 6: hari = "Sábado"; break;
}
switch(bulan) {
 case 0: bulan = "Janeiro"; break;
 case 1: bulan = "Fevereiro"; break;
 case 2: bulan = "Março"; break;
 case 3: bulan = "Abril"; break;
 case 4: bulan = "Maio"; break;
 case 5: bulan = "Junho"; break;
 case 6: bulan = "Julho"; break;
 case 7: bulan = "Agosto"; break;
 case 8: bulan = "Setembro"; break;
 case 9: bulan = "Outubro"; break;
 case 10: bulan = "Novembro"; break;
 case 11: bulan = "Dezembro"; break;
}
var tampilTanggal = "Data: " + hari + ", " + tanggal + " " + bulan + " " + tahun;
var tampilWaktu = "Horário: " + jam + ":" + menit + ":" + detik;
conn.sendMessage(id, menu.menu(id, BotName, corohelp, tampilTanggal, tampilWaktu, instagram, whatsapp, kapanbotaktif) ,MessageType.text);
}
else if (text == '!quran'){
axios.get('https://api.banghasan.com/quran/format/json/acak').then((res) => {
    const sr = /{(.*?)}/gi;
    const hs = res.data.acak.id.ayat;
    const ket = `${hs}`.replace(sr, '');
    let hasil = `[${ket}]   ${res.data.acak.ar.teks}\n\n${res.data.acak.id.teks}(QS.${res.data.surat.nama}, Ayat ${ket})`;
    conn.sendMessage(id, hasil ,MessageType.text);
})
}

else if (text == '!ahdhjfhabejfhaienqjshaswjaoqksnaksjana'){
const corohelp = await get.get('https://covid19.mathdro.id/api/countries/id').json()
var date = new Date();
var tahun = date.getFullYear();
var bulan = date.getMonth();
var tanggal = date.getDate();
var hari = date.getDay();
var jam = date.getHours();
var menit = date.getMinutes();
var detik = date.getSeconds();
switch(hari) {
 case 0: hari = "Minggu"; break;
 case 1: hari = "Senin"; break;
 case 2: hari = "Selasa"; break;
 case 3: hari = "Rabu"; break;
 case 4: hari = "Kamis"; break;
 case 5: hari = "Jum'at"; break;
 case 6: hari = "Sabtu"; break;
}
switch(bulan) {
 case 0: bulan = "Januari"; break;
 case 1: bulan = "Februari"; break;
 case 2: bulan = "Maret"; break;
 case 3: bulan = "April"; break;
 case 4: bulan = "Mei"; break;
 case 5: bulan = "Juni"; break;
 case 6: bulan = "Juli"; break;
 case 7: bulan = "Agustus"; break;
 case 8: bulan = "September"; break;
 case 9: bulan = "Oktober"; break;
 case 10: bulan = "November"; break;
 case 11: bulan = "Desember"; break;
}
var tampilTanggal = "TANGGAL: " + hari + ", " + tanggal + " " + bulan + " " + tahun;
var tampilWaktu = "JAM: " + jam + ":" + menit + ":" + detik;
conn.sendMessage(id, donasi.donasi(id, BotName, corohelp, tampilTanggal, tampilWaktu, instagram, whatsapp, kapanbotaktif) ,MessageType.text);
}
else if (text == '!ahdhjfhabejfhaienqjshaswjaoqksnaksjanahsjswja'){
const corohelp = await get.get('https://covid19.mathdro.id/api/countries/id').json()
var date = new Date();
var tahun = date.getFullYear();
var bulan = date.getMonth();
var tanggal = date.getDate();
var hari = date.getDay();
var jam = date.getHours();
var menit = date.getMinutes();
var detik = date.getSeconds();
switch(hari) {
 case 0: hari = "Minggu"; break;
 case 1: hari = "Senin"; break;
 case 2: hari = "Selasa"; break;
 case 3: hari = "Rabu"; break;
 case 4: hari = "Kamis"; break;
 case 5: hari = "Jum'at"; break;
 case 6: hari = "Sabtu"; break;
}
switch(bulan) {
 case 0: bulan = "Januari"; break;
 case 1: bulan = "Februari"; break;
 case 2: bulan = "Maret"; break;
 case 3: bulan = "April"; break;
 case 4: bulan = "Mei"; break;
 case 5: bulan = "Juni"; break;
 case 6: bulan = "Juli"; break;
 case 7: bulan = "Agustus"; break;
 case 8: bulan = "September"; break;
 case 9: bulan = "Oktober"; break;
 case 10: bulan = "November"; break;
 case 11: bulan = "Desember"; break;
}
var tampilTanggal = "TANGGAL: " + hari + ", " + tanggal + " " + bulan + " " + tahun;
var tampilWaktu = "JAM: " + jam + ":" + menit + ":" + detik;
conn.sendMessage(id, info.info(id, BotName, corohelp, tampilTanggal, tampilWaktu, instagram, whatsapp, kapanbotaktif) ,MessageType.text);
}
else if (text == '!pict'){
conn.sendMessage(id, 'ulangi dengan  !pict cewek/cowok\n\nMisal: !pict cowok' ,MessageType.text);
}

  // Optical Character Recognition
  if (messageType == 'imageMessage')
   {
       let caption = imageMessage.caption.toLocaleLowerCase()
       if (caption == '!ocr')
       {
           const img = await conn.downloadAndSaveMediaMessage(m)
           readTextInImage(img)
               .then(data => {
                   console.log(data)
                   conn.sendMessage(id, `*Read Data Text in Image* \n\nHasil: \n\n${data}`, MessageType.text);
               })
               .catch(err => {
                   console.log(err)
               })
       }
   }

   if (messageType == 'imageMessage')
   {
      let caption = imageMessage.caption.toLocaleLowerCase()
      const buffer = await conn.downloadMediaMessage(m) // to decrypt & use as a buffer
      if (caption == '!sticker')
      {
         const stiker = await conn.downloadAndSaveMediaMessage(m) // to decrypt & save to file

         const
         {
            exec
         } = require("child_process");
         exec('cwebp -q 50 ' + stiker + ' -o temp/' + jam + '.webp', (error, stdout, stderr) =>
         {
            let stik = fs.readFileSync('temp/' + jam + '.webp')
            conn.sendMessage(id, stik, MessageType.sticker)
         });
      }
   }
   if (messageType === MessageType.text)
   {
      let is = m.message.conversation.toLocaleLowerCase()

   if (messageType == 'videoMessage')
   {
      let caption = videoMessage.caption.toLocaleLowerCase()
      const buffer = await conn.downloadMediaMessage(m) // to decrypt & use as a buffer
      if (caption == '!stickergif')
      {
         const stiker = await conn.downloadAndSaveMediaMessage(m) // to decrypt & save to file

         const
         {
            exec
         } = require("child_process");
         exec('cwebp -q 50 ' + stiker + ' -o temp/' + jam + '.webp', (error, stdout, stderr) =>
         {
            let stik = fs.readFileSync('temp/' + jam + '.webp')
            conn.sendMessage(id, stik, MessageType.sticker)
         });
      }
   }
   if (messageType === MessageType.text)
   {
      let is = m.message.conversation.toLocaleLowerCase()

      if (is == '!pantun')
      {

         fetch('https://raw.githubusercontent.com/pajaar/grabbed-results/master/pajaar-2020-pantun-pakboy.txt')
            .then(res => res.text())
            .then(body =>
            {
               let tod = body.split("\n");
               let pjr = tod[Math.floor(Math.random() * tod.length)];
               let pantun = pjr.replace(/pjrx-line/g, "\n");
               conn.sendMessage(id, pantun, MessageType.text)
            });
      }

   };
   if (text.includes("!quotes"))
   {
      var url = 'https://jagokata.com/kata-bijak/acak.html'
      axios.get(url)
         .then((result) =>
         {
            let $ = cheerio.load(result.data);
            var author = $('a[class="auteurfbnaam"]').contents().first().text();
            var kata = $('q[class="fbquote"]').contents().first().text();

            conn.sendMessage(
               id,
               `
_${kata}_
        
    
	*~${author}*
         `, MessageType.text
            );

         });
   }
   else if (text.includes("!nama ")) 
  {
    const cheerio = require('cheerio');
    const request = require('request');
    var nama = text.split("!nama ")[1];
    var req = nama.replace(/ /g,"+");
    request.get({
        headers: {'content-type' : 'application/x-www-form-urlencoded'},
        url:     'http://www.primbon.com/arti_nama.php?nama1='+ req +'&proses=+Submit%21+',
      },function(error, response, body){
          let $ = cheerio.load(body);
          var y = $.html().split('arti:')[1];
          var t = y.split('method="get">')[1];
          var f = y.replace(t ," ");
          var x = f.replace(/<br\s*[\/]?>/gi, "\n");
          var h  = x.replace(/<[^>]*>?/gm, '');
      console.log(""+ h);
      conn.sendMessage(id,
            `
      Arti dari namamu adalah

  ***********************************
         Nama _*${nama}*_ ${h}
  ***********************************

`,
 MessageType.text);
  });
  }
  else if (text.includes("!pasangan ")) {
    const request = require('request');
    var gh = text.split("!pasangan ")[1];
    var namamu = gh.split("&")[0];
    var pasangan = gh.split("&")[1];
    request.get({
        headers: {'content-type' : 'application/x-www-form-urlencoded'},
        url:     'http://www.primbon.com/kecocokan_nama_pasangan.php?nama1='+ namamu +'&nama2='+ pasangan +'&proses=+Submit%21+',

    },function(error, response, body){
        let $ = cheerio.load(body);
      var y = $.html().split('<b>KECOCOKAN JODOH BERDASARKAN NAMA PASANGAN</b><br><br>')[1];
        var t = y.split('.<br><br>')[1];
        var f = y.replace(t ," ");
        var x = f.replace(/<br\s*[\/]?>/gi, "\n");
        var h  = x.replace(/<[^>]*>?/gm, '');
        var d = h.replace("&amp;", '&')
      console.log(""+ d);
      conn.sendMessage(id, `

************************************

 *Kecocokan berdasarkan nama*


 ${d}


************************************
    `, MessageType.text);
  });
  }
   if (text.includes("!japa"))
   {
    var items = ["ullzang girl", "cewe cantik", "hijab cantik", "korean girl", "remaja cantik", "cewek korea", "cewek jepang"];
    var cewe = items[Math.floor(Math.random() * items.length)];
    var url = "https://api.fdci.se/rep.php?gambar=" + cewe;
    
    axios.get(url)
      .then((result) => {
        var b = JSON.parse(JSON.stringify(result.data));
        var cewek =  b[Math.floor(Math.random() * b.length)];
        imageToBase64(cewek) // Path to the image
        .then(
            (response) => {
    conn.sendMessage(id, '[ESPERE] Em andamento ⏳ aguarde um momento', MessageType.text)
	var buf = Buffer.from(response, 'base64'); // Ta-da	
              conn.sendMessage(
            id,
              buf,MessageType.image)
       
            }
        )
        .catch(
            (error) => {
                console.log(error); // Logs an error if there was one
            }
        )
    
    });
    }

   if (text.includes("!japo"))
   {
    var items = ["cowo ganteng", "cogan", "korean boy", "chinese boy", "japan boy", "cowok indo ganteng", "cowok korea"];
    var cowo = items[Math.floor(Math.random() * items.length)];
    var url = "https://api.fdci.se/rep.php?gambar=" + cowo;
    
    axios.get(url)
      .then((result) => {
        var z = JSON.parse(JSON.stringify(result.data));
        var cowok =  z[Math.floor(Math.random() * z.length)];
        imageToBase64(cowok) 
        .then(
            (response) => {
  conn.sendMessage(id, '[ESPERE] Em andamento ⏳ aguarde um momento', MessageType.text)
  var buf = Buffer.from(response, 'base64'); 
              conn.sendMessage(
            id,
              buf,MessageType.image)
       
            }
        )
        .catch(
            (error) => {
                console.log(error);
            }
        )
    
    });
    }

if (text.includes("!anime"))
   {
    var items = ["anime girl", "anime cantik", "anime", "anime aesthetic", "anime hd", "gambar anime hd", "anime Full HD", "hentai", "nhentai"];
    var nime = items[Math.floor(Math.random() * items.length)];
    var url = "https://api.fdci.se/rep.php?gambar=" + nime;
    
    axios.get(url)
      .then((result) => {
        var n = JSON.parse(JSON.stringify(result.data));
        var nimek =  n[Math.floor(Math.random() * n.length)];
        imageToBase64(nimek) 
        .then(
            (response) => {
    conn.sendMessage(id, '[ESPERE] Em andamento ⏳ aguarde um momento', MessageType.text)
	var buf = Buffer.from(response, 'base64'); 
              conn.sendMessage(
            id,
              buf,MessageType.image)
       
            }
        )
        .catch(
            (error) => {
                console.log(error);
            }
        )
    
    });
    }
 
if (text.includes("!letra")){
	const teks = text.split("!letra")[1]
	axios.get(`http://scrap.terhambar.com/lirik?word=${teks}`).then ((res) => {
	     conn.sendMessage(id, '[ESPERE] Em andamento ⏳ aguarde um momento', MessageType.text)
	 	let hasil = `🎶 Letra: ${teks} \n\n\n ${res.data.result.lirik}`
	conn.sendMessage(id, hasil, MessageType.text)
	})
}
if (text.includes("!cripto")){
	const alay = text.split("!cripto")[1]
	axios.get(`https://api.terhambar.com/bpk?kata=${alay}`).then ((res) =>
		{ let hasil = `${res.data.text}`
		conn.sendMessage(id, hasil, MessageType.text)
	})
}
}




//end


})
