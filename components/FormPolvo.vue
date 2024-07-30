<script setup>
    import { computed, ref } from 'vue';
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
            <div
                v-for="(option, index) in Options.list.value"
                class="app-option-container"
            >
                <p
                  v-if="index > 0"
                  style="margin-bottom: 8px;"
                >
                  vs.
                </p>
                <div class="app-option-input">
                  <input
                      type="text"
                      id="option.name"
                      v-model="option.value"
                      :placeholder="option.placeholder"
                      maxlength="50"
                      required
                  >

                  <button
                      v-if="index > 1 && index === Options.list.value.length - 1"
                      class="button--outline remove-option"
                      type="button"
                      @click="Options.removeOption(option)"
                  >
                      <i class="fa-solid fa-circle-xmark"></i>
                  </button>
                </div>
            </div>

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
            <p style="margin: 26px 0 52px 0;">Estou pensando...</p>
        </div>

        <div
            v-if="!!selectedOption && !loading"
            class="app-result"
        >
            <p>O polvo escolheu:</p>
            <input
                disabled
                type="text"
                v-model="selectedOption"
            >
        </div>

        <button class="button" type="submit" :disabled="loading">
            {{ !!selectedOption ? "Tentar de novo" : "Perguntar" }}
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

  .app-option-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .app-option-input {
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .app-result {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin-bottom: 20px;

    input {
        text-align: center;
        padding: 10px 0px;
        font-size: 24px;
        font-weight: bold;
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
    margin-bottom: 8px;
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

  .remove-option {
    font-size: 24px;
    margin-bottom: 8px;
  }
</style>