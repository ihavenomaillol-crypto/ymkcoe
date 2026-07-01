import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { motion } from "framer-motion";

export type AIDSDeptContent = {
  name: string;
  short: string;
  about: string[];
  vision: string;
  mission: string[];
};

type Props = { dept: AIDSDeptContent };

export function AIDSRoboReveal({ dept }: Props) {
  const mountRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const infoLineRef = useRef<HTMLSpanElement>(null);
  const visionLineRef = useRef<HTMLSpanElement>(null);
  const missionLineRef = useRef<HTMLSpanElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const floorLineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    const section = sectionRef.current;
    if (!mount || !section) return;

    const scrollEl = document.querySelector("main") as HTMLElement | null;
    const W = mount.clientWidth, H = mount.clientHeight;
    
    // Create WebGL Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    // Create Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, W / H, 0.1, 100);
    camera.position.set(0, 0, 4.5);
    camera.lookAt(0, 0, 0);

    // Add Lights (Cool Blue/Indigo tones matching CSE)
    scene.add(new THREE.AmbientLight(0x0a101f, 1.5));
    const blueLight = new THREE.PointLight(0x06b6d4, 4.0, 8); // Intense cyan point light in center
    blueLight.position.set(0, 0, 0);
    scene.add(blueLight);

    const keyLight = new THREE.DirectionalLight(0x3b82f6, 1.8); // Blue key light
    keyLight.position.set(5, 3, 5);
    scene.add(keyLight);

    // ----------------------------------------------------
    // BUILD JARVIS NEURAL NETWORK CLUSTER
    // ----------------------------------------------------
    const clusterGroup = new THREE.Group();
    scene.add(clusterGroup);

    // Load YMKCOE Logo Texture
    const logoTexture = new THREE.TextureLoader().load("/ymkcoe_logo.png");
    const logoMat = new THREE.SpriteMaterial({
      map: logoTexture,
      transparent: true,
      opacity: 0.95,
      blending: THREE.NormalBlending
    });
    
    // Create Logo Sprite in place of the white core sphere
    const logoSprite = new THREE.Sprite(logoMat);
    logoSprite.scale.set(0.48, 0.48, 1);
    clusterGroup.add(logoSprite);

    // Outer core glow sphere (Cyan nebulous aura)
    const glowGeo = new THREE.SphereGeometry(0.35, 32, 32);
    const glowMat = new THREE.MeshBasicMaterial({
      color: 0x06b6d4, // Cyan glow
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
    });
    const glowMesh = new THREE.Mesh(glowGeo, glowMat);
    clusterGroup.add(glowMesh);

    // 2. Inner Neural Network Shell (130 nodes connected by webs)
    const nodeCount = 130;
    const nodeGeo = new THREE.BufferGeometry();
    const nodePositions: THREE.Vector3[] = [];
    const rawPositions = new Float32Array(nodeCount * 3);
    interface NodeConfig {
      theta: number;
      phi: number;
      baseR: number;
      phase: number;
      speed: number;
    }
    const nodeConfigs: NodeConfig[] = []; // Store original coordinates for morphing animation

    for (let i = 0; i < nodeCount; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 0.8 + Math.random() * 0.25;

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      rawPositions[i * 3] = x;
      rawPositions[i * 3 + 1] = y;
      rawPositions[i * 3 + 2] = z;

      const pos = new THREE.Vector3(x, y, z);
      nodePositions.push(pos);
      nodeConfigs.push({
        theta,
        phi,
        baseR: r,
        phase: Math.random() * Math.PI * 2,
        speed: 0.8 + Math.random() * 1.2
      });
    }

    nodeGeo.setAttribute("position", new THREE.BufferAttribute(rawPositions, 3));
    const nodeMat = new THREE.PointsMaterial({
      color: 0x3b82f6, // Blue nodes
      size: 0.035,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
    });
    const neuralNodes = new THREE.Points(nodeGeo, nodeMat);
    clusterGroup.add(neuralNodes);

    // Neural Synapse Connections (Cyan lines)
    const synapseGeo = new THREE.BufferGeometry();
    const synapseMat = new THREE.LineBasicMaterial({
      color: 0x06b6d4, // Cyan lines
      transparent: true,
      opacity: 0.28,
      blending: THREE.AdditiveBlending,
    });
    const synapseLines = new THREE.LineSegments(synapseGeo, synapseMat);
    clusterGroup.add(synapseLines);

    // 3. Concentric Data Shells (Orbiting particle rings)
    const createDataRing = (radius: number, count: number, colorVal: number) => {
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(count * 3);
      
      // Initialize with base circle coordinates
      for (let i = 0; i < count; i++) {
        const theta = (i / count) * Math.PI * 2;
        positions[i * 3] = Math.cos(theta) * radius;
        positions[i * 3 + 1] = 0;
        positions[i * 3 + 2] = Math.sin(theta) * radius;
      }
      
      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      const material = new THREE.PointsMaterial({
        color: colorVal,
        size: 0.03,
        transparent: true,
        opacity: 0.75,
        blending: THREE.AdditiveBlending,
      });
      return new THREE.Points(geometry, material);
    };

    // Equatorial orbit ring
    const ringEquator = createDataRing(1.3, 140, 0x06b6d4); // Cyan
    clusterGroup.add(ringEquator);

    // Polar orbit ring
    const ringPolar = createDataRing(1.6, 120, 0x3b82f6); // Blue
    ringPolar.rotation.x = Math.PI / 2.5;
    clusterGroup.add(ringPolar);

    // Angled orbit ring
    const ringAngled = createDataRing(1.8, 100, 0x6366f1); // Indigo
    ringAngled.rotation.z = Math.PI / 3;
    ringAngled.rotation.x = Math.PI / 6;
    clusterGroup.add(ringAngled);

    // 4. Subtle Outer Shell Mesh (Dynamic wobbly grid)
    const shellMat = new THREE.MeshBasicMaterial({
      color: 0x6366f1, // Indigo
      wireframe: true,
      transparent: true,
      opacity: 0.06,
      blending: THREE.AdditiveBlending,
    });
    const shellMesh = new THREE.Mesh(new THREE.SphereGeometry(1.25, 16, 16), shellMat);
    clusterGroup.add(shellMesh);

    // 5. Ambient Floating Particles
    const particleCount = 80;
    const ambientGeo = new THREE.BufferGeometry();
    const ambientPositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      ambientPositions[i * 3] = (Math.random() - 0.5) * 3.5;
      ambientPositions[i * 3 + 1] = (Math.random() - 0.5) * 3.5;
      ambientPositions[i * 3 + 2] = (Math.random() - 0.5) * 3.5;
    }
    ambientGeo.setAttribute("position", new THREE.BufferAttribute(ambientPositions, 3));
    const ambientMat = new THREE.PointsMaterial({
      color: 0x06b6d4, // Cyan
      size: 0.025,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
    });
    const ambientParticles = new THREE.Points(ambientGeo, ambientMat);
    scene.add(ambientParticles);

    // ----------------------------------------------------
    // SCROLL INTERACTION & ANIMATION LOOP
    // ----------------------------------------------------
    let time = 0;
    let progress = 0;
    let uiProgress = 0;
    let isMobile = window.innerWidth < 768;

    const updateScrollProgress = () => {
      const container = scrollEl || document.documentElement;
      const rect = section.getBoundingClientRect();
      const parentRect = container.getBoundingClientRect();
      const viewH = parentRect.height;

      if (isMobile) {
        const start = parentRect.bottom;
        const end = parentRect.bottom - 250;
        const current = rect.top;
        progress = Math.min(1, Math.max(0, (start - current) / (start - end)));
      } else {
        const secH = rect.height;
        const range = secH - viewH;
        if (range > 0) {
          const scrolled = parentRect.top - rect.top;
          progress = Math.min(1, Math.max(0, scrolled / range));
        } else {
          progress = 1;
        }
      }
    };

    let animId = 0;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      time += 0.016;
      updateScrollProgress();

      const animProgress = Math.min(1, progress / 0.8);
      uiProgress += (animProgress - uiProgress) * 0.15;

      // JARVIS Sphere Hover / Idle Float
      clusterGroup.position.y = Math.sin(time * 0.8) * 0.08;

      // Base cluster rotations (slowly spins)
      const baseSpeed = 0.003 + uiProgress * 0.012;
      clusterGroup.rotation.y += baseSpeed;
      clusterGroup.rotation.x += baseSpeed * 0.4;

      // 1. Dynamic Synapse Web Morphing (Thinking Brainwaves)
      const nodePosAttr = neuralNodes.geometry.attributes.position;
      const nodeArr = nodePosAttr.array as Float32Array;

      for (let i = 0; i < nodeCount; i++) {
        const conf = nodeConfigs[i];
        
        // Multi-frequency wave perturbation to warp the sphere surface organically
        const ripple = Math.sin(conf.theta * 4.0 + time * 1.8 + conf.phase) * 0.12 +
                       Math.cos(conf.phi * 3.0 - time * 1.4 + conf.phase) * 0.09 +
                       Math.sin(time * conf.speed) * 0.05;
        
        const r = conf.baseR + ripple;
        const x = r * Math.sin(conf.phi) * Math.cos(conf.theta);
        const y = r * Math.sin(conf.phi) * Math.sin(conf.theta);
        const z = r * Math.cos(conf.phi);

        nodeArr[i * 3] = x;
        nodeArr[i * 3 + 1] = y;
        nodeArr[i * 3 + 2] = z;

        nodePositions[i].set(x, y, z);
      }
      nodePosAttr.needsUpdate = true;

      // Dynamic Connection Synapses recalculation (Lines fire & break organically)
      const activeLineIndices = [];
      for (let i = 0; i < nodeCount; i++) {
        for (let j = i + 1; j < nodeCount; j++) {
          const dist = nodePositions[i].distanceTo(nodePositions[j]);
          if (dist < 0.45) {
            activeLineIndices.push(i, j);
          }
        }
      }
      
      synapseGeo.setFromPoints(nodePositions);
      synapseGeo.setIndex(activeLineIndices);
      if (synapseGeo.index) {
        synapseGeo.index.needsUpdate = true;
      }

      // 2. Ripple Data Rings (Animate circular points into wavy data ribbons)
      const animateDataRing = (ringObj: THREE.Points, radius: number, count: number, speed: number, waveFreq: number, waveAmp: number) => {
        const posAttr = ringObj.geometry.attributes.position;
        const arr = posAttr.array as Float32Array;
        
        const scaleFactor = 1.0 + uiProgress * 0.35;
        const currentRadius = radius * scaleFactor;

        for (let i = 0; i < count; i++) {
          const theta = (i / count) * Math.PI * 2;
          
          // Height and radius wave ripples propagating along the ring
          const wave = Math.sin(theta * waveFreq + time * speed) * waveAmp;
          const r = currentRadius + wave;
          
          arr[i * 3] = Math.cos(theta) * r;
          arr[i * 3 + 1] = Math.cos(theta * (waveFreq - 1) + time * (speed * 0.7)) * (waveAmp * 0.6);
          arr[i * 3 + 2] = Math.sin(theta) * r;
        }
        posAttr.needsUpdate = true;
      };

      animateDataRing(ringEquator, 1.3, 140, 2.5, 5, 0.08);
      animateDataRing(ringPolar, 1.6, 120, -3.0, 4, 0.12);
      animateDataRing(ringAngled, 1.8, 100, 2.0, 6, 0.10);

      // 3. Warp Outer Grid Shell asymmetrically
      const shellPosAttr = shellMesh.geometry.attributes.position;
      const shellArr = shellPosAttr.array as Float32Array;
      
      for (let i = 0; i < shellPosAttr.count; i++) {
        const vx = shellArr[i * 3];
        const vy = shellArr[i * 3 + 1];
        const vz = shellArr[i * 3 + 2];
        const len = Math.hypot(vx, vy, vz);
        
        if (len > 0) {
          const nx = vx / len;
          const ny = vy / len;
          const nz = vz / len;
          
          const warp = Math.sin(nx * 3.0 + time * 1.5) * 0.08 + 
                       Math.cos(ny * 4.0 - time * 2.0) * 0.06 +
                       Math.sin(nz * 2.5 + time) * 0.05;
                       
          const r = 1.25 + warp;
          shellArr[i * 3] = nx * r;
          shellArr[i * 3 + 1] = ny * r;
          shellArr[i * 3 + 2] = nz * r;
        }
      }
      shellPosAttr.needsUpdate = true;

      // Core glow and light intensity pulse based on idle + scroll progress
      const pulse = 1.0 + Math.sin(time * 3.0) * 0.2;
      glowMat.opacity = (0.35 + uiProgress * 0.45) * pulse;
      blueLight.intensity = (4.0 + uiProgress * 8.0) * pulse;
      synapseMat.opacity = (0.28 + uiProgress * 0.32) * pulse;

      // Animate ambient particles drifting upward
      const particlePos = ambientParticles.geometry.attributes.position;
      for (let i = 0; i < particleCount; i++) {
        let py = particlePos.getY(i);
        py += 0.004 + uiProgress * 0.008;
        if (py > 1.8) py = -1.8;
        particlePos.setY(i, py);
      }
      particlePos.needsUpdate = true;

      // Handle CSS styling transitions on scroll (JARVIS Color Accents: Orange, Yellow, Amber)
      if (isMobile) {
        if (rightColRef.current) {
          rightColRef.current.style.opacity = "1";
          rightColRef.current.style.transform = "none";
          rightColRef.current.style.filter = "none";
        }
        if (infoLineRef.current) infoLineRef.current.style.height = "24px";
        if (visionLineRef.current) visionLineRef.current.style.height = "24px";
        if (missionLineRef.current) missionLineRef.current.style.height = "24px";
        
        if (spotlightRef.current) {
          spotlightRef.current.style.background = `radial-gradient(circle 350px at 50% 50%, rgba(59,130,246,0.15) 0%, rgba(6,182,212,0.05) 50%, transparent 100%)`;
        }
        if (floorLineRef.current) {
          floorLineRef.current.style.background = `linear-gradient(90deg, transparent, rgba(59,130,246,0.4), transparent)`;
        }
      } else {
        if (rightColRef.current) {
          rightColRef.current.style.opacity = uiProgress.toString();
          rightColRef.current.style.transform = `translateX(${(1 - uiProgress) * 40}px)`;
          rightColRef.current.style.filter = `blur(${(1 - uiProgress) * 4}px)`;
        }
        if (infoLineRef.current) infoLineRef.current.style.height = `${uiProgress * 24}px`;
        if (visionLineRef.current) visionLineRef.current.style.height = `${uiProgress * 24}px`;
        if (missionLineRef.current) missionLineRef.current.style.height = `${uiProgress * 24}px`;

        if (spotlightRef.current) {
          spotlightRef.current.style.background = `radial-gradient(circle 600px at 50% 50%, rgba(59,130,246,${(uiProgress * 0.16).toFixed(3)}) 0%, rgba(6,182,212,${(uiProgress * 0.08).toFixed(3)}) 50%, transparent 100%)`;
        }
        if (floorLineRef.current) {
          floorLineRef.current.style.background = `linear-gradient(90deg, transparent, rgba(59,130,246,${(uiProgress * 0.6).toFixed(2)}), transparent)`;
        }
      }

      renderer.render(scene, camera);
    };
    animate();

    // Resize Handler
    const onResize = () => {
      isMobile = window.innerWidth < 768;
      const w = mount.clientWidth, h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      glowGeo.dispose();
      glowMat.dispose();
      nodeGeo.dispose();
      nodeMat.dispose();
      synapseGeo.dispose();
      synapseMat.dispose();
      shellMat.dispose();
      shellMesh.geometry.dispose();
      ambientGeo.dispose();
      ambientMat.dispose();
      logoTexture.dispose();
      logoMat.dispose();
      
      ringEquator.geometry.dispose();
      (ringEquator.material as THREE.Material).dispose();
      ringPolar.geometry.dispose();
      (ringPolar.material as THREE.Material).dispose();
      ringAngled.geometry.dispose();
      (ringAngled.material as THREE.Material).dispose();
      
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, [dept]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full md:h-[200vh] h-auto bg-[#030712] overflow-visible"
    >
      <div className="relative md:sticky md:top-0 md:h-screen w-full flex flex-col items-center justify-center overflow-hidden py-16 md:py-0 px-4 md:px-8">
        
        {/* Background Network Grid & Glow */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div 
            className="absolute inset-0 opacity-[0.05]"
            style={{ 
              backgroundImage: "linear-gradient(rgba(249,115,22,0.4) 1px,transparent 1px),linear-gradient(90deg,rgba(249,115,22,0.4) 1px,transparent 1px)", 
              backgroundSize: "60px 60px" 
            }} 
          />
          <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-orange-500/5 blur-[100px]" />
          <div className="absolute top-1/2 right-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-yellow-500/5 blur-[100px]" />
        </div>
        
        {/* Interactive Radial Spotlight */}
        <div
          ref={spotlightRef}
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            background: "radial-gradient(circle 600px at 50% 50%, rgba(249,115,22,0) 0%, rgba(234,179,8,0) 50%, transparent 100%)"
          }}
        />

        {/* Section Header */}
        <div className="absolute top-6 left-0 right-0 z-20 text-center pointer-events-none px-4">
          <span className="inline-flex rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.25em] bg-orange-500/10 text-orange-400 border border-orange-500/20">
            AI&DS — Department Overview
          </span>
          <div className="mt-2.5 text-[11px] text-slate-500 tracking-wider flex flex-col items-center gap-1.5">
            <span>Scroll to Discover</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="animate-bounce"><path d="M12 5v14"/><path d="m19 12-7 7-7-7"/></svg>
          </div>
        </div>

        {/* Split Layout: Canvas (Left) & Content Stack (Right) */}
        <div className="relative z-10 w-full max-w-7xl h-full flex flex-col md:flex-row items-center justify-between gap-12 md:gap-8 md:pt-16 pb-12">
          
          {/* Left Column: 3D J.A.R.V.I.S. Canvas */}
          <div className="w-full md:w-[45%] flex items-center justify-center relative">
            <div ref={mountRef} className="w-full" style={{ height: "clamp(380px, 42vw, 550px)" }} />
          </div>

          {/* Right Column: Complete Content Stack (Orange/Gold Accents) */}
          <div
            ref={rightColRef}
            className="w-full md:w-[50%] flex flex-col justify-center gap-8 text-left md:pl-8"
            style={{ opacity: 0 }}
          >
            {/* About */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span
                  ref={infoLineRef}
                  className="w-0.5 rounded-full"
                  style={{
                    height: "0px",
                    background: "linear-gradient(to bottom, #f97316, #f59e0b)"
                  }}
                />
                <span className="text-xs lg:text-[13px] font-black uppercase tracking-[0.25em] text-orange-400">About the Department</span>
              </div>
              <ul className="space-y-3 pl-1">
                {dept.about.map((point, i) => (
                  <li key={i} className="flex items-start gap-3 group">
                    <span className="mt-[8px] h-1.5 w-1.5 rounded-full bg-orange-500/40 shrink-0 group-hover:bg-orange-400 transition-colors" />
                    <span className="text-[13.5px] lg:text-[14.5px] text-slate-400 leading-relaxed group-hover:text-slate-200 transition-colors">{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Vision */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span
                  ref={visionLineRef}
                  className="w-0.5 rounded-full"
                  style={{
                    height: "0px",
                    background: "linear-gradient(to bottom, #f59e0b, #eab308)"
                  }}
                />
                <span className="text-xs lg:text-[13px] font-black uppercase tracking-[0.25em] text-amber-400">Vision</span>
              </div>
              <p className="text-[13.5px] lg:text-[14.5px] text-slate-400 leading-[1.8] italic font-medium pl-1">
                "{dept.vision}"
              </p>
            </div>

            {/* Mission */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span
                  ref={missionLineRef}
                  className="w-0.5 rounded-full"
                  style={{
                    height: "0px",
                    background: "linear-gradient(to bottom, #f97316, #eab308)"
                  }}
                />
                <span className="text-xs lg:text-[13px] font-black uppercase tracking-[0.25em] text-orange-400">Mission</span>
              </div>
              <ul className="space-y-3 pl-1">
                {dept.mission.map((m, i) => (
                  <li key={i} className="flex items-start gap-4 group">
                    <span className="text-[12px] md:text-[13px] font-black text-orange-500/80 shrink-0 pt-0.5 group-hover:text-orange-400 transition-colors">M{i+1}</span>
                    <span className="text-[13.5px] lg:text-[14.5px] text-slate-400 leading-relaxed group-hover:text-slate-200 transition-colors">{m}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

        </div>

        {/* Floor Line */}
        <div
          ref={floorLineRef}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 pointer-events-none w-[65%] h-[1px]"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(249,115,22,0), transparent)",
            transition: "background 0.3s ease"
          }}
        />
        
      </div>
    </section>
  );
}
