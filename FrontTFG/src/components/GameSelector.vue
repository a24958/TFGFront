<script setup lang="ts">

</script>

<template>
    <div class="selector">
        <select>
            <option value="opcion1">Pasapalabra</option>
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