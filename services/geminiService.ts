
import { GoogleGenAI } from "@google/genai";

export const testApiKey = async (apiKey: string): Promise<boolean> => {
    if (!apiKey) return false;
    try {
        const ai = new GoogleGenAI({ apiKey });
        await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: 'Test'
        });
        return true;
    } catch (error) {
        console.error("API Key validation failed:", error);
        return false;
    }
};

export const getAiMentorResponse = async (
    prompt: string
) => {
    if (!process.env.API_KEY) {
        throw new Error("API key is not configured.");
    }
    
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const result = await ai.models.generateContentStream({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
            tools: [{googleSearch: {}}],
        },
    });
    
    return result;
};

export const getComplexAiResponse = async (
    prompt: string
) => {
    if (!process.env.API_KEY) {
        throw new Error("API key is not configured.");
    }
    
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const result = await ai.models.generateContentStream({
        model: 'gemini-2.5-pro',
        contents: prompt,
        config: {
            thinkingConfig: { thinkingBudget: 32768 }
        }
    });
    
    return result;
};
