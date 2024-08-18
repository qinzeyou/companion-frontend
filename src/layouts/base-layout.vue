<script lang="ts" setup>
import useSystemStore from "@/stores/module/system-store.ts";
import {useThrottleFn} from "@vueuse/core";

const router = useRouter();
const route = useRoute();
// 底部导航栏高亮
const active = ref("home");
// 页面标题
const title = ref<string>("");

// 监听引用数据类型的所有数据，不需要指定监听哪个数据，不过在引用数据量大的时候不建议使用，影响性能
watchEffect(() => {
    title.value = route.meta.title as string;
});

// 点击顶部导航栏返回
const onClickLeft = () => history.back();
// 搜索按钮点击事件
const onSearchBtn = () => {
    router.push("/search");
};
</script>

<template>
    <div class="root">
        <van-nav-bar
                class="nav-bar"
                :title="title"
                left-arrow
                @click-left="onClickLeft"
                @click-right="onSearchBtn"
        >
        </van-nav-bar>
        <router-view class="content"/>
        <van-back-top right="15vw" bottom="10vh"/>
        <van-tabbar class="nav-bar" route v-model="active">
            <van-tabbar-item to="/home" name="home" icon="home-o"
            >主页
            </van-tabbar-item
            >
            <van-tabbar-item to="/team" name="team" icon="friends-o"
            >队伍
            </van-tabbar-item
            >
<!--            <van-tabbar-item to="/information" name="team" icon="chat-o" badge="5"-->
<!--            >信息-->
<!--            </van-tabbar-item-->
<!--            >-->
            <van-tabbar-item to="/user" name="user" icon="manager-o"
            >个人
            </van-tabbar-item
            >
        </van-tabbar>
    </div>
</template>

<style lang="scss" scoped>
.root {
    height: 100vh;
    display: flex;
    flex-direction: column;
}
.content {
    //margin: 0;
    padding: 0 0 75px 0;
    // 动态计算内容高度 = 页面整高 - 头部
    flex: 1;
    background-color: $baseBgc;
}
</style>
