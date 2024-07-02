<template>
  <div v-for="item of history" :class="`message-box ${item.role}`" border="1px solid black dark:white rd-4" p-5 m-6>
    <template v-if="item.role === 'model'">
      <img :src="ai" alt="logo" h-15 w-15 />
      <span p-4 v-html="markdown.render(item.parts[0].text)" />
    </template>
    <template v-else>
      <span p-4>
        {{ item.parts[0].text }}
      </span>
      <img :src="wife1" alt="logo" h-15 w-15 v-if="item.role === 'user'" />
    </template>
  </div>

  <div py-4 />

  <TheInput placeholder="Ask something..." autocomplete="false" v-model="content"/>

  <div>
    <button class="m-3 text-sm btn" @click="() => sendMessage(content)">
      Let's Rock!
    </button>
  </div>
</template>

<script setup lang="ts" name="MessageBox">
// @ts-ignore
import wife1 from "~/assets/logos/wife1.png"
// @ts-ignore
import ai from "~/assets/logos/ai.png"
import useMarkdown from "../hooks/markdown"

// import { history } from "../../../chat-kit/core"

const content = ref<string>()

// @ts-ignore
const markdown = await useMarkdown()

const history = ref([
  {
    role: "user",
    parts: [{ text: "啊啊啊spokfspfoddkp" }]
  },
  {
    role: "model",
    parts: [{ text: "# 一级标题 \n ```js\n console.log(1) \n``` " }]
  }
])

function sendMessage(text: string) {
  history.value.push({
    role: "user",
    parts: [{ text }]
  })
}
</script>

<style scoped>
.message-box {
  transition: all, 200ms;
  white-space: pre-wrap;
  word-break: break-all;
  display: flex;
  align-items: center;
}

.message-box.user {
  justify-content: flex-end;
}

.message-box.model {
  justify-content: flex-start;
}

.message-box:hover {
  scale: 1.1;
}
</style>