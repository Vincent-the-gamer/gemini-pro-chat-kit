<script setup lang="ts" generic="T extends any, O extends any">
// @ts-ignore
import rena from "~/assets/logos/rena.png"
</script>

<template>
  <div>
    <img :src="rena" alt="rena" w-15 h-15 m="0 auto"/>
    <div py-1/>
    <p>Simple Chat UI</p>
    <p>
      <em text-sm op75>
        For Gemini Pro Chat Kit
      </em>
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
    <div m="0 auto" h-fit w-80vw>
      <Suspense>
        <MessageBox />
      </Suspense>
    </div>
  </div>
</template>
