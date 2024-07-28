<script setup>
    import { ref } from 'vue';

    const option1 = ref('');
    const option2 = ref('');
    const selectedOption = ref('');
    const loading = ref(false);

    const submitForm = () => {
        loading.value = true;
        const randomTime = Math.floor(Math.random() * 1000) + 500;

        setTimeout(() => {
            loading.value = false;
            const random = Math.floor(Math.random() * 2);
            selectedOption.value = random === 0 ? option1.value : option2.value;
        }, randomTime);
    }
</script>

<template>
  <div class="app-form">
    <form @submit.prevent="submitForm">
        <div class="app-options">
            <input
                type="text"
                id="option1"
                v-model="option1"
                placeholder="Primeira opção"
                required
            >
            <p>vs.</p>
            <input
                type="text"
                id="option2"
                v-model="option2"
                placeholder="Segunda opção"
                required
            >
        </div>

        <div v-if="loading">
            <p style="margin: 20px 0 48px 0;">Estou pensando...</p>
        </div>

        <div
            v-if="!!selectedOption && !loading"
            class="app-result"
        >
            <b>O polvo disse:</b>
            <input
                disabled
                type="text"
                v-model="selectedOption"
            >
        </div>

        <button type="submit">
            {{ !!selectedOption ? "Tentar de novo" : "Adivinhar" }}
        </button>
    </form>
  </div>
</template>

<style scoped>
  .app-form {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 400px;
  }

  .app-options {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
    width: 100%;

    p {
        margin: 0 10px;
    }
  }

  .app-result {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 94%;
    margin-bottom: 20px;

    b {
        margin-bottom: 10px;
    }
  }

  label {
    font-size: 1.2em;
    margin-bottom: 10px;
  }

  input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }

  button {
    padding: 10px 40px;
    background-color: #cf417c;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }

  button:hover {
    background-color: #c52266;
  }

  @media screen and (min-width: 768px) {
    form {
        width: 50%;
    }
  }
</style>