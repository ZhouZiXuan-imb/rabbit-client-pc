import XtxSkeleton from "@/components/library/XtxSkeleton/XtxSkeleton.vue";
import XtxCarousel from "@/components/library/XtxCarousel/XtxCarousel.vue";
import XtxMore from "@/components/library/XtxMore/XtxMore.vue";
import lazy from "@/components/directive/lazy.ts"

export default {
    install (app:any) {
        app.component(XtxSkeleton.name, XtxSkeleton)
        app.component(XtxCarousel.name, XtxCarousel)
        app.component(XtxMore.name, XtxMore)

        app.directive('lazy', lazy)
    }
}