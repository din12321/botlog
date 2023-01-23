module.exports = async (matches, event, api, extra) => {
    let typeStop = api.sendTypingIndicator(event.threadID, (err) => {
    	if(err) return console.error(err);
    
        api.getUserID("Danilo Manto", (err, data) => {
        	let message = "🗂️ EagleBot Info 🗂️";
            message += "\n💻 Creator: @Danilo Manto";
            message += "\n🤖 Description: EagleBot is a facebook messenger chat bot made using NodeJS, Axios and the Unofficial Facebook Chat API.";
            message += "\n\n© 2022";
            
            let messageBody = {
            	body: message,
                mentions: [{
                    tag: "@Danilo Manto",
                    id: data[0].userID
                }]
            };
            
            api.sendMessage(messageBody, event.threadID, event.messageID);
            typeStop();
        });
    });
};