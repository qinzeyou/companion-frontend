<!--
队伍展示小卡片
-->
<script lang="ts" setup>
import {TeamType} from "@/types/team";

interface Props {
    team: TeamType, // 队伍数据
}

const props = defineProps<Props>();
</script>

<template>
    <div class="mini-team-card">
        <img class="team-cover" src="@/assets/images/team-cover-default.png" alt="">
        <p>{{ team.name }}</p>
    </div>
</template>

<style scoped>
.mini-team-card {
    background-color: white;
    border-radius: 5px;
    min-height: 100px;
}
.team-cover {
    width: 45px;
    height: 45px;
    border-radius: 5px;
}
</style>
