require("dotenv").config();
const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
})


const openai = new OpenAIApi(configuration);

const petGenerator = async (description) => {
    const response = await openai.createImage({
        prompt: `${description}, digital art`,
        n: 3,
        size: "1024x1024",
    });
    console.log('response.data.data', response.data.data)
    const imageUrl = response.data.data[0].url;
    return imageUrl;
}

module.exports = petGenerator;