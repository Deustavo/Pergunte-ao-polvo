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
@use "sass:math";

 ::-webkit-scrollbar {
    width: 0em;
    height: 0em;
 }

.footerSnow {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100vw;
}

html, body {
  margin: 0;
  height: 100vh;
  position: relative;
  // overflow: hidden;
  // background: #3d437a !important;
  color: white;
}

.snowflake {
  --size: 1vw;
  width: var(--size);
  height: var(--size);
  background: white;
  border-radius: 50%;
  position: absolute;
  top: -5vh;
}

@keyframes snowfall {
  0% {
    transform: translate3d(var(--left-ini), 0, 0);
  }
  100% {
    transform: translate3d(var(--left-end), 110vh, 0);
  }
}

@for $i from 1 through 50 {
  .snowflake:nth-child(#{$i}) {
    --size: #{math.random(5) * 0.2}vw;
    --left-ini: #{math.random(20) - 10}vw;
    --left-end: #{math.random(20) - 10}vw;
    left: #{math.random(100)}vw;
    animation: snowfall #{5 + math.random(10)}s linear infinite;
    animation-delay: -#{math.random(10)}s;
  }
}

/* added small blur every 6 snowflakes*/
.snowflake:nth-child(6n) {
  filter: blur(1px);
}



/***/

#youtube {
  z-index: 2;
  display: block;
  width: 100px;
  height: 70px;
  position: absolute;
  bottom: 20px;
  right: 20px;
  background: red;
  border-radius: 50% / 11%;
  transition: transform 0.5s;
}

#youtube:hover,
#youtube:focus {
  transform: scale(1.1);
}

#youtube::before {
  content: "";
  display: block;
  position: absolute;
  top: 7.5%;
  left: -6%;
  width: 112%;
  height: 85%;
  background: red;
  border-radius: 9% / 50%;
}

#youtube::after {
  content: "";
  display: block;
  position: absolute;
  top: 20px;
  left: 40px;
  width: 45px;
  height: 30px;
  border: 15px solid transparent;
  box-sizing: border-box;
  border-left: 30px solid white;
}

#youtube span {
  font-size: 0;
  position: absolute;
  width: 0;
  height: 0;
  overflow: hidden;
}
</style>