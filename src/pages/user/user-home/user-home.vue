<script lang="ts" setup>
import {UserType} from "@/types/user";
import {getLoginUserAPI, postUserLogoutAPI} from "@/api/service/user.ts";
import {showSuccessToast} from "vant";

// 当前登录信息
const loginUser = ref<UserType>();
// 登录状态，已登录为true，未登录为false
const loginState = ref<boolean>(false);

// 获取当前登录用户信息
const getCurrentUserData = async () => {
    const res = await getLoginUserAPI();
    if (res.code == 200 && res.data) {
        loginUser.value = res.data;
        loginState.value = false;
    } else {
        loginState.value = true;
    }
}

onMounted(async () => {
    await getCurrentUserData()
})
// 用户退出登录响应
const logout = async () => {
    const res = await postUserLogoutAPI();
    if (res.code == 200) {
        showSuccessToast({message: "退出登录成功"})
        await getCurrentUserData()
    }
}
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
                    <van-image round radius="10" :src="loginUser?.avatarUrl">
                        <template v-slot:error>加载失败</template>
                    </van-image>
                </van-col>
                <!--                用户信息-->
                <van-col class="person" span="16">
                    <!--                    昵称-->
                    <p class="person-username">{{ loginUser?.username }} </p>
                    <!--                    自我简介-->
                    <p class="person-phone">{{ loginUser?.profile }} </p>
                </van-col>
            </van-row>
        </div>
        <!--        操作栏-->
        <div class="operation-box">
            <van-cell icon="contact-o" size="large" title="个人信息" is-link to="/user/edit"/>
            <van-cell icon="list-switch" size="large" title="管理队伍" is-link to="/user/team/manager"/>
            <van-cell icon="idcard" size="large" title="我的标签" is-link to="/user/tag"/>
            <van-cell icon="setting-o" size="large" title="设置" is-link/>
        </div>
        <!--        退出栏-->
        <div class="logout">
            <van-button @click="logout" class="logout-btn" type="danger" block>退出登录</van-button>
        </div>
    </div>
</template>

<style lang="scss" scoped>
// 用户信息展示
.person-container {
    padding: 10px 35px;
    height: 100px;
    display: flex;
    justify-content: space-between;
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
