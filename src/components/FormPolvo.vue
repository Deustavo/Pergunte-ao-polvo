<script setup>
    import { ref } from 'vue';
    import OptionsModel from '../models/options';
    const Options = new OptionsModel();

    const selectedOption = ref('');
    const loading = ref(false);

    const submitForm = () => {
        loading.value = true;
        const randomTime = Math.floor(Math.random() * 1000) + 500;

        setTimeout(() => {
            loading.value = false;
            const randomIndex = Math.floor(Math.random() * Options.list.value.length);
            selectedOption.value = Options.list.value[randomIndex].value;
        }, randomTime);
    }
</script>

<template>
  <div class="app-form">
    <form @submit.prevent="submitForm">
        <div class="app-options">
            <input
                v-for="option in Options.list.value"
                type="text"
                id="option.name"
                v-model="option.value"
                :placeholder="option.placeholder"
                required
            >

            <button
                class="button--outline"
                type="button"
                @click="Options.addOption"
            >
                <i class="fa-solid fa-circle-plus"></i>
                Adicionar nova opção
            </button>
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
                style="text-align: center;"
            >
        </div>

        <button class="button" type="submit" :disabled="loading">
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
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 32px;
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
    width: 90%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-bottom: 12px;
  }

  .button {
    padding: 10px 40px;
    margin-bottom: 24px;
    background-color: #cf417c;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: all ease-in-out 300ms;
  }

  .button:hover {
    background-color: #c52266;
  }

  .button--outline {
    border: none;
    background-color: transparent;
    color: #cf417c;
    margin-top: 4px;
    cursor: pointer;
  }

  .button--outline:hover {
    color: #c52266;
  }
</style>