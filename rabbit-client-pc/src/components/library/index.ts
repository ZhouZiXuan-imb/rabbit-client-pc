import XtxSkeleton from "@/components/library/XtxSkeleton.vue";
import XtxCarousel from "@/components/library/XtxCarousel/XtxCarousel.vue";

export default {
    install (app:any) {
        app.component(XtxSkeleton.name, XtxSkeleton)
        app.component(XtxCarousel.name, XtxCarousel)
    }
}