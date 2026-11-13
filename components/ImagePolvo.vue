<script setup>
    import { computed, watchEffect } from 'vue';
    import { useSeasonalTheme, grinchVariantActive } from '@/composables/useSeasonalTheme';

    // Imagens em public/img (fora do bundle) para o Nuxt não gerar prefetch de todas
    const Polvo = '/img/polvo.webp';
    const PolvoDefault = '/img/polvo-default.webp';
    const PolvoBruxa = '/img/polvo-bruxa.webp';
    const PolvoCowboy = '/img/polvo-cowboy.webp';
    const PolvoMarinheiro = '/img/polvo-marinheiro.webp';
    const PolvoNerd = '/img/polvo-nerd.webp';
    const PolvoNiver = '/img/polvo-niver.webp';
    const PolvoPirata = '/img/polvo-pirata.webp';
    const PolvoRealista = '/img/polvo-realista.webp';
    const PolvoNoel = '/img/polvo-noel.webp';
    const PolvoFred = '/img/polvo-fred.webp';
    const PolvoAbobora = '/img/polvo-abobora.webp';
    const PolvoFrank = '/img/polvo-frank.webp';
    const PolvoCarnaval1 = '/img/polvo-carnaval_1.webp';

    const PolvoFantasma = '/img/polvo-fantasma.webp';
    const PolvoGrinch = '/img/polvo-grinch.webp';
    const PolvoRena = '/img/polvo-rena.webp';
    const PolvoGelo = '/img/polvo-gelo.webp';
    const PolvoLuzes = '/img/polvo-luzes.webp';
    const PolvoCoelho = '/img/polvo-coelho.webp';

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
                decoding="async"
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
