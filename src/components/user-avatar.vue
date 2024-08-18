<script lang="ts" setup>
interface Props {
    size: string;
    url: string;
}

const props = withDefaults(defineProps<Props>(), {
    size: '65px'
});

const avatarStyle = computed(() => {
    const sizeStyle = `width: ${props.size}; height: ${props.size}`
    return sizeStyle;
});
</script>

<template>
    <div class="avatar" :style="avatarStyle">
        <img :src="url" alt="avatar">
    </div>
</template>

<style scoped>
.avatar {
    border-radius: 50%;
    overflow: hidden;
    img {
        width: 100%;
        height: 100%;
    }
}
</style>
