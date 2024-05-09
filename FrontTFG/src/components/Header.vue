<script setup lang="ts">

</script>

<template>
    <header>
        <RouterLink to="/">HOME</RouterLink>
        <RouterLink to="/login" id="responsive-item">O</RouterLink>
        <RouterLink to="/login" id="no-responsive-item">Login</RouterLink>
    </header>
</template>

<style scoped>
header {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 8px;
    margin-left: 8px;
    margin-right: 8px;
}

a {
    text-decoration: none;
}

#responsive-item {
    display: flex;
}

#no-responsive-item {
    display: none;
}

@media screen and (min-width: 800px) {

    #responsive-item {
        display: none;
    }

    #no-responsive-item {
        display: flex;
    }
}
</style>