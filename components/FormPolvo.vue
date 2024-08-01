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
            // sendVercelTrack();
        }, randomTime);
    }

    const sendVercelTrack = (category, data) => {
        let options = [];

        Options.list.value.map((option) => {
            options.push(option.value);
        });

        vercelTrack(
          "Perguntas",
          {
            options: JSON.stringify(options),
            selectedOption: selectedOption.value,
          },
        );
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
                      maxlength="100"
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
            <p style="margin: 22px 0 52px 0;">Estou pensando...</p>
        </div>

        <div
            v-if="!!selectedOption && !loading"
            class="app-result"
        >
            <p>O polvo escolheu:</p>
            <p class="app-result-selectedOption">{{ selectedOption }}</p>
        </div>

        <button class="button" type="submit" :disabled="loading">
            {{ !!selectedOption ? "Tentar de novo" : "Perguntar" }}
        </button>
    </form>
  </div>
</template>

<style scoped>
@import '../assets/sass/FormPolvo.scss';
</style>