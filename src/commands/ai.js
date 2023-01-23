const { Configuration, OpenAIApi } = require("openai");
const fs = require("fs")
const apikey = JSON.parse(fs.readFileSync('./api_key.json', 'utf8'))
const configuration = new Configuration({apiKey: apikey.openai});
const openai = new OpenAIApi(configuration);

async function ai(matches, event, api) {
    var text = matches[1];
  console.log(matches)
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: event.body,
    temperature: 0.3,
    max_tokens: 3000,

  });
  api.sendMessage(`${response.data.choices[0].text}`, event.threadID)
}
module.exports = ai;