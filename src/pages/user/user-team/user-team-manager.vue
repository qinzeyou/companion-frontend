<script lang="ts" setup>
import { TeamListByUserResponse } from "@/types/team";
import { getTeamListByUserAPI } from "@/api/service/team.ts";
import { getLoginUserAPI } from "@/api/service/user.ts";
import BaseTeamCard from "@/components/base/base-team-card.vue";

const userTeamList = ref<TeamListByUserResponse>(<TeamListByUserResponse>{});
const loading = ref(false);
const onRefresh = async () => {
  await getUserTeamList();
  loading.value = false;
};

const getUserTeamList = async () => {
  // 获取当前登录用户信息
  const getLoginUserRes = await getLoginUserAPI();
  if (getLoginUserRes.code == 200) {
    const userId = getLoginUserRes.data.id;
    const getTeamListRes = await getTeamListByUserAPI(userId);
    if (getTeamListRes.code == 200) {
      userTeamList.value = getTeamListRes.data;
      return;
    }
  }
};
onMounted(async () => {
  await getUserTeamList();
});
</script>

<template>
  <van-pull-refresh v-model="loading" @refresh="onRefresh">
    <div class="content">
      <van-divider
        :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }"
      >
        已创建队伍
      </van-divider>
      <van-row :gutter="[20, 20]">
        <van-col
          span="24"
          v-for="team in userTeamList.createTeamList"
          :key="team.id"
        >
          <BaseTeamCard
            :team="team"
            :showJoinTeamList="false"
            :showOperationPanel="true"
            :showDissolveBtn="true"
          />
        </van-col>
      </van-row>
      <van-divider
        :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }"
      >
        已加入队伍
      </van-divider>
      <van-row :gutter="[20, 20]">
        <van-col
          span="24"
          v-for="team in userTeamList.joinTeamList"
          :key="team.id"
        >
          <BaseTeamCard
            :team="team"
            :showJoinTeamList="false"
            :showOperationPanel="true"
          />
        </van-col>
      </van-row>
    </div>
  </van-pull-refresh>
</template>

<style scoped>
.content {
  padding: 0 20px 80px 20px;
}
</style>
