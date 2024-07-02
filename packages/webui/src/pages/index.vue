<script setup lang="ts" generic="T extends any, O extends any">
import MessageBox from '../components/MessageBox.vue';

// const router = useRouter()
// function go() {
//   if (name.value)
//     router.push(`/hi/${encodeURIComponent(name.value)}`)
// }
</script>

<template>
  <div>
    <div i-carbon-campsite inline-block text-4xl />
    <p>Simple Chat UI</p>
    <p>
      <em text-sm op75>For Gemini Pro Chat Kit</em>
    </p>

    <nav mt-6 inline-flex gap-2 text-xl>
      <button icon-btn @click="toggleDark()">
        <div i-carbon-sun dark:i-carbon-moon />
      </button>

      <a i-carbon-logo-github icon-btn rel="noreferrer" href="https://github.com/Vincent-the-gamer/gemini-pro-chat-kit"
        target="_blank" title="GitHub" />
    </nav>

    <div py-4 />

    <!-- message area -->
    <div m="0 auto" h-fit w-60vw>
      <Suspense>
        <MessageBox />
      </Suspense>
    </div>
  </div>
</template>
