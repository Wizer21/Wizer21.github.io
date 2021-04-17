<template>
  <div id="cursor"></div>
  <Hero ref="heroref"/>
  <Project @newLoad="newLoad"/>

  <svg fill="none" id="svgHide">
    <clipPath id="cursorClip" clipPathUnits="objectBoundingBox">
      <path id="cursorPath" d="M 0.0789 0.5026 C 0.0789 0.1789 0.377 0.0767 0.5304 0.0681 C 0.7604 0.0426 0.9222 0.1874 0.9222 0.4259 C 0.9392 0.6644 0.7518 0.8774 0.5304 0.9115 C 0.2918 0.9455 0.0874 0.7496 0.0789 0.5026" />
    </clipPath>
  </svg>
</template>

<script>
import Project from './components/Project.vue'
import Hero from './components/Hero.vue'
import Cursor from './js/cursor.js'

export default {
  name: 'App',
  components: { Project, Hero },
  data(){
    return {
      loadCount: 0
    }
  },
  methods: {
    newLoad(){
      this.loadCount ++ 
      if(this.loadCount == 68){
        console.log("LoadFinished", this.loadCount)

        this.$refs.heroref.loaded()
        new Cursor(document.getElementById('cursor'))
      }
    }
  },
  mounted(){
    // Update Using touch Screen
    let cursor = document.getElementById('cursor')
    let usingMouse = false
    window.addEventListener('mouseover', () => {
      if (!usingMouse){
        usingMouse = true
        cursor.style.opacity = 1
      }
    })
    window.addEventListener('touchstart', () => {
      if (usingMouse){
        usingMouse = false
        cursor.style.opacity = 0
      }
    })
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Antonio:wght@100&family=Playfair+Display&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Antonio:wght@100&family=Playfair+Display&family=Work+Sans:wght@100&display=swap');

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
  font-family: 'Playfair Display', serif;
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
  opacity: 0;
}
a
{
  cursor: none;
}
</style>
