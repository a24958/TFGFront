import { defineStore } from "pinia";
import { ref, watch } from "vue";
import { useRoute } from "vue-router";

export const generalFunctionsStore = defineStore('generalFunctionsStrore', () => {
    function showHideNavBar() {
        var route = useRoute();
        const showHeader = ref(route.meta.showHeader !== false);


        watch(
            () => route.meta.showHeader,
            (newVal) => {
                showHeader.value = newVal !== false;
            }
        );

        return {
            showHeader,
        };
    }

    return { showHideNavBar }
})