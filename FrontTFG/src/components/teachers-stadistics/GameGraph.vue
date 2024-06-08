<script setup lang="ts">
import Chart from 'primevue/chart';
import { resultadosStore } from '@/stores/storeResultados';

import { storeToRefs } from 'pinia';

import { ref, onMounted, onBeforeMount, watch } from "vue"; 
const store = resultadosStore();

const userData = localStorage.getItem('userData');
const id = userData ? JSON.parse(userData).clase : null;

onBeforeMount(async () => {
    await store.getResultadoAsignaturaById(id);
});
const { seatData2: data2 } = storeToRefs(store);



const chartData = ref();
const chartOptions = ref();

const setChartData = () => {
    const documentStyle = getComputedStyle(document.body);

    return {
        labels: ['Lengua', 'Matemáticas', 'Conocimieto del medio', 'Inglés', 'Educación Artística'],
        datasets: [
            {
                data: data2.value,
                backgroundColor: [documentStyle.getPropertyValue('--red-500'), documentStyle.getPropertyValue('--blue-500'), documentStyle.getPropertyValue('--green-500'), documentStyle.getPropertyValue('--gray-500'), documentStyle.getPropertyValue('--orange-500')],
                hoverBackgroundColor: [documentStyle.getPropertyValue('--red-400'), documentStyle.getPropertyValue('--blue-400'), documentStyle.getPropertyValue('--green-400'), documentStyle.getPropertyValue('--gray-400'), documentStyle.getPropertyValue('--orange-400')]
            }
        ]
    };
};

const setChartOptions = () => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');

    return {
        plugins: {
            legend: {
                labels: {
                    cutout: '60%',
                    color: textColor
                }
            }
        }
    };
};

watch(data2, () => {
    if (data2.value && data2.value.length) {
        chartData.value = setChartData();
        chartOptions.value = setChartOptions();
    }
}, { immediate: true });

</script>

<template>
    <div class="card flex justify-content-center">
        <Chart type="doughnut" :data="chartData" :options="chartOptions" class="w-full md:w-30rem" />
    </div>
</template>

<style scoped></style>