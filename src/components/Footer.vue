<template>
  <div id="footer">
    <p id="footerTitle">
      Thank you for your visit.
    </p>
    <span class="line"></span>
    <p id="footerText">
      If you liked my work, feel free to contact me !
    </p>
    <div id="buttonsHolder">
      <a href="mailto:simon.tessier8@gmail.com?subject=We want you!&body=After discovering your amazing portfolio, we decided to invite you to join us!" target="_blank" class="button">
        <p class="frontButton">
          Mail
        </p>
        <p>
          Mail
        </p>
      </a>
      <a href="https://twitter.com/Simon349_" target="_blank" class="button">
        <p class="frontButton">
          Twitter
        </p>
        <p>
          Twitter
        </p>
      </a>
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
#footerTitle
{  
  margin: 2vh;
}
#footerText
{
  margin: 2vh;
  font-size: 2vw;
  text-align: center;
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
  display: grid;
  margin: 10%;
}
.button::after
{
  content: "";
  height: 5px;
  width: 0%;
  background-color: rgb(219, 219, 211);
  transition-duration: 200ms;
  transition-timing-function: ease-in;
}
.button:hover::after
{  
  width: 100%;
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
a
{
  text-decoration: none;
  color: rgb(219, 219, 211);
}
@media screen and (max-width: 800px) {  
  #footer
  {
    font-size: 6vw;
  }
  #footerText
  {
    font-size: 4vw;
  }
  
  #buttonsHolder
  {  
    flex-direction: column;
    margin-top: 10%;
  }  
  .button p 
  {
    font-size: 8vw;
  }
}
</style>