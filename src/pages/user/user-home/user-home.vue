<script lang="ts" setup>
import {ref} from 'vue';
import {UserType} from "@/types/user";

const user = ref<UserType>({
    id: 1,
    username: '菜牙',
    userAccount: 'caiya',
    phone: '19978321111',
    avatarUrl: '',
    gender: 0,
    email: 'ttt@qq.com',
    tags: [],
    createTime: new Date()
})
</script>

<template>
    <div class="person-box">
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
                    <p class="person-username">{{ user.username }} </p>
                    <!--                    电话-->
                    <p class="person-phone">{{ user.phone }} </p>
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
