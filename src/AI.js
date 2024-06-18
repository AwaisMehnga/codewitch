import { GoogleGenerativeAI } from "@google/generative-ai";
 
 // api key 
 const API_KEY = "AIzaSyCIhTfwcnMHKMJ7T4dc72_SQlbe4s-8hnI";
 const genAI = new GoogleGenerativeAI(API_KEY);

//  Generation configuration
const generation_config = {
    "temperature": 1,
    "top_p": 0.95,
    "top_k": 64,
    "max_output_tokens": 8192,
    "response_mime_type": "text/plain",
}

//  Safety settings
const safety_settings = [
    {"category": "HARM_CATEGORY_HARASSMENT", "threshold": "BLOCK_NONE"},
    {"category": "HARM_CATEGORY_HATE_SPEECH", "threshold": "BLOCK_NONE"},
    {"category": "HARM_CATEGORY_SEXUALLY_EXPLICIT", "threshold": "BLOCK_NONE"},
    {"category": "HARM_CATEGORY_DANGEROUS_CONTENT", "threshold": "BLOCK_NONE"},
]

// Model name
const MODEL_NAME = "gemini-1.5-pro-latest"

// Create the model
const model = genAI.getGenerativeModel({
    model: MODEL_NAME,
    safety_settings,
    generation_config,

})

// Start a chat session
const chat_session = model.startChat({history:[]})

async function generate(prompt, img){
    // Generate text
    const res = await model.generateContent([prompt, img])
    console.log(res.response.text());
}

export {generate};