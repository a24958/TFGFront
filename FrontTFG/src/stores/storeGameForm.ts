import { defineStore } from "pinia";
import { type Ref } from 'vue'

export const gameFormStore = defineStore('gameFormFunctions', () => {
    function load(loading: Ref<boolean>) {
        loading.value = true;

        setTimeout(() => {
            loading.value = false;
        }, 2000);
    };

    return { load }
})