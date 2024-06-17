<script lang="ts" setup>
import BasePersonCard from "@/components/base/base-person-card.vue";
import {useRoute} from "vue-router";
import {onMounted, ref} from 'vue';
import {UserType} from "@/types/user";
import {searchUserByTags} from "@/api/service/user.ts";

const route = useRoute();

// 从 URL query 中取出筛选标签列表
const tags = route.query.tags as string[];
// 符合筛选条件的用户数组
const userList = ref<UserType[]>([]);
// 标识搜索是否为空，true为空，false反之，默认为空
const searchFlag = ref<boolean>(true);


// 根据标签列表向后端发送get请求

// 页面挂载完成钩子函数
onMounted(async () => {
    userList.value = (await searchUserByTags(tags)).data.data;
    searchFlag.value = userList.value.length <= 0;
})
</script>

<template>
    <div class="search-result">
        <van-empty v-if="searchFlag" image="search" description="暂无搜索结果" />
        <van-row :gutter="[0, 20]">
            <van-col span="24">
                <BasePersonCard v-for="user in userList" :key="user.id" :user="user"/>
            </van-col>
        </van-row>
    </div>
</template>

<style scoped>
.search-result {
    padding: 10px;
}
</style>
