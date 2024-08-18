import {Directive, DirectiveBinding} from "vue";

/**
 * 图片懒加载
 */
export const lazyImg: Directive = {
    async mounted(el: HTMLImageElement, binding: DirectiveBinding) {
        // 设置默认展示图片
        const url = await import("../assets/images/default.jpg");
        el.src = url.default;
        // 元素进入可视区域才渲染图片
        let observer = new IntersectionObserver((entries) => {
            if (entries[0].intersectionRatio > 0 && entries[0].isIntersecting) {
                setTimeout(() => {
                    // 设置真正需要渲染的图片
                    el.src = binding.value;
                    // 取消监视
                    observer.unobserve(el)
                }, 2000)
            }
        })
        // 监视元素
        observer.observe(el);
    }
}
