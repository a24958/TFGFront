<script setup lang="ts">
import Chart from "primevue/chart";
import { resultadosStore } from '@/stores/storeResultados';
import { storeToRefs } from 'pinia';
import { ref, onMounted, onBeforeMount, watch } from "vue"; 
const store = resultadosStore();

const userData = localStorage.getItem('userData');
const id = userData ? JSON.parse(userData).clase : null;

onBeforeMount(async () => {
    await store.getResultadoCursoById(id);
});

const { seatData: data2 } = storeToRefs(store);

const chartData = ref();
const chartOptions = ref();

const setChartData = () => {
    const documentStyle = getComputedStyle(document.documentElement);

    return {
        datasets: [
            {
                data: data2.value,  
                backgroundColor: [
                    documentStyle.getPropertyValue('--pink-500'),
                    documentStyle.getPropertyValue('--gray-500'),
                    documentStyle.getPropertyValue('--orange-500'),
                    documentStyle.getPropertyValue('--purple-500'),
                    documentStyle.getPropertyValue('--cyan-500'),
                    documentStyle.getPropertyValue('--yellow-500'),
                ],
                label: 'Partidas'
            }
        ],
        labels: ['1º Primaria', '2º Primaria', '3º Primaria', '4º Primaria', '5º Primaria', '6º Primaria']
    };
};

const setChartOptions = () => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    return {
        plugins: {
            legend: {
                labels: {
                    color: textColor
                }
            }
        },
        scales: {
            r: {
                grid: {
                    color: surfaceBorder
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
        <Chart v-if="chartData" type="polarArea" :data="chartData" :options="chartOptions" class="w-full md:w-90rem" />
    </div>
</template>

<style>
canvas {
    height: 500px;
    width: 500px;
}
</style>
