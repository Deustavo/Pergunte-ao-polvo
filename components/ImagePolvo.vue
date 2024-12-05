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

    const selectRandomImage = computed(() => {
        const images = [
            PolvoDefault,
            PolvoBruxa,
            PolvoCowboy,
            PolvoMarinheiro,
            PolvoNerd,
            PolvoNiver,
            PolvoPirata,
            PolvoRealista,
        ];

        const tenPercentChance = Math.random() < 0.2;
        if (tenPercentChance) {
            const indexImage = Math.floor(Math.random() * images.length);
            return images[indexImage];
        } else {
            return Polvo;
        }
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
        margin: 0 0 0 16px;
        width: 100%;
        position: absolute;
        bottom: 0;
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
