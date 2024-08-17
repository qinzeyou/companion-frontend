<!--
队伍展示小卡片
-->
<script lang="ts" setup>
import { TeamType } from "@/types/team";

interface Props {
  team: TeamType; // 队伍数据
}
const defaultTeamCoverUrl =
  "http://shq2sf8gm.hn-bkt.clouddn.com/system/default-team-cover.png";
defineProps<Props>();
</script>

<template>
  <div class="mini-team-card">
    <img
      class="team-cover"
      :src="team.teamCover ? team.teamCover : defaultTeamCoverUrl"
      alt=""
    />
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
