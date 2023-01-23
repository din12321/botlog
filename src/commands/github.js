const axios = require('axios');
	const request = require('request');
	const fs = require("fs-extra");
    const moment = require("moment");
    const fetch = require("node-fetch");

async function avatar(matches, event, api) {
    var text = matches[1];
    console.log(matches)
    if (!text) return api.sendMessage(`github username cannot be empty!`, event.threadID, event.messageID);
    
     fetch(`https://api.github.com/users/${encodeURI(text)}`)
       .then(res => res.json())
       .then(async body => {
         if(body.message) return api.sendMessage(`User Not Found | Please Give Me A Valid Username!`, event.threadID, event.messageID);
       let { login, avatar_url, name, id, html_url, public_repos, followers, following, location, created_at, bio } = body;
       const info = 
         `>>${login} Information!<<\n\nUsername: ${login}\nID: ${id}\nBio: ${bio || "No Bio"}\nPublic Repositories: ${public_repos || "None"}\nFollowers: ${followers}\nFollowing: ${following}\nLocation: ${location || "No Location"}\nAccount Created: ${moment.utc(created_at).format("dddd, MMMM, Do YYYY")}\nAvatar:`;
         
       let getimg = (await axios.get(`${avatar_url}`, { responseType: "arraybuffer" })).data;
        fs.writeFileSync(__dirname+"/cache/avatargithub.png", Buffer.from(getimg, "utf-8"));
           
          api.sendMessage({
           attachment: fs.createReadStream(__dirname+"/cache/avatargithub.png"),
           body: info}, event.threadID,() => fs.unlinkSync(__dirname+"/cache/avatargithub.png"), event.messageID);
   
       });
       
     }
module.exports = avatar;