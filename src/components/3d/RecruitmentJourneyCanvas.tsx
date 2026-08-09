import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface JourneyCanvasProps {
  scrollProgress?: number;
}

export function RecruitmentJourneyCanvas({ scrollProgress = 0 }: JourneyCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const globeGroupRef = useRef<THREE.Group | null>(null);
  const arcsGroupRef = useRef<THREE.Group | null>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Scene Setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.fog = new THREE.FogExp2(0x051329, 0.015);

    // 2. Camera Setup
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 24);
    cameraRef.current = camera;

    // 3. Renderer Setup
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. Main Globe Group
    const globeGroup = new THREE.Group();
    scene.add(globeGroup);
    globeGroupRef.current = globeGroup;

    // A. Wireframe Inner Sphere (Subtle Navy/Gold)
    const sphereGeo = new THREE.IcosahedronGeometry(7, 3);
    const sphereMat = new THREE.MeshBasicMaterial({
      color: 0x0f766e,
      wireframe: true,
      transparent: true,
      opacity: 0.12,
    });
    const sphereMesh = new THREE.Mesh(sphereGeo, sphereMat);
    globeGroup.add(sphereMesh);

    // B. Point Cloud Outer Globe (Gold & Teal Particles)
    const particleCount = 1200;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    
    const colorGold = new THREE.Color(0xd4af37);
    const colorTeal = new THREE.Color(0x2dd4bf);
    const colorSky = new THREE.Color(0x38bdf8);

    for (let i = 0; i < particleCount; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const radius = 7.2 + (Math.random() - 0.5) * 0.4;

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      const mixedColor = Math.random() > 0.6 ? colorGold : (Math.random() > 0.3 ? colorTeal : colorSky);
      colors[i * 3] = mixedColor.r;
      colors[i * 3 + 1] = mixedColor.g;
      colors[i * 3 + 2] = mixedColor.b;
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.18,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    globeGroup.add(particleSystem);

    // C. Major Global Recruitment Hubs (Harare, Berlin, London, Dubai, Sydney, Toronto)
    const hubs = [
      { name: 'Harare', lat: -17.82, lon: 31.05, color: 0xd4af37 },
      { name: 'London', lat: 51.50, lon: -0.12, color: 0x2dd4bf },
      { name: 'Berlin', lat: 52.52, lon: 13.40, color: 0xe5c158 },
      { name: 'Dubai', lat: 25.20, lon: 55.27, color: 0x38bdf8 },
      { name: 'Sydney', lat: -33.86, lon: 151.20, color: 0x5eead4 },
      { name: 'Toronto', lat: 43.65, lon: -79.38, color: 0xd4af37 },
      { name: 'Amsterdam', lat: 52.36, lon: 4.90, color: 0x2dd4bf },
      { name: 'Oslo', lat: 59.91, lon: 10.75, color: 0x38bdf8 }
    ];

    function latLonToVector3(lat: number, lon: number, radius: number) {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lon + 180) * (Math.PI / 180);
      const x = -(radius * Math.sin(phi) * Math.cos(theta));
      const z = radius * Math.sin(phi) * Math.sin(theta);
      const y = radius * Math.cos(phi);
      return new THREE.Vector3(x, y, z);
    }

    const hubPositions: THREE.Vector3[] = [];
    hubs.forEach(h => {
      const pos = latLonToVector3(h.lat, h.lon, 7.3);
      hubPositions.push(pos);

      // Glowing Hub Marker
      const meshGeo = new THREE.SphereGeometry(0.22, 16, 16);
      const meshMat = new THREE.MeshBasicMaterial({ color: h.color, transparent: true, opacity: 0.9 });
      const mesh = new THREE.Mesh(meshGeo, meshMat);
      mesh.position.copy(pos);
      globeGroup.add(mesh);

      // Outer Pulse Ring
      const ringGeo = new THREE.RingGeometry(0.3, 0.45, 16);
      const ringMat = new THREE.MeshBasicMaterial({ color: h.color, side: THREE.DoubleSide, transparent: true, opacity: 0.5 });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.position.copy(pos);
      ring.lookAt(new THREE.Vector3(0,0,0));
      globeGroup.add(ring);
    });

    // D. Flight Arcs connecting Harare (Index 0) to other Hubs
    const arcsGroup = new THREE.Group();
    globeGroup.add(arcsGroup);
    arcsGroupRef.current = arcsGroup;

    const hararePos = hubPositions[0];
    const arcParticles: { mesh: THREE.Mesh; curve: THREE.QuadraticBezierCurve3; speed: number; progress: number }[] = [];

    for (let i = 1; i < hubPositions.length; i++) {
      const targetPos = hubPositions[i];
      const midPoint = new THREE.Vector3().addVectors(hararePos, targetPos).multiplyScalar(0.5);
      const distance = hararePos.distanceTo(targetPos);
      midPoint.normalize().multiplyScalar(7.3 + distance * 0.28);

      const curve = new THREE.QuadraticBezierCurve3(hararePos, midPoint, targetPos);
      const points = curve.getPoints(40);
      const arcGeo = new THREE.BufferGeometry().setFromPoints(points);

      const arcMat = new THREE.LineBasicMaterial({
        color: i % 2 === 0 ? 0xd4af37 : 0x2dd4bf,
        transparent: true,
        opacity: 0.45,
      });
      const arcLine = new THREE.Line(arcGeo, arcMat);
      arcsGroup.add(arcLine);

      // Moving Flight Pulse Light along Arc
      const pulseGeo = new THREE.SphereGeometry(0.12, 8, 8);
      const pulseMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.95 });
      const pulseMesh = new THREE.Mesh(pulseGeo, pulseMat);
      arcsGroup.add(pulseMesh);

      arcParticles.push({
        mesh: pulseMesh,
        curve,
        speed: 0.003 + Math.random() * 0.003,
        progress: Math.random(),
      });
    }

    // 5. Mouse Parallax Handler
    const handleMouseMove = (e: MouseEvent) => {
      const halfW = window.innerWidth / 2;
      const halfH = window.innerHeight / 2;
      mouseRef.current.targetX = (e.clientX - halfW) / halfW;
      mouseRef.current.targetY = (e.clientY - halfH) / halfH;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // 6. Resize Observer
    const handleResize = () => {
      if (!container || !rendererRef.current || !cameraRef.current) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // 7. Render Loop
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Smooth Mouse Lerp
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      if (globeGroupRef.current) {
        // Continuous slow globe rotation
        globeGroupRef.current.rotation.y += 0.0018;
        globeGroupRef.current.rotation.x = mouseRef.current.y * 0.2;
        globeGroupRef.current.rotation.z = mouseRef.current.x * 0.15;
      }

      // Update Arc Flight Pulses
      arcParticles.forEach(p => {
        p.progress += p.speed;
        if (p.progress > 1) p.progress = 0;
        const pt = p.curve.getPoint(p.progress);
        p.mesh.position.copy(pt);
      });

      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (container && rendererRef.current) {
        container.removeChild(rendererRef.current.domElement);
      }
      renderer.dispose();
    };
  }, []);

  // Update camera or rotation based on scrollProgress
  useEffect(() => {
    if (globeGroupRef.current) {
      globeGroupRef.current.position.y = (scrollProgress - 0.5) * 4;
      globeGroupRef.current.rotation.y = scrollProgress * Math.PI * 2;
    }
  }, [scrollProgress]);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 pointer-events-none z-0 w-full h-full opacity-60 sm:opacity-80"
    />
  );
}
