<script lang="ts" setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { treeTagAPI } from "@/api/service/tag";
import { TreeTag } from "@/types/tag";

interface CompTreeObj {
  id: number;
  text: string;
}
interface CompTreeMenu extends CompTreeObj {
  children: any;
}

// 系统变量
const router = useRouter();

/**
 * 页面变量
 */
// 搜索框输入
const searchText = ref("");
// 存储已选择的标签
const activeTagNameList = ref<CompTreeObj[]>([]);
//  左侧选中项的索引
const activeIndex = ref(0);
// 原始标签数组
const originTagNameList = ref<CompTreeMenu[]>([]);
// 标签列表
const tagNameList = ref();
// 标识已选择标签列表是否为空，true为空，反之false
const isEmptyTagNameList = computed(() => {
  return activeTagNameList.value.length === 0;
});

/**
 * 事件定义
 */
// 获取树形结构标签数据
const getTreeTagData = async () => {
  const res: any = await treeTagAPI();
  if (res.code == 200) {
    res.data.forEach((e: TreeTag) => {
      let obj: CompTreeMenu = {
        id: e.id,
        text: e.tagName,
        children: [],
      };
      const children: { id: number; text: string }[] = [];
      e.children.forEach((c: any) => {
        let tag = {
          id: c.id,
          text: c.tagName,
        };
        children.push(tag);
      });
      obj.children = children;
      originTagNameList.value.push(obj);
    });
    tagNameList.value = JSON.parse(JSON.stringify(originTagNameList.value));
  }
};
const treeClickItem = (e: CompTreeObj) => {
  activeTagNameList.value.push(e);
};
// 搜索过滤：根据输入，检索符合条件的数据，并将其返回给分类选择器绑定的数据
const onSearch = () => {
  tagNameList.value = originTagNameList.value.map((parent) => {
    // 数据浅拷贝，但需要注意的是，parent里有引用类型的数据（数组、对象），此时 tmpParentTag 和 parent 里的 children
    // 是指向同一个地址，如果修改了 tmpParentTag 或 parent 里children的值，那么两个对象的里children都会改变
    const tmpParentTag = { ...parent };
    // 通过浅拷贝得到一个分类的children对象，因为上面两个对象的children引用的是同一个地址，但是我们可以在浅拷贝children出来，组成一个新的children，
    // 因为children 里没有引用类型数据，所以浅拷贝没事
    const tmpParentTagChildren = [...tmpParentTag.children];
    // 基于浅拷贝得出的数据进行过滤，然后返回新的数据，这样就不会改变原始数组的数据
    tmpParentTag.children = tmpParentTagChildren.filter((item) =>
      item.text.includes(searchText.value)
    );
    return tmpParentTag;
  });
};
// 取消搜索响应事件
const onCancel = () => {
  // 搜索输入置空
  searchText.value = "";
  /**
   * 将分类选择器的数据置为原始数据，这里使用的是深拷贝，因为如果直接复制会导致两个对象指向同一个地址，这样一个数组发生改变，
   * 另一个数组也会随着改变，这样会破坏掉原数组，所以需要深拷贝，将原始数组的值拷贝给新数组，而它们不是直接指向同一个地址
   */
  tagNameList.value = JSON.parse(JSON.stringify(originTagNameList.value));
};
// 移除已选择的标签
const removeActiveTagName = (tagName: string) => {
  // 从已选择的标签数组中过滤掉传入的标签名称
  activeTagNameList.value = activeTagNameList.value.filter(
    (item) => item.text !== tagName
  );
};
// 标签搜索响应事件：携带已选择的标签数组传给搜索结果页
const handlerSearch = () => {
  const tags: number[] = activeTagNameList.value.map((v) => v.id);
  router.push({
    path: "/search/result",
    query: {
      tags,
    },
  });
};

onMounted(async () => {
  await getTreeTagData();
});
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
    <div class="active-placeholder" v-if="isEmptyTagNameList">请选择标签</div>
    <van-row v-else class="selected-tag-row" :gutter="[0, 20]">
      <van-col span="6" v-for="tag in activeTagNameList" :key="tag.id">
        <van-tag
          :show="true"
          closeable
          size="medium"
          type="primary"
          @close="removeActiveTagName(tag.text)"
        >
          {{ tag.text }}
        </van-tag>
      </van-col>
    </van-row>
    <div class="search-box">
      <van-button
        v-if="!isEmptyTagNameList"
        @click="handlerSearch"
        plain
        hairline
        class="search-btn"
        size="small"
        type="primary"
        >搜索</van-button
      >
    </div>
    <van-divider>选择标签</van-divider>
    <van-tree-select
      v-model:main-active-index="activeIndex"
      :items="tagNameList"
      @click-item="treeClickItem"
    />
  </form>
</template>

<style lang="scss" scoped>
.active-placeholder {
  width: 100%;
  height: 105px;
  text-align: center;
  color: $text-secondary;
}

.selected-tag-row {
  padding: 20px;
}

.search-box {
  display: flex;
  justify-content: right;
  padding: 0 20px;

  .search-btn {
    width: 50px;
  }
}
</style>
