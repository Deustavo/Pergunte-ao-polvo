<script setup>
    import { computed, watchEffect } from 'vue';
    import { useSeasonalTheme, grinchVariantActive } from '@/composables/useSeasonalTheme';

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

    import PolvoFantasma from '@/assets/img/polvo-fantasma.png';
    import PolvoGrinch from '@/assets/img/polvo-grinch.png';
    import PolvoRena from '@/assets/img/polvo-rena.png';
    import PolvoGelo from '@/assets/img/polvo-gelo.png';
    import PolvoLuzes from '@/assets/img/polvo-luzes.png';
    import PolvoCoelho from '@/assets/img/polvo-coelho.png';

    const { activeTheme } = useSeasonalTheme();

    const defaultPool = [
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
        PolvoCarnaval1,
    ];

    const halloweenPool = [PolvoBruxa, PolvoRealista, PolvoFred, PolvoAbobora, PolvoFrank, PolvoFantasma];
    const natalPool = [PolvoNoel, PolvoGrinch, PolvoRena, PolvoRealista, PolvoGelo, PolvoLuzes];

    const pickRandom = (images) => images[Math.floor(Math.random() * images.length)];

    const selectedImage = computed(() => {
        if (activeTheme.value === 'halloween') return pickRandom(halloweenPool);
        if (activeTheme.value === 'natal') return pickRandom(natalPool);
        if (activeTheme.value === 'pascoa') return PolvoCoelho;
        if (activeTheme.value === 'carnaval') return PolvoCarnaval1;

        if (Math.random() < 0.4) return pickRandom(defaultPool);
        return Polvo;
    });

    watchEffect(() => {
        grinchVariantActive.value = activeTheme.value === 'natal' && selectedImage.value === PolvoGrinch;
    });
</script>

<template>
    <CagePrank v-if="activeTheme === 'primeiro-de-abril'" />
    <ClientOnly v-else>
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
</template>

<style scoped lang="scss">
@import '@/assets/sass/ImagePolvo.scss';
</style>
