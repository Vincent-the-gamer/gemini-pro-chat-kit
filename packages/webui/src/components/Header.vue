<template>
    <div fixed top-0 left-0 w-full h-40px backdrop-blur-lg bg-light z-3 class="box-sd">
        <div relative w-180px h-40px left-0 flex="~ row items-center gap-1 ">
            <img :src="rena" alt="rena" w-40px h-40px />
            <p left-15>Simple Chat UI</p>
        </div>
    </div>
</template>

<script lang="ts" setup>
// @ts-ignore
import rena from "~/assets/logos/rena.png"
</script>

<style scoped>
    .box-sd {
        box-shadow: 0 0 5px rgb(146, 146, 146);
    }
</style>