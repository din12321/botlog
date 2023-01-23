const axios = require('axios');
	const request = require('request');
	const fs = require("fs");

async function avatar(matches, event, api) {
  axios.get('https://nekos.life/api/v2/img/avatar').then(res => {
	let ext = res.data.url.substring(res.data.url.lastIndexOf(".") + 1);
	
	let callback = function () {
					api.sendMessage({
						attachment: fs.createReadStream(__dirname + `/cache/avatar.${ext}`)
					}, event.threadID, () => fs.unlinkSync(__dirname + `/cache/avatar.${ext}`), event.messageID);
				};
				request(res.data.url).pipe(fs.createWriteStream(__dirname + `/cache/avatar.${ext}`)).on("close", callback);
			})
    }
module.exports = avatar;