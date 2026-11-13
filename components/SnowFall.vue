<template>
    <div
        class="snowflake"
        v-for="i in 50"
        :key="i"
    ></div>
    <img
      class="footerSnow"
      src="/img/footerSnow.webp"
    />
</template>

<style scoped lang="scss">
@import '@/assets/sass/SnowFall.scss';
</style>