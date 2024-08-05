<script lang="ts" setup>
import {TeamType} from "@/types/team";
import {postPageTeamListAPI} from "@/api/service/team.ts";
import BaseTeamCard from "@/components/base/base-team-card.vue";

// 队伍列表
const teamList = ref<TeamType[]>([])

const getTeamList = async () => {
    const res = await postPageTeamListAPI({pageNum: 1, pageSize: 10});
    if (res.code == 200) {
        teamList.value = res.data.records;
    }
}

onMounted(async () => {
    await getTeamList();
})

</script>

<template>
    <div class="content">
        <van-empty v-if="teamList.length <= 0" image="search" description="暂无数据" />
        <van-row :gutter="[20, 20]">
            <van-col span="24" v-for="team in teamList" :key="team.id">
                <BaseTeamCard :team="team"/>
            </van-col>
        </van-row>
    </div>
</template>

<style scoped>
.content {
    padding: 20px;
}
</style>
