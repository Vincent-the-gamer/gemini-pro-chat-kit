# Gemini Pro Chat Kit
一个解决了中国国内代理问题的Gemini Pro对话服务

## 问题在哪？
Gemini Pro官方提供的SDK在本地开启代理的状况下，仍然无法访问，因为模块中的fetch函数并未走代理，本Repo就是解决这个问题的。
通过提取模块的dist，修改fetch函数来完成代理设置。

## 如何设置代理？
修改根目录的`proxy.ts`
```shell
export const proxyHost = '127.0.0.1'
export const proxyPort = 7890
```

## 如何启动项目?
首先在项目根目录创建`.env`文件，然后填入
```
API_KEY = your_key
```

### 申请API Key
申请Gemini Pro API Key: [https://makersuite.google.com/app/apikey](https://makersuite.google.com/app/apikey)

具体过程可以参考我的博客的其中一部分：[https://blog.vince-g.xyz/#/posts/deploy-gemini-pro](https://blog.vince-g.xyz/#/posts/deploy-gemini-pro)

然后

```shell
# 安装依赖
pnpm i 

# 启动
pnpm run start
```

## 使用方法
目前，拢共就俩API

| API | 说明 | Method | 参数 | 返回值|
| - | - | - | - | - |
| /chat | 纯文本对话| POST | `{"message": "Feint是谁"}` | `{ "result": "Feint 是一名荷兰电子音乐制作人和 DJ。}` |
| /clear | 清空上下文 | GET | 无  | `{ msg: "成功清除上下文！" }` |

## TODO
- 多模态对话