import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { EARTH_ANALOG_SITES } from '../data/planetaryData';
import { LocaleCode } from '../types/terratwin';

export type GlobeFocus = 'earth' | 'moon' | 'mars';

interface PlanetaryGlobe3DProps {
  focus: GlobeFocus;
  locale: LocaleCode;
  onSelectAnalogSite?: (siteId: string) => void;
}

const _vec3 = new THREE.Vector3();
const _targetPos = new THREE.Vector3();

function latLngToVector3(lat: number, lng: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
}

function createEarthTextures(): {
  albedo: THREE.CanvasTexture;
  roughness: THREE.CanvasTexture;
  clouds: THREE.CanvasTexture;
} {
  const w = 1024;
  const h = 512;

  const albedoCanvas = document.createElement('canvas');
  albedoCanvas.width = w;
  albedoCanvas.height = h;
  const ctx = albedoCanvas.getContext('2d')!;

  const roughCanvas = document.createElement('canvas');
  roughCanvas.width = w;
  roughCanvas.height = h;
  const rCtx = roughCanvas.getContext('2d')!;

  // Deep ocean base
  const oceanGrad = ctx.createLinearGradient(0, 0, 0, h);
  oceanGrad.addColorStop(0, '#102742');
  oceanGrad.addColorStop(0.5, '#0c2138');
  oceanGrad.addColorStop(1, '#102742');
  ctx.fillStyle = oceanGrad;
  ctx.fillRect(0, 0, w, h);

  // Ocean is smoother (lower roughness = specular glint)
  rCtx.fillStyle = '#383838';
  rCtx.fillRect(0, 0, w, h);

  // Stylized scientific continents & arid analog belts
  const landBlobs: Array<[number, number, number, number, string]> = [
    // Americas
    [255, 165, 95, 72, '#3d5a45'],
    [275, 175, 55, 38, '#a6895b'], // SW North America / Mojave
    [325, 330, 58, 95, '#466146'], // South America
    [308, 338, 18, 45, '#b88c5a'], // Atacama hyper-arid belt
    [290, 62, 75, 28, '#9aa8b8'], // Canadian Arctic / Devon / Axel Heiberg
    // Africa & Eurasia
    [535, 215, 75, 45, '#b6996c'], // Sahara / Arabia
    [555, 295, 58, 72, '#425d47'], // Sub-Saharan
    [560, 128, 72, 42, '#415b49'], // Europe
    [685, 145, 130, 68, '#556b52'], // Eurasia
    [690, 215, 65, 35, '#9d835b'], // Central Asian steppe / Gobi
    // Iceland & Hawaii volcanic nodes
    [455, 92, 18, 12, '#5c666e'],
    [70, 215, 14, 10, '#6a5d52'],
    // Australia
    [825, 335, 55, 38, '#a96c45'],
  ];

  landBlobs.forEach(([x, y, rx, ry, color]) => {
    ctx.save();
    ctx.beginPath();
    ctx.ellipse(x, y, rx, ry, 0.15, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.restore();

    rCtx.save();
    rCtx.beginPath();
    rCtx.ellipse(x, y, rx, ry, 0.15, 0, Math.PI * 2);
    rCtx.fillStyle = '#cfcfcf';
    rCtx.fill();
    rCtx.restore();
  });

  // Polar ice caps (Antarctica & High Arctic)
  ctx.fillStyle = '#dce6ef';
  ctx.fillRect(0, 0, w, 34);
  ctx.fillRect(0, h - 42, w, 42);
  rCtx.fillStyle = '#888888';
  rCtx.fillRect(0, 0, w, 34);
  rCtx.fillRect(0, h - 42, w, 42);

  // Subtle lat/lon scientific graticule
  ctx.strokeStyle = 'rgba(217, 197, 163, 0.12)';
  ctx.lineWidth = 1;
  for (let gx = 0; gx < w; gx += 64) {
    ctx.beginPath();
    ctx.moveTo(gx, 0);
    ctx.lineTo(gx, h);
    ctx.stroke();
  }
  for (let gy = 64; gy < h; gy += 64) {
    ctx.beginPath();
    ctx.moveTo(0, gy);
    ctx.lineTo(w, gy);
    ctx.stroke();
  }

  // Cloud layer
  const cloudCanvas = document.createElement('canvas');
  cloudCanvas.width = 512;
  cloudCanvas.height = 256;
  const cCtx = cloudCanvas.getContext('2d')!;
  cCtx.clearRect(0, 0, 512, 256);
  for (let i = 0; i < 95; i++) {
    const cx = (Math.sin(i * 19.7) * 0.5 + 0.5) * 512;
    const cy = (Math.cos(i * 11.3) * 0.5 + 0.5) * 256;
    const rw = 24 + (i % 5) * 14;
    const rh = 6 + (i % 3) * 4;
    cCtx.fillStyle = 'rgba(247, 248, 250, 0.16)';
    cCtx.beginPath();
    cCtx.ellipse(cx, cy, rw, rh, 0.1, 0, Math.PI * 2);
    cCtx.fill();
  }

  const albedo = new THREE.CanvasTexture(albedoCanvas);
  albedo.colorSpace = THREE.SRGBColorSpace;

  const roughness = new THREE.CanvasTexture(roughCanvas);
  const clouds = new THREE.CanvasTexture(cloudCanvas);
  clouds.colorSpace = THREE.SRGBColorSpace;

  return { albedo, roughness, clouds };
}

function createMoonTexture(): THREE.CanvasTexture {
  const w = 1024;
  const h = 512;
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#9aa3ad';
  ctx.fillRect(0, 0, w, h);

  // Dark basaltic maria patches
  const maria: Array<[number, number, number, number]> = [
    [380, 210, 95, 70],
    [510, 225, 110, 75],
    [620, 250, 75, 55],
    [290, 255, 70, 55],
  ];
  maria.forEach(([x, y, rx, ry]) => {
    ctx.beginPath();
    ctx.ellipse(x, y, rx, ry, 0.2, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(54, 62, 72, 0.65)';
    ctx.fill();
  });

  // Procedural impact craters
  for (let i = 0; i < 190; i++) {
    const cx = (Math.abs(Math.sin(i * 73.1)) * 0.94 + 0.03) * w;
    const cy = (Math.abs(Math.cos(i * 41.9)) * 0.9 + 0.05) * h;
    const r = 3 + (i % 14);
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(40, 46, 54, 0.35)';
    ctx.fill();
    ctx.strokeStyle = 'rgba(226, 232, 240, 0.38)';
    ctx.lineWidth = 1.2;
    ctx.stroke();
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function createMarsTexture(): THREE.CanvasTexture {
  const w = 1024;
  const h = 512;
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d')!;

  const grad = ctx.createLinearGradient(0, 0, 0, h);
  grad.addColorStop(0, '#c8734d');
  grad.addColorStop(0.5, '#b65432');
  grad.addColorStop(1, '#c8734d');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);

  // Dark basaltic Syrtis & Valles Marineris scar
  const provinces: Array<[number, number, number, number, string]> = [
    [410, 275, 130, 16, '#5f2b1c'], // Valles Marineris canyon
    [640, 235, 95, 65, '#6d3422'], // Syrtis Major basalt
    [250, 210, 85, 50, '#d88c5f'], // Tharsis volcanic plateau
    [520, 195, 55, 40, '#8d4329'], // Jezero / Isidis border
  ];
  provinces.forEach(([x, y, rx, ry, col]) => {
    ctx.beginPath();
    ctx.ellipse(x, y, rx, ry, -0.08, 0, Math.PI * 2);
    ctx.fillStyle = col;
    ctx.fill();
  });

  // Polar CO2/H2O ice caps
  ctx.fillStyle = '#eadfd3';
  ctx.fillRect(0, 0, w, 24);
  ctx.fillRect(0, h - 22, w, 22);

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

export const PlanetaryGlobe3D: React.FC<PlanetaryGlobe3DProps> = ({
  focus,
  locale,
  onSelectAnalogSite,
}) => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const focusRef = useRef<GlobeFocus>(focus);
  const onSelectRef = useRef(onSelectAnalogSite);
  const [hoveredPin, setHoveredPin] = useState<{
    name: string;
    x: number;
    y: number;
  } | null>(null);

  useEffect(() => {
    focusRef.current = focus;
  }, [focus]);

  useEffect(() => {
    onSelectRef.current = onSelectAnalogSite;
  }, [onSelectAnalogSite]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const isSoftwareGl = (() => {
      const probe = document.createElement('canvas').getContext('webgl2');
      if (!probe) return true;
      const ext = probe.getExtension('WEBGL_debug_renderer_info');
      const param = ext ? ext.UNMASKED_RENDERER_WEBGL : probe.RENDERER;
      const gpu = String(probe.getParameter(param));
      probe.getExtension('WEBGL_lose_context')?.loseContext();
      return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    })();

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 520;

    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();

    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    pmremGenerator.dispose();

    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 120);
    camera.position.set(0, 0.85, 5.2);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enablePan = false;
    controls.enableZoom = false;
    controls.enableDamping = !isSoftwareGl;
    controls.dampingFactor = 0.06;
    controls.rotateSpeed = 0.65;

    // Warm solar key light + cool deep-space fill
    const keyLight = new THREE.DirectionalLight(0xffe9cc, 2.8);
    keyLight.position.set(6, 3.5, 4);
    scene.add(keyLight);

    const hemiLight = new THREE.HemisphereLight(0x6da4d8, 0x010205, 0.5);
    scene.add(hemiLight);

    const rimLight = new THREE.DirectionalLight(0x2fd1d3, 1.3);
    rimLight.position.set(-5, -2, -4);
    scene.add(rimLight);

    // Crisp multi-tier deep-space starfield
    const starCount = 1200;
    const starPositions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      const r = 16 + (i % 18) * 1.9;
      const theta = i * 2.39996;
      const phi = Math.acos(1 - (2 * (i + 0.5)) / starCount);
      starPositions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      starPositions[i * 3 + 1] = r * Math.cos(phi);
      starPositions[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
    }
    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    const starMat = new THREE.PointsMaterial({
      color: 0xe6decb,
      size: 0.055,
      transparent: true,
      opacity: 0.78,
    });
    const stars = new THREE.Points(starGeo, starMat);
    scene.add(stars);

    // 1. EARTH COMPOSITE GROUP
    const earthGroup = new THREE.Group();
    const { albedo: earthMap, roughness: earthRough, clouds: cloudMap } = createEarthTextures();
    const maxAniso = renderer.capabilities.getMaxAnisotropy();
    earthMap.anisotropy = maxAniso;

    const earthGeo = new THREE.SphereGeometry(1.45, 48, 48);
    const earthMat = new THREE.MeshStandardMaterial({
      map: earthMap,
      roughnessMap: earthRough,
      roughness: 0.85,
      metalness: 0.08,
    });
    const earthMesh = new THREE.Mesh(earthGeo, earthMat);
    earthGroup.add(earthMesh);

    const cloudGeo = new THREE.SphereGeometry(1.475, 40, 40);
    const cloudMat = new THREE.MeshStandardMaterial({
      map: cloudMap,
      transparent: true,
      depthWrite: false,
      roughness: 1,
    });
    const cloudMesh = new THREE.Mesh(cloudGeo, cloudMat);
    earthGroup.add(cloudMesh);

    // Atmosphere Fresnel shell
    const atmosGeo = new THREE.SphereGeometry(1.53, 40, 40);
    const atmosMat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      uniforms: { glowColor: { value: new THREE.Color('#2A9D9F') } },
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        uniform vec3 glowColor;
        void main() {
          float intensity = pow(0.68 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 3.2);
          gl_FragColor = vec4(glowColor, intensity * 0.72);
        }
      `,
    });
    const atmosMesh = new THREE.Mesh(atmosGeo, atmosMat);
    earthGroup.add(atmosMesh);

    // Orbital reference ring around Earth
    const orbitRingGeo = new THREE.TorusGeometry(2.05, 0.008, 8, 96);
    const orbitRingMat = new THREE.MeshBasicMaterial({
      color: 0xd9c5a3,
      transparent: true,
      opacity: 0.32,
    });
    const earthRing = new THREE.Mesh(orbitRingGeo, orbitRingMat);
    earthRing.rotation.x = Math.PI * 0.42;
    earthRing.rotation.y = 0.25;
    earthGroup.add(earthRing);

    // 7 Interactive 3D Analog Station Pins attached to EarthMesh
    const clickablePins: THREE.Mesh[] = [];
    const pinGeo = new THREE.SphereGeometry(0.042, 16, 16);
    const collarGeo = new THREE.TorusGeometry(0.068, 0.008, 8, 24);

    EARTH_ANALOG_SITES.forEach((site) => {
      const pos = latLngToVector3(site.coordinates.lat, site.coordinates.lng, 1.46);
      const pinColor =
        site.primaryTwin === 'mars'
          ? 0xd96b43
          : site.primaryTwin === 'moon'
          ? 0xcbd5e1
          : 0x2a9d9f;

      const pinMat = new THREE.MeshStandardMaterial({
        color: pinColor,
        emissive: pinColor,
        emissiveIntensity: 0.65,
        roughness: 0.3,
      });
      const pin = new THREE.Mesh(pinGeo, pinMat);
      pin.position.copy(pos);
      pin.layers.set(1);
      pin.userData = {
        siteId: site.id,
        siteName: site.name[locale],
      };

      const collarMat = new THREE.MeshBasicMaterial({
        color: 0xf7f8fa,
        transparent: true,
        opacity: 0.7,
      });
      const collar = new THREE.Mesh(collarGeo, collarMat);
      collar.position.copy(pos);
      collar.lookAt(pos.clone().multiplyScalar(2));

      earthMesh.add(pin);
      earthMesh.add(collar);
      clickablePins.push(pin);
    });

    scene.add(earthGroup);

    // 2. MOON COMPOSITE GROUP
    const moonGroup = new THREE.Group();
    moonGroup.position.set(4.6, 0.65, -2.2);
    const moonTex = createMoonTexture();
    moonTex.anisotropy = maxAniso;
    const moonGeo = new THREE.SphereGeometry(0.82, 40, 40);
    const moonMat = new THREE.MeshStandardMaterial({
      map: moonTex,
      roughness: 0.92,
      metalness: 0.04,
    });
    const moonMesh = new THREE.Mesh(moonGeo, moonMat);
    moonGroup.add(moonMesh);

    const moonRing = new THREE.Mesh(
      new THREE.TorusGeometry(1.18, 0.007, 8, 72),
      new THREE.MeshBasicMaterial({ color: 0x94a3b8, transparent: true, opacity: 0.35 })
    );
    moonRing.rotation.x = Math.PI * 0.45;
    moonGroup.add(moonRing);
    scene.add(moonGroup);

    // 3. MARS COMPOSITE GROUP
    const marsGroup = new THREE.Group();
    marsGroup.position.set(-4.6, -0.45, -2.4);
    const marsTex = createMarsTexture();
    marsTex.anisotropy = maxAniso;
    const marsGeo = new THREE.SphereGeometry(1.05, 40, 40);
    const marsMat = new THREE.MeshStandardMaterial({
      map: marsTex,
      roughness: 0.88,
      metalness: 0.05,
    });
    const marsMesh = new THREE.Mesh(marsGeo, marsMat);
    marsGroup.add(marsMesh);

    const marsAtmos = new THREE.Mesh(
      new THREE.SphereGeometry(1.11, 32, 32),
      new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending,
        uniforms: { glowColor: { value: new THREE.Color('#D96B43') } },
        vertexShader: atmosMat.vertexShader,
        fragmentShader: atmosMat.fragmentShader,
      })
    );
    marsGroup.add(marsAtmos);

    const marsRing = new THREE.Mesh(
      new THREE.TorusGeometry(1.48, 0.007, 8, 72),
      new THREE.MeshBasicMaterial({ color: 0xd96b43, transparent: true, opacity: 0.35 })
    );
    marsRing.rotation.x = Math.PI * 0.44;
    marsGroup.add(marsRing);
    scene.add(marsGroup);

    if (!isSoftwareGl) {
      renderer.compile(scene, camera);
    }

    // Raycasting for Earth analog 3D pins
    const raycaster = new THREE.Raycaster();
    raycaster.layers.set(1);
    const pointer = new THREE.Vector2();
    let lastRaycastMs = 0;

    const updatePointer = (e: PointerEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    };

    const onPointerMove = (e: PointerEvent) => {
      const now = performance.now();
      if (now - lastRaycastMs < 50) return;
      lastRaycastMs = now;
      updatePointer(e);
      raycaster.setFromCamera(pointer, camera);
      const hits = raycaster.intersectObjects(clickablePins, false);
      if (hits.length > 0 && focusRef.current === 'earth') {
        const hit = hits[0].object;
        renderer.domElement.style.cursor = 'pointer';
        const rect = renderer.domElement.getBoundingClientRect();
        setHoveredPin({
          name: String(hit.userData.siteName),
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      } else {
        renderer.domElement.style.cursor = 'grab';
        setHoveredPin(null);
      }
    };

    const onClick = (e: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(pointer, camera);
      const hits = raycaster.intersectObjects(clickablePins, false);
      if (hits.length > 0 && focusRef.current === 'earth') {
        const siteId = String(hits[0].object.userData.siteId);
        onSelectRef.current?.(siteId);
      }
    };

    renderer.domElement.addEventListener('pointermove', onPointerMove);
    renderer.domElement.addEventListener('click', onClick);

    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth || 600;
      const h = container.clientHeight || 520;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    // Animation loop with Software WebGL pacing
    let frameId = 0;
    let disposed = false;
    const clock = new THREE.Clock();

    function afterDraw(cb: () => void) {
      const gl = renderer.getContext() as WebGL2RenderingContext;
      const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
      gl.flush();
      const poll = () => {
        if (disposed) return;
        const state = sync && gl.getSyncParameter(sync, gl.SYNC_STATUS);
        if (state === gl.UNSIGNALED) {
          frameId = window.setTimeout(poll, 5);
        } else {
          if (sync) gl.deleteSync(sync);
          frameId = window.setTimeout(cb, 80);
        }
      };
      frameId = window.setTimeout(poll, 5);
    }

    const tick = () => {
      if (disposed) return;
      const delta = Math.min(0.1, clock.getDelta());

      earthMesh.rotation.y += delta * 0.09;
      cloudMesh.rotation.y += delta * 0.12;
      moonMesh.rotation.y += delta * 0.08;
      marsMesh.rotation.y += delta * 0.1;
      stars.rotation.y += delta * 0.008;

      // Smoothly damp OrbitControls target toward active destination
      if (focusRef.current === 'earth') {
        _targetPos.set(0, 0, 0);
      } else if (focusRef.current === 'moon') {
        _targetPos.copy(moonGroup.position);
      } else {
        _targetPos.copy(marsGroup.position);
      }

      controls.target.x = THREE.MathUtils.damp(controls.target.x, _targetPos.x, 4.5, delta);
      controls.target.y = THREE.MathUtils.damp(controls.target.y, _targetPos.y, 4.5, delta);
      controls.target.z = THREE.MathUtils.damp(controls.target.z, _targetPos.z, 4.5, delta);

      const desiredDist = focusRef.current === 'earth' ? 4.8 : 3.2;
      _vec3.copy(camera.position).sub(controls.target);
      const currentDist = _vec3.length();
      const dampedDist = THREE.MathUtils.damp(currentDist, desiredDist, 3.8, delta);
      _vec3.normalize().multiplyScalar(dampedDist);
      camera.position.copy(controls.target).add(_vec3);

      controls.update();
      renderer.render(scene, camera);

      if (isSoftwareGl) {
        afterDraw(tick);
      } else {
        frameId = requestAnimationFrame(tick);
      }
    };

    tick();

    return () => {
      disposed = true;
      cancelAnimationFrame(frameId);
      clearTimeout(frameId);
      window.removeEventListener('resize', onResize);
      renderer.domElement.removeEventListener('pointermove', onPointerMove);
      renderer.domElement.removeEventListener('click', onClick);
      controls.dispose();
      earthGeo.dispose();
      earthMat.dispose();
      earthMap.dispose();
      earthRough.dispose();
      cloudGeo.dispose();
      cloudMat.dispose();
      cloudMap.dispose();
      atmosGeo.dispose();
      atmosMat.dispose();
      moonGeo.dispose();
      moonMat.dispose();
      moonTex.dispose();
      marsGeo.dispose();
      marsMat.dispose();
      marsTex.dispose();
      starGeo.dispose();
      starMat.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [locale]);

  return (
    <div className="relative w-full h-full min-h-[380px] sm:min-h-[460px]">
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />
      {hoveredPin && (
        <div
          style={{ left: hoveredPin.x, top: hoveredPin.y - 38 }}
          className="pointer-events-none absolute -translate-x-1/2 rounded-md bg-[#030509]/95 border border-[#2FD1D3]/50 px-2.5 py-1 text-xs font-medium text-[#F5F7FA] whitespace-nowrap shadow-[0_14px_40px_rgba(0,0,0,0.95)]"
        >
          {hoveredPin.name}
        </div>
      )}
    </div>
  );
};
