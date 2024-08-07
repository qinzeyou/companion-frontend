<script lang="ts" setup>
import { teamRecommendPageAPI } from "@/api/service/team";
import TeamRecommendIndex from "@/pages/team/team-recommend/team-recommend-index.vue";
import TeamSearchIndex from "@/pages/team/team-search/team-search-index.vue";
import { TeamType } from "@/types/team";

const router = useRouter();

const activeTab = ref<string>('recommend');
const offset = ref({ x: 300, y: 550 });
const value1 = ref(0);
const value2 = ref('a');
const option1 = [
    { text: '全部队伍', value: 0 },
    { text: '加密队伍', value: 1 },
];
const option2 = [
    { text: '默认排序', value: 'a' },
    { text: '好评排序', value: 'b' },
    { text: '或缺排序', value: 'c' },
];
const onClick = () => {
    router.push("/team/add")
};
// 队伍列表
const teamList = ref<TeamType[]>([])

const getTeamList = async () => {
    const res = await teamRecommendPageAPI({pageNum: 1, pageSize: 10});
    if (res.code == 200) {
        teamList.value = res.data.records;
    }
}

onMounted(async () => {
    await getTeamList();
})
</script>

<template>
    <div class="team-home">
        <van-dropdown-menu>
            <van-dropdown-item v-model="value1" :options="option1" />
            <van-dropdown-item v-model="value2" :options="option2" />
        </van-dropdown-menu>
        <!-- <van-tabs v-model:active="activeTab">
            <van-tab name="recommend">
                <template #title>
                    <van-icon name="bar-chart-o" />
                    推荐
                </template>
                <TeamRecommendIndex />
            </van-tab>
            <van-tab name="search">
                <template #title>
                    <van-icon name="search" />
                    搜索
                </template>
                <TeamSearchIndex />
            </van-tab>
        </van-tabs> -->
        <div class="team-home-content">
            <van-empty v-if="teamList.length <= 0" image="search" description="暂无数据" />
            <van-row :gutter="[20, 20]">
                <van-col span="24" v-for="team in teamList" :key="team.id">
                    <BaseTeamCard :team="team" />
                </van-col>
            </van-row>
        </div>
        <van-floating-bubble icon="plus" v-model:offset="offset" @click="onClick" />
    </div>
</template>

<style lang="scss" scoped>
.team-home-content {
    padding: 20px;
}
</style>
