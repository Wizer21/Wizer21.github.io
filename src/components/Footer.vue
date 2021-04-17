<template>
  <div id="footer">
    <p>
      Thank you for visiting !
    </p>
    <span class="line"></span>
    <p>
      Feel free to contact me.
    </p>
    <div id="buttonsHolder">
      <div class="button">
        <p class="frontButton">
          Mail
        </p>
        <p>
          Mail
        </p>
      </div>
      <div class="button">
        <p class="frontButton">
          Twitter
        </p>
        <p>
          Twitter
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Footer",
  mounted(){
    let frontButton = document.getElementsByClassName('frontButton')
    frontButton[0].style.color = "#d93025"
    frontButton[1].style.color = "rgb(29, 161, 242)"
  }
}
</script>

<style scoped>
#footer
{
  margin-top: 20%;
  height: 60vh;
  width: 100vw;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  font-size: 4vw;
}
#footer p
{
  margin: 2vh;
}
.line
{
  content: "";
  height: 4px;
  width: 20vw;
  background-color: rgb(255, 255, 255);
  border-radius: 10px;
}
#buttonsHolder
{  
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
}
.button
{
  margin: 10% 20%;

  display: grid;
}
.button p 
{
  margin: 0;

  z-index: 2;
  grid-column: 1;
  grid-row: 1;
  font-size: 5vw;

  transition-duration: 500ms;
}
.button p:nth-child(1)
{
  z-index: 3;
  clip-path: polygon(0 0, 100% 0%, 100% 0, 0 0);
}
.button:hover p:nth-child(1)
{
  clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
}
.button p:nth-child(2)
{
  clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
}
.button:hover p:nth-child(2)
{
  clip-path: polygon(0 100%, 100% 100%, 100% 100%, 0 100%);
}
</style>