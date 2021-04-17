export default class Cursor{
  constructor(element){
    let scgPath = document.getElementById('cursorPath')

    // Create SVG
    scgPath.setAttribute('d', 'M 0 0 L 1 0.3 L 0.7 0.5 L 0.7 0.7 L 0.7 0.7 L 0.7 0.7 L 0.7 0.7 L 0.5 0.7 L 0.3 1 L 0 0')
   
    // Hide Default cursor
    document.body.style.cursor = "none"

    // Mousemove
    document.body.addEventListener('mousemove', event => {
      element.style.left = `${event.clientX}px`
      element.style.top = `${event.clientY}px`
    })
    document.body.addEventListener('mouseenter', () => {
      element.style.display = "block"
    })
    document.body.addEventListener('mouseleave', () => {
      element.style.display = "none"
    })

    // LinkEvents animation
    let linkStack = document.querySelectorAll('a')
    for (let link of linkStack){
      link.addEventListener('mouseenter', () => {
        element.style.transform = "scale(1.2) rotate(90deg)"
        scgPath.setAttribute('d', 'M 0 0 L 0.8333 0 L 0.8333 0.1667 L 0.3 0.1667 L 0.9666 0.8333 L 0.8333 0.9666 L 0.1667 0.3 L 0.1667 0.8333 L 0 0.8333 L 0 0')        
      })     
      link.addEventListener('mouseleave', () => {     
        element.style.transform = ""   
        scgPath.setAttribute('d', 'M 0 0 L 1 0.3 L 0.7 0.5 L 0.7 0.7 L 0.7 0.7 L 0.7 0.7 L 0.7 0.7 L 0.5 0.7 L 0.3 1 L 0 0')
      })
    }
  }
}