<script lang="ts" setup>
import {UserType} from "@/types/user";
import {getUserInfoByIdAPI} from "@/api/service/user.ts";
import UserAvatar from "@/components/user-avatar.vue";
import {GenderEnum} from "@/enums/enum.ts";
import {EnumValue} from "@/common/EnumValue.ts";
import {showNotify} from "vant";

const route = useRoute();
const router = useRouter();

// 获取路由上的用户id
const userId = route.query.userId;
// 用户信息
const user = ref<UserType>({
    avatarUrl: '',
} as UserType);

// 根据用户id获取用户信息
const getUserInfoById = async () => {
    try {
        const tmp = Number(userId);
        const res = await getUserInfoByIdAPI({userId: tmp});
        if (res.code == 200) user.value = res.data;
    } catch (e) {
        router.push({
            path: '/home',
            replace: true
        })
    }
}
// 添加好友响应事件
const adFriend = () => {
    showNotify({
        type: 'success',
        message: '功能正在开发中，敬请期待'
    })
}
// 组件挂载完成钩子函数
onMounted(async () => {
    await getUserInfoById();
})
</script>

<template>
    <div class="userinfo-page">
        <!-- 用户信息 -->
        <div class="userinfo-content card">
            <!-- 用户头像 -->
            <div class="user-avatar">
                <UserAvatar :url="user!.avatarUrl" size="120px"/>
            </div>
            <!-- 用户信息 -->
            <div class="userinfo">
                <van-cell title="昵称" :value="user!.username" icon="manager-o" />
                <van-cell title="性别" :value="EnumValue.getLabelByValue(GenderEnum, user!.gender)" icon="contact-o" />
                <van-cell title="简介" :value="user!.profile" icon="comment-o" />
                <van-cell title="联系方式" :value="user!.phone" icon="phone-o" />
                <van-cell title="邮箱" :value="user!.email ? user!.email : '暂无邮箱'" icon="envelop-o" />
            </div>
            <!-- 添加按钮 -->
            <van-button round  icon="plus" type="primary" @click="adFriend">添加好友</van-button>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.userinfo-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 20px;
    box-sizing: border-box;
}
/* 设置头像阴影 */
.user-avatar {
    border-radius: 50%;
    box-shadow: 1px 5px 20px rgba(0, 0, 0, 0.5);
}
/* 用户信息 */
.userinfo-content {
    width: 100%;
    height: auto;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-image: linear-gradient(to right, #ffecd2 0%, #fcb69f 100%);
}
.userinfo {
    width: 100%;
    margin: 20px 0;
}
</style>
