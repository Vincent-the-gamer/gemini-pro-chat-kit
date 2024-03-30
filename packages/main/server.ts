import express from "express"
import { textOnlyChat, clearContext } from "./core"

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

// 对话
app.post("/chat", async (req: any, res: any) => {
   const { message } = req.body
   const result = await textOnlyChat(message)
   res.set('Content-Type', 'application/json');
   res.end(JSON.stringify({ result }))
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