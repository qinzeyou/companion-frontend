import {Directive, DirectiveBinding} from "vue";

export const lazyImg: Directive = {
    async mounted(el: HTMLImageElement, binding: DirectiveBinding) {
        const url:any = await import('@/assets/images/default.jpg');
        el.src = url;

        let observer = new IntersectionObserver((entries) => {
            console.log(entries[0], el)
            if (entries[0].intersectionRatio > 0 && entries[0].isIntersecting) {
                setTimeout(() => {
                    el.src = binding.value;
                    observer.unobserve(el)
                }, 2000)
            }
        })
        observer.observe(el);
    }
}
