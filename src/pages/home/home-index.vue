<script lang="ts" setup>
import {UserType} from "@/types/user";
import BasePersonCard from "@/components/base/base-person-card.vue";
import {useLoading} from "@/utils/useLoading.ts";
import HomeBanner from "@/pages/home/components/home-banner.vue";
import useSystemStore from "@/stores/module/system-store.ts";;

const el = ref<HTMLElement | null>(null)
const router = useRouter();
// 推荐用户列表
const recommendUserList = ref<UserType[]>([]);
// 控制匹配模式，true为心动模式，false为普通模式
const isMatch = ref<boolean>(false);
// 控制加载中提示的显示
const {hasLoading} = useLoading();
const loading = ref(true);
const {userList} = toRefs(useSystemStore());
const {loadData} = useSystemStore();

onMounted(() => {
    loadData();
});

// 切换匹配模式
const changeMatchMode = () => {
    isMatch.value = !isMatch.value;
    loadData();
};

// 获取数据
// const loadData = async () => {
//     recommendUserList.value = [];
//     // 心动模式匹配
//     if (isMatch.value) {
//         const num = 10; // 匹配多个用户
//         const res = await getMatchUserListAPI(num);
//         if (res.code == 200) {
//             recommendUserList.value = res.data;
//         }
//     } else {
//         const res = await getRecommendUserListAPI({pageNum: 1, pageSize: 8});
//         if (res.code == 200) {
//             recommendUserList.value = res.data.records;
//         }
//     }
// };
// 搜索按钮点击事件
const onSearchBtn = () => {
    router.push("/search");
};
</script>

<template>
    <div class="home-page">
        <div class="head-box">
            <div class="left">
                <van-icon
                        name="like"
                        :color="isMatch ? 'red' : ''"
                        @click="changeMatchMode"
                />
            </div>
            <div class="right">
                <van-icon name="search" size="24" @click="onSearchBtn"/>
            </div>
        </div>
        <HomeBanner/>
        <div class="home-content">
            <div class="search-result" ref="el">
                <van-empty
                        v-if="userList.length <= 0 && !hasLoading"
                        image="search"
                        description="暂无搜索结果"
                />
                <van-row :gutter="[20, 20]">
                    <van-col span="24" v-for="user in userList" :key="user.id">
                        <BasePersonCard :user="user"/>
                    </van-col>
                </van-row>
            </div>
            <div class="loading" v-if="loading">加载更多...</div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.home-page {
    height: 100vh;
}
// 头部盒子
.head-box {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 35px;
    padding: 0 20px;
    background-color: #177cb0;
    color: white;

    .left {
        flex: 5;
    }

    .right {
        flex: 5;
        display: flex;
        align-items: center;
        justify-content: end;
    }
}

.home-content {
    padding: 0 20px;
    margin-top: 20px;
}

.loading {
    text-align: center;
    padding: 20px 5px;
}
</style>
