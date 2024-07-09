<script lang="ts" setup>
const router = useRouter();
const active = ref('home');

const onClickLeft = () => history.back();
// 搜索按钮点击事件
const onSearchBtn = () => {
    router.push('/search');
};
</script>

<template>
    <van-nav-bar
            title="标题"
            left-arrow
            @click-left="onClickLeft"
            @click-right="onSearchBtn"
    >
        <template #right>
            <van-icon name="search" size="18"/>
        </template>
    </van-nav-bar>
    <router-view class="content"/>
    <van-tabbar class="nav-bar" route v-model="active">
        <van-tabbar-item to="/home" name="home" icon="home-o">主页</van-tabbar-item>
        <van-tabbar-item to="/team" name="team" icon="search">队伍</van-tabbar-item>
        <van-tabbar-item to="/user" name="user" icon="friends-o">个人</van-tabbar-item>
    </van-tabbar>
</template>

<style lang="scss" scoped>
.content {
  margin: 0;
  padding: 0 0 75px 0;
    // 动态计算内容高度 = 页面整高 - 头部
  min-height: calc(100vh - 125px);
  background-color: $baseBgc;
}
//.nav-bar {
//    margin-top: 120px;
//}
</style>
