<script setup lang="ts">

</script>

<template>
    <div class="selector">
        <select>
            <option value="opcion1">Curso 1</option>
            <option value="opcion2">Curso 2</option>
            <option value="opcion3">Curso 3</option>
            <option value="opcion4">Curso 4</option>
            <option value="opcion4">Curso 5</option>
            <option value="opcion4">Curso 6</option>
        </select>
    </div>
</template>

<style scoped>
.selector select {
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px;
    outline: none;
}

.selector select:focus {
    border-color: #007bff;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
}
</style>