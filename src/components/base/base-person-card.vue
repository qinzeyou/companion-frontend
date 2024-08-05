<!--
基础用户展示card
-->
<script lang="ts" setup>
import {UserType} from "@/types/user";

interface Props {
    user: UserType, // 用户数据
}

defineProps<Props>();
</script>

<template>
    <van-card
        :title="user.username"
        :desc="user.profile"
        :thumb="user.avatarUrl"
        style="background-color: white"
    >
        <template #tags>
            <van-row v-if="user.tags" class="tag-row" :gutter="[10, 10]">
                <van-col v-for="tag in JSON.parse(user.tags)" :key="tag">
                    <van-tag plain type="danger">{{ tag }}</van-tag>
                </van-col>
            </van-row>
        </template>
        <template #footer>
            <van-button size="mini" type="primary">联系我</van-button>
        </template>
    </van-card>
</template>

<style scoped>

</style>
