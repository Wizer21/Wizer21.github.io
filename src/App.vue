<template>
  <Hero />
  <Project @newLoad="newLoad"/>
</template>

<script>
import Project from './components/Project.vue'
import Hero from './components/Hero.vue'

export default {
  name: 'App',
  components: { Project, Hero },
  data(){
    return {
      loadCount: 0,
    }
  },
  methods: {
    newLoad(){
      this.loadCount ++ 
      if(this.loadCount == 113){
        console.log("LoadFinished", this.loadCount)
      }
    }
  }
}
</script>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@200&display=swap');
  ::-moz-selection {
    color: rgb(44, 44, 44);
    background: rgb(236, 236, 236);
  }
  ::selection {
    color: rgb(44, 44, 44);
    background: rgb(236, 236, 236);
  }
  body
  {
    margin: 0px;
    color: rgb(219, 219, 211);
    font-family: 'Playfair Display', serif;
  }
  #app
  {
    position: relative;
    overflow: hidden;
  }
</style>
