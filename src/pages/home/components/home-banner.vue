<!--
轮播图组件
-->
<script lang="ts" setup>
const images = [
    {
        index: 1,
        url: "http://shq2sf8gm.hn-bkt.clouddn.com/images/banner-1.png"
    },
    {
        index: 2,
        url: "http://shq2sf8gm.hn-bkt.clouddn.com/images/banner-2.png"
    },
    {
        index: 3,
        url: "http://shq2sf8gm.hn-bkt.clouddn.com/images/banner-3.png"
    },
    {
        index: 4,
        url: "http://shq2sf8gm.hn-bkt.clouddn.com/images/banner-4.png"
    }
]
</script>

<template>
    <div class="home-banner">
        <van-swipe style="height: 200px" :autoplay="3000" lazy-render>
            <van-swipe-item v-for="item in images" :key="item.index">
                <van-image class="img" :src="item.url"/>
            </van-swipe-item>
        </van-swipe>
    </div>
</template>

<style scoped>
.home-banner {
    width: 100%;
    background-color: red;
}
.img {
    width: 100%;
    height: 200px;
    background-position: center;
    background-size: cover;
}
</style>
