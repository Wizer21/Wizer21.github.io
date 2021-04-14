<template>
  <div id="project">
    <div id="deck">
      <div v-for="project of projectList" :key="project.title" class="cardBody" :data-color="project.color" :style="'background-color: ' + project.color">
        <p>
          {{ project.title }}
        </p>
        <div class="imageHolder">
          <img :src="require('../assets/projects_images/' + project.image)" @load="newLoad">
        </div>
        <div class="bottom">
          <p>
            {{ project.description }}
          </p>
          <div class="buttonsHolder">
            <div class="iconHolder">
              <img :src="require('../assets/icons/github.svg')" @load="newLoad">
            </div>
            <div class="iconHolder">
              <img :src="require('../assets/icons/github.svg')" @load="newLoad">
            </div>
          </div>
          <div class="technologies">
            <div v-for="techno of project.tech" :key="techno" class="technoHolder">              
              <img :src="require('../assets/icons/' + techno + '.svg')" @load="newLoad">
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
      projectList: require('../assets/data.json'),
    }
  },
  methods: {
    newLoad(){
      this.$emit('newLoad')
    },
    setCardOffset(){
      let cardStack = document.getElementsByClassName('cardBody')
      let offset = window.innerWidth/250
      let stackIndex = cardStack.length

      for (let i = 0; i < cardStack.length; i++ ){
        cardStack[i].style.marginLeft = `${i * offset}px`
        cardStack[i].style.marginTop = `${(i * offset)/2}px`
        cardStack[i].style.zIndex = stackIndex

        cardStack[i].dataset.z = stackIndex

        stackIndex--
      }    
    }
  },
  mounted(){
    window.addEventListener('resize', () => {
      this.setCardOffset()
    })
    this.setCardOffset()
    
    let isDragIn = true
    // Cards event
    let cardStack = document.getElementsByClassName('cardBody')
    for (let card of cardStack){
      card.dataset.isHold = "0"

      card.addEventListener('mousedown', event => {
        card.dataset.isHold = "1"
        card.style.zIndex = cardStack.length + 1
        card.style.transform = "scale(1.07)"

        let rect = card.getBoundingClientRect()
        card.dataset.clickX = event.offsetX - (rect.width/2)
        card.dataset.clickY = event.offsetY - (rect.height/2)
      })
      card.addEventListener('mouseup', () => {
        cardDroped(card)
      })
      card.addEventListener('mouseleave', () => {
        cardDroped(card)
      })
      card.addEventListener('mousemove', event => {
        // Drag Card
        if (card.dataset.isHold == "1"){
          let rect = card.getBoundingClientRect()
          let x = card.offsetLeft + (event.offsetX - (rect.width/2)) - parseInt(card.dataset.clickX)
          let y = card.offsetTop + (event.offsetY - (rect.height/2)) - parseInt(card.dataset.clickY)

          card.style.left = `${x}px`
          card.style.top = `${y}px`

          // Is the card on the deck
          let deckRect = document.getElementById('deck').getBoundingClientRect()
          let globalX = rect.left + (parseInt(card.dataset.clickX) + (rect.width/2))
          let globalY = rect.top + (parseInt(card.dataset.clickY) + (rect.height/2))
          if ( 
            deckRect.left < globalX &&
            globalX < deckRect.right &&
            deckRect.top < globalY &&
            globalY < deckRect.bottom
          ){
            isDragIn = true
            card.style.transform = "scale(1.07)"
            card.style.opacity = "1"
          }
          else{
            isDragIn = false
            card.style.transform = "scale(0.9)"
            card.style.opacity = "0.9"
          }
        }                
      })
    }

    let cardCount = cardStack.length
    function cardDroped(movedCard){
      if (movedCard.dataset.isHold == "1"){
        let deck = document.getElementById('deck')
        movedCard.style.transition = "opacity 300ms, transform 300ms, margin 300ms, left 300ms, top 300ms,  z-index 500ms"
        setTimeout(() => {
          movedCard.style.transition = "" 
        }, 300)

        movedCard.dataset.isHold = "0"
        movedCard.style.transform = ""
        movedCard.style.opacity = "1"

        movedCard.style.left = `${deck.offsetLeft}px`
        movedCard.style.top = `${deck.offsetTop}px`

        let movedIndex = parseInt(movedCard.dataset.z)        
        if(isDragIn){          
          document.getElementById('project').style.backgroundColor = movedCard.dataset.color
          
          // Decrease other cards
          for (let card of cardStack){
            let cardIndex = parseInt(card.dataset.z)

            if (cardIndex > movedIndex){
              cardIndex -= 1

              updateCardPosition(card, cardIndex)
            }
          }

          // Card go on the top
          updateCardPosition(movedCard, cardCount)
        }
        else{

          for (let card of cardStack){
            let cardIndex = parseInt(card.dataset.z)

            if (cardIndex < movedIndex){
              cardIndex += 1

              if (cardIndex == cardCount){
                document.getElementById('project').style.backgroundColor = card.dataset.color
              }
              updateCardPosition(card, cardIndex)
            }
          }

          updateCardPosition(movedCard, 1)
        }        
      }
    }

    let offset = window.innerWidth/250
    function updateCardPosition(card, cardIndex){
      card.style.zIndex = cardIndex
      card.dataset.z = cardIndex
      
      card.style.marginLeft = `${(cardCount - cardIndex) * offset}px`
      card.style.marginTop = `${(cardCount - cardIndex) * (offset/2)}px`
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
  transition-duration: 500ms;
  transition-timing-function: ease-out;

  display: flex;
  align-items: center;
  justify-content: center;
}
#deck
{
  height: 60vh;
  width: 40vh;

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
  box-shadow: 0 0 5px #1a1a1a;

  grid-column: 1;
  grid-row: 1;
  transition: opacity 300ms, transform 300ms, margin 300ms, z-index 500ms;
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
  transform: scale(1.05);
}
/* Title */
.cardBody p
{  
  height: 5.5%;
  margin: 2%;
  font-size: 2em;
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
  padding: 3%;
  height: 40%;
}
.bottom p
{  
  font-size: 1em;
  width: 80%;
}
.buttonsHolder
{
  height: 15%;
  width: 15%;
}
.iconHolder
{
  padding: 10%;
}
.technoHolder img,
.iconHolder img
{  
  height: 100%;
  width: 100%;
  object-fit: contain;
}
.technologies
{
  height: 70%;
  width: 100%;

  display: flex;
  flex-direction: row;
  align-items: flex-end;
}
.technoHolder
{
  height: 30%;
  width: 12%;
  margin: 0 1.5%;
}
</style>
