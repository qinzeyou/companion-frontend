<script lang="ts" setup>
interface Props {
    title: string
}
defineProps<Props>()
const onClickLeft = () => history.back();
</script>

<template>
    <van-nav-bar
            :title="title"
            left-text="返回"
            left-arrow
            @click-left="onClickLeft"
    />
</template>

<style scoped>

</style>
