<template>
    <div style="position: relative;">
        <img
            class="polvo-img"
            src="@/assets/img/polvo2.png"
            alt="Polvo"
        />
        <PolvoEyes />
    </div>
</template>

<style scoped>
    .polvo-img {
        margin: 0 0 0 28px;
        width: 480px;
    }

    @media only screen and (max-width: 768px) {
        .polvo-img {
            width: 90vw;
        }
    }
</style>
