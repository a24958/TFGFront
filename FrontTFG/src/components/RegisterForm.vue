<script setup lang="ts">
import { loginStore } from '@/stores/storeLogin';
import router from '@/router';
import { ref } from 'vue';
import { RouterLink } from 'vue-router'
import Button from 'primevue/button';
import FloatLabel from 'primevue/floatlabel';
import InputText from 'primevue/inputtext';
import Fieldset from 'primevue/fieldset';
import Password from 'primevue/password';

const store = loginStore();

const user = ref('');
const email = ref('')
const password = ref('');
const isError = ref(false);

async function register() {
  const userRegister = user.value
  const emailRegister = email.value
  const passwordRegister = password.value

  try {
    if (!user.value || !email.value || !password.value) {
      isError.value = true;
      return;
    }

    const userReturned = await store.postUser(userRegister, emailRegister, passwordRegister);
    if (userReturned) {
      await router.push('/');
    } else {
      isError.value = true;
      return;
    }

  } catch (error) {
    isError.value = true;
  }
};

</script>

<template>
  <Fieldset>
    <section class="register-section">
      <h1>Register</h1>

      <div class="card flex justify-content-center">
        <FloatLabel>
          <InputText id="Nombre" v-model="user" :invalid="isError" style="width: 17rem;" />
          <label for="Nombre">Nombre</label>
        </FloatLabel>
      </div>

      <div class="card flex justify-content-center">
        <FloatLabel>
          <InputText id="Correo" v-model="email" :invalid="isError" style="width: 17rem;" />
          <label for="Correo">Correo</label>
        </FloatLabel>
      </div>

      <div class="card flex justify-content-center">
        <Password v-model="password" toggleMask :invalid="isError" />
      </div>

      <div class="card flex justify-content-center" style="margin-bottom: 24px;">
        <Button label="Registrarse" outlined style="width: 17rem;" @click.prevent="register" />
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

.register-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 415px;
  width: 20rem;
}
</style>