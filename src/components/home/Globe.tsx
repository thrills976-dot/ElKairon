import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import GlobeGL from 'globe.gl';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';

const EARTH_IMG_URL = 'https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg';
const EARTH_BUMP_URL = 'https://unpkg.com/three-globe/example/img/earth-topology.png';
const GLOBE_RADIUS = 100;

// Recruitment Hub Coordinates & Migration Corridors
const HUBS = [
  { name: 'Lagos', lat: 6.5244, lng: 3.3792, type: 'origin', color: '#f59e0b' },
  { name: 'Nairobi', lat: -1.2921, lng: 36.8219, type: 'origin', color: '#f59e0b' },
  { name: 'Accra', lat: 5.6037, lng: -0.1870, type: 'origin', color: '#f59e0b' },
  { name: 'Johannesburg', lat: -26.2041, lng: 28.0473, type: 'origin', color: '#f59e0b' },
  { name: 'Kigali', lat: -1.9706, lng: 30.1044, type: 'origin', color: '#f59e0b' },
  { name: 'London', lat: 51.5074, lng: -0.1278, type: 'dest', color: '#38bdf8' },
  { name: 'Frankfurt', lat: 50.1109, lng: 8.6821, type: 'dest', color: '#38bdf8' },
  { name: 'Amsterdam', lat: 52.3676, lng: 4.9041, type: 'dest', color: '#38bdf8' },
  { name: 'Dubai', lat: 25.2048, lng: 55.2708, type: 'dest', color: '#38bdf8' },
];

const CORRIDOR_ARCS = [
  { startLat: 6.5244, startLng: 3.3792, endLat: 51.5074, endLng: -0.1278, name: 'Lagos → London' },
  { startLat: -1.2921, startLng: 36.8219, endLat: 50.1109, endLng: 8.6821, name: 'Nairobi → Frankfurt' },
  { startLat: 5.6037, startLng: -0.1870, endLat: 52.3676, endLng: 4.9041, name: 'Accra → Amsterdam' },
  { startLat: -26.2041, startLng: 28.0473, endLat: 25.2048, endLng: 55.2708, name: 'Johannesburg → Dubai' },
  { startLat: -1.9706, startLng: 30.1044, endLat: 51.5074, endLng: -0.1278, name: 'Kigali → London' },
  { startLat: 6.5244, startLng: 3.3792, endLat: 25.2048, endLng: 55.2708, name: 'Lagos → Dubai' },
];

