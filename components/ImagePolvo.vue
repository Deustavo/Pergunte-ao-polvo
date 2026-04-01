<script setup>
import Cage from '@/assets/img/cage.png';
import Polvo from '@/assets/img/polvo-default.png';

const SHAKE_MS = 480;

const cageClicks = ref(0);
const cageShaking = ref(false);
let shakeTimer = null;

const onCagePhotoClick = () => {
  if (cageClicks.value >= 3) {
    return;
  }
  cageClicks.value += 1;
  cageShaking.value = true;
  if (shakeTimer) {
    clearTimeout(shakeTimer);
  }
  shakeTimer = setTimeout(() => {
    cageShaking.value = false;
    shakeTimer = null;
  }, SHAKE_MS);
};

onUnmounted(() => {
  if (shakeTimer) {
    clearTimeout(shakeTimer);
  }
});
</script>

<template>
  <div class="polvo-bg">
    <img class="polvo-behind" :src="Polvo" alt="" />
    <button
      type="button"
      class="polvo-cage-hit"
      aria-label="Foto do Nicolas Cage — clique para uma surpresa"
      :class="{
        'polvo-cage-hit--press1': cageClicks === 1,
        'polvo-cage-hit--press2': cageClicks === 2,
        'polvo-cage-hit--fallen': cageClicks >= 3,
        'polvo-cage-hit--shake': cageShaking && cageClicks < 3,
      }"
      @click="onCagePhotoClick"
    >
      <img
        class="polvo-img"
        :src="Cage"
        alt="Nicolas Cage"
      />
    </button>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/sass/ImagePolvo.scss';
</style>
