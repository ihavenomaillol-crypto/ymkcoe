import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { motion, useInView } from "framer-motion";

export type CSEDeptContent = {
  name: string;
  short: string;
  about: string[];
  vision: string;
  mission: string[];
};

type Props = { dept: CSEDeptContent };

function buildScreenTexture(dept: CSEDeptContent, onUpdate?: () => void): THREE.CanvasTexture {
  const W = 1024, H = 640;
  const canvas = document.createElement("canvas");
  canvas.width = W; canvas.height = H;
  const ctx = canvas.getContext("2d")!;

  const bg = ctx.createLinearGradient(0, 0, 0, H);
  bg.addColorStop(0, "#080b16"); bg.addColorStop(1, "#120e2e");
  ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);

  ctx.strokeStyle = "rgba(99,102,241,0.06)"; ctx.lineWidth = 1;
  for (let x = 0; x < W; x += 48) { ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x,H); ctx.stroke(); }
  for (let y = 0; y < H; y += 48) { ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(W,y); ctx.stroke(); }

  ctx.fillStyle = "rgba(0,0,0,0.5)"; ctx.fillRect(0, 0, W, 42);
  [[20,"#ef4444"],[50,"#f59e0b"],[80,"#22c55e"]].forEach(([x,c]) => {
    ctx.beginPath(); ctx.arc(x as number, 21, 8, 0, Math.PI*2);
    ctx.fillStyle = c as string; ctx.fill();
  });
  ctx.fillStyle = "rgba(255,255,255,0.3)"; ctx.font = "13px monospace";
  ctx.fillText("https://ymkcoe.edu.in", 110, 27);
  ctx.strokeStyle = "rgba(99,102,241,0.2)"; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(0,42); ctx.lineTo(W,42); ctx.stroke();

  const logo = new Image();
  logo.src = "/ymkcoe_logo.png";
  logo.onload = () => {
    const size = 265;
    const lx = (W - size) / 2;
    const ly = 42 + (H - 42 - size) / 2 - 25;

    const glow = ctx.createRadialGradient(W/2, H/2 + 20, 30, W/2, H/2 + 20, 200);
    glow.addColorStop(0, "rgba(99, 102, 241, 0.25)");
    glow.addColorStop(1, "transparent");
    ctx.fillStyle = glow;
    ctx.fillRect(0, 42, W, H - 42);

    ctx.filter = "brightness(0) invert(1)";
    ctx.drawImage(logo, lx, ly, size, size);
    ctx.filter = "none";

    ctx.fillStyle = "rgba(255, 255, 255, 0.88)";
    ctx.font = "bold 21px Arial";
    ctx.textAlign = "center";
    ctx.fillText("YASHODA MAHADEO KAKADE COLLEGE OF ENGINEERING", W/2, ly + size + 45);

    ctx.fillStyle = "rgba(99, 102, 241, 0.75)";
    ctx.font = "bold 13px Arial";
    ctx.fillText("INDRAYANI VIDYA MANDIR'S", W/2, ly - 25);

    // Apply vignette over the loaded image
    const vig = ctx.createRadialGradient(W/2, H/2, H*0.3, W/2, H/2, H*0.8);
    vig.addColorStop(0, "transparent"); vig.addColorStop(1, "rgba(0,0,0,0.5)");
    ctx.fillStyle = vig; ctx.fillRect(0, 42, W, H - 42);

    if (onUpdate) onUpdate();
  };

  const vig = ctx.createRadialGradient(W/2, H/2, H*0.3, W/2, H/2, H*0.8);
  vig.addColorStop(0, "transparent"); vig.addColorStop(1, "rgba(0,0,0,0.5)");
  ctx.fillStyle = vig; ctx.fillRect(0, 42, W, H - 42);

  return new THREE.CanvasTexture(canvas);
}

