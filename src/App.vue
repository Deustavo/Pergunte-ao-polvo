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
    <p class="app-header-description">Se precisar fazer uma escolha dificil, pergunte ao polvo!<br>Ele saberá a resposta.</p>
  </div>
  <AppFormPolvo />
  <footer>
    <p>Desenvolvido por <a href="https://github.com/Deustavo">@Deustavo</a></p>
    <p>♡ Dedicado a minha namorada ♡</p>
  </footer>
</template>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400&display=swap');

  body {
    background-color: rgb(255, 255, 255);
    width: 96vw;
    margin: 48px 2vw;

    font-family: "Roboto", sans-serif;
    font-weight: 300;
    font-style: normal;
    overflow-x: hidden;
  }

  h1 {
    color: #000;
    font-size: 2em;
    text-align: center;
    margin-bottom: 0;
  }

  .app-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }

  .app-header-description {
    margin: 8px 0px;
    text-align: center;
  }

  footer {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 64px;

    p {
      margin: 4px;
      font-size: 14px;
    }
  }
</style>
