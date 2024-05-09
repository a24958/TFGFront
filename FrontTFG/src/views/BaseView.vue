<script setup lang="ts">
import Header from '@/components/Header.vue';
import { generalFunctionsStore } from '@/stores/storeGeneralFunctions';
import { ref } from 'vue';


const generalFunctions = generalFunctionsStore();
const showValue = ref(generalFunctions.showHideNavBar());
</script>

<template>
    <Header v-if="showValue.showHeader"></Header>
    <RouterView></RouterView>
    <!-- <Footer v-if="showValue.showHeader"></Footer> -->
</template>

<style scoped></style>