<script lang="ts" setup>
import {navTo} from "@/utils";

interface Tab {
    id: number;
    name: string;
    color: string;
    icon: string;
    url: string;
}

const tabs: Tab[] = [
    {
        id: 1,
        name: '创建队伍',
        color: '#336699',
        icon: 'add-o',
        url: '/team/add',
    },
    {
        id: 2,
        name: '我的标签',
        color: '#009966',
        icon: 'label-o',
        url: '/user/tag',
    },
    {
        id: 3,
        name: '系统公告',
        color: '#ff3300',
        icon: 'bullhorn-o',
        url: '/notice',
    },
    {
        id: 4,
        name: '更多功能',
        color: '#fab27b',
        icon: 'ellipsis',
        url: '/home',
    },
]
</script>

<template>
    <div class="cy-tab">
        <div class="tab-box">
            <div class="tab" v-for="item in tabs" :key="item.id" @click="navTo(item.url)">
                <div class="icon" :style="{backgroundColor: `${item.color}`}">
                    <van-icon :name="item.icon" size="26" color="white"/>
                </div>
                <p>{{ item.name }}</p>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.cy-tab {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.tab-box {
    margin-top: 20px;
    display: grid;
    grid-template-columns: auto auto auto auto; /* 三列 */
    gap: 20px;
}

.tab {
    box-sizing: border-box;
    padding: 10px;
    text-align: center;
    border-radius: 10px;
    cursor: pointer;

    .icon {
        padding: 10px;
        border-radius: 10px;
    }

    p {
        margin-top: 10px;
        font-size: 12px;
    }
}
</style>
