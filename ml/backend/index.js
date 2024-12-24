import express from "express";
import cors from "cors";
import { createDeepInfra } from '@ai-sdk/deepinfra';
import { generateText } from 'ai';
import dotenv from "dotenv";
const app = express();
app.use(express.json());

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
dotenv.config();

const deepinfra = createDeepInfra({
  apiKey: process.env.DEEPINFRA_API_KEY ?? '',
});

app.post("/api/v1/chats/chat", async (req, res) => {
    const { text } = req.body;
    if (!text) {
        return res.status(400).json({ message: "Text is required." });
    }
    try {
        console.log('hi');
        const hatespeech = await generateText({
            model: deepinfra('meta-llama/Meta-Llama-3.1-70B-Instruct'),
            prompt: `Analyze the following text, detect and give me the hate speech: ${text}`,
           
        });
        console.log('hatespeech:', hatespeech);
        const hatespeechrec = hatespeech?.text || "No diagnosis prediction available.";
        return res.json({ hatespeechrec });
    } catch (error) {
        console.error('Error generating text:', error);
        return res.status(500).json({ message: "Internal server error." });
    }
});

app.listen(3001, () => {
    console.log("Server is running on port 3001");
});