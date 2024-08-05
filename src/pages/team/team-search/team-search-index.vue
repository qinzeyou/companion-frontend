<script lang="ts" setup>
import {TeamType} from "@/types/team";
import {postTeamListAPI} from "@/api/service/team.ts";
import BaseTeamCard from "@/components/base/base-team-card.vue";

const searchText = ref<string>("");
// 队伍列表
const teamList = ref<TeamType[]>([])

const getTeamList = async () => {
    const res = await postTeamListAPI({searchText: searchText.value});
    if (res.code == 200) {
        teamList.value = res.data;
    }
}

onMounted(async () => {
    await getTeamList();
})
</script>

<template>
    <div class="team-search-page">
        <van-search
                v-model="searchText"
                show-action
                placeholder="请输入搜索关键词"
                @search="getTeamList"
        >
            <template #action>
                <div @click="getTeamList">搜索</div>
            </template>
        </van-search>
        <van-empty v-if="teamList.length <= 0" image="search" description="暂无数据" />
        <van-row :gutter="[20, 20]">
            <van-col span="24" v-for="team in teamList" :key="team.id">
                <BaseTeamCard :team="team"/>
            </van-col>
        </van-row>
    </div>
</template>

<style lang="scss" scoped>
.team-search-page {

}
</style>
