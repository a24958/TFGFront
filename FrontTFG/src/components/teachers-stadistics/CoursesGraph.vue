<script setup lang="ts">
import Chart from "primevue/chart";
import { ref, onMounted } from "vue";

onMounted(() => {
    chartData.value = setChartData();
    chartOptions.value = setChartOptions();
});

const chartData = ref();
const chartOptions = ref();

const setChartData = () => {
    const documentStyle = getComputedStyle(document.documentElement);

    return {
        datasets: [
            {
                data: [11, 16, 7, 3, 14, 26],
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
}
</script>


<template>
    <div class="card flex justify-content-center">
        <Chart type="polarArea" :data="chartData" :options="chartOptions" class="w-full md:w-90rem" />
    </div>
</template>

<style>
canvas {
    height: 500px;
    width: 500px;
}
</style>
