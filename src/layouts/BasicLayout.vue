<script lang="ts" setup>
import {ref} from 'vue';
import {useRouter} from "vue-router";

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
            <van-icon name="search" size="18" />
        </template>
    </van-nav-bar>
    <router-view />
    <van-tabbar route v-model="active">
        <van-tabbar-item to="/home" name="home" icon="home-o">主页</van-tabbar-item>
        <van-tabbar-item to="/team" name="team" icon="search">组队</van-tabbar-item>
        <van-tabbar-item to="/user" name="user" icon="friends-o">个人</van-tabbar-item>
    </van-tabbar>
</template>

<style scoped>

</style>
