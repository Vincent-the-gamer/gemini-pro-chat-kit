import express from "express"
import { textOnlyChat, textOnlyChatWithStream, clearContext } from "./core"

const app = express()

// parse the request body of method post
app.use(express.json())

// cross origin
app.all("*", function (req: any, res: any, next: any) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'content-type')
    res.header('Access-Control-Allow-Methods', 'DELETE,PUT,POST,GET,OPTIONS')
    if (req.method.toLowerCase() == 'options')
        res.sendStatus(200)
    else
        next()
})

// 纯文本对话 -- 直接返回
app.post("/chat", async (req: any, res: any) => {
   const { message } = req.body
   const result = await textOnlyChat(message)
   res.set('Content-Type', 'application/json');
   res.end(JSON.stringify({ result }))
})

// 纯文本对话 -- 流式返回
app.get("/streamChat", async (req: any, res: any) => {
    res.setHeader("Content-Type", "text/event-stream;charset=utf-8");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    res.flushHeaders(); // flush the headers to establish SSE with client

    const { message } = req.query
    await textOnlyChatWithStream(message, res) // this will finally end the res
 })

// 清空上下文
app.get("/clear", (req: any, res: any) => {
    clearContext()
    res.set('Content-Type', 'application/json');
    res.end(JSON.stringify({
        msg: "成功清除上下文！"
    }))
})

/**
 * main
 */
const host = "0.0.0.0"
const port = 8080

app.listen(port, () => {
    console.log(`Server started: http://${host}:${port}`)
})