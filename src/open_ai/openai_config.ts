import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
} from "@google/generative-ai";

const MODEL_NAME = "gemini-1.5-pro-latest";

// Paste Your API KEY Below
const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY!;

async function generateCode(prompt: string) {
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });

    const generationConfig = {
        temperature: 0.75,
        topK: 1,
        topP: 1,
        maxOutputTokens: 2048,
    };

    const safetySettings = [
        {
            category: HarmCategory.HARM_CATEGORY_HARASSMENT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
            category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
            category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
            category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
    ];

    const chat = model.startChat({
        generationConfig,
        safetySettings,
        history: [],
    });

    try {
        const result = await chat.sendMessage(prompt);
        const response = result.response;

        // Extract the text from the response
        const fullResponse = response.text();

        // Extract the code block from the response
        const codeBlockRegex = /```html([\s\S]*?)```/; // Regex to match the code block
        const match = fullResponse.match(codeBlockRegex);

        if (match && match[1]) {
            const extractedCode = match[1].trim(); // Extract and trim the code
            return extractedCode;
        } else {
            // If no code block is found, return the full response
            return fullResponse;
        }
    } catch (error) {
        console.error("Error generating code:", error);
        return "Failed to generate code. Error: " + (error as Error).message;
    }
}

export default generateCode;