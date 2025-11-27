<script setup lang="ts">
    import { computed, ref } from 'vue'; 

    import PolvoNoel from '@/assets/img/polvo-noel.png';
    import PolvoGrinch from '@/assets/img/polvo-grinch.png';
    import PolvoRena from '@/assets/img/polvo-rena.png';
    import PolvoRealista from '@/assets/img/polvo-realista.png';

    const images = [
        PolvoGrinch,
        PolvoNoel,
        PolvoRena,
        PolvoRealista,
    ];

    /**
     * Selects a random image from available options
     */
    const selectRandomImage = () => {
        const randomIndex = Math.floor(Math.random() * images.length);
        return images[randomIndex];
    };

    const selectedImage = ref(selectRandomImage());

    const isGrinch = computed(() => {
        return selectedImage.value === PolvoGrinch;
    }); 
</script>

<template>
    <header class="app-header">
        <ClientOnly>
            <div class="polvo-bg">
                <img
                    class="polvo-img"
                    :src="selectedImage"
                    alt="Polvo"
                />
                <PolvoEyes />
            </div>

            <template #fallback>
                <div class="polvo-bg"></div>
            </template>
        </ClientOnly>

        <ClientOnly>
            <div v-if="isGrinch" class="grinch-text">
                <h1>Pergunte ao Grinch!</h1>
                <p class="app-header-description">Coloque abaixo as opções e o grinch decidirá por você:</p>
            </div>
            <div v-else>
                <h1>Pergunte ao Polvo!</h1>
                <p class="app-header-description">Coloque abaixo as opções e o polvo decidirá por você:</p>
            </div>

            <template #fallback>
                <div class="transparent-text">
                    <h1>Pergunte ao Polvo!</h1>
                    <p class="app-header-description">Coloque abaixo as opções e o polvo decidirá por você:</p>
                </div>
            </template>
        </ClientOnly>
    </header>
</template>

<style scoped lang="scss">
    .polvo-bg {
        position: relative;
        width: 480px;
        height: 285px;
    }

    .polvo-img {
        margin: 0 0 0 12px;
        width: 100%;
        position: absolute;
        bottom: 0;
        z-index: 2;
    }

    .grinch-text {
        h1,
        .app-header-description {
            color: #267129;
        }
    }

    .transparent-text {
        h1,
        .app-header-description {
            color: transparent;
        }
    }

    @media only screen and (max-width: 768px) {
        .polvo-bg {
            width: 90vw;
            height: 53vw;
        }

        .polvo-img {
            margin: 0 0 0 10px;
        }
    }
</style>
