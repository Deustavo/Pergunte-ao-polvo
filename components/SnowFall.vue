<template>
    <div
        class="snowflake"
        v-for="i in 50"
        :key="i"
    ></div>
    <img
      class="footerSnow"
      src="../assets/img/footerSnow.png"
    />
</template>

<style lang="scss">
@import '@/assets/sass/SnowFall.scss';
</style>