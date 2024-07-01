// @ts-ignore
import { Content, GoogleGenerativeAI } from "@google/generative-ai"
import { setGlobalDispatcher, ProxyAgent } from "undici"
import { proxyHost, proxyPort } from "../../proxy"

// proxy settings
const dispatcher = new ProxyAgent({ 
  uri: new URL(`http://${proxyHost}:${proxyPort}`).toString() 
});
setGlobalDispatcher(dispatcher); 

// please create file `.env` in the root of workspace, add write
// API_KEY = xxx
import dotenv from "dotenv"
dotenv.config()

// Read your api key from dotenv file: process.env.API_KEY
const genAI = new GoogleGenerativeAI(process.env.API_KEY!);

export let history: Content[] = []

// 纯文本对话
export async function textOnlyChat(message: string) {

    // For text-only input, use the gemini-1.5-flash model
    // 纯文本聊天请使用gemini-1.5-flash模型

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  
    const chat = model.startChat({
      history
    });
  
    const result: any = await chat.sendMessage(message)
    history.push({
      role: "user",
      parts: [{ text: message }],
    })

    const response = result.response
    const text = response.text()

    history.push({
      role: "model",
      parts: [{ text }],
    })
    
    return text
}

export function clearContext(){
  history = []
}