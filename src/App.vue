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
    width: 100vw;
    margin: 40px 0px 80px 0px ;

    font-family: "Roboto", sans-serif;
    font-weight: 300;
    font-style: normal;
  }

  h1 {
    color: #000;
    font-size: 2em;
    text-align: center;
  }
</style>
