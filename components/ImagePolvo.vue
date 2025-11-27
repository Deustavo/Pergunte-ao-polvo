<script setup>
    import { computed } from 'vue'; 

    import PolvoNoel from '@/assets/img/polvo-noel.png';
    import PolvoGrinch from '@/assets/img/polvo-grinch.png';
    import PolvoRena from '@/assets/img/polvo-rena.png';
    import PolvoRealista from '@/assets/img/polvo-realista.png';

    /**
     * Não utilizado durante o natal
     */
    const selectRandomImage = computed(() => {
        let selectedImage = PolvoNoel;

        const images = [
            PolvoGrinch,
            PolvoNoel,
            PolvoRena,
            PolvoRealista,
        ];

        const indexImage = Math.floor(Math.random() * images.length);
        selectedImage =  images[indexImage];

        return selectedImage;
    });
</script>

<template>
    <header class="app-header">
        <div class="polvo-bg">
            <img
                class="polvo-img"
                :src="selectRandomImage"
                alt="Polvo"
            />
            <PolvoEyes />
        </div>

        <h1>Pergunte ao Polvo!</h1>
        <p class="app-header-description">Coloque abaixo as opções e o polvo decidirá por você:</p>
    </header>
</template>

<style scoped>
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
