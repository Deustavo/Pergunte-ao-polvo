<script setup>
    import { computed } from 'vue'; 

    import Polvo from '@/assets/img/polvo.png';
    import PolvoDefault from '@/assets/img/polvo-default.png';
    import PolvoBruxa from '@/assets/img/polvo-bruxa.png';
    import PolvoCowboy from '@/assets/img/polvo-cowboy.png';
    import PolvoMarinheiro from '@/assets/img/polvo-marinheiro.png';
    import PolvoNerd from '@/assets/img/polvo-nerd.png';
    import PolvoNiver from '@/assets/img/polvo-niver.png';
    import PolvoPirata from '@/assets/img/polvo-pirata.png';
    import PolvoRealista from '@/assets/img/polvo-realista.png';
    import PolvoNoel from '@/assets/img/polvo-noel.png';
    import PolvoFred from '@/assets/img/polvo-fred.png';
    import PolvoAbobora from '@/assets/img/polvo-abobora.png';
    import PolvoFrank from '@/assets/img/polvo-frank.png';

    /**
     * Não utilizado durante o natal
     */
    const selectRandomImage = computed(() => {
        let selectedImage = Polvo;

        const images = [
            PolvoDefault,
            PolvoBruxa,
            PolvoCowboy,
            PolvoMarinheiro,
            PolvoNerd,
            PolvoNiver,
            PolvoPirata,
            PolvoRealista,
            PolvoNoel,
            PolvoFred,
            PolvoAbobora,
            PolvoFrank,
        ];

        if (Math.random() < 0.4) {
            const indexImage = Math.floor(Math.random() * images.length);
            selectedImage =  images[indexImage];
        }

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
