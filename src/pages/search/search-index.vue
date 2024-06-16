<script lang="ts" setup>
import {ref} from 'vue';

/**
 * 页面变量
 */
// 搜索框输入
const searchText = ref('');
// 存储已选择的标签
const activeTagNameList = ref([]);
//  左侧选中项的索引
const activeIndex = ref(0);
// 原始标签数组
const originTagNameList = [
    {
        text: '性别',
        children: [
            { text: '男', id: '男' },
            { text: '女', id: '女' },
        ],
    },
    {
        text: '年级',
        children: [
            { text: '大一', id: '大一' },
            { text: '大二', id: '大二' },
            { text: '大三', id: '大三' },
            { text: '大四', id: '大四' },
            { text: '毕业', id: '毕业' },
        ],
    },
];
// 标签列表
const tagNameList = ref(JSON.parse(JSON.stringify(originTagNameList)));
/**
 * 事件定义
 */
// 搜索过滤：根据输入，检索符合条件的数据，并将其返回给分类选择器绑定的数据
const onSearch = () => {
    tagNameList.value = originTagNameList.map(parent => {
        // 数据浅拷贝，但需要注意的是，parent里有引用类型的数据（数组、对象），此时 tmpParentTag 和 parent 里的 children
        // 是指向同一个地址，如果修改了 tmpParentTag 或 parent 里children的值，那么两个对象的里children都会改变
        const tmpParentTag = {...parent};
        // 通过浅拷贝得到一个分类的children对象，因为上面两个对象的children引用的是同一个地址，但是我们可以在浅拷贝children出来，组成一个新的children，
        // 因为children 里没有引用类型数据，所以浅拷贝没事
        const tmpParentTagChildren = [...tmpParentTag.children];
        // 基于浅拷贝得出的数据进行过滤，然后返回新的数据，这样就不会改变原始数组的数据
        tmpParentTag.children = tmpParentTagChildren.filter(item => item.text.includes(searchText.value));
        return tmpParentTag;
    });
};
// 取消搜索响应事件
const onCancel = () => {
    // 搜索输入置空
    searchText.value = '';
    /**
     * 将分类选择器的数据置为原始数据，这里使用的是深拷贝，因为如果直接复制会导致两个对象指向同一个地址，这样一个数组发生改变，
     * 另一个数组也会随着改变，这样会破坏掉原数组，所以需要深拷贝，将原始数组的值拷贝给新数组，而它们不是直接指向同一个地址
     */
    tagNameList.value = JSON.parse(JSON.stringify(originTagNameList));
}
// 移除已选择的标签
const removeActiveTagName = (tagName: string) => {
    // 从已选择的标签数组中过滤掉传入的标签名称
    activeTagNameList.value = activeTagNameList.value.filter(item => item !== tagName);
}
</script>

<template>
    <form action="/">
        <van-search
                v-model="searchText"
                show-action
                placeholder="请输入搜索关键词"
                @search="onSearch"
                @cancel="onCancel"
        />
        <van-divider>已选标签</van-divider>
        <div class="active-placeholder" v-if="activeTagNameList.length === 0">请选择标签</div>
        <van-row v-else class="selected-tag-row" :gutter="[20, 20]">
            <van-col span="6" v-for="tagName in activeTagNameList" :key="tagName">
                <van-tag :show="true" closeable size="medium" type="primary" @close="removeActiveTagName(tagName)">
                    {{ tagName }}
                </van-tag>
            </van-col>
        </van-row>
        <van-divider>选择标签</van-divider>
        <van-tree-select
            v-model:active-id="activeTagNameList"
            v-model:main-active-index="activeIndex"
            :items="tagNameList"
        />
    </form>
</template>

<style lang="scss" scoped>
.active-placeholder {
    width: 100%;
    height: 60px;
    text-align: center;
    color: $text-secondary;
}
.selected-tag-row {
    padding: 20px;
}
</style>
