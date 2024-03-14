const { API_KEY } = require("./config");
const {AssemblyAI} = require("assemblyai");

const client = new AssemblyAI({
    apiKey: API_KEY
});

const run = async (file) => {
    //Audio file URL
    const audioUrl = file;
    const config = {
        audio_url: audioUrl,
    };

    try {
        const transcript = await client.transcripts.create(config);
        const text = transcript.text;
        console.log(text);
        return text ;
    } catch (error) {
        console.error(error);
    }
};

module.exports = run;
