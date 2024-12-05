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

            <div style="margin: 40px 0px; width: 100%;">
                <button class="button" type="submit" :disabled="loading">
                    Perguntar
                </button>
            </div>

            <div v-if="loading">
                <p style="margin: 22px 0 52px 0;">Estou pensando...</p>
            </div>
        </div>

        <!-- Exibe quando há resposta selecionada -->
        <div
            v-if="!!selectedOption"
            class="app-result"
        >
            <div class="app-result-selectedOption">
                <b>{{ option1 }}</b> vs. <b>{{ option2 }}</b>
            </div>

            <p>O polvo escolheu:</p>
            
            <div class="app-result-selectedOption">
                <div v-if="loading">
                    <p style="margin: 0;">Estou pensando...</p>
                </div>
                <b style="width: 100%;" v-else>{{ selectedOption }}</b>
            </div>

            <div style="margin: 40px 0px; width: 100%">
                <button class="button button--outline" type="submit" :disabled="loading">
                    Perguntar novamente
                </button>

                <button
                    class="button"
                    type="button"
                    @click="() => {
                        selectedOption = '';
                        option1 = '';
                        option2 = '';
                    }"
                    :disabled="loading"
                >
                    Fazer outra pergunta
                </button>
            </div>
        </div>

    </form>
  </div>
</template>

<style scoped>
@import '../assets/sass/FormPolvoDefault.scss';
</style>