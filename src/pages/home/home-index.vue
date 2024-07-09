<script lang="ts" setup>
import {UserType} from "@/types/user";
import {getRecommendUserList} from "@/api/service/user.ts";
import BasePersonCard from "@/components/base/base-person-card.vue";

const recommendUserList = ref<UserType[]>([]); // 推荐用户列表
// 标识推荐结果是否为空，true为空，false反之，默认为空
const searchFlag = ref<boolean>(true);

onMounted(async () => {
    recommendUserList.value = (await getRecommendUserList({pageNum: 1, pageSize:8})).data.data.records;
    searchFlag.value = recommendUserList.value?.length <= 0;
})
</script>

<template>
    <div class="search-result">
        <van-empty v-if="searchFlag" image="search" description="暂无搜索结果" />
        <van-row :gutter="[20, 20]">
            <van-col span="24">
                <BasePersonCard v-for="user in recommendUserList" :key="user.id" :user="user"/>
            </van-col>
        </van-row>
    </div>
</template>

<style scoped>

</style>
