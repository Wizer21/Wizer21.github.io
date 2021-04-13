<template>
  <div id="project">
    <div id="deck">
      <div v-for="project of projectList" :key="project.title" class="cardBody">
        <p>
          {{ project.title }}
        </p>
        <div class="imageHolder">
          <img :src="require('../assets/projects_images/' + project.image)">
        </div>
        <div class="bottom">
          <p>
            {{ project.description }}
          </p>
          <div class="buttonsHolder">
            <div class="iconHolder">
              <img :src="require('../assets/icons/github.svg')">
            </div>
            <div class="iconHolder">
              <img :src="require('../assets/icons/github.svg')">
            </div>
          </div>
          <div class="technologies">
            <div v-for="techno of project.tech" :key="techno" class="technoHolder">              
              <img :src="require('../assets/icons/' + techno + '.svg')">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Project',
  data(){
    return {
      projectList: require('../assets/data.json')
    }
  },
  methods: {
    setCardOffset(){
      let cardStack = document.getElementsByClassName('cardBody')
      let offset = window.innerWidth/200
      let stackIndex = cardStack.length + 1

      for (let i = 0; i < cardStack.length; i++ ){
        cardStack[i].style.marginLeft = `${i * offset}px`
        cardStack[i].style.marginBottom = `-${i * offset}px`
        cardStack[i].style.zIndex = stackIndex

        stackIndex--
      }    
    }
  },
  mounted(){
    window.addEventListener('resize', () => {
      this.setCardOffset()
    })
    this.setCardOffset()


    let cardStack = document.getElementsByClassName('cardBody')
    for (let card of cardStack){
      card.dataset.isHold = "0"

      card.addEventListener('mousedown', event => {
        card.dataset.isHold = "1"

        let rect = card.getBoundingClientRect()
        card.dataset.clickX = event.offsetX - (rect.width/2)
        card.dataset.clickY = event.offsetY - (rect.height/2)
      })
      card.addEventListener('mouseup', () => {
        card.dataset.isHold = "0"
      })
      card.addEventListener('mouseleave', () => {
        card.dataset.isHold = "0"
      })
      card.addEventListener('mousemove', event => {
        if (card.dataset.isHold == "1"){
          let rect = card.getBoundingClientRect()
          let x = card.offsetLeft + (event.offsetX - (rect.width/2)) - parseInt(card.dataset.clickX)
          let y = card.offsetTop + (event.offsetY - (rect.height/2)) - parseInt(card.dataset.clickY)

          card.style.marginLeft = `${x}px`
          card.style.marginTop = `${y}px`
        }
      })
    }
  }
}
</script>

<style scoped>
#project
{
  background-color: #1a1a1a;
  height: 100vh;
  width: 100vw;
}
#deck
{
  height: 100%;

  display: grid;
  align-items: center;
  justify-content: center;
}
/* Card */
.cardBody
{
  position: absolute;
  height: 60vh;
  width: 40vh;
  background-color: #262626;
  border-radius: 20px;

  grid-column: 1;
  grid-row: 1;
  border: 1px solid white;
  transition-timing-function: ease-out;
}
.cardBody *
{
  pointer-events: none;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.cardBody:hover
{
  transform: scale(1.1);
}
/* Title */
.cardBody p
{  
  height: 6%;
  margin: 0;
  font-size: 2em;
  padding: 2%;
}
/* Image */
.imageHolder
{
  height: 50%;
  width: 100%;
}
.imageHolder img
{
  height: 100%;
  width: 100%;
  object-fit: cover;
}
/* Bottom */
.bottom
{  
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
}
.bottom p
{  
  font-size: 1em;
  width: 80%;
  height: 30%;
}
.buttonsHolder
{
  height: 15%;
  width: 15%;
}
.technoHolder img,
.iconHolder img
{  
  height: 100%;
  width: 100%;
  object-fit: cover;
}
.technologies
{
  height: 10%;
  width: 100%;

  display: flex;
  flex-direction: row;
}
.technoHolder
{
  height: 100%;
  width: 10%;
}
</style>
