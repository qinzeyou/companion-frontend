<script lang="ts" setup>
import useSystemStore from "@/stores/module/system-store.ts";

const activeNames = ref(["1"]);
const { noticeList } = toRefs(useSystemStore());
const { getNoticeData } = useSystemStore();
getNoticeData({ pageNum: 1, pageSize: 10 });
</script>

<template>
  <van-collapse v-model="activeNames">
    <van-collapse-item
      v-for="notice in noticeList"
      :title="notice!.title"
      :name="notice!.id"
    >
      {{ notice.content }}
    </van-collapse-item>
  </van-collapse>
</template>

<style scoped></style>
