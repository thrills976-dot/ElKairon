import { useEffect, useRef } from "react";
import GlobeJS from "globe.gl";
import * as THREE from "three";
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';

// Constants
const EARTH_IMG_URL = 'https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg';
const EARTH_BUMP_URL = 'https://unpkg.com/three-globe/example/img/earth-topology.png';
const GLOBE_RADIUS = 100; // Standard Globe.gl radius

export function Globe() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    // Setup the Globe
    const myGlobe = (GlobeJS as any)({ animateIn: false })(container)
        .globeImageUrl(EARTH_IMG_URL)
        .bumpImageUrl(EARTH_BUMP_URL)
        .backgroundColor('rgba(0,0,0,0)') // Kept transparent to blend with Hero section
        
        // Cinematic Atmosphere
        .showAtmosphere(true)
        .atmosphereColor('#0ea5e9')
        .atmosphereAltitude(0.2);

    // Enhance Earth Material
    const globeMaterial = myGlobe.globeMaterial();
    // @ts-ignore
    globeMaterial.bumpScale = 10;
    // @ts-ignore
    globeMaterial.roughness = 0.6;
    // @ts-ignore
    globeMaterial.metalness = 0.1;

    // Lighting for Cinematic Effect
    const sunLight = new THREE.DirectionalLight(0xffffff, 3);
    sunLight.position.set(500, 300, 500);
    myGlobe.scene().add(sunLight);

    const fillLight = new THREE.DirectionalLight(0x0ea5e9, 2);
    fillLight.position.set(-500, -300, -500);
    myGlobe.scene().add(fillLight);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    myGlobe.scene().add(ambientLight);

    // ==========================================
    // 1. Universal Studios 3D Golden Text
    // ==========================================
    const textString = "ELKAIRON GLOBAL CONNECT";
    const textGroup = new THREE.Group();
    // Distinct upward tilt matching the Universal logo
    textGroup.rotation.x = 0; // Flat orbit 
    myGlobe.scene().add(textGroup);

    const loader = new FontLoader();
    loader.load('/fonts/helvetiker_bold.typeface.json', 
      function (font) {
        const textMaterial = new THREE.MeshStandardMaterial({ 
            color: 0xffd700, // Brighter pure gold
            emissive: 0x4a2a00, // Warmer internal glow
            metalness: 0.9,
            roughness: 0.15,
        });
        
        // Push radius slightly out to fit larger letters
        const radius = GLOBE_RADIUS * 1.55; 
        // Spread letters out a bit more so they wrap properly around the front
        const arcSpread = Math.PI * 1.25; 
        const startAngle = -arcSpread / 2;
        const angleStep = arcSpread / (textString.length - 1);
        
        for (let i = 0; i < textString.length; i++) {
            const char = textString[i];
            if (char === ' ') continue;
            
            const textGeo = new TextGeometry(char, {
                font: font,
                size: 24, // Much larger text
                depth: 10, // Thicker 3D extrusion
                curveSegments: 12,
                bevelEnabled: true,
                bevelThickness: 1.2,
                bevelSize: 0.6,
                bevelOffset: 0,
                bevelSegments: 5
            });
            
            textGeo.center();
            const textMesh = new THREE.Mesh(textGeo, textMaterial);
            
            const angle = startAngle + (i * angleStep);
            
            // Position on the X-Z plane
            textMesh.position.x = radius * Math.sin(angle);
            textMesh.position.z = radius * Math.cos(angle);
            
            // Rotate text to face outwards perfectly
            textMesh.rotation.y = angle;
            
            textGroup.add(textMesh);
        }
    },
    undefined,
    function (error) {
        console.error('An error happened while loading the font:', error);
    });

    // ==========================================
    // 2. Flying Airplanes
    // ==========================================
    const planesGroup = new THREE.Group();
    myGlobe.scene().add(planesGroup);

    function createPlane() {
        const group = new THREE.Group();
        const material = new THREE.MeshStandardMaterial({ color: 0xffffff, metalness: 0.5, roughness: 0.2 });
        
        // Fuselage
        const fuselageGeo = new THREE.ConeGeometry(1.5, 8, 8);
        fuselageGeo.rotateX(Math.PI / 2); 
        const fuselage = new THREE.Mesh(fuselageGeo, material);
        group.add(fuselage);
        
        // Wings
        const wingGeo = new THREE.BoxGeometry(10, 0.5, 3);
        const wings = new THREE.Mesh(wingGeo, material);
        wings.position.set(0, 0, 1); 
        group.add(wings);
        
        // Tail
        const tailGeo = new THREE.BoxGeometry(3, 3, 1.5);
        const tail = new THREE.Mesh(tailGeo, material);
        tail.position.set(0, 1.5, -3);
        group.add(tail);
        
        return group;
    }

    const numPlanes = 4;
    const planes: any[] = [];
    for (let i = 0; i < numPlanes; i++) {
        const plane = createPlane();
        
        const orbitGroup = new THREE.Group();
        // Randomize orbit angle
        orbitGroup.rotation.x = Math.random() * Math.PI * 2;
        orbitGroup.rotation.y = Math.random() * Math.PI * 2;
        
        // Place plane altitude between globe (100) and text (135)
        plane.position.z = GLOBE_RADIUS * 1.15; 
        
        // Adjust plane orientation to fly forward along the orbit
        plane.rotation.x = -Math.PI / 2;
        
        orbitGroup.add(plane);
        planesGroup.add(orbitGroup);
        
        planes.push({
            group: orbitGroup,
            speed: 0.004 + Math.random() * 0.004
        });
    }

    // ==========================================
    // 3. Animation & Intro Sequence
    // ==========================================
    let animationFrameId: number;

    // Continuous custom animations
    function animate() {
        animationFrameId = requestAnimationFrame(animate);
        
        // Text orbits the globe (Universal Studios style speed and direction)
        if (textGroup) {
            textGroup.rotation.y += 0.012; // Left to right orbit
        }
        
        // Planes fly along their orbits
        planes.forEach(p => {
            p.group.rotation.z -= p.speed; // Orbit around Z axis pushes the plane forward
        });
    }
    animate();

    // Cinematic Intro Setup
    myGlobe.controls().autoRotate = false;
    myGlobe.controls().enableZoom = false; // Prevent user interference during intro

    // Start camera far away and angled
    myGlobe.pointOfView({ lat: 60, lng: -150, altitude: 5 });

    const timeout1 = setTimeout(() => {
        // Epic slow zoom-in to the front of the globe
        const isMobile = window.innerWidth < 768;
        const targetAltitude = isMobile ? 4.5 : 2.8;
        myGlobe.pointOfView({ lat: 15, lng: 0, altitude: targetAltitude }, 5000);
    }, 200);

    const timeout2 = setTimeout(() => {
        // Intro finished: Enable user controls and auto-rotation
        myGlobe.controls().enableZoom = true;
        myGlobe.controls().autoRotate = true;
        myGlobe.controls().autoRotateSpeed = 0.8;
    }, 5200);

    // Handle Resize
    const handleResize = () => {
      if (container) {
        myGlobe.width(container.clientWidth);
        myGlobe.height(container.clientHeight);
      }
    };
    window.addEventListener("resize", handleResize);
    
    // Initial size
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      clearTimeout(timeout1);
      clearTimeout(timeout2);
      if (myGlobe && container) {
        container.innerHTML = '';
      }
    };
  }, []);

  return (
    <div className="w-full h-full relative group">
      <div
        ref={containerRef}
        className="w-full h-full absolute inset-0 cursor-grab active:cursor-grabbing pointer-events-auto"
        style={{ minHeight: "600px" }}
      />
    </div>
  );
}
