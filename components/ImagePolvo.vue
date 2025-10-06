<script setup>
    import { computed } from 'vue'; 

    import Polvo from '@/assets/img/polvo.png';
    import PolvoBruxa from '@/assets/img/polvo-bruxa.png';
    import PolvoRealista from '@/assets/img/polvo-realista.png';
    import PolvoFred from '@/assets/img/polvo-fred.png';
    import PolvoAbobora from '@/assets/img/polvo-abobora.png';
    import PolvoFrank from '@/assets/img/polvo-frank.png';
    import PolvoFantasma from '@/assets/img/polvo-fantasma.png';

    /**
     * Não utilizado durante o natal
     */
    const selectRandomImage = computed(() => {
        let selectedImage = Polvo;

        const images = [
            PolvoBruxa,
            PolvoRealista,
            PolvoFred,
            PolvoAbobora,
            PolvoFrank,
            PolvoFantasma,
        ];
        
        const indexImage = Math.floor(Math.random() * images.length);
        selectedImage =  images[indexImage];

        return selectedImage;
    });
</script>

<template>
    <div class="polvo-bg">
        <img
            class="polvo-img"
            :src="selectRandomImage"
            alt="Polvo"
        />
        <PolvoEyes />
    </div>
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
