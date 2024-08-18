<script lang="ts" setup>
import {navTo} from "@/utils";
</script>

<template>
    <van-empty
            description="功能正在开发中，敬请期待"
    >
        <van-button @click="navTo('/user')" size="normal" type="primary" class="bottom-button">返回</van-button>
    </van-empty>
</template>

<style scoped>

</style>
