<template>
  <div relative z-1 p-b-30>
    <transition-group name="dialog">
      <div v-for="item of history.data" :key="item" :class="`message-box ${item.role}`" border="1px solid black dark:white rd-4" p-5 m-6>
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
        border="~ rounded gray-700 dark:gray-300" outline="none active:none" placeholder="Ctrl/cmd + Enter for new line, Enter for send." resize-none
        h-100px />

      <button m-3 text-sm btn h-10 @click="async () => await sendMessage()"
        @keyup.enter.exact="async () => await sendMessage()">
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

const serverBase: string = import.meta.env.VITE_SERVER_BASE

const { y } = useWindowScroll()

const content = ref<string>()

// @ts-ignore
const markdown = await useMarkdown()

const history = reactive({
  data: []
})

async function sendMessage() {
  history.data.push({
    role: "user",
    parts: [{
      text: content.value
    }]
  })

  history.data.push({
    role: "model",
    parts: [{
      text: ""
    }]
  })

  

  const { data, close, status } = useEventSource(`${serverBase}/streamChat?message=${content.value}`)

  watch(() => data.value, newVal => {
    const data = JSON.parse(newVal)
    if(data.close && status.value !== "CLOSED") {
      close()
    } else {
      history.data[history.data.length - 1].parts[0].text = data.message
      // scroll window to bottom
      setTimeout(() => {
        y.value = document.documentElement.clientHeight
      })
    }
  })

  content.value = null

}

function clearMessage() {
  axios.get(`${serverBase}/clear`).then()
  history.data = []
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