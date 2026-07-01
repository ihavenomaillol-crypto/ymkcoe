import { useEffect, useRef } from "react";
import * as THREE from "three";

export function EarthGlobe() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    // Force body background to be transparent to prevent Light Mode theme stylesheet/browser-level backgrounds showing through
    const originalBgColor = document.body.style.backgroundColor;
    document.body.style.backgroundColor = "transparent";

    const canvas = canvasRef.current;
    const container = containerRef.current;

    // --- Scene Setup ---
    const scene = new THREE.Scene();
    
    // Camera
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      1,
      1000
    );
    camera.position.set(0, 0, 220);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);

    // Group to hold all rotating globe elements
    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    // --- Texture Loading ---
    const textureLoader = new THREE.TextureLoader();
    
    // Load high-resolution textures downloaded in execution
    // Start with a dark blue color and restore to white once texture is loaded
    const earthTexture = textureLoader.load("/earth_color.jpg", () => {
      earthMat.color.setHex(0xffffff);
    });
    const specularTexture = textureLoader.load("/earth_specular.jpg");
    
    // Start with clouds invisible and show them only once the texture loads
    const cloudsTexture = textureLoader.load("/earth_clouds.png", () => {
      cloudsMesh.visible = true;
    });

    // --- Main Earth Mesh ---
    const globeRadius = 80;
    const earthGeo = new THREE.SphereGeometry(globeRadius, 64, 64);
    const earthMat = new THREE.MeshStandardMaterial({
      color: 0x111e38, // Placeholder dark blue ocean color during texture load
      map: earthTexture,
      roughnessMap: specularTexture, // shiny oceans, matte land
      roughness: 0.9,
      metalness: 0.1,
    });
    
    const earthMesh = new THREE.Mesh(earthGeo, earthMat);
    globeGroup.add(earthMesh);

    // --- Clouds Mesh ---
    const cloudsGeo = new THREE.SphereGeometry(globeRadius + 0.6, 64, 64);
    const cloudsMat = new THREE.MeshBasicMaterial({
      map: cloudsTexture,
      transparent: true,
      opacity: 0.75,
      depthWrite: false,
    });
    const cloudsMesh = new THREE.Mesh(cloudsGeo, cloudsMat);
    cloudsMesh.visible = false; // Start hidden while texture is loading
    globeGroup.add(cloudsMesh);

    // --- Glowing Atmosphere Halo ---
    const atmosGeo = new THREE.SphereGeometry(globeRadius * 1.12, 64, 64);
    const atmosMat = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        void main() {
          float intensity = pow(0.65 - dot(vNormal, vec3(0, 0, 1.0)), 3.0);
          gl_FragColor = vec4(0.35, 0.65, 1.0, 1.0) * intensity;
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      depthWrite: false,
    });
    const atmosMesh = new THREE.Mesh(atmosGeo, atmosMat);
    scene.add(atmosMesh);

    // --- Lights representing the Sun ---
    const ambientLight = new THREE.AmbientLight(0x0a1428, 0.55);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xffffff, 1.8);
    sunLight.position.set(180, 60, 120);
    scene.add(sunLight);

    // --- YMKCOE coordinates (India) ---
    // Lat: 18.728° N, Lng: 73.682° E
    const latRad = (18.728 * Math.PI) / 180;
    const lngRad = (73.682 * Math.PI) / 180;

    const beaconY = globeRadius * Math.sin(latRad);
    const beaconX = globeRadius * Math.cos(latRad) * Math.sin(lngRad);
    const beaconZ = globeRadius * Math.cos(latRad) * Math.cos(lngRad);

    const beaconPos = new THREE.Vector3(beaconX, beaconY, beaconZ);
    const beaconDir = beaconPos.clone().normalize();

    // Pulsing outer ring at the base of the Pin
    const beaconRingGeo = new THREE.RingGeometry(0.1, 4.5, 32);
    const beaconRingMat = new THREE.MeshBasicMaterial({
      color: 0xf97316,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const beaconRing = new THREE.Mesh(beaconRingGeo, beaconRingMat);
    beaconRing.position.copy(beaconPos);
    beaconRing.lookAt(beaconPos.clone().multiplyScalar(2));
    globeGroup.add(beaconRing);

    // Create white IVM/YMKCOE Logo Sprite in place of the 3D pin mesh
    const logoCanvas = document.createElement("canvas");
    const logoCtx = logoCanvas.getContext("2d");
    const logoImg = new Image();
    logoImg.src = "/ymkcoe_logo.png";

    const logoTexture = new THREE.CanvasTexture(logoCanvas);
    const logoMaterial = new THREE.SpriteMaterial({
      map: logoTexture,
      transparent: true,
      opacity: 0.9,
      depthWrite: false,
    });
    const logoSprite = new THREE.Sprite(logoMaterial);
    
    // Scale the sprite to be visible and clear (around 7x7 units)
    logoSprite.scale.set(7.5, 7.5, 1);
    
    logoImg.onload = () => {
      logoCanvas.width = logoImg.width;
      logoCanvas.height = logoImg.height;
      if (logoCtx) {
        logoCtx.drawImage(logoImg, 0, 0);
        const imgData = logoCtx.getImageData(0, 0, logoImg.width, logoImg.height);
        const data = imgData.data;
        // Transform colored parts to white, and white parts to transparent stencils
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          const a = data[i + 3];
          
          if (a < 50) {
            data[i + 3] = 0;
          } else if (r > 200 && g > 200 && b > 200) {
            // Convert white text/details inside the shield to transparent cutouts
            data[i + 3] = 0;
          } else {
            // Convert the blue shield body and circular outline to solid white
            data[i] = 255;
            data[i + 1] = 255;
            data[i + 2] = 255;
            data[i + 3] = 255;
          }
        }
        logoCtx.putImageData(imgData, 0, 0);
        logoTexture.needsUpdate = true;
      }
    };

    // Position sprite directly at India coordinates
    logoSprite.position.copy(beaconPos);
    globeGroup.add(logoSprite);

    const shadowRingGeo = new THREE.RingGeometry(0.1, 5.0, 32);
    const shadowRingMat = new THREE.MeshBasicMaterial({
      color: 0x090d16,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.6,
      depthWrite: false,
    });
    const shadowRing = new THREE.Mesh(shadowRingGeo, shadowRingMat);
    shadowRing.position.copy(beaconPos);
    shadowRing.lookAt(beaconPos.clone().multiplyScalar(2));
    globeGroup.add(shadowRing);

    // --- Starry Night Background ---
    const starsNum = 1200;
    const starsPositions = new THREE.BufferGeometry();
    const starCoords: number[] = [];
    for (let i = 0; i < starsNum; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 300 + Math.random() * 250;
      starCoords.push(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta),
        r * Math.cos(phi)
      );
    }
    starsPositions.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(starCoords, 3)
    );
    const starsMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.9,
      transparent: true,
      opacity: 0.6,
      sizeAttenuation: true,
    });
    const starField = new THREE.Points(starsPositions, starsMaterial);
    scene.add(starField);

    // --- Scroll Container Target ---
    const scrollContainer = document.querySelector("main") || window;
    let targetScrollProgress = 0;
    let currentScrollProgress = 0;
    let beaconPulseTimer = 0;

    const handleScroll = () => {
      const scrollY = scrollContainer instanceof HTMLElement ? scrollContainer.scrollTop : window.scrollY;
      const zoomThreshold = 400; // Complete zoom in 400px of scrolling
      targetScrollProgress = Math.min(scrollY / zoomThreshold, 1);
    };
    scrollContainer.addEventListener("scroll", handleScroll, { passive: true });

    // Initial check
    handleScroll();

    // --- Animation Loop ---
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();

      // Beacon pulse animation
      beaconPulseTimer += delta * 3.5;
      const pulseScale = 1 + Math.sin(beaconPulseTimer) * 0.5;
      beaconRing.scale.set(pulseScale, pulseScale, 1);
      beaconRingMat.opacity = Math.max(0, 1 - (pulseScale - 0.5) / 1.5);

      // Float the logo sprite up and down slightly above India's surface
      const hoverOffset = Math.sin(beaconPulseTimer) * 0.45;
      logoSprite.position.copy(beaconPos).add(beaconDir.clone().multiplyScalar(2.0 + hoverOffset));

      // Smoothly interpolate current scroll progress towards target scroll progress for a dampening effect
      currentScrollProgress += (targetScrollProgress - currentScrollProgress) * 0.08;

      // Rotate Earth slowly, decays on scroll to lock India beacon
      const baseEarthRotation = 0.06 * (1 - currentScrollProgress);
      globeGroup.rotation.y += delta * baseEarthRotation;

      // Rotate Clouds slightly faster for dynamic effect
      cloudsMesh.rotation.y += delta * 0.012;

      // Get world coordinates of YMKCOE Beacon
      const beaconWorldPos = new THREE.Vector3();
      logoSprite.getWorldPosition(beaconWorldPos);

      // Camera zooming/tracking logic
      const startCamPos = new THREE.Vector3(0, 0, 220);
      const startCamTarget = new THREE.Vector3(0, 0, 0);

      const endCamTarget = beaconWorldPos.clone();
      const currentBeaconDir = beaconWorldPos.clone().normalize();
      
      // Zoom close to YMKCOE (23 units offset)
      const endCamPos = beaconWorldPos.clone().add(currentBeaconDir.multiplyScalar(23));

      // LERP camera based on scroll
      const currentTarget = new THREE.Vector3().lerpVectors(
        startCamTarget,
        endCamTarget,
        currentScrollProgress
      );
      const currentCamPos = new THREE.Vector3().lerpVectors(
        startCamPos,
        endCamPos,
        currentScrollProgress
      );

      camera.position.copy(currentCamPos);
      camera.lookAt(currentTarget);

      // Apply dynamic canvas opacity based on scroll
      if (canvas) {
        const opacityAmount = 1 - currentScrollProgress * 0.55;
        canvas.style.opacity = `${opacityAmount}`;
      }

      // Rotate starfield subtly
      starField.rotation.y += delta * 0.005;
      starField.rotation.x += delta * 0.002;

      renderer.render(scene, camera);
    };

    animate();

    // --- Resize Handler ---
    const handleResize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener("resize", handleResize);

    // --- Cleanup ---
    return () => {
      // Restore original body background color
      document.body.style.backgroundColor = originalBgColor;

      cancelAnimationFrame(animationFrameId);
      scrollContainer.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      earthGeo.dispose();
      earthMat.dispose();
      specularTexture.dispose();
      earthTexture.dispose();
      cloudsGeo.dispose();
      cloudsMat.dispose();
      cloudsTexture.dispose();
      atmosGeo.dispose();
      atmosMat.dispose();
      beaconRingGeo.dispose();
      beaconRingMat.dispose();
      logoTexture.dispose();
      logoMaterial.dispose();
      shadowRingGeo.dispose();
      shadowRingMat.dispose();
      starsPositions.dispose();
      starsMaterial.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full h-full -z-10 bg-[#040814] overflow-hidden pointer-events-none"
    >
      <canvas ref={canvasRef} className="w-full h-full block animate-fade-in" />
    </div>
  );
}
