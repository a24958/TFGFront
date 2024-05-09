<script setup lang="ts">
import { ref } from 'vue';
import { loginStore } from '@/stores/storeLogin';
import { useRouter } from 'vue-router';

const store = loginStore();

const user = ref('');
const password = ref('');
const errorMessage = ref('');
const router = useRouter();

async function login() {
    const userLogin = user.value;
    const passwordLogin = password.value;

    try {
        const userReturned = await store.getUser(userLogin, passwordLogin);
        if (userReturned && userReturned.email === userLogin) {
            // if (userReturned.rol === 'Admin') {
                // await router.push('/intranet');
            // } else {
                await router.push('/');
            // }
        } else {
            errorMessage.value = 'Usuario o contraseña incorrectos';
        }
    } catch (error) {
        errorMessage.value = 'Usuario o contraseña incorrectos';
    }
}
</script>

<template>
  <section class="login-section">
      <h1>Login</h1>
      <form class="login-formulario">
          <label for="email">Email</label>
          <input v-model="user" type="text" id="email" name="email" required>

          <label for="contraseña">Contraseña</label>
          <input v-model="password" type="password" id="contraseña" name="contraseña" required>

          <button id="primary" @click.prevent="login()">Login</button>
          <button id="secondary">
            <RouterLink to="/register">Register</RouterLink>
          </button>
      </form>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
  </section>
</template>

<style scoped>
.login-formulario #primary {
    padding: 8px;
    background-color: #3385D9;
    width: 350px;
    color: white;
    font-size: 16px;
    border-radius: 8px;
    border-width: 1px;
    border-style: solid;
    border-color: #3385D9;
    margin-top: 12px;
    margin-bottom: 48px;
}

.login-formulario #primary a {
  text-decoration: none;
  color: white;
}

.login-formulario #secondary {
  padding: 8px;
  width: 350px;
  background-color: white;
  color: #3385D9;
  font-size: 16px;
  border-radius: 8px;
  border-width: 1px;
  border-style: solid;
  border-color: #3385D9;
  margin-top: 12px;
  margin-bottom: 48px;
}

.login-formulario #secondary a {
  text-decoration: none;
  color: #3385D9;
}

.login-formulario {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 320px;
  height: 320px;
  border-color: #EBEBEB;
  border-style: solid;
  border-radius: 12px;
}
.login-formulario label, .login-formulario input {
  margin-top: 12px;
  display: flex;
  flex-direction: row;
  align-items: start;
  width: 280px;
}
.login-formulario input {
  border-radius: 8px;
  border-style: solid;
  border-color: #EBEBEB;
  padding: 8px;
}
.login-formulario input:focus {
  border: 1px solid #3385D9;
}
.login-formulario #primary {
  width: 300px;
  margin-top: 32px;
  margin-bottom: 24px;
}
.login-formulario #secondary {
  width: 300px;
  margin-top: 0px;
  margin-bottom: 24px;
}
.login-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 300px;
}
.login-section h1 {
  color: #3385D9;
  font-size: 48px;
}

@media screen and (min-width: 800px) {
  .login-section{
    margin-bottom: 325px;
  }
}
</style>