<script lang="ts" setup>
// 当前登录信息

import {UserType} from "@/types/user";
import {getLoginUserAPI} from "@/api/service/user.ts";

const loginUser = ref<UserType>({} as UserType);

// 获取当前登录用户信息
const getCurrentUserData = async () => {
    const res = await getLoginUserAPI();
    if (res.code == 200 && res.data) {
        loginUser.value = res.data;
    }
}
onMounted(async () => {
    await getCurrentUserData()
})
</script>

<template>
  <main class="loginUser-tag">
      <van-card
              :title="loginUser.username"
              :desc="loginUser.profile"
              :thumb="loginUser.avatarUrl"
              style="background-color: white"
      >
          <template #tags>
              <van-row v-if="loginUser.tags" class="tag-row" :gutter="[10, 10]">
                  <van-col v-for="tag in JSON.parse(loginUser.tags)" :key="tag">
                      <van-tag plain type="danger">{{ tag }}</van-tag>
                  </van-col>
              </van-row>
          </template>
          <template #footer>
              <van-button size="mini" type="primary">联系我</van-button>
          </template>
      </van-card>
      <div class="show-tag">
          <van-divider
                  :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }"
          >
              我的标签
          </van-divider>
          <div class="my-tag">
              <van-row :gutter="[20, 20]">
                  <van-col span="6" v-for="item in 9" :key="item" style="text-align: center">
                      <van-tag closeable plain type="primary" size="medium">Java</van-tag>
                  </van-col>
              </van-row>
          </div>

          <van-divider
                  :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }"
          >
              热门标签
          </van-divider>
          <div class="hot-tag">
              <van-row :gutter="[20, 20]">
                  <van-col span="6" v-for="item in 9" :key="item" style="text-align: center">
                      <van-tag closeable plain type="danger" size="medium">Java</van-tag>
                  </van-col>
              </van-row>
          </div>
      </div>
  </main>
</template>

<style scoped>
.loginUser-tag {
    padding: 10px;
}

</style>
