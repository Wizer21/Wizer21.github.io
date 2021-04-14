<template>
  <div id="hero">
    <h1>
      Simon
    </h1>
    <div class="card" id="creativeCard">
      <p>
        Creative
      </p>
    </div>
    <div class="card" id="frontCard">
      <p>
        Front-End
      </p>
    </div>
    <svg viewBox="0 0 500 500">
      <path id="path" fill="#FFD41D" d="M 37 77 L 39 55 C 41 32 38 -5 98 -5 C 136 -2 167 32 164 54 C 165 88 159 90 110 106 C 52 116 52 105 39 55" />
    </svg>
  </div>
</template>

<script>
export default {
  name: 'Hero',
  mounted() {
    let hero = document.getElementById('hero')
    let creativeCard = document.getElementById('creativeCard')
    let frontCard = document.getElementById('frontCard')
    let rotationOffset = 30
    hero.addEventListener('mousemove', event => {
      let parentRect = hero.getBoundingClientRect()
      let x = event.offsetX - (parentRect.width/2)
      let y = event.offsetY - (parentRect.height/2)

      let creaX =  x * 0.5
      let creaY =  y * 0.5
      let creaXRotation = creaX / ((parentRect.width/2) / rotationOffset)
      let creaYRotation = creaY / ((parentRect.height/2) / rotationOffset)

      creativeCard.style.transform = `translate(${creaX}px, ${creaY}px) perspective(300px) rotateX(${creaYRotation}deg) rotateY(${-creaXRotation}deg)`
        
      let frontX =  -(x * 0.25)
      let frontY = -(y * 0.25)
      let frontXRotation = frontX / ((parentRect.width/2) / rotationOffset)
      let frontYRotation = frontY / ((parentRect.height/2) / rotationOffset)

      frontCard.style.transform = `translate(${-x*0.5}px, ${-y*0.5}px) perspective(300px) rotateX(${frontYRotation}deg) rotateY(${-frontXRotation}deg)`
    })


    document.getElementById('path').style.animation = `${this.$style["morph"]} 2s infinite alternate`
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
#hero *
{
  pointer-events: none;
}
#hero h1
{
  font-size: 20vw;
  z-index: 2;
}
.card
{
  position: absolute;
  background-color: #262626;
  padding: 2%;
  border-radius: 20px;
  transition-timing-function: ease-out;
}
.card p
{
  font-size: 5vw;
  margin: 0;
  white-space: nowrap;
}
#creativeCard
{
  transition-duration: 500ms;
  color: red;
  transform: translateY(150%);
}
#frontCard
{
  transition-duration: 1000ms;
  color: blue;
}
</style>

<style module>
@keyframes morph {
  0%{
    fill: #e57373;
    d:path('M 37 77 L 39 55 C 41 32 38 -5 98 -5 C 136 -2 167 32 164 54 C 165 88 159 90 110 106 C 52 116 52 105 39 55');
  }
  100%{
    fill: #ffca28;
    d:path('M 37 77 L 39 55 C 52 49 82 33 98 -5 C 65 19 129 56 164 54 C 130 47 106 63 110 106 C 100 73 60 57 39 55');   
  }
}
</style>