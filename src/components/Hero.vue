<template>
  <div id="hero">
    <h1>
      Simon
    </h1>
    <div id="textBackground">
      <div id="creaText">
        <div class="textPart">
          Creative - Creative - Creative - Creative - Creative - Creative - 
        </div>
        <div class="textPart">
          Creative - Creative - Creative - Creative - Creative - Creative - 
        </div>
      </div>
      <div id="frontText">
        <div class="textPart">
          FrontEnd - FrontEnd - FrontEnd - FrontEnd - FrontEnd - FrontEnd - 
        </div>
        <div class="textPart">
          FrontEnd - FrontEnd - FrontEnd - FrontEnd - FrontEnd - FrontEnd - 
        </div>
      </div>
    </div>
  </div>
  <svg fill="none" id="svgHide">
    <clipPath id="bubbleClipPath" clipPathUnits="objectBoundingBox">
      <path id="path" stroke="#fcba03" fill="transparent" d="M 0.0789 0.5026 C 0.0789 0.1789 0.377 0.0767 0.5304 0.0681 C 0.7604 0.0426 0.9222 0.1874 0.9222 0.4259 C 0.9392 0.6644 0.7518 0.8774 0.5304 0.9115 C 0.2918 0.9455 0.0874 0.7496 0.0789 0.5026" />
    </clipPath>
  </svg>
</template>

<script>
export default {
  name: 'Hero',
  methods: {
    loaded(){
      let textBackground = document.getElementById('textBackground')
      
      setTimeout(() => {
        textBackground.style.height = "60vh"
        textBackground.style.width = "60vh"
      }, 500)
    }
  },
  mounted() {
    // Text Slide
    let textPart = document.getElementsByClassName('textPart')
    textPart[0].style.animation = `${this.$style["slide"]} 30s infinite linear`
    textPart[1].style.animation = `${this.$style["slide"]} 30s infinite linear 15s`
    textPart[2].style.animation = `${this.$style["slide"]} 30s infinite linear`
    textPart[3].style.animation = `${this.$style["slide"]} 30s infinite linear 15s`

    textPart[1].style.opacity = 0
    textPart[3].style.opacity = 0
    setTimeout(() => {      
      textPart[1].style.opacity = 1
      textPart[3].style.opacity = 1
    }, 15000)


    //Bubble event
    let textBackground = document.getElementById('textBackground')
    console.log(textBackground);
    textBackground.addEventListener('mousemove', () => {
      console.log('in');
    })

    document.getElementById('path').style.animation = `${this.$style["morph"]} 5s infinite`
  }
}
</script>

<style scoped>
#hero
{
  background-color: #1a1a1a;
  height: 100vh;
  width: 100vw;

  display: flex;
  align-items: center;
  justify-content: center;
}
#hero h1
{
  font-size: 15vw;
  z-index: 2;
  margin-left: -20%;
  pointer-events: none;

}
#textBackground
{
  margin-top: 30%;
  margin-left: 30%;
  position: absolute;
  overflow: hidden;
  width: 0vh;
  height: 0vh;

  clip-path: url(#bubbleClipPath);
  background-color: #262626;  
  pointer-events: all;

  transition-duration: 500ms;
}
#textBackground:hover
{
  transform: scale(1.2);
}
#textBackground:hover #creaText,
#textBackground:hover #frontText
{
  transform: scale(0.8);
}
#frontText,
#creaText
{
  left: 0;
  display: grid;
  pointer-events: none;
  transition-duration: 500ms;
}
.textPart
{
  white-space: nowrap;
  font-size: 20vh;

  grid-column: 1;
  grid-row: 1;
  
}
#svgHide
{
  position: absolute;
  pointer-events: none;
}
</style>

<style module>
@keyframes morph {
  0%{
    d:path('M 0.0789 0.5026 C 0.0789 0.1789 0.377 0.0767 0.5304 0.0681 C 0.7604 0.0426 0.9222 0.1874 0.9222 0.4259 C 0.9392 0.6644 0.7518 0.8774 0.5304 0.9115 C 0.2918 0.9455 0.0874 0.7496 0.0789 0.5026');
  }
  50%{
    d:path('M 0.08 0.51 C 0.0789 0.1789 0.35 0.06 0.5 0.08 C 0.76 0.11 0.88 0.19 0.9 0.43 C 0.94 0.78 0.7518 0.8774 0.53 0.9 C 0.28 0.89 0.04 0.78 0.08 0.51')
  }
  100%{
    d:path('M 0.0789 0.5026 C 0.0789 0.1789 0.377 0.0767 0.5304 0.0681 C 0.7604 0.0426 0.9222 0.1874 0.9222 0.4259 C 0.9392 0.6644 0.7518 0.8774 0.5304 0.9115 C 0.2918 0.9455 0.0874 0.7496 0.0789 0.5026');   
  }
}
@keyframes slide {
  0%{
    margin-left: -100%;
  }
  100%{
    margin-left: 100%;
  }  
}
</style>