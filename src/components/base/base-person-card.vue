<!--
基础用户展示card
-->
<script lang="ts" setup>
import {UserType} from "@/types/user";
import {defineProps} from 'vue';

interface Props {
    // 用户数据
    user: UserType;
}

defineProps<Props>();
const router = useRouter();

// 点击联系我，携带该用户id前往展示用户信息页
const toUserInfo = (userId: number) => {
    router.push({
        path: '/show/userInfo',
        query: {
            userId
        }
    })
}
</script>

<template>
    <van-card
            :title="user.username"
            :desc="user.profile"
            :thumb="user.avatarUrl"
            style="background-color: white"
    >
        <template #tags>
            <van-row v-if="user.userTags" class="tag-row" :gutter="[20, 0]">
                <van-col v-for="tag in user.userTags" :key="tag.id">
                    <van-tag plain type="danger" :color="tag.color" :text-color="tag.textColor">{{
                        tag.tagName
                        }}
                    </van-tag>
                </van-col>
            </van-row>
        </template>
        <template #footer>
            <van-button size="mini" type="primary" @click="toUserInfo(user.id)">联系我</van-button>
        </template>
    </van-card>
</template>

<style scoped>

</style>
