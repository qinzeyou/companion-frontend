import { Directive, DirectiveBinding } from "vue";

/**
 * 触底加载
 */
export const loadMore: Directive = {
    mounted(el: HTMLElement, binding: DirectiveBinding) {
        const fn = binding.value;

        function handleScroll() {
            const scrollHeight = el.scrollHeight
            const offsetHeight = el.offsetHeight
            const scrollTop = el.scrollTop

            if (scrollHeight - offsetHeight - scrollTop === 0) {
                fn()
            }
        }
        // 监听滚动事件，调用 handleScroll
        el.addEventListener('scroll', handleScroll)
    }
}
