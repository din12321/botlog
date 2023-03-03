const axios = require(`axios`);

async function csim(matches, event, api, extra) {
  var text = matches[1];
  console.log(matches)

  try {
    const { data } = await axios(`https://api.simsimi.net/v2/?text=${encodeURIComponent(text)}&lc=ph`);
    
    api.sendMessage(data.success, event.threadID, event.messageID)
  }catch(error) {
    api.sendMessage(error, event.threadID, event.messageID)
  }
}

module.exports = csim;