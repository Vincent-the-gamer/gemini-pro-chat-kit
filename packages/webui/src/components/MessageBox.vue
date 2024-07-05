<template>
  <div relative z-1 p-b-30>
    <transition-group name="dialog">
      <div v-for="item of history" :key="item" :class="`message-box ${item.role}`" border="1px solid black dark:white rd-4" p-5 m-6>
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
    </transition-group>
  </div>


  <!-- Input Area -->
  <div bg-white dark:bg-black fixed bottom-0 left-13vw w-100vw m="0 auto" p-2 z-2>
    <button m-3 text-sm btn bg-red absolute left-0 top-0 @click="clearMessage">
      Clear
    </button>
    <div flex="~ row items-center" p-t-10>
      <textarea v-model="content" type="text" p="x-4 y-2" w="65vw" text="left" bg="transparent"
        border="~ rounded gray-700 dark:gray-300" outline="none active:none" placeholder="Ask something..." resize-none
        h-100px />

      <button m-3 text-sm btn h-10 @click="async () => await sendMessage()">
        Let's Rock!
      </button>
    </div>
  </div>
</template>

<script setup lang="ts" name="MessageBox">
// @ts-ignore
import wife1 from "~/assets/logos/wife1.png"
// @ts-ignore
import ai from "~/assets/logos/ai.png"
import useMarkdown from "../hooks/markdown"
import { fetchEventSource } from '@microsoft/fetch-event-source';

const { y } = useWindowScroll()

const content = ref<string>()

// @ts-ignore
const markdown = await useMarkdown()

const history = ref<Record<string, any>>([])

async function sendMessage() {
  history.value.push({
    role: "user",
    parts: [{
      text: content.value
    }]
  })

  history.value.push({
    role: "model",
    parts: [{
      text: ""
    }]
  })

  await fetchEventSource("http://localhost:8080/streamChat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      message: content.value
    }),
    onmessage(event) {
      history.value[history.value.length - 1].parts[0].text = JSON.parse(event.data).result
      y.value = document.documentElement.clientHeight
    },
    onerror(err) {
      throw err
    }
  })

  content.value = null
  // scroll window to bottom
  setTimeout(() => {
    y.value = document.documentElement.clientHeight
  })
}

function clearMessage() {
  axios.get("http://localhost:8080/clear").then()
  history.value = []
}
</script>

<style scoped>
.message-box {
  transition: all, 200ms;
  white-space: pre-wrap;
  word-break: break-all;
  display: flex;
  align-items: flex-start;
  background-color: white;
  text-align: left;
}

html.dark .message-box {
  background-color: black;
}

.message-box.user {
  justify-content: flex-end;
}

.message-box.model {
  justify-content: flex-start;
}

.message-box:hover {
  scale: 1.1;
  box-shadow: 0 0 15px gray;
}

.dialog-move,
.dialog-enter-active,
.dialog-leave-active {
  transition: all 0.5s ease;
}

.dialog-enter-from,
.dialog-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.dialog-leave-active {
  position: absolute;
}
</style>