<template>
  <canvas id="scene3D">

  </canvas>
</template>

<script>
import * as THREE from 'three';

export default {
  name: 'Scene',
  mounted(){
    // Setup
    const canvas = document.getElementById('scene3D')
    const scene =  new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.01, 20)
    camera.position.z = 5

    const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true })
    renderer.setClearColor( 0x000000, 0 )
    renderer.setSize(window.innerWidth, window.innerHeight)

    // Meshes 
    const cube = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshBasicMaterial()
    )
    scene.add(cube)


    // Loop
    //const clock = new THREE.Clock()
    const tick = () => {
      //const elapsedTime = clock.getElapsedTime()

      // Render
      renderer.render(scene, camera)

      // Loop
      window.requestAnimationFrame(tick)
    }
    tick()

  }
}
</script>

<style scoped>
#scene3D
{
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;
}

</style>