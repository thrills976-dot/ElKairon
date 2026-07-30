import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import GlobeGL from 'globe.gl';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';

const EARTH_IMG_URL = 'https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg';
const EARTH_BUMP_URL = 'https://unpkg.com/three-globe/example/img/earth-topology.png';
const GLOBE_RADIUS = 100;

export function Globe() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Setup the Globe
    // @ts-ignore
    const myGlobe = GlobeGL({ animateIn: false })(containerRef.current)
      .globeImageUrl(EARTH_IMG_URL)
      .bumpImageUrl(EARTH_BUMP_URL)
      .backgroundColor('rgba(0,0,0,0)')
      .showAtmosphere(true)
      .atmosphereColor('#0ea5e9')
      .atmosphereAltitude(0.2);

    // Enhance Earth Material
    const globeMaterial = myGlobe.globeMaterial() as THREE.MeshStandardMaterial;
    globeMaterial.bumpScale = 12;
    globeMaterial.roughness = 0.5;
    globeMaterial.metalness = 0.15;

    // Cinematic Lighting
    const sunLight = new THREE.DirectionalLight(0xffffff, 6.0);
    sunLight.position.set(200, 100, 300);
    myGlobe.scene().add(sunLight);

    const rimLight = new THREE.DirectionalLight(0x0ea5e9, 5.0);
    rimLight.position.set(-300, -100, -300);
    myGlobe.scene().add(rimLight);

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
    myGlobe.scene().add(ambientLight);

    // 1. Universal Studios 3D Golden Text
    const textString = "ELKAIRON GLOBAL CONNECT";
    const textGroup = new THREE.Group();
    myGlobe.scene().add(textGroup);

    const loader = new FontLoader();
    loader.load('https://unpkg.com/three@0.160.0/examples/fonts/helvetiker_bold.typeface.json', function (font) {
      const textMaterial = new THREE.MeshStandardMaterial({ 
        color: 0xffaa00, // Gold
        emissive: 0x442200,
        metalness: 1.0,
        roughness: 0.2,
      });
      
      const radius = GLOBE_RADIUS * 1.35; 
      const arcSpread = Math.PI * 1.1; 
      const startAngle = -arcSpread / 2;
      const angleStep = arcSpread / (textString.length - 1);
      
      for (let i = 0; i < textString.length; i++) {
        const char = textString[i];
        if (char === ' ') continue;
        
        const textGeo = new TextGeometry(char, {
          font: font,
          size: 11,
          depth: 4, 
          curveSegments: 12,
          bevelEnabled: true,
          bevelThickness: 0.5,
          bevelSize: 0.3,
          bevelOffset: 0,
          bevelSegments: 5
        });
        
        textGeo.center();
        const textMesh = new THREE.Mesh(textGeo, textMaterial);
        
        const angle = startAngle + (i * angleStep);
        
        textMesh.position.x = radius * Math.sin(angle);
        textMesh.position.z = radius * Math.cos(angle);
        textMesh.rotation.y = angle;
        
        textGroup.add(textMesh);
      }
    });

    // 2. Flying Airplanes
    const planesGroup = new THREE.Group();
    myGlobe.scene().add(planesGroup);

    function createPlane() {
      const group = new THREE.Group();
      const material = new THREE.MeshStandardMaterial({ color: 0xffffff, metalness: 0.8, roughness: 0.2 });
      
      const fuselageGeo = new THREE.ConeGeometry(1.5, 8, 8);
      fuselageGeo.rotateX(Math.PI / 2); 
      const fuselage = new THREE.Mesh(fuselageGeo, material);
      group.add(fuselage);
      
      const wingGeo = new THREE.BoxGeometry(10, 0.5, 3);
      const wings = new THREE.Mesh(wingGeo, material);
      wings.position.set(0, 0, 1); 
      group.add(wings);
      
      const tailGeo = new THREE.BoxGeometry(3, 3, 1.5);
      const tail = new THREE.Mesh(tailGeo, material);
      tail.position.set(0, 1.5, -3);
      group.add(tail);
      
      return group;
    }

    const numPlanes = 4;
    const planes: { group: THREE.Group, speed: number, offset: number }[] = [];

    for (let i = 0; i < numPlanes; i++) {
      const plane = createPlane();
      
      const orbitGroup = new THREE.Group();
      orbitGroup.rotation.x = Math.random() * Math.PI * 2;
      orbitGroup.rotation.y = Math.random() * Math.PI * 2;
      
      plane.position.z = GLOBE_RADIUS * 1.15; 
      plane.rotation.x = -Math.PI / 2;
      
      orbitGroup.add(plane);
      planesGroup.add(orbitGroup);
      
      planes.push({
        group: orbitGroup,
        speed: 0.003 + Math.random() * 0.002,
        offset: Math.random() * Math.PI * 2
      });
    }

    // 3. Animation & Intro Sequence
    let animationFrameId: number;
    let time = 0;
    function animate() {
      animationFrameId = requestAnimationFrame(animate);
      time += 0.05;
      
      if (textGroup) {
        textGroup.rotation.y -= 0.002;
      }
      
      planes.forEach((p, idx) => {
        p.group.rotation.z -= p.speed; 
        // Smoother flight bobbing
        p.group.children[0].position.z = GLOBE_RADIUS * 1.15 + Math.sin(time + p.offset) * 2;
        p.group.children[0].rotation.z = Math.sin(time * 0.5 + p.offset) * 0.1;
      });
    }
    animate();

    // Responsive sizing and altitude
    const isMobile = window.innerWidth < 768;
    const targetAltitude = isMobile ? 3.2 : 2.2;

    // Cinematic Intro Setup
    myGlobe.controls().autoRotate = false;
    myGlobe.controls().enableZoom = false; 
    myGlobe.pointOfView({ lat: 60, lng: -150, altitude: 6 });

    const zoomTimeout = setTimeout(() => {
      myGlobe.pointOfView({ lat: 10, lng: 0, altitude: targetAltitude }, 4000);
    }, 200);

    const controlTimeout = setTimeout(() => {
      myGlobe.controls().enableZoom = true;
      myGlobe.controls().autoRotate = true;
      myGlobe.controls().autoRotateSpeed = 0.5;
    }, 4200);

    const handleResize = () => {
      if (containerRef.current) {
        myGlobe.width(containerRef.current.clientWidth);
        myGlobe.height(containerRef.current.clientHeight);
      }
    };
    
    // Initial size
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      clearTimeout(zoomTimeout);
      clearTimeout(controlTimeout);
      myGlobe._destructor();
    };
  }, []);

  return (
    <div className="w-full h-full relative group">
      <div 
        ref={containerRef} 
        className="w-full h-full absolute inset-0 pointer-events-auto cursor-grab active:cursor-grabbing"
      />
    </div>
  );
}
