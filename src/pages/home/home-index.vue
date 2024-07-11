<script lang="ts" setup>
import {UserType} from "@/types/user";
import {getMatchUserListAPI, getRecommendUserListAPI} from "@/api/service/user.ts";
import BasePersonCard from "@/components/base/base-person-card.vue";
import BaseResponse = BaseType.BaseResponse;
import PageResponse = BaseType.PageResponse;
import {showFailToast, showSuccessToast} from "vant";
import {useLoading} from "@/utils/useLoading.ts";

const router = useRouter();
const recommendUserList = ref<UserType[]>([]); // 推荐用户列表
// 控制匹配模式，true为心动模式，false为普通模式
const isMatch = ref<boolean>(false);
const {hasLoading} = useLoading();

onMounted(() => {
    loadData()
})

// 切换匹配模式
const changeMatchMode = () => {
    isMatch.value = !isMatch.value;
    loadData();
}

// 获取数据
const loadData = async () => {
    let flag = false;
    recommendUserList.value = [];
    // 心动模式匹配
    if (isMatch.value) {
        const num = 10; // 匹配多个用户
        const res: BaseResponse<UserType[]> = (await getMatchUserListAPI(num)).data;
        if (res.code == 200) {
            recommendUserList.value = res.data;
            flag = true;
        }
    } else {
        const res: BaseResponse<PageResponse<UserType[]>> = (await getRecommendUserListAPI({pageNum: 1, pageSize:8})).data;
        if (res.code == 200) {
            recommendUserList.value = res.data.records;
            flag = true;
        }
    }
    if (flag) showSuccessToast("请求成功");
    else showFailToast("请求失败");
}
// 搜索按钮点击事件
const onSearchBtn = () => {
    router.push('/search');
};
</script>

<template>
    <div class="home-page">
        <div class="head-box">
            <div class="left">
                <van-icon name="like" :color="isMatch ? 'red' : ''" @click="changeMatchMode"/>
            </div>
            <div class="right">
                <van-icon name="search" size="24" @click="onSearchBtn"/>
            </div>
        </div>
        <div class="home-content">
            <div class="search-result">
                <van-empty v-if="recommendUserList.length <= 0 && !hasLoading" image="search" description="暂无搜索结果" />
                <van-row :gutter="[20, 20]">
                    <van-col span="24" v-for="user in recommendUserList" :key="user.id">
                        <BasePersonCard :user="user"/>
                    </van-col>
                </van-row>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
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
</style>