function buildKeyboardTexture(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 512; canvas.height = 256;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = "#0f172a"; ctx.fillRect(0, 0, 512, 256);
  ctx.fillStyle = "#1e293b"; ctx.strokeStyle = "rgba(99, 102, 241, 0.6)"; ctx.lineWidth = 1.5;
  const cols = 15, rows = 6, kw = 512/cols, kh = 256/rows, gap = 3;
  for(let r=0; r<rows; r++) {
    for(let c=0; c<cols; c++) {
      ctx.fillRect(c*kw + gap, r*kh + gap, kw - gap*2, kh - gap*2);
      ctx.strokeRect(c*kw + gap, r*kh + gap, kw - gap*2, kh - gap*2);
    }
  }
  return new THREE.CanvasTexture(canvas);
}

export function CSELaptopReveal({ dept }: Props) {
  const mountRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const leftLineRef = useRef<HTMLSpanElement>(null);
  const rightLine1Ref = useRef<HTMLSpanElement>(null);
  const rightLine2Ref = useRef<HTMLSpanElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const floorLineRef = useRef<HTMLDivElement>(null);
  const leftBeamRef = useRef<SVGPolygonElement>(null);
  const rightBeamRef = useRef<SVGPolygonElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    const section = sectionRef.current;
    if (!mount || !section) return;

    const scrollEl = document.querySelector("main") as HTMLElement | null;
    const W = mount.clientWidth, H = mount.clientHeight;
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, W/H, 0.1, 100);
    
    // Position camera based on aspect ratio (closer for larger screen appearance)
    if (W / H < 1.3) {
      camera.position.set(0, 1.7, 4.8);
    } else {
      camera.position.set(0, 1.45, 4.0);
    }
    camera.lookAt(0, 0.2, 0);

    scene.add(new THREE.AmbientLight(0xffffff, 0.5));
    const keyLight = new THREE.DirectionalLight(0xffffff, 1.2);
    keyLight.position.set(3,5,4); keyLight.castShadow=true; scene.add(keyLight);
    const fillLight = new THREE.DirectionalLight(0x88aaff, 0.35);
    fillLight.position.set(-4,2,-2); scene.add(fillLight);
    const screenLight = new THREE.PointLight(0x3b82f6, 1.8, 6);
    screenLight.position.set(0,1.4,1.2); scene.add(screenLight);

    const bodyMat = new THREE.MeshStandardMaterial({ color:0x1e293b, metalness:0.75, roughness:0.25 });
    const hingesMat = new THREE.MeshStandardMaterial({ color:0x64748b, metalness:0.9, roughness:0.1 });
    const bezelMat = new THREE.MeshStandardMaterial({ color:0x0a0f1e, metalness:0.4, roughness:0.6 });
    const screenTex = buildScreenTexture(dept, () => {
      screenTex.needsUpdate = true;
    });
    const screenMat = new THREE.MeshStandardMaterial({
      map: screenTex, emissiveMap: screenTex,
      emissive: new THREE.Color(0x6366f1), emissiveIntensity: 0.6, roughness: 0.08, metalness: 0.05,
    });
    const bW=2.8, bD=1.8, bH=0.07, lW=2.75, lD=1.85, lH=0.05;

    const baseGroup = new THREE.Group(); scene.add(baseGroup);
    const baseMesh = new THREE.Mesh(new THREE.BoxGeometry(bW,bH,bD), bodyMat);
    baseMesh.position.set(0,bH/2,0); baseMesh.castShadow=true; baseMesh.receiveShadow=true; baseGroup.add(baseMesh);
    
    // Dynamic Physical Keyboard
    const kbGroup = new THREE.Group();
    kbGroup.position.set(0,bH+0.003,0.05); baseGroup.add(kbGroup);
    
    // Glowing backlight base
    const kbBaseMat = new THREE.MeshStandardMaterial({ 
      color: 0x050814, 
      emissive: new THREE.Color(0x3b82f6), 
      emissiveIntensity: 0.5 
    });
    const kbBase = new THREE.Mesh(new THREE.BoxGeometry(bW*0.85,0.002,bD*0.72), kbBaseMat);
    kbGroup.add(kbBase);
    
    // Physical Keys
    const keyMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.8, metalness: 0.3 });
    const cols = 15, rows = 6;
    const kW = (bW*0.85) / cols;
    const kD = (bD*0.72) / rows;
    const gapX = 0.025, gapZ = 0.025;
    
    const keyGeo = new THREE.BoxGeometry(kW - gapX, 0.012, kD - gapZ);
    const instancedKeys = new THREE.InstancedMesh(keyGeo, keyMat, cols * rows);
    instancedKeys.receiveShadow = true;
    
    const dummy = new THREE.Object3D();
    let keyIdx = 0;
    for(let r=0; r<rows; r++) {
      for(let c=0; c<cols; c++) {
        const x = (c - cols/2 + 0.5) * kW;
        const z = (r - rows/2 + 0.5) * kD;
        
        // Make spacebar wider
        if (r === rows - 1 && c >= 4 && c <= 10) {
          if (c === 7) {
            dummy.scale.set(7, 1, 1);
            dummy.position.set(x, 0.006, z);
            dummy.updateMatrix();
            instancedKeys.setMatrixAt(keyIdx++, dummy.matrix);
            dummy.scale.set(1, 1, 1); // reset
          }
        } else if (r === rows - 1 && c > 4 && c <= 10) {
          // skip the rest of spacebar cells
        } else {
          dummy.position.set(x, 0.006, z);
          dummy.updateMatrix();
          instancedKeys.setMatrixAt(keyIdx++, dummy.matrix);
        }
      }
    }
    // Update count since we skipped some for the spacebar
    instancedKeys.count = keyIdx;
    instancedKeys.instanceMatrix.needsUpdate = true;
    kbGroup.add(instancedKeys);

    const touchpadMat = new THREE.MeshStandardMaterial({ color:0x1e293b, roughness:0.5, metalness:0.45 });
    const tpMesh = new THREE.Mesh(new THREE.BoxGeometry(0.65,0.004,0.42), touchpadMat);
    tpMesh.position.set(0,bH+0.003,0.6); baseGroup.add(tpMesh);
    const footGeo = new THREE.BoxGeometry(0.12,0.03,0.12);
    [[-bW/2+0.12,bD/2-0.15],[bW/2-0.12,bD/2-0.15],[-bW/2+0.12,-bD/2+0.15],[bW/2-0.12,-bD/2+0.15]].forEach(([x,z])=>{
      const f=new THREE.Mesh(footGeo,hingesMat); f.position.set(x,-0.015,z); baseGroup.add(f);
    });

    const lidGroup = new THREE.Group();
    lidGroup.position.set(0,bH,-bD/2); baseGroup.add(lidGroup);
    const lidMesh = new THREE.Mesh(new THREE.BoxGeometry(lW,lH,lD), bodyMat);
    lidMesh.position.set(0,0,lD/2); lidMesh.castShadow=true; lidGroup.add(lidMesh);
    const bezelPad=0.06;
    const bezelMesh = new THREE.Mesh(new THREE.BoxGeometry(lW-bezelPad,lH*0.6,lD-bezelPad), bezelMat);
    bezelMesh.position.set(0,-lH*0.8,lD/2); lidGroup.add(bezelMesh);

    // Screen plane with canvas texture (on the inside of the lid)
    const scrW=lW-bezelPad*2.4, scrH=lD-bezelPad*2.8;
    const screenGeo = new THREE.PlaneGeometry(scrW, scrH);
    const screenMesh = new THREE.Mesh(screenGeo, screenMat);
    screenMesh.rotation.x = Math.PI/2;
    screenMesh.position.set(0, -lH*1.15, lD/2); lidGroup.add(screenMesh);

    const hingeGeo = new THREE.CylinderGeometry(0.045,0.045,0.22,16); hingeGeo.rotateZ(Math.PI/2);
    [-0.55,0.55].forEach(x=>{ const h=new THREE.Mesh(hingeGeo,hingesMat); h.position.set(x,0,0); lidGroup.add(h); });

    const CLOSED = 0; // lid flat on keyboard (closed)
    const OPEN = -1.9; // lid tilted back facing camera (open)
    lidGroup.rotation.x=CLOSED;
    let time=0, currentLidX=CLOSED, progress=0, uiProgress=0;
    let isMobile = window.innerWidth < 768;

    function updateProgress(){
      const container=scrollEl||document.documentElement;
      const rect = section!.getBoundingClientRect();
      const parentRect = container.getBoundingClientRect();
      const viewH = parentRect.height;

      if (isMobile) {
        // Smooth opening on mobile when scrolled into view
        const start = parentRect.bottom;
        const end = parentRect.bottom - 300;
        const current = rect.top;
        progress = Math.min(1, Math.max(0, (start - current) / (start - end)));
      } else {
        // Desktop sticky animation
        const secH = rect.height;
        const range = secH - viewH;
        if (range > 0) {
          const scrolled = parentRect.top - rect.top;
          progress = Math.min(1, Math.max(0, scrolled / range));
        } else {
          progress = 1;
        }
      }
    }

    let animId=0;
    function animate(){
      animId=requestAnimationFrame(animate); time+=0.016;
      updateProgress();
      
      // Calculate a scaled progress so the animation finishes at 85% of the scroll, leaving a 15% pause
      const animProgress = Math.min(1, progress / 0.85);

      // Smooth lerp for laptop lid opening (faster to prevent bypass)
      const targetLidX=CLOSED+(OPEN-CLOSED)*animProgress;
      currentLidX+=(targetLidX-currentLidX)*0.3;
      lidGroup.rotation.x=currentLidX;
      
      // Floating animation
      baseGroup.position.y=Math.sin(time*0.6)*0.025;
      baseGroup.rotation.y=Math.sin(time*0.35)*0.055;
      
      // Light intensity
      screenLight.intensity=0.4+animProgress*2.4;
      (screenMat as THREE.MeshStandardMaterial).emissiveIntensity=0.25+animProgress*0.85;
      
      // UI element smooth transition (faster lerp)
      uiProgress += (animProgress - uiProgress) * 0.35;

      if (isMobile) {
        // Mobile fallback styling
        if (leftColRef.current) {
          leftColRef.current.style.opacity = "1";
          leftColRef.current.style.transform = "none";
          leftColRef.current.style.filter = "none";
        }
        if (rightColRef.current) {
          rightColRef.current.style.opacity = "1";
          rightColRef.current.style.transform = "none";
          rightColRef.current.style.filter = "none";
        }
        if (leftLineRef.current) leftLineRef.current.style.height = "20px";
        if (rightLine1Ref.current) rightLine1Ref.current.style.height = "20px";
        if (rightLine2Ref.current) rightLine2Ref.current.style.height = "20px";
        if (spotlightRef.current) {
          spotlightRef.current.style.background = `radial-gradient(circle 350px at 50% 50%, rgba(59,130,246,0.15) 0%, rgba(99,102,241,0.05) 50%, transparent 100%)`;
        }
        if (floorLineRef.current) {
          floorLineRef.current.style.background = `linear-gradient(90deg, transparent, rgba(59,130,246,0.4), transparent)`;
        }
      } else {
        // Desktop interactive scroll animations
        if (leftColRef.current) {
          leftColRef.current.style.opacity = uiProgress.toString();
          leftColRef.current.style.transform = `translateX(${(1 - uiProgress) * -40}px)`;
          leftColRef.current.style.filter = `blur(${(1 - uiProgress) * 4}px)`;
        }
        if (rightColRef.current) {
          rightColRef.current.style.opacity = uiProgress.toString();
          rightColRef.current.style.transform = `translateX(${(1 - uiProgress) * 4}px)`;
          rightColRef.current.style.filter = `blur(${(1 - uiProgress) * 4}px)`;
        }
        if (leftLineRef.current) leftLineRef.current.style.height = `${uiProgress * 20}px`;
        if (rightLine1Ref.current) rightLine1Ref.current.style.height = `${uiProgress * 20}px`;
        if (rightLine2Ref.current) rightLine2Ref.current.style.height = `${uiProgress * 20}px`;
        
        if (leftBeamRef.current) leftBeamRef.current.style.opacity = uiProgress.toString();
        if (rightBeamRef.current) rightBeamRef.current.style.opacity = uiProgress.toString();

        if (spotlightRef.current) {
          spotlightRef.current.style.background = `radial-gradient(circle 600px at 50% 50%, rgba(59,130,246,${(uiProgress * 0.16).toFixed(3)}) 0%, rgba(99,102,241,${(uiProgress * 0.07).toFixed(3)}) 50%, transparent 100%)`;
        }
        if (floorLineRef.current) {
          floorLineRef.current.style.background = `linear-gradient(90deg, transparent, rgba(59,130,246,${(uiProgress * 0.6).toFixed(2)}), transparent)`;
        }
      }

      renderer.render(scene,camera);
    }
    animate();

    function onResize(){
      isMobile = window.innerWidth < 768;
      const w=mount!.clientWidth, h=mount!.clientHeight;
      camera.aspect=w/h;
      if (w / h < 1.3) {
        camera.position.set(0, 1.7, 4.8);
      } else {
        camera.position.set(0, 1.45, 4.0);
      }
      camera.lookAt(0, 0.2, 0);
      camera.updateProjectionMatrix();
      renderer.setSize(w,h);
    }
    window.addEventListener("resize",onResize);

    return ()=>{
      cancelAnimationFrame(animId);
      window.removeEventListener("resize",onResize);
      renderer.dispose(); screenTex.dispose();
      if(mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, [dept]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full md:h-[250vh] h-auto bg-[#020617] overflow-visible"
    >
      <div className="relative md:sticky md:top-0 md:h-screen w-full flex flex-col items-center justify-center overflow-hidden py-16 md:py-0 px-4 md:px-8">
        
        {/* Background Image & Grid */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <img src="/cse_header_bg.png" alt="CSE Background" className="w-full h-full object-cover object-center opacity-15 mix-blend-screen" />
          <div className="absolute inset-0 bg-[#020617]/60 backdrop-blur-[2px]" />
        </div>
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none z-0"
          style={{ backgroundImage:"linear-gradient(rgba(99,102,241,0.6) 1px,transparent 1px),linear-gradient(90deg,rgba(99,102,241,0.6) 1px,transparent 1px)", backgroundSize:"48px 48px" }} />
        
        {/* Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-blue-600/5 blur-[120px] pointer-events-none" />
        
        {/* Spotlight Effect */}
        <div
          ref={spotlightRef}
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            background: "radial-gradient(circle 600px at 50% 50%, rgba(59,130,246,0) 0%, rgba(99,102,241,0) 50%, transparent 100%)"
          }}
        />

        {/* Dynamic Light Beams */}
        <div className="absolute inset-0 pointer-events-none z-0 hidden md:block">
          <svg className="w-full h-full" viewBox="0 0 1200 800" preserveAspectRatio="none">
            <defs>
              <linearGradient id="leftBeamGrad" x1="1" y1="0.5" x2="0" y2="0.5">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.22" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="rightBeamGrad" x1="0" y1="0.5" x2="1" y2="0.5">
                <stop offset="0%" stopColor="#6366f1" stopOpacity="0.18" />
                <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
              </linearGradient>
              <filter id="beamGlow">
                <feGaussianBlur stdDeviation="30" />
              </filter>
            </defs>
            <polygon
              ref={leftBeamRef}
              points="600,420 0,150 0,650"
              fill="url(#leftBeamGrad)"
              filter="url(#beamGlow)"
              style={{ opacity: 0, transition: "opacity 0.2s ease" }}
            />
            <polygon
              ref={rightBeamRef}
              points="600,420 1200,100 1200,700"
              fill="url(#rightBeamGrad)"
              filter="url(#beamGlow)"
              style={{ opacity: 0, transition: "opacity 0.2s ease" }}
            />
          </svg>
        </div>

        {/* Header Title */}
        <div className="absolute top-6 left-0 right-0 z-20 text-center pointer-events-none px-4">
          <span className="inline-flex rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.25em] bg-blue-500/10 text-blue-400 border border-blue-500/20">
            CSE — Department Overview
          </span>
          <div className="mt-2.5 text-[11px] text-slate-500 tracking-wider flex flex-col items-center gap-1.5">
            <span>Scroll</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="animate-bounce"><path d="M12 5v14"/><path d="m19 12-7 7-7-7"/></svg>
          </div>
        </div>

        {/* 3-Column Content Layout */}
        <div className="relative z-10 w-full max-w-7xl h-full flex flex-col md:flex-row items-center justify-between gap-12 md:gap-8 md:pt-16 pb-12">
          
          {/* Left Column: About */}
          <div
            ref={leftColRef}
            className="w-full md:w-[30%] flex flex-col justify-center text-left"
            style={{ opacity: 0 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <span
                ref={leftLineRef}
                className="w-0.5 rounded-full"
                style={{
                  height: "0px",
                  background: "linear-gradient(to bottom, #60a5fa, #6366f1)"
                }}
              />
              <span className="text-xs lg:text-[13px] font-black uppercase tracking-[0.25em] text-blue-400">About the Department</span>
            </div>
            <ul className="space-y-4">
              {dept.about.map((point, i) => (
                <li key={i} className="flex items-start gap-3 group">
                  <span className="mt-[8px] h-1.5 w-1.5 rounded-full bg-blue-500/40 shrink-0 group-hover:bg-blue-400 transition-colors" />
                  <span className="text-[13.5px] lg:text-[14.5px] text-slate-400 leading-relaxed group-hover:text-slate-200 transition-colors">{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Center Column: Laptop */}
          <div className="w-full md:w-[40%] flex items-center justify-center relative">
            <div ref={mountRef} className="w-full" style={{ height: "clamp(360px, 45vw, 520px)" }} />
          </div>

          {/* Right Column: Vision & Mission */}
          <div
            ref={rightColRef}
            className="w-full md:w-[30%] flex flex-col justify-center gap-10"
            style={{ opacity: 0 }}
          >
            {/* Vision */}
            <div className="flex flex-col text-left">
              <div className="flex items-center gap-3 mb-5">
                <span
                  ref={rightLine1Ref}
                  className="w-0.5 rounded-full"
                  style={{
                    height: "0px",
                    background: "linear-gradient(to bottom, #818cf8, #a78bfa)"
                  }}
                />
                <span className="text-xs lg:text-[13px] font-black uppercase tracking-[0.25em] text-indigo-400">Vision</span>
              </div>
              <p className="text-[13.5px] lg:text-[14.5px] text-slate-400 leading-[1.8] italic font-medium pl-1">
                "{dept.vision}"
              </p>
            </div>

            {/* Mission */}
            <div className="flex flex-col text-left">
              <div className="flex items-center gap-3 mb-5">
                <span
                  ref={rightLine2Ref}
                  className="w-0.5 rounded-full"
                  style={{
                    height: "0px",
                    background: "linear-gradient(to bottom, #34d399, #10b981)"
                  }}
                />
                <span className="text-xs lg:text-[13px] font-black uppercase tracking-[0.25em] text-emerald-400">Mission</span>
              </div>
              <ul className="space-y-4">
                {dept.mission.map((m, i) => (
                  <li key={i} className="flex items-start gap-4 group">
                    <span className="text-[12px] md:text-[13px] font-black text-emerald-500/80 shrink-0 pt-0.5 group-hover:text-emerald-400 transition-colors">M{i+1}</span>
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
            background: "linear-gradient(90deg, transparent, rgba(59,130,246,0), transparent)",
            transition: "background 0.3s ease"
          }}
        />
        
      </div>
    </section>
  );
}
