import {createSharedComposable} from "@vueuse/core";
import {ref} from "vue";

export const useLoading = createSharedComposable(() => {
    // 控制加载中显示
    const hasLoading = ref<boolean>(false);

    const openLoading = () => {
        hasLoading.value = true;
    }
    const closeLoading = () => {
        hasLoading.value = false;
    }

    return { hasLoading, openLoading, closeLoading }
})
