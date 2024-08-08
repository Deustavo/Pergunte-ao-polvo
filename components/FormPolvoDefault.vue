<script setup>
    import { ref, onMounted } from 'vue';

    const option1 = ref('');
    const option2 = ref('');
    const selectedOption = ref('');
    const loading = ref(false);

    const submitForm = () => {
        loading.value = true;
        const randomTime = Math.floor(Math.random() * 1000) + 500;

        setTimeout(() => {
            loading.value = false;
            selectedOption.value = Math.random() < 0.5 ? option1.value : option2.value;
        }, randomTime);
    }
</script>

<template>
  <div class="app-form">
    <form @submit.prevent="submitForm">

        <!-- Exibe quando não há resposta selecionada -->
        <div class="app-options" v-show="!selectedOption">
            <div class="app-option-container">
                <div class="app-option-input">
                  <input
                      type="text"
                      id="option1"
                      v-model="option1"
                      placeholder="Opção 1"
                      maxlength="100"
                      required
                  >
                </div>
                <p>vs.</p>
                <div class="app-option-input">
                    <input
                      type="text"
                      id="option2"
                      v-model="option2"
                      placeholder="Opção 2"
                      maxlength="100"
                      required
                    >
                </div>
            </div>

            <button class="button" type="submit" :disabled="loading">
                Adivinhar
            </button>

            <div v-if="loading">
                <p style="margin: 22px 0 52px 0;">Estou pensando...</p>
            </div>
        </div>

        <!-- Exibe quando há resposta selecionada -->
        <div
            v-if="!!selectedOption && !loading"
            class="app-result"
        >
            <div class="app-result-selectedOption">
                <b>{{ option1 }}</b> vs. <b>{{ option2 }}</b>
            </div>

            <p>O polvo disse:</p>
            
            <div class="app-result-selectedOption">
                <b style="width: 100%;">{{ selectedOption }}</b>
            </div>

            <button
                class="button"
                type="button"
                @click="selectedOption = ''"
            >
                Tentar de novo
            </button>
        </div>

    </form>
  </div>
</template>

<style scoped>
@import '../assets/sass/FormPolvoDefault.scss';
</style>