<script setup lang="ts">
import Card from 'primevue/card';
import Tag from 'primevue/tag';
import Button from 'primevue/button';

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
            return "Danger";
        case 2:
            return "Info";
        case 3:
            return "Success";
        case 4:
            return "Warning";
        case 5:
            return "Secondary";
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
        <template #content>
            <p class="m-0">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae
                numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis
                esse, cupiditate neque
                quas!
            </p>
        </template>
        <template #footer>
            <div class="flex gap-3 mt-1">
                <RouterLink to="/pasapalabra/1"><Button label="Jugar" class="w-full" @click="" /></RouterLink>
            </div>
        </template>
    </Card>
    <br>
    <br>
</template>

<style scoped>
.title_tag {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
}
</style>