<template>
  <div id="hero">  
    <div id="videoHolder1">
      <video autoplay muted class="videoLoop">
        <source src="../assets/video/snow.mp4" type="video/mp4">
      </video>
    </div>
    <div id="videoHolder2">
      <video autoplay muted class="videoLoop">
        <source src="../assets/video/wheat.mp4" type="video/mp4">
      </video>
    </div>
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
          Creative  Creative  Creative
        </div>
        <div class="textPart"> 
          Creative  Creative  Creative 
        </div>
      </div>
      <div id="frontText">
        <div class="textPart">
          FrontEnd  FrontEnd  FrontEnd
        </div>
        <div class="textPart">
          FrontEnd  FrontEnd  FrontEnd
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
      // Snow Image
      let videoHolder1 = document.getElementById('videoHolder1')
      resetPosition(videoHolder1, 0.5, 0.3)
      videoHolder1.style.height = "60vh"
      videoHolder1.style.width = "60vh"

      videoHolder1.addEventListener('mousemove', event => {
        setPosition(videoHolder1, 0.5, 0.3, event)
      })      
      videoHolder1.addEventListener('mouseleave', () => {
        resetPosition(videoHolder1, 0.5, 0.3)
      })

      // Wheat Image
      let videoHolder2 = document.getElementById('videoHolder2')
      resetPosition(videoHolder2, -0.5, -0.2)
      videoHolder2.style.height = "20vh"
      videoHolder2.style.width = "20vh"
      
      videoHolder2.addEventListener('mousemove', event => {
        setPosition(videoHolder2, -0.5, -0.2, event)
      })    
      videoHolder2.addEventListener('mouseleave', () => {
        resetPosition(videoHolder2, -0.5, -0.2)
      })

      function setPosition(element, baseX, baseY, event){

        let rect = element.getBoundingClientRect() 

        let x = event.offsetX - (rect.width/2)
        let y = event.offsetY - (rect.height/2)

        let baseOffsetX = (window.innerHeight/2) * baseX
        let baseOffsetY = (window.innerWidth/2) * baseY

        element.style.transform = `translate(${baseOffsetX + x}px, ${baseOffsetY + y}px) scale(1.2)`
      }
      function resetPosition(element, baseX, baseY){
        let baseOffsetX = (window.innerHeight/2) * baseX
        let baseOffsetY = (window.innerWidth/2) * baseY

        element.style.transform = `translate(${baseOffsetX}px, ${baseOffsetY}px) scale(1.2)`
      }

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
    textPart[0].style.animation = `${this.$style["slide"]} 30s infinite linear`
    textPart[2].style.animation = `${this.$style["slide"]} 30s infinite linear reverse`

    textPart[1].style.animation = `${this.$style["slideStart"]} 15s linear`
    textPart[3].style.animation = `${this.$style["antiSlideStart"]} 15s linear`
    setTimeout(() => {
      textPart[1].style.animation = `${this.$style["slide"]} 30s infinite linear`
      textPart[3].style.animation = `${this.$style["slide"]} 30s infinite linear reverse`
    }, 15000)

    // Morph Path
    document.getElementById('path').style.animation = `${this.$style["morph"]} 5s infinite`

    // Setup TextPos
    textPart[0].style.transform = "translateY(100%)"
    textPart[1].style.transform = "translateY(100%)"
    textPart[2].style.transform = "translateY(-100%)"
    textPart[3].style.transform = "translateY(-100%)"

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
  }
}
</script>

<style scoped>
#hero
{
  height: 100vh;
  width: 100vw;

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
  line-height: 90%;

  transition-duration: 1000ms;
  transform: translateY(-100%);

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
}
#svgHide
{
  position: absolute;
  pointer-events: none;
}
/* Bubbles */
#centerBubbles
{
  height: 100%;
  width: 100%;
  position: absolute;

  display: grid;
  justify-content: center;
  align-items: center;
}
#centerBubbles div
{
  position: absolute;
  grid-column: 1;
  grid-row: 1;
  border-radius: 50%;
  
  transition-timing-function: ease-out;
}
#videoHolder1,
#videoHolder2
{
  position: absolute;
  z-index: 2;

  height: 0vh;
  width: 0vh;
  clip-path: url(#bubbleClipPath);
  transition-duration: 1000ms;
  transition-timing-function: ease-out;
}
#videoHolder2:hover video,
#videoHolder1:hover video
{
  transform: scale(1.2);
}
#videoHolder2 video,
#videoHolder1 video
{
  object-fit: cover;
  height: 100%;
  width: 100%;
  transition-duration: 500ms;
}
.videoLoop
{
  transition-duration: 250ms;
}
@media screen and (max-width: 800px) {
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