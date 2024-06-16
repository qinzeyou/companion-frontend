<script lang="ts" setup>
import {showToast} from "vant";
import {ref} from 'vue'

const active = ref('home');

const onClickLeft = () => history.back();
const onClickRight = () => showToast('按钮');

</script>

<template>
    <van-nav-bar
        title="标题"
        left-arrow
        @click-left="onClickLeft"
        @click-right="onClickRight"
    >
        <template #right>
            <van-icon name="search" size="18" />
        </template>
    </van-nav-bar>
    <router-view />
    <van-tabbar v-model="active">
        <van-tabbar-item name="home" icon="home-o">主页</van-tabbar-item>
        <van-tabbar-item name="team" icon="search">组队</van-tabbar-item>
        <van-tabbar-item name="user" icon="friends-o">个人</van-tabbar-item>
    </van-tabbar>
</template>

<style scoped>

</style>
