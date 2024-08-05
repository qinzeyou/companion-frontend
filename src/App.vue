<script setup lang="ts">
import {useLoading} from "@/utils/useLoading.ts";
import {provide, nextTick} from 'vue'

const {hasLoading} = useLoading();
const isRouterActive = ref(true)
provide('reload', () => {
    isRouterActive.value = false
    nextTick(() => {
        isRouterActive.value = true
    })
})

</script>

<template>
    <van-overlay :show="hasLoading" z-index="100">
        <div class="loading">
            <!-- 可修改文案和加载图标的颜色 -->
            <van-loading color="#0094ff">加载中...</van-loading>
        </div>
    </van-overlay>
    <router-view v-if="isRouterActive"/>
</template>

<style scoped>
.loading {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
