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
    <h1>
      Simon
    </h1>
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
      videoHolder1.style.transform = "translate(30%, 30%)"
      videoHolder1.style.height = "60vh"
      videoHolder1.style.width = "60vh"

      videoHolder1.addEventListener('mousemove', event => {
        let rect = videoHolder1.getBoundingClientRect() 

        let x = (event.offsetX - (rect.width/2)) / (rect.width / (rect.width/2))
        let y = (event.offsetY - (rect.height/2))  / (rect.height / (rect.height/2))

        let baseOffsetX = (rect.width/100) * 30
        let baseOffsetY = (rect.height/100) * 30

        videoHolder1.style.transform = `translate(${baseOffsetX + x}px, ${baseOffsetY + y}px) scale(1.2)`
      })      
      videoHolder1.addEventListener('mouseleave', () => {
        videoHolder1.style.transform = "translate(30%, 30%)"
      })

      // Wheat Image
      let videoHolder2 = document.getElementById('videoHolder2')
      videoHolder2.style.transform = "translate(-200%, -100%)"
      videoHolder2.style.height = "20vh"
      videoHolder2.style.width = "20vh"
      
      videoHolder2.addEventListener('mousemove', event => {
        let rect = videoHolder2.getBoundingClientRect() 

        let x = (event.offsetX - (rect.width/2)) 
        let y = (event.offsetY - (rect.height/2))

        let baseOffsetX = -(rect.width * 1.9)
        let baseOffsetY = -rect.height


        videoHolder2.style.transform = `translate(${baseOffsetX + x}px, ${baseOffsetY + y}px) scale(1.2)`
      })    
      videoHolder2.addEventListener('mouseleave', () => {
        videoHolder2.style.transform = "translate(-200%, -100%)"
      })
    }
  },
  mounted() {
    // Text Slide
    let textPart = document.getElementsByClassName('textPart')
    textPart[0].style.animation = `${this.$style["slide"]} 20s infinite linear`
    textPart[1].style.animation = `${this.$style["slide"]} 20s infinite linear 10s`
    textPart[2].style.animation = `${this.$style["slide"]} 20s infinite linear reverse`
    textPart[3].style.animation = `${this.$style["slide"]} 20s infinite linear reverse 10s`

    textPart[1].style.opacity = 0
    textPart[3].style.opacity = 0
    setTimeout(() => {      
      textPart[1].style.opacity = 1
      textPart[3].style.opacity = 1
    }, 10000)

    document.getElementById('path').style.animation = `${this.$style["morph"]} 5s infinite`

    // Video Infinite loop
    let videoLoop = document.getElementsByClassName('videoLoop')
    for (let video of videoLoop){
      video.addEventListener('ended', () => {
        console.log("end");
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
  font-size: 25vw;
  z-index: 3;
  margin-left: -20%;
  pointer-events: none;

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
  font-size: 37vh;
  font-family: 'Antonio', sans-serif;

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