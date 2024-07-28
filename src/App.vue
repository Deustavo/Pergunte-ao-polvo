<script>
import PolvoImg from './components/polvo.vue';
import AppFormPolvo from './components/FormPolvo.vue';

export default {
  name: 'App',
  components: {
    PolvoImg,
    AppFormPolvo
  },
};
</script>

<template>
  <div class="app-header">
    <PolvoImg />
    <h1>Pergunte ao Polvo!</h1>
  </div>
  <AppFormPolvo />
</template>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400&display=swap');

  body {
    background-color: rgb(255, 255, 255);
    width: 96vw;
    margin: 40px 2vw 80px 2vw;

    font-family: "Roboto", sans-serif;
    font-weight: 300;
    font-style: normal;
    overflow-x: hidden;
  }

  h1 {
    color: #000;
    font-size: 2em;
    text-align: center;
  }

  .app-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
</style>
