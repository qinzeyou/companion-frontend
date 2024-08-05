<script lang="ts" setup>
import TeamRecommendIndex from "@/pages/team/team-recommend/team-recommend-index.vue";
import TeamSearchIndex from "@/pages/team/team-search/team-search-index.vue";

const activeTab = ref<string>('recommend');

</script>

<template>
    <van-tabs v-model:active="activeTab">
        <van-tab name="recommend">
            <template #title>
                <van-icon name="bar-chart-o"/>
                推荐
            </template>
            <TeamRecommendIndex/>
        </van-tab>
        <van-tab name="search">
            <template #title>
                <van-icon name="search"/>
                搜索
            </template>
            <TeamSearchIndex/>
        </van-tab>
    </van-tabs>
</template>

<style scoped>

</style>
