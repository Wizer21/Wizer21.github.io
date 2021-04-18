export default class Cursor{
  constructor(element){
    this.element = element
    this.usingMouse = false
    this.scgPath = document.getElementById('cursorPath')
    this.element.style.display = "none"
    this.cursorPath = document.getElementById('cursorPath')

    // Create SVG
    this.setMouse()
    // Hide Default cursor
    document.body.style.cursor = "none"

    // Mousemove
    document.body.addEventListener('mousemove', event => {
      if (this.usingMouse){
        this.element.style.left = `${event.clientX}px`
        this.element.style.top = `${event.clientY}px`
      }
    })
    document.body.addEventListener('mouseenter', () => {
      if (this.usingMouse){
        this.element.style.display = "block"
      }
    })
    document.body.addEventListener('mouseleave', () => {
      if (this.usingMouse){
        this.element.style.display = "none"
      }
    })

    let isHold = false
    let isOnUrl = false
    // LinkEvents animation
    let linkStack = document.querySelectorAll('a')
    for (let link of linkStack){
      link.addEventListener('mouseenter', () => {
        if (this.usingMouse){
          isOnUrl = true
          this.setArrow()
        }
      })     
      link.addEventListener('mouseleave', () => {   
        if (this.usingMouse){
          isOnUrl = false
          this.element.style.transform = ""   
          this.setMouse()
        }  
      })
    }

    // Cards animation
    let deck = document.getElementsByClassName('cardBody')
    for (let card of deck){
      card.addEventListener('mousemove', () => {
        if (this.usingMouse){  
          if (isHold){
            this.setPoint()   
          }
          else if (isOnUrl){
            this.setArrow()            
          }
          else{
            this.setCircle()  
          }
        }
      })     
      card.addEventListener('mouseleave', () => {   
        if (this.usingMouse){
          this.setMouse()
          isHold = false
        }  
      })      
      card.addEventListener('mousedown', () => {
        isHold = true
        console.log("isOnUrl", isOnUrl);
        if (!isOnUrl){
          this.setPoint()   
        }
      })     
      card.addEventListener('mouseup', () => {   
        isHold = false
        if (!isOnUrl){
          this.setCircle()  
        }
      })
    }
  }

  catchMouse(){   
    this.usingMouse = true
    this.element.style.display = "block"
  }
  catchToutch(){
    this.usingMouse = false
    this.element.style.display = "none"
  }
  setMouse(){
    this.element.style.transform = ""  
    this.cursorPath.style.transitionDuration = "500ms"
    this.scgPath.setAttribute('d', 'M 0 0 C 0.3333 0.1 0.6667 0.2 1 0.3 C 0.9 0.3667 0.8 0.4333 0.7 0.5 C 0.7 0.5667 0.7 0.6333 0.7 0.7 C 0.7 0.7 0.7 0.7 0.7 0.7 C 0.7 0.7 0.7 0.7 0.7 0.7 C 0.7 0.7 0.7 0.7 0.7 0.7 C 0.6333 0.7 0.5667 0.7 0.5 0.7 C 0.4333 0.8 0.3667 0.9 0.3 1 C 0.2 0.6667 0.1 0.3333 0 0')
  }
  setCircle(){
    this.element.style.transform = "translate(-50%, -50%)"  
    this.cursorPath.style.transitionDuration = "500ms"
    this.scgPath.setAttribute('d', 'M 0.005 0.4978 C 0.005 0.4274 0.005 0.2866 0.1458 0.1458 C 0.2866 0.005 0.4274 0.005 0.4978 0.005 C 0.5682 0.005 0.709 0.005 0.8498 0.1458 C 0.9906 0.2866 0.9906 0.4274 0.9906 0.4978 C 0.9906 0.5682 0.9906 0.709 0.8498 0.8498 C 0.709 0.9906 0.5682 0.9906 0.4978 0.9906 C 0.4274 0.9906 0.2866 0.9906 0.1458 0.8498 C 0.005 0.709 0.005 0.5682 0.005 0.4978 C 0.005 0.4978 0.005 0.4978 0.005 0.4978')
  }
  setPoint(){
    this.element.style.transform = "translate(-50%, -50%)"  
    this.cursorPath.style.transitionDuration = "100ms"
    this.scgPath.setAttribute('d', 'M 0.4705 0.4798 C 0.4705 0.4727 0.4705 0.4587 0.4846 0.4446 C 0.4987 0.4305 0.5127 0.4305 0.5198 0.4305 C 0.5268 0.4305 0.5409 0.4305 0.555 0.4446 C 0.5691 0.4587 0.5691 0.4727 0.5691 0.4798 C 0.5691 0.4868 0.5691 0.5009 0.555 0.515 C 0.5409 0.5291 0.5268 0.5291 0.5198 0.5291 C 0.5127 0.5291 0.4987 0.5291 0.4846 0.515 C 0.4705 0.5009 0.4705 0.4868 0.4705 0.4798 C 0.4705 0.4798 0.4705 0.4798 0.4705 0.4798')
  }
  setArrow(){
    this.cursorPath.style.transitionDuration = "500ms"
    this.element.style.transform = "scale(1.2) rotate(90deg)"  
    this.scgPath.setAttribute('d', 'M 0 0 C 0.2778 0 0.5555 0 0.8333 0 C 0.8333 0.0556 0.8333 0.1111 0.8333 0.1667 C 0.6555 0.1667 0.4778 0.1667 0.3 0.1667 C 0.5222 0.3889 0.7444 0.6111 0.9666 0.8333 C 0.9222 0.8777 0.8777 0.9222 0.8333 0.9666 C 0.6111 0.7444 0.3889 0.5222 0.1667 0.3 C 0.1667 0.4778 0.1667 0.6555 0.1667 0.8333 C 0.1111 0.8333 0.0556 0.8333 0 0.8333 C 0 0.5555 0 0.2778 0 0')      
  }
}