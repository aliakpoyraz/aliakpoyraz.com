import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const API_KEY = process.env.GOOGLE_GENERATIVE_AI_API_KEY;

if (!API_KEY) {
    console.error('Error: GOOGLE_GENERATIVE_AI_API_KEY is not set.');
    process.exit(1);
}

const genAI = new GoogleGenerativeAI(API_KEY);

async function listModels() {
    try {
        console.log('Fetching available models...');
        const models = ['gemini-1.5-flash', 'gemini-1.5-pro', 'gemini-pro', 'gemini-1.5-flash-latest', 'gemini-1.5-pro-latest'];
        for (const modelName of models) {
            try {
                const model = genAI.getGenerativeModel({ model: modelName });
                await model.generateContent('Hi');
                console.log(`✅ ${modelName}: Available`);
            } catch (e) {
                console.log(`❌ ${modelName}: Not Available (${e.message})`);
            }
        }
    } catch (error) {
        console.error('Error listing models:', error);
    }
}

listModels();
