<script lang="ts" setup>
import MiniTeamCard from "@/components/base/mini-team-card.vue";
import {TeamType} from "@/types/team";
import {postTeamListAPI} from "@/api/service/team.ts";

const router = useRouter();
const activeName = ref(['1']);
// 队伍列表
const teamList = ref<TeamType[]>([])

const getTeamList = async () => {
    const res = await postTeamListAPI({});
    if (res.code == 200) {
        teamList.value = res.data;
    }
}

onMounted(async () => {
    await getTeamList();
})

const onAddTeam = () => {
    router.push({
        path: "/team/add",
    })
}
</script>

<template>
    <van-collapse v-model="activeName">
        <van-collapse-item title="加入队伍" name="1">
            <van-row class="" :gutter="[20, 20]">
                <van-col span="6" v-for="team in teamList" :key="team.id">
                    <MiniTeamCard :team="team"/>
                </van-col>
            </van-row>
        </van-collapse-item>
        <van-collapse-item title="管理队伍" name="2">
            <van-row class="manage-team-list" :gutter="[20, 20]">
                <van-col span="6" v-for="team in teamList" :key="team.id">
                    <MiniTeamCard :team="team"/>
                </van-col>
            </van-row>
            <van-button type="primary" block plain size="small" @click="onAddTeam">创建队伍</van-button>
        </van-collapse-item>
    </van-collapse>
</template>

<style scoped>
.manage-team-list {
    margin-bottom: 10px;
}
</style>
