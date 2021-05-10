<template>
  <canvas id="scene3D">
  </canvas>
</template>

<script>
import * as THREE from 'three';
import gsap from "gsap";

export default {
  name: 'Scene',
  data(){
    return {
      shader: null,
      updateMeshPos: null
    }
  },
  methods: {
    open(){
      this.updateMeshPos(1.5, 1.5)

      document.getElementById('scene3D').style.pointerEvents = "all"
      
      gsap.to(this.shader.uniforms.uAlpha, {value: 1, duration: 3})
      gsap.to(this.shader.uniforms.uStrenght, {value: 1, duration: 1.5})
    },
    close(){  
      this.updateMeshPos(0, 0)

      document.getElementById('scene3D').style.pointerEvents = "none"
      gsap.to(this.shader.uniforms.uAlpha, {value: 0, duration: 3})
      gsap.to(this.shader.uniforms.uStrenght, {value: 0, duration: 1.5})
    }
  },
  mounted(){
    // Setup
    const canvas = document.getElementById('scene3D')
    const scene =  new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.01, 20)
    camera.position.z = 5

    const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true })
    renderer.setClearColor( 0x000000, 0 )
    renderer.setSize(window.innerWidth, window.innerHeight)

    // Light
    const pointLight = new THREE.PointLight(0xff0000, 1, 100 )
    pointLight.position.set(2, 2, 3)
    scene.add(pointLight)

    const ambiantLight = new THREE.AmbientLight(0xff0000, 0.2)
    scene.add(ambiantLight)

    // Meshes 
    this.shader = new THREE.ShaderMaterial({
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexColors: true,
      transparent: true,
      uniforms: {
        uTime: { value: 0},
        uStrenght: { value: 1.0},
        uAlpha: { value: 0 }
      },
      vertexShader: `
      vec4 permute(vec4 x)
      {
        return mod(((x*34.0)+1.0)*x, 289.0);
      }
      vec4 taylorInvSqrt(vec4 r)
      {
        return 1.79284291400159 - 0.85373472095314 * r;
      }
      vec3 fade(vec3 t)
      {
        return t*t*t*(t*(t*6.0-15.0)+10.0);
      }

      float cnoise(vec3 P)
      {
        vec3 Pi0 = floor(P); // Integer part for indexing
        vec3 Pi1 = Pi0 + vec3(1.0); // Integer part + 1
        Pi0 = mod(Pi0, 289.0);
        Pi1 = mod(Pi1, 289.0);
        vec3 Pf0 = fract(P); // Fractional part for interpolation
        vec3 Pf1 = Pf0 - vec3(1.0); // Fractional part - 1.0
        vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
        vec4 iy = vec4(Pi0.yy, Pi1.yy);
        vec4 iz0 = Pi0.zzzz;
        vec4 iz1 = Pi1.zzzz;

        vec4 ixy = permute(permute(ix) + iy);
        vec4 ixy0 = permute(ixy + iz0);
        vec4 ixy1 = permute(ixy + iz1);

        vec4 gx0 = ixy0 / 7.0;
        vec4 gy0 = fract(floor(gx0) / 7.0) - 0.5;
        gx0 = fract(gx0);
        vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
        vec4 sz0 = step(gz0, vec4(0.0));
        gx0 -= sz0 * (step(0.0, gx0) - 0.5);
        gy0 -= sz0 * (step(0.0, gy0) - 0.5);

        vec4 gx1 = ixy1 / 7.0;
        vec4 gy1 = fract(floor(gx1) / 7.0) - 0.5;
        gx1 = fract(gx1);
        vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
        vec4 sz1 = step(gz1, vec4(0.0));
        gx1 -= sz1 * (step(0.0, gx1) - 0.5);
        gy1 -= sz1 * (step(0.0, gy1) - 0.5);

        vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
        vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
        vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
        vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
        vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
        vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
        vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
        vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);

        vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
        g000 *= norm0.x;
        g010 *= norm0.y;
        g100 *= norm0.z;
        g110 *= norm0.w;
        vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
        g001 *= norm1.x;
        g011 *= norm1.y;
        g101 *= norm1.z;
        g111 *= norm1.w;

        float n000 = dot(g000, Pf0);
        float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
        float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
        float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
        float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
        float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
        float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
        float n111 = dot(g111, Pf1);

        vec3 fade_xyz = fade(Pf0);
        vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
        vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
        float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x); 
        return 2.2 * n_xyz;
      }

      uniform float uTime;     
      uniform float uStrenght;    

      void main(){
        float uFrequency = 2.0;
        float uSpeed = 0.2;
                  
        float noise = cnoise(normal * uFrequency + uTime * uSpeed) * uStrenght;
        vec3 newPos = position + normal * noise;

        // Position
        vec4 modelPosition = modelMatrix * vec4(newPos, 1.0);          
        vec4 viewPosition = viewMatrix * modelPosition;
        vec4 projectedPosition = projectionMatrix * viewPosition;
        gl_Position = projectedPosition;

        gl_PointSize = 1.0;
      }
      `,
      fragmentShader: `       
      varying float offset;

      uniform float uAlpha;  

      void main(){        
        gl_FragColor = vec4(1.0, 1.0, 1.0, uAlpha);
      }
      `
    })

    const mesh = new THREE.Points(new THREE.SphereGeometry(1, 100, 100), this.shader)
    mesh.position.set(1.5, 1.5, 0)
    scene.add(mesh)

    // MouseMove Animation
    let canvasBox = canvas.getBoundingClientRect()
    let baseRotation = {
      x: 0,
      y: 0
    }
    canvas.addEventListener('mousemove', event =>  {
      let x = event.offsetX - canvasBox.width
      let y = event.offsetY - canvasBox.height

      x /= canvasBox.width / 4
      y /= canvasBox.height / 4

      gsap.to(baseRotation, {x: -y, duration: 1.0, ease: "slow(-1.0, -1.0, false)" })
      gsap.to(baseRotation, {y: x, duration: 1.0, ease: "slow(-1.0, -1.0, false)" })
    })    

    this.updateMeshPos = function(x, y) {
      gsap.to(mesh.position, {x: x, duration: 3.0, ease: "slow(-1.0, -1.0, false)" })
      gsap.to(mesh.position, {y: y, duration: 3.0, ease: "slow(-1.0, -1.0, false)" })
    }    

    // Loop
    const clock = new THREE.Clock()
    //const local = this
    const tick = () => {
      const elapsedTime = clock.getElapsedTime()

      // Animation
      if (mesh){        
        mesh.rotation.x = baseRotation.x
        mesh.rotation.y = baseRotation.y
      }

      this.shader.uniforms.uTime.value = elapsedTime

      // Render
      renderer.render(scene, camera)

      // Loop
      window.requestAnimationFrame(tick)
    }
    tick()

    // Window resize
    window.addEventListener('resize', () =>
    {
      // Canvas Size
      canvasBox = canvas.getBoundingClientRect()

      // Update camera
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()

      // Update renderer
      renderer.setSize(window.innerWidth, window.innerHeight)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    })
  }
}
</script>

<style scoped>
#scene3D
{
  position: fixed;
  top: 0;
  left: 0;
  z-index: 0;
}

</style>