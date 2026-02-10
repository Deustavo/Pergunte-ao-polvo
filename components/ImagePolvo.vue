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
    import PolvoCarnaval1 from '@/assets/img/polvo-carnaval_1.png';

    /**
     * Não utilizado durante o natal
     */
    const selectRandomImage = computed(() => {
        let selectedImage = PolvoCarnaval1;

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

<style scoped lang="scss">
@import '@/assets/sass/ImagePolvo.scss';
</style>
