<template>
  <div id="cursor"></div>
  <div id="loadingScreen">
    <div id="circleBack">
    </div>
    <div id="circleFront">
    </div>
    <p id="loadStatus">
      0%
    </p>
  </div>
  <Hero ref="heroref"/>
  <Project @newLoad="newLoad"/>
  <Footer />
  <svg fill="none" id="svgHide">
    <clipPath id="cursorClip" clipPathUnits="objectBoundingBox">
      <path id="cursorPath" d="M 0.0789 0.5026 C 0.0789 0.1789 0.377 0.0767 0.5304 0.0681 C 0.7604 0.0426 0.9222 0.1874 0.9222 0.4259 C 0.9392 0.6644 0.7518 0.8774 0.5304 0.9115 C 0.2918 0.9455 0.0874 0.7496 0.0789 0.5026" />
    </clipPath>
  </svg>
</template>

<script>
import Project from './components/Project.vue'
import Hero from './components/Hero.vue'
import Footer from './components/Footer.vue'
import Cursor from './js/cursor.js'

export default {
  name: 'App',
  components: { Project, Hero, Footer },
  data(){
    return {
      loadCount: 0,
      cursor: null,
      totalCount: 52
    }
  },
  methods: {
    newLoad(){
      let percent = 100 / this.totalCount
      this.loadCount ++ 
      
      // Update Displayed loader state
      document.getElementById('loadStatus').textContent = `${Math.round(this.loadCount * percent)}%`
      document.getElementById('circleFront').style.clipPath = `circle(${(this.loadCount * (percent/2))}% at 50% 50%)`

      let loadingScreen = document.getElementById('loadingScreen')

      if(this.loadCount == this.totalCount){
        setTimeout(() => {
          loadingScreen.style.clipPath = "polygon(0 0, 0 0, 0 100%, 0 100%)"

          setTimeout(() => {
            this.$refs.heroref.loaded()
            loadingScreen.style.display = "none"
          }, 500)   
        }, 500)     
      }
    }
  },
  mounted(){
    this.cursor = new Cursor(document.getElementById('cursor'))  
    // Update Using touch Screen
    let cachedTouch = false
    window.addEventListener('mousemove', () => {
      if (!cachedTouch && this.cursor){
        this.cursor.catchMouse()
      }
    })
    window.addEventListener('touchstart', () => {
      if (this.cursor){
        this.cursor.catchToutch()
        cachedTouch = true
        document.getElementById('creationBackgroundText').style.display = "none"
      }
    })
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Antonio:wght@100&family=Playfair+Display&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Antonio:wght@100&family=Playfair+Display&family=Work+Sans:wght@100&display=swap');
@font-face {
  font-family: 'aqua';
  src: url('./assets/font/aqua.ttf');
}

::-moz-selection {
  color: rgb(44, 44, 44);
  background: rgb(236, 236, 236);
}
::selection {
  color: rgb(44, 44, 44);
  background: rgb(236, 236, 236);
}
body
{
  margin: 0px;
  color: rgb(219, 219, 211);
  font-family: 'aqua';
}
#app
{
  position: relative;
  overflow: hidden;
  background-color: #1a1a1a;
}
#cursor
{
  position:fixed;
  height: 40px;
  width: 40px;
  background-color: rgb(255, 255, 255);  
  mix-blend-mode: difference;
  pointer-events: none;
  z-index: 1000;
  
  clip-path: url(#cursorClip);
}
#svgHide
{
  position: absolute;
  pointer-events: none;
}
#cursorPath
{
  transition-duration: 500ms;
}
#cursor
{
  transition: transform 500ms;
  transform-origin: 0 0;
}
a
{
  cursor: none;
}
#loadingScreen
{
  position: fixed;
  height: 100vh;
  width: 100vw;
  z-index: 10;
  transition-duration: 500ms;

  background-color: rgb(219, 219, 211);
  clip-path: polygon(0 0, 100% 0%, 100% 100%, 0% 100%);

  display: grid;
  align-items: center;
  justify-content: center;
}
#loadingScreen *
{
  grid-column: 1;
  grid-row: 1;
} 
#loadStatus
{
  color: #262626;
  font-size: 10vw;
  z-index: 3;
  text-align: center;
  font-family: 'Antonio', sans-serif;
}
#circleBack,
#circleFront
{
  height: 40vw;
  width: 40vw;
  border-radius: 50%;
}
#circleBack
{
  background-color: #1a1a1a;
}
#circleFront
{
  background-color: rgb(219, 219, 211);
  transition-duration: 500ms;
  z-index: 2;
  transform: scale(1.01);
}
</style>
