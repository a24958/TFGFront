<script setup lang="ts">
import { ref } from 'vue';
import { loginStore } from '@/stores/storeLogin';
import { useRouter } from 'vue-router';
import Button from 'primevue/button';
import FloatLabel from 'primevue/floatlabel';
import InputText from 'primevue/inputtext';
import Fieldset from 'primevue/fieldset';
import Password from 'primevue/password';

const store = loginStore();



const user = ref('');
const password = ref('');
const isError = ref(false);
const router = useRouter();

async function login() {
  const userLogin = user.value;
  const passwordLogin = password.value;

  try {
    const userReturned = await store.getUser(userLogin, passwordLogin);
    if (userReturned && userReturned.email === userLogin) {
      // Check user role and redirect accordingly
      if (userReturned.rol === 'Profesor') {
        await router.push('/teacher-intranet/crear-juegos');
      } else {
        if (userReturned.rol === 'Admin') {
          await router.push('/intranet');
        } else {
          await router.push('/usuario');
        }

      }
    } else {
      isError.value = true;
    }
  } catch (error) {
    isError.value = true;
  }
}
</script>

<template>
  <Fieldset>
    <section class="login-section">
      <h1>Login</h1>

      <div class="card flex justify-content-center">
        <FloatLabel>
          <InputText id="Correo" v-model="user" :invalid="isError" />
          <label for="Correo">Correo</label>
        </FloatLabel>
      </div>

      <div class="card flex justify-content-center">
        <FloatLabel>
          <Password v-model="password" inputId="Contraseña" :invalid="isError" :feedback="false" />
          <label for="Contraseña">Contraseña</label>
        </FloatLabel>
      </div>

      <div class="card flex justify-content-center">
        <Button label="Iniciar Session" @click="login()" style="width: 15rem;" />
      </div>

      <div class="card flex justify-content-center" style="margin-bottom: 24px;">
        <RouterLink to="/register">
          <Button label="Registrarse" outlined style="width: 15rem;" />
        </RouterLink>
      </div>
    </section>
  </Fieldset>
</template>

<style scoped>
h1 {
  color: #3385D9;
  font-size: 48px;
  margin-bottom: 0px;
}

.login-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 415px;
  width: 20rem;
}
</style>