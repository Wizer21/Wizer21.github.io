<template>
  <div id="hero">  
    <div id="titleHolder">
      <template v-for="letter of 'Simon'" :key="letter">
        <h1 class="titleLetter">
          {{ letter }}
        </h1>
      </template>
    </div>
    <div id="textBackground">
      <div id="creaText">
        <div class="textPart">
          Creative  Creative  Creative&nbsp;
        </div>
        <div class="textPart"> 
          Creative  Creative  Creative&nbsp;
        </div>
      </div>
      <div id="frontText">
        <div class="textPart">
          FrontEnd  FrontEnd  FrontEnd&nbsp;
        </div>
        <div class="textPart">
          FrontEnd  FrontEnd  FrontEnd&nbsp;
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Hero',
  methods: {
    loaded(){
      // Title Animation      
      let titleLetter = document.getElementsByClassName('titleLetter')
      for (let letter of titleLetter){
        letter.style.transform = "translateY(0%)"
      }

      setTimeout(() => {
        // Wake Up Background Text      
        let textPart = document.getElementsByClassName('textPart')
        for (let text of textPart){
          text.style.transform = "translateY(0%)"
        }
      }, 1000)
    }
  },
  mounted() {
    // Text Slide
    let textPart = document.getElementsByClassName('textPart')
    let local = this
    let animationTimer = null

    function startAnimation(){
      textPart[0].style.animation = `${local.$style["slide"]} 30s infinite linear`
      textPart[2].style.animation = `${local.$style["slide"]} 30s infinite linear reverse`

      textPart[1].style.animation = `${local.$style["slideStart"]} 15s linear`
      textPart[3].style.animation = `${local.$style["antiSlideStart"]} 15s linear`
      animationTimer = setTimeout(() => {
        textPart[1].style.animation = `${local.$style["slide"]} 30s infinite linear`
        textPart[3].style.animation = `${local.$style["slide"]} 30s infinite linear reverse`        
      }, 15000)
    }
    startAnimation()

    // Setup TextPos
    textPart[0].style.transform = "translateY(-100%)"
    textPart[1].style.transform = "translateY(-100%)"
    textPart[2].style.transform = "translateY(100%)"
    textPart[3].style.transform = "translateY(100%)"

    // Video Infinite loop
    let videoLoop = document.getElementsByClassName('videoLoop')
    for (let video of videoLoop){
      video.addEventListener('ended', () => {
        video.style.opacity = 0
        video.style.filter = "blur(10px)"

        setTimeout(() => {
          video.currentTime = 0
          video.play()
          video.style.opacity = 1
          video.style.filter = ""
        }, 250)
      })
    }

    // Setup Title Pos
    let titleLetter = document.getElementsByClassName('titleLetter')
    for (let i = 0; i < titleLetter.length; i++){
      titleLetter[i].style.transitionDelay = `${500 - (i * 100)}ms`
    }

    // Optimisation
    let hero = document.getElementById('hero')
    let animationsPaused = false

    window.addEventListener('scroll', () => {
      let rect = hero.getBoundingClientRect()
      // Start Animations
      if (rect.bottom < 0){
        if (!animationsPaused){
          animationsPaused = true
          clearTimeout(animationTimer)

          for (let video of videoLoop){
            video.pause()
          }
          for (let text of textPart){
            text.style.animation = ""
          }
        }
      }
      else{        
        // Pause Animations
        if (animationsPaused){
          animationsPaused = false

          for (let video of videoLoop){
            video.play()
          }
          startAnimation()          
        }
      }
    })
  }
}
</script>

<style scoped>
#hero
{
  height: 100vh;
  width: 100vw;
  z-index: 3;

  display: flex;
  align-items: center;
  justify-content: center;
}
#textBackground
{
  position: absolute;
  overflow: hidden;
  width: 100vw;
  height: 100vh;
  z-index: 0;

  color: #262626;  
  pointer-events: all;

  transition-duration: 1000ms;
  transition-timing-function: ease-out;
}
#titleHolder
{
  display: flex;
  flex-direction: row;
  margin-left: -20%;

  overflow: hidden;
}
.titleLetter
{  
  font-size: 25vw;
  z-index: 3;
  pointer-events: none;
  margin: 0;

  transition-duration: 1000ms;
  transform: translateY(100%);

}
#frontText,
#creaText
{
  left: 0;
  display: grid;
  pointer-events: none;
  transition-duration: 500ms;

  overflow: hidden;
}
.textPart
{
  white-space: nowrap;
  font-size: 37vh;
  font-family: 'Antonio', sans-serif;
  transition-duration: 1000ms;
  transition-timing-function: cubic-bezier(0.42, 0, 0.25, 1.38);

  grid-column: 1;
  grid-row: 1; 

  pointer-events: none;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none; 
}
</style>

<style module>
@keyframes slide {
  0%{
    margin-left: -100%;
  }
  100%{
    margin-left: 100%;
  }  
}
@keyframes slideStart {
  0%{
    margin-left: 0%;
  }
  100%{
    margin-left: 100%;
  }  
}
@keyframes antiSlideStart {
  0%{
    margin-left: 0%;
  }
  100%{
    margin-left: -100%;
  }  
}
</style>