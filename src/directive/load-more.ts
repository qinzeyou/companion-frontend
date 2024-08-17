export default {
    mounted(el: HTMLElement, binding:any) {
        const fn = binding.value

        function handleScroll() {
            const scrollHeight = el.scrollHeight
            const offsetHeight = el.offsetHeight
            const scrollTop = el.scrollTop

            if (scrollHeight - offsetHeight - scrollTop === 0) {
                console.log(scrollHeight, offsetHeight, scrollTop)
                fn()
            }
        }
        // 监听滚动事件，调用 handleScroll
        el.addEventListener('scroll', handleScroll)
    }
}
