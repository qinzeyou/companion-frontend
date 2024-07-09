<script lang="ts" setup>
import {TeamType} from "@/types/team";
import {postTeamListAPI} from "@/api/service/team.ts";
import {showFailToast, showSuccessToast} from "vant";
import BaseTeamCard from "@/components/base/base-team-card.vue";

// 队伍列表
const teamList = ref<TeamType[]>([])

const getTeamList = async () => {
    const res: BaseType.BaseResponse<TeamType[]> = (await postTeamListAPI({})).data;
    if (res.code == 200) {
        teamList.value = res.data;
        showSuccessToast("请求成功");
    } else {
        showFailToast("请求失败");
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
