<!--
    Creditos do movimento dos olhos
    https://stackoverflow.com/questions/74828232/make-eyes-follow-cursor-in-this-svg
-->
<template>
    <div class="polvo-eyes">
        <svg id="svg1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 50">
            <circle cx="76" cy="25" r="20" fill="white" stroke="" />
            <circle cx="123" cy="25" r="20" fill="white" stroke="" />
            <line marker-start="url(#pupil)" id="l1" x1="76" y1="25" stroke="" />
            <line marker-start="url(#pupil)" id="l2" x1="123" y1="25" stroke="" />
            <defs>
                <marker
                    id="pupil"
                    viewBox="0 0 10 10"
                    refX="16"
                    refY="5"
                    markerWidth="10"
                    markerHeight="10"
                    orient="auto-start-reverse"
                >
                    <rect width="10" height="10" fill="none" stroke=""/>
                    <circle fill="black" stroke="black" r="4" cy="5" cx="5" />
                </marker>
            </defs>
        </svg>
    </div>
</template>

<script setup>
    onMounted(() => {
        let l1 = document.querySelector("#l1");
        let l2 = document.querySelector("#l2");
        let svg1 = document.querySelector("#svg1");

        const toSVGPoint = (svg, x, y) => {
            let p = new DOMPoint(x, y);
            return p.matrixTransform(svg.getScreenCTM().inverse());
        };

        document.addEventListener('mousemove', e => {
            let p = toSVGPoint(svg1, e.clientX, e.clientY);
            l1.setAttribute('x2', p.x);
            l1.setAttribute('y2', p.y);
            l2.setAttribute('x2', p.x);
            l2.setAttribute('y2', p.y);
        });
    });
</script>
  
<style scoped lang="scss">
@import '@/assets/sass/PolvoEyes.scss';
</style>