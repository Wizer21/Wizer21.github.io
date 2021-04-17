<template>
  <div id="project">
    <div id="backgroundColor">
    </div>
    <div id="mouseIndicator">
      <p id="indicator">
        Indicator
      </p>
    </div>
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
            <a :href="project.git_link" target="_blank">
              <div class="iconHolder" data-name="GitHub">
                <img :src="require('../assets/icons/github.svg')" @load="newLoad">
              </div>
            </a>
            <a :href="project.page_link" target="_blank" v-if="project.page_link">
              <div class="iconHolder" data-name="Visit">
                <img :src="require('../assets/arrow.png')" @load="newLoad">
              </div>
            </a>
          </div>
          <div class="technologies">
            <div v-for="techno of project.tech" :key="techno" :data-name="techno" class="technoHolder">
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
      topCard: null
    }
  },
  methods: {
    newLoad(){
      this.$emit('newLoad')
    },
    setUpIndex(){
      let cardStack = document.getElementsByClassName('cardBody')
      let stackIndex = cardStack.length

      for (let i = 0; i < cardStack.length; i++ ){
        cardStack[i].style.zIndex = stackIndex
        cardStack[i].style.transitionDelay = `${i*50}ms`

        cardStack[i].dataset.z = stackIndex

        stackIndex--
      }    

    },
    setCardOffset(){
      let cardStack = document.getElementsByClassName('cardBody')
      let offset = window.innerWidth/250
      let stackIndex = cardStack.length
      this.topCard = cardStack[0]

      for (let i = 0; i < cardStack.length; i++ ){
        cardStack[i].style.marginLeft = `${i * offset}px`
        cardStack[i].style.marginTop = `${(i * offset)/2}px`
        cardStack[i].style.zIndex = stackIndex

        cardStack[i].dataset.z = stackIndex

        stackIndex--
      }    
    },
    inView(){
      let deck = document.getElementById('deck')
      deck.style.marginTop = "0px"
      deck.style.opacity = 1

      setTimeout(() => {
        this.setCardOffset()

        setTimeout(() => {
          let cardStack = document.getElementsByClassName('cardBody')

          for (let card of cardStack){
            card.style.transitionDelay = ""
          }   
        }, 1000) 
      }, 1000)
    }
  },
  mounted(){
    let project = document.getElementById('project')
    window.addEventListener('resize', () => {
      this.setCardOffset()
    })
    window.addEventListener('scroll', () => {
      let rect = project.getBoundingClientRect()
      console.log(rect.top);
      if (rect.top <= 0)
      this.inView()
    })
    this.setUpIndex()
    
    let isDragIn = true
    // Cards event
    let cardStack = document.getElementsByClassName('cardBody')
    for (let card of cardStack){
      if (card.dataset.z == cardStack.length){        
        updateBackground(card.dataset.color)
      }
      card.dataset.isHold = "0"

      // FROM MOUSE
      card.addEventListener('mousedown', event => {   
        dragStart(card, event, true) 
      })
      card.addEventListener('mouseup', () => {
        cardDroped(card, true)
      })
      card.addEventListener('mouseleave', () => {
        cardDroped(card, true)
      })
      card.addEventListener('mousemove', event => {
        drag(card, event, true)
      })      

      // FROM TOUCH
      card.addEventListener('touchstart', event => {
        dragStart(card, event, false)
      })     
      card.addEventListener('touchend', () => {
        cardDroped(card, false)
      })     
      card.addEventListener('touchmove', event => {
        drag(card, event, false)
      })      
    }  
    
    // Start Drag    
    function dragStart(card, event, fromMouse){
      isDragIn = true
      cleanCardEffects()    
      card.dataset.isHold = "1"
      card.style.zIndex = cardStack.length + 1
      card.style.transform = "scale(1.07)"

      let rect = card.getBoundingClientRect()
      if (fromMouse){
        card.dataset.clickX = event.offsetX - (rect.width/2)
        card.dataset.clickY = event.offsetY - (rect.height/2)
      }
      else 
      {
        card.dataset.clickX = event.changedTouches[0].clientX - (rect.height/2)
        card.dataset.clickY = rect.height/2
      }
    }
    
    // Drag Card
    function drag(card, event, fromMouse){
      if (card.dataset.isHold == "1"){
        let rect = card.getBoundingClientRect()
        if (fromMouse){
          let x = card.offsetLeft + (event.offsetX - (rect.width/2)) - parseInt(card.dataset.clickX)
          let y = card.offsetTop + (event.offsetY - (rect.height/2)) - parseInt(card.dataset.clickY)

          card.style.top = `${y}px`
          card.style.left = `${x}px`
        }
        else{
          let x = (event.changedTouches[0].clientX - (rect.width/2)) - parseInt(card.dataset.clickX)

          card.style.left = `${x}px`
        }

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
    }

    let mouseIndicator = document.getElementById('mouseIndicator')
    project.addEventListener('mousemove', event => {
      if (this.topCard.dataset.isHold == "0"){
        let rect = project.getBoundingClientRect()
        let x = (event.clientX - (rect.width/2)) / ((rect.width/2) / 7.5)
        let y = (event.clientY - (rect.height/2)) / ((rect.height/2) / 7.5)

        this.topCard.style.transform = `perspective(300px) rotateX(${-y}deg) rotateY(${x}deg)`

        mouseIndicator.style.left = `${event.clientX}px`
        mouseIndicator.style.top = `${event.clientY + (project.offsetTop - rect.top)}px`

        x *= 2
        y *= 2

        this.topCard.children[0].style.transform = `translate(${x}px, ${y}px)`
        this.topCard.children[0].style.textShadow = `${-x}px ${-y}px 7px #1a1a1a`

        this.topCard.children[1].style.transform = `translate(${x}px, ${y}px)`
        this.topCard.children[1].style.boxShadow = `${-x}px ${-y}px 7px rgb(38, 38, 38, 0.5)`

        this.topCard.children[2].children[0].style.textShadow = `${-x}px ${-y}px 7px #1a1a1a`
        
        let technologies = this.topCard.getElementsByClassName('technologies')[0]
        technologies.style.transform = `translate(${x}px, ${y}px)`
        technologies.style.boxShadow = `${-x}px ${-y}px 7px rgb(38, 38, 38, 0.3)`

        let buttons = this.topCard.getElementsByClassName('iconHolder')
        for (let button of buttons){
          button.style.transform = `translate(${x}px, ${y}px)`
          button.style.boxShadow = `${-x}px ${-y}px 7px rgb(38, 38, 38, 0.5)`
        }
      }
    })
      
    // Clean Card Effects
    let local = this
    function cleanCardEffects(){
      local.topCard.style.transform = ""

      local.topCard.children[0].style.transform = ""
      local.topCard.children[0].style.textShadow = ""
      local.topCard.children[1].style.transform = ""
      local.topCard.children[1].style.boxShadow =  ""

      local.topCard.children[2].children[0].style.textShadow = ""
    }

    // Card Droped
    let cardCount = cardStack.length
    function cardDroped(movedCard, fromMouse){
      cleanCardEffects()

      for (let child of movedCard.children){
        child.style.transform = ""
        child.style.textShadow = ""
        child.style.boxShadow = ""
      }

      if (movedCard.dataset.isHold == "1"){
        let deck = document.getElementById('deck')
        movedCard.style.transition = "opacity 300ms, transform 300ms, margin 300ms, left 300ms, top 300ms, z-index 500ms"
        setTimeout(() => {
          movedCard.style.transition = "" 
        }, 300)

        movedCard.dataset.isHold = "0"
        movedCard.style.transform = ""
        movedCard.style.opacity = "1"

        if (fromMouse){
          movedCard.style.transform = ""
        }
        else{
          movedCard.style.transform = "scale(1)"
        }

        movedCard.style.left = `${deck.offsetLeft}px`
        movedCard.style.top = `${deck.offsetTop}px`

        let movedIndex = parseInt(movedCard.dataset.z)        
        if(isDragIn){          
          updateBackground(movedCard.dataset.color)
          local.topCard = movedCard
          
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
                updateBackground(card.dataset.color)
                local.topCard = card
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

    // Background animation
    let lastColor = null
    function updateBackground(color){
      
      if (lastColor != color){
        let backgroundColor = document.getElementById('backgroundColor')
        backgroundColor.style.clipPath = "polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)"

        setTimeout(() => {
          backgroundColor.style.backgroundColor = color
          backgroundColor.style.clipPath = "polygon(0 73%, 100% 47%, 100% 100%, 0% 100%)"
          lastColor = color
        }, 500)
      }
    }

    let icons = document.getElementsByClassName('iconHolder')
    let indicator = document.getElementById('indicator')
    for (let icon of icons){
      icon.addEventListener('mouseenter', () => {
        indicator.textContent = icon.dataset.name
        mouseIndicator.style.opacity = 1
      })
      icon.addEventListener('mouseleave', () => {
        mouseIndicator.style.opacity = 0
      })
    }
  }
}
</script>

<style scoped>
#project
{
  height: 100vh;
  width: 100vw;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
#deck
{
  height: 60vh;
  width: 40vh;

  display: grid;
  align-items: center;
  justify-content: center;

  margin-top: 100%;
  opacity: 0;
  transition-duration: 1000ms;
  transition-timing-function: cubic-bezier(0.42, 0, 0.25, 1.38);
}
/* Card */
.cardBody
{
  position: absolute;
  height: 60vh;
  width: 40vh;
  background-color: hsl(0, 0%, 15%);
  border-radius: 20px;
  box-shadow: 0 0 5px #1a1a1a;
  font-family: 'Antonio', sans-serif;

  grid-column: 1;
  grid-row: 1;
  transition: opacity 300ms, transform 300ms, margin 500ms, z-index 500ms;
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
  margin: 0;
  margin-left: 3%;
  height: 8%;
  font-size: 2.2em;
  transition-duration: 500ms;
  transition-timing-function: ease-out;
}
/* Image */
.imageHolder
{
  height: 50%;
  width: 100%;
  transition-duration: 500ms;
  transition-timing-function: ease-out;
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
  height: 43%;
}
.bottom p
{  
  padding: 5%;
  font-size: 1.7em;
  width: 70%;
  height: 50%;
  transition-duration: 500ms;
  transition-timing-function: ease-out;
}
.buttonsHolder
{
  height: 60%;
  width: 15%;

  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}
.iconHolder
{
  pointer-events: all;
  padding: 10%;
  height: 80%;
  width: 80%;
  background-color: rgb(26, 26, 26, 0.5);
  border-radius: 10px;

  transition-duration: 500ms;
  transition-timing-function: ease-out;
}
.iconHolder:hover
{
  height: 90%;
  width: 90%;
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
  height: 30%;
  width: 100%;
  background-color: rgb(26, 26, 26, 0.5);
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;

  transition-duration: 500ms;
  transition-timing-function: ease-out;

  display: flex;
  flex-direction: row;
  align-items: center;
}
.technoHolder
{
  height: 60%;
  width: 12%;
  margin: 0 2.5%;
}
/* Deploy */
#buttonDeploy
{
  margin: 5%; 
}
#backgroundColor
{
  position: absolute;
  height: 100vh;
  width: 100vw;
  transition-duration: 500ms;
  clip-path: polygon(0 100%, 100% 100%, 100% 100%, 0% 100%);
  opacity: 0.7;
}
#mouseIndicator
{
  position: absolute;
  z-index: 100;
  padding: 10px;
  pointer-events: none;
  font-size: 1.5em;
  background-color: rgb(26, 26, 26, 0.5);
  
  margin-top: -2.8em;
  opacity: 0;
  
  transition-duration: 250ms;
  transition-timing-function: ease-out;
}
#indicator
{
  font-size: 1.5em;
  margin: 0;
}
@media screen and (max-width: 800px) {
  .cardBody p
  {  
    font-size: 1.65em;
  }  
  .bottom p
  {  
    font-size: 1.4em;
  }
}
</style>