<template>
  <div relative z-1 p-b-30>
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
  </div>


  <!-- Input Area -->
  <div bg-white dark:bg-black fixed bottom-0 left-10vw w-100vw m="0 auto" p-2 z-2>
    <button m-3 text-sm btn bg-red absolute left-0 top-0 @click="clearMessage">
      Clear
    </button>
    <div flex="~ row items-center" p-t-10>
      <textarea v-model="content" type="text" p="x-4 y-2" w="65vw" text="left" bg="transparent"
        border="~ rounded gray-700 dark:gray-300" outline="none active:none" placeholder="Ask something..." resize-none
        h-100px />

      <button m-3 text-sm btn h-10 @click="async () => await sendMessage(content)">
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

const content = ref<string>()

// @ts-ignore
const markdown = await useMarkdown()

const history = ref([])

function sendMessage(text: string) {

  content.value = null
}

function clearMessage() {
  history.value = []
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