export function Globe() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Setup the Globe with Crisp Visual Fidelity
    // @ts-ignore
    const myGlobe = GlobeGL({ animateIn: false })(containerRef.current)
      .globeImageUrl(EARTH_IMG_URL)
      .bumpImageUrl(EARTH_BUMP_URL)
      .backgroundColor('rgba(0,0,0,0)')
      .showAtmosphere(true)
      .atmosphereColor('#38bdf8')
      .atmosphereAltitude(0.18)
      // Active Relocation Corridors (Arcs)
      .arcsData(CORRIDOR_ARCS)
      .arcColor(() => ['#f59e0b', '#38bdf8'])
      .arcAltitude(0.28)
      .arcStroke(1.8)
      .arcDashLength(0.4)
      .arcDashGap(0.2)
      .arcDashAnimateTime(2000)
      // Key Hubs (Points)
      .pointsData(HUBS)
      .pointLat((d: any) => d.lat)
      .pointLng((d: any) => d.lng)
      .pointColor((d: any) => d.color)
      .pointAltitude(0.02)
      .pointRadius(1.2)
      // Pulsing Hub Rings
      .ringsData(HUBS)
      .ringLat((d: any) => d.lat)
      .ringLng((d: any) => d.lng)
      .ringColor((d: any) => (t: number) => d.type === 'origin' ? `rgba(245, 158, 11, ${1 - t})` : `rgba(56, 189, 248, ${1 - t})`)
      .ringMaxRadius(3.5)
      .ringPropagationSpeed(1.8)
      .ringRepeatPeriod(1200);

    // Enhance Earth Material for High Clarity & Vibrancy
    const globeMaterial = myGlobe.globeMaterial() as THREE.MeshStandardMaterial;
    globeMaterial.bumpScale = 16;
    globeMaterial.roughness = 0.4;
    globeMaterial.metalness = 0.15;

    // High-Definition Multi-Light Setup
    const sunLight = new THREE.DirectionalLight(0xffffff, 5.5);
    sunLight.position.set(250, 160, 280);
    myGlobe.scene().add(sunLight);

    const warmFill = new THREE.DirectionalLight(0xfef08a, 2.0);
    warmFill.position.set(-200, 200, 150);
    myGlobe.scene().add(warmFill);

    const rimLight = new THREE.DirectionalLight(0x38bdf8, 4.0);
    rimLight.position.set(-300, -100, -300);
    myGlobe.scene().add(rimLight);

    const ambientLight = new THREE.AmbientLight(0xffffff, 2.2);
    myGlobe.scene().add(ambientLight);

    // 1. Universal Studios 3D Golden Text
    const textString = "ELKAIRON GLOBAL CONNECT";
    const textGroup = new THREE.Group();
    myGlobe.scene().add(textGroup);

    const loader = new FontLoader();
    loader.load('https://unpkg.com/three@0.160.0/examples/fonts/helvetiker_bold.typeface.json', function (font) {
      const textMaterial = new THREE.MeshStandardMaterial({ 
        color: 0xffb703, // Rich Gold
        emissive: 0x4a2800,
        metalness: 0.95,
        roughness: 0.15,
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
      const material = new THREE.MeshStandardMaterial({ 
        color: 0xffffff, 
        metalness: 0.9, 
        roughness: 0.15 
      });
      
      const fuselageGeo = new THREE.ConeGeometry(1.6, 8.5, 8);
      fuselageGeo.rotateX(Math.PI / 2); 
      const fuselage = new THREE.Mesh(fuselageGeo, material);
      group.add(fuselage);
      
      const wingGeo = new THREE.BoxGeometry(10.5, 0.5, 3.2);
      const wings = new THREE.Mesh(wingGeo, material);
      wings.position.set(0, 0, 1); 
      group.add(wings);
      
      const tailGeo = new THREE.BoxGeometry(3.2, 3.2, 1.6);
      const tail = new THREE.Mesh(tailGeo, material);
      tail.position.set(0, 1.6, -3.2);
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
      
      plane.position.z = GLOBE_RADIUS * 1.16; 
      plane.rotation.x = -Math.PI / 2;
      
      orbitGroup.add(plane);
      planesGroup.add(orbitGroup);
      
      planes.push({
        group: orbitGroup,
        speed: 0.0035 + Math.random() * 0.002,
        offset: Math.random() * Math.PI * 2
      });
    }

    // 3. Animation & Rotation Loop
    let animationFrameId: number;
    let time = 0;
    function animate() {
      animationFrameId = requestAnimationFrame(animate);
      time += 0.05;
      
      if (textGroup) {
        textGroup.rotation.y -= 0.0022;
      }
      
      planes.forEach((p) => {
        p.group.rotation.z -= p.speed; 
        p.group.children[0].position.z = GLOBE_RADIUS * 1.16 + Math.sin(time + p.offset) * 2;
        p.group.children[0].rotation.z = Math.sin(time * 0.5 + p.offset) * 0.1;
      });
    }
    animate();

    // Responsive sizing and altitude calibrated for clear framing
    const getTargetAltitude = (w: number) => (w < 640 ? 3.0 : w < 1024 ? 2.8 : 2.65);

    // Initial cinematic point of view focused on African continent & corridors
    myGlobe.controls().autoRotate = false;
    myGlobe.controls().enableZoom = false; 
    myGlobe.pointOfView({ lat: 60, lng: -150, altitude: 5.5 });

    const zoomTimeout = setTimeout(() => {
      const initialWidth = containerRef.current?.clientWidth || window.innerWidth;
      myGlobe.pointOfView({ lat: 12, lng: 18, altitude: getTargetAltitude(initialWidth) }, 3200);
    }, 150);

    const controlTimeout = setTimeout(() => {
      myGlobe.controls().autoRotate = true;
      myGlobe.controls().autoRotateSpeed = 0.65;
    }, 3400);

    const handleResize = () => {
      if (containerRef.current) {
        const width = containerRef.current.clientWidth || window.innerWidth;
        const height = containerRef.current.clientHeight || 480;
        myGlobe.width(width);
        myGlobe.height(height);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);

    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      resizeObserver.disconnect();
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
