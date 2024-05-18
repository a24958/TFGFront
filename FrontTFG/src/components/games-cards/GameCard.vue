<script setup lang="ts">
import Card from 'primevue/card';
import Tag from 'primevue/tag';
import Button from 'primevue/button';
import Rating from 'primevue/rating';

const SUBJECT_LENGUA = "Lengua";
const SUBJECT_MATEMATICAS = "Matemáticas";
const SUBJECT_CONO = "Conocimiento del medio";
const SUBJECT_EDART = "Educación Artística";
const SUBJECT_INGLES = "Ingles";

const COURSE_1 = "1º Primaria";
const COURSE_2 = "2º Primaria";
const COURSE_3 = "3º Primaria";
const COURSE_4 = "4º Primaria";
const COURSE_5 = "5º Primaria";
const COURSE_6 = "6º Primaria";

const props = defineProps<{
    temaJuego: string,
    idAsignatura: number,
    idCurso: number,
    idTipoJuego: number,
}>();

const gameTypeText = "Pasapalabra"
const subjectTypeText = getSubjectTypeText();
const courseTypeText = getCourseTypeText();
const color = getSubjectTypeColor();

function getSubjectTypeText() {
    switch (props.idAsignatura) {
        case 1:
            return SUBJECT_LENGUA;
        case 2:
            return SUBJECT_MATEMATICAS;
        case 3:
            return SUBJECT_CONO;
        case 4:
            return SUBJECT_EDART;
        case 5:
            return SUBJECT_INGLES;
    }
}

function getSubjectTypeColor() {
    switch (props.idAsignatura) {
        case 1:
            return "danger";
        case 2:
            return "info";
        case 3:
            return "success";
        case 4:
            return "warning";
        case 5:
            return "secondary";
    }
}

function getCourseTypeText() {
    switch (props.idCurso) {
        case 1:
            return COURSE_1;
        case 2:
            return COURSE_2;
        case 3:
            return COURSE_3;
        case 4:
            return COURSE_4;
        case 5:
            return COURSE_5;
        case 6:
            return COURSE_6
    }
}

</script>

<template>
    <Card style="width: 25rem; overflow: hidden">
        <template #header>
            <img alt="user header" src="/src/assets/images/pasapalabra.jpg" style="height: 220px; width: 400px;" />
        </template>
        <template #title>
            <div class="title_tag">
                {{ gameTypeText }}
                <Tag :value="subjectTypeText" :severity="color"></Tag>
            </div>
        </template>
        <template #subtitle>{{ temaJuego }}</template>
        <template #footer>
            <div class="card_footer">
                <div class="flex gap-3 mt-1">
                    <RouterLink to="/pasapalabra/1"><Button label="Jugar" class="w-full" />
                    </RouterLink>
                </div>
                <Rating v-model="props.idCurso" readonly :cancel="false" :stars="6" class="custom-rating"></Rating>
            </div>
        </template>
    </Card>
    <br>
    <br>
</template>

<style scoped>
.custom-rating .p-rating .p-rating-icon {
    color: #ff9800;
    /* Cambia este color por el que prefieras */
}

.custom-rating .p-rating .p-rating-icon.p-rating-icon-filled {
    color: #ffeb3b;
    /* Cambia este color por el que prefieras */
}

.card_footer {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between
}

.title_tag {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
}
</style>