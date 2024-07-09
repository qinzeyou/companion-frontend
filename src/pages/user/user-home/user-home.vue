<script lang="ts" setup>
import {UserType} from "@/types/user";
import {getLoginUserAPI} from "@/api/service/user.ts";

const loginUser = ref<UserType>();
const loginState = ref<boolean>(false);

onMounted(async () => {
    const {data} = await getLoginUserAPI();
    if (data.code == 200) {
        loginUser.value = data.data;
        loginState.value = false;
    } else {
        loginState.value = true;
    }
})
</script>

<template>
    <div v-if="loginState" class="un-login">
        <van-empty description="还未登录，请先登录">
            <van-button round type="primary" class="bottom-button" to="/login">前往登录</van-button>
        </van-empty>
    </div>
    <div v-else class="person-box">
        <!--        用户信息展示-->
        <div class="person-container">
            <van-row :gutter="20">
                <van-col span="6">
                    <!--                    头像-->
                    <van-image round radius="10" src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg">
                        <template v-slot:error>加载失败</template>
                    </van-image>
                </van-col>
                <!--                用户信息-->
                <van-col class="person" span="16">
                    <!--                    昵称-->
                    <p class="person-username">{{ loginUser?.username }} </p>
                    <!--                    电话-->
                    <p class="person-phone">{{ loginUser?.phone }} </p>
                </van-col>
            </van-row>
        </div>
        <!--        操作栏-->
        <div class="operation-box">
            <van-cell icon="contact-o" size="large" title="个人信息" is-link to="/user-edit"/>
            <van-cell icon="setting-o" size="large" title="设置" is-link/>
        </div>
        <!--        退出栏-->
        <div class="logout">
            <van-button class="logout-btn" type="danger" block>退出登录</van-button>
        </div>
    </div>
</template>

<style lang="scss" scoped>
// 用户信息展示
.person-container {
  padding: 10px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;

  //  用户信息
  .person {
    padding: 10px;
    // 昵称
    &-username {
      font-size: 20px;
      font-weight: bold;
      margin-bottom: 10px;
    }

    // 电话
    &-phone {
      font-size: 12px;
      color: $text-secondary;
    }
  }
}

// 操作栏
.operation-box {
  margin-top: 20px;
  //background-color: white;
}

// 退出栏
.logout {
  padding: 20px 0;
}
</style>
