"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export default function ThreeScene({ isLoading }) {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const animationRef = useRef(null);
  const modelRef = useRef(null);
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 5);

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    rendererRef.current = renderer;

    mountRef.current.appendChild(renderer.domElement);

    // Lighting setup
    const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(10, 10, 5);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    scene.add(directionalLight);

    // Point lights for dramatic effect
    const pointLight1 = new THREE.PointLight(0x4a90e2, 0.8, 100);
    pointLight1.position.set(-10, 5, 5);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xe24a90, 0.6, 100);
    pointLight2.position.set(10, -5, 5);
    scene.add(pointLight2);

    // Create a metallic motor-like object as placeholder
    const createMotorModel = () => {
      const group = new THREE.Group();

      // Main cylinder (motor body)
      const cylinderGeometry = new THREE.CylinderGeometry(1.2, 1.2, 2.5, 32);
      const metallicMaterial = new THREE.MeshPhysicalMaterial({
        color: 0x888888,
        metalness: 0.9,
        roughness: 0.1,
        clearcoat: 1.0,
        clearcoatRoughness: 0.1,
        envMapIntensity: 1.5,
      });
      
      const cylinder = new THREE.Mesh(cylinderGeometry, metallicMaterial);
      cylinder.castShadow = true;
      cylinder.receiveShadow = true;
      group.add(cylinder);

      // End caps
      const capGeometry = new THREE.CylinderGeometry(1.3, 1.3, 0.2, 32);
      const capMaterial = new THREE.MeshPhysicalMaterial({
        color: 0x666666,
        metalness: 0.8,
        roughness: 0.2,
      });

      const cap1 = new THREE.Mesh(capGeometry, capMaterial);
      cap1.position.y = 1.35;
      cap1.castShadow = true;
      group.add(cap1);

      const cap2 = new THREE.Mesh(capGeometry, capMaterial);
      cap2.position.y = -1.35;
      cap2.castShadow = true;
      group.add(cap2);

      // Shaft
      const shaftGeometry = new THREE.CylinderGeometry(0.15, 0.15, 1.5, 16);
      const shaftMaterial = new THREE.MeshPhysicalMaterial({
        color: 0x444444,
        metalness: 1.0,
        roughness: 0.05,
      });

      const shaft = new THREE.Mesh(shaftGeometry, shaftMaterial);
      shaft.position.y = 2;
      shaft.castShadow = true;
      group.add(shaft);

      // Cooling fins
      for (let i = 0; i < 8; i++) {
        const finGeometry = new THREE.BoxGeometry(0.1, 2, 0.3);
        const fin = new THREE.Mesh(finGeometry, metallicMaterial);
        const angle = (i / 8) * Math.PI * 2;
        fin.position.x = Math.cos(angle) * 1.3;
        fin.position.z = Math.sin(angle) * 1.3;
        fin.rotation.y = angle;
        fin.castShadow = true;
        group.add(fin);
      }

      return group;
    };

    // Create and add the motor model
    const motorModel = createMotorModel();
    modelRef.current = motorModel;
    scene.add(motorModel);

    // Environment map for reflections
    const loader = new THREE.CubeTextureLoader();
    const envMap = loader.load([
      'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB2aWV3Qm94PSIwIDAgMSAxIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiMxMTExMTEiLz48L3N2Zz4=',
      'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB2aWV3Qm94PSIwIDAgMSAxIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiMxMTExMTEiLz48L3N2Zz4=',
      'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB2aWV3Qm94PSIwIDAgMSAxIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiMzMzMzMzMiLz48L3N2Zz4=',
      'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB2aWV3Qm94PSIwIDAgMSAxIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiMwMDAwMDAiLz48L3N2Zz4=',
      'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB2aWV3Qm94PSIwIDAgMSAxIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiMxMTExMTEiLz48L3N2Zz4=',
      'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB2aWV3Qm94PSIwIDAgMSAxIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiMxMTExMTEiLz48L3N2Zz4='
    ]);
    scene.environment = envMap;

    // Apply environment map to materials
    motorModel.traverse((child) => {
      if (child.isMesh && child.material) {
        child.material.envMap = envMap;
        child.material.needsUpdate = true;
      }
    });

    // Particle system for ambient effect
    const particleGeometry = new THREE.BufferGeometry();
    const particleCount = 1000;
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 50;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const particleMaterial = new THREE.PointsMaterial({
      color: 0x4a90e2,
      size: 0.02,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // Animation loop
    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);

      if (modelRef.current) {
        // Rotate the motor
        modelRef.current.rotation.y += 0.01;
        modelRef.current.rotation.x = Math.sin(Date.now() * 0.001) * 0.1;
        
        // Floating animation
        modelRef.current.position.y = Math.sin(Date.now() * 0.002) * 0.2;
      }

      // Animate particles
      particles.rotation.y += 0.002;

      // Animate lights
      pointLight1.position.x = Math.sin(Date.now() * 0.001) * 15;
      pointLight1.position.z = Math.cos(Date.now() * 0.001) * 15;
      
      pointLight2.position.x = Math.cos(Date.now() * 0.0015) * 12;
      pointLight2.position.z = Math.sin(Date.now() * 0.0015) * 12;

      renderer.render(scene, camera);
    };

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Mouse interaction
    const mouse = new THREE.Vector2();
    const handleMouseMove = (event) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      
      if (modelRef.current) {
        modelRef.current.rotation.x = mouse.y * 0.2;
        modelRef.current.rotation.y += mouse.x * 0.01;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Start animation
    animate();

    // Simulate loading progress
    let progress = 0;
    const loadingInterval = setInterval(() => {
      progress += Math.random() * 15;
      if (progress >= 100) {
        progress = 100;
        clearInterval(loadingInterval);
      }
      setLoadingProgress(progress);
    }, 100);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      
      renderer.dispose();
      clearInterval(loadingInterval);
    };
  }, []);

  return (
    <div className="relative w-full h-full">
      <div ref={mountRef} className="w-full h-full" />
      
      {/* Loading Progress */}
      {isLoading && (
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-center">
          <div className="w-64 h-1 bg-white/20 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-400 to-purple-500 transition-all duration-300 ease-out"
              style={{ width: `${loadingProgress}%` }}
            />
          </div>
          <p className="text-white/60 text-xs mt-2">
            Loading 3D Model... {Math.round(loadingProgress)}%
          </p>
        </div>
      )}
      
      {/* Interactive Hint */}
      {!isLoading && (
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-center">
          <p className="text-white/40 text-xs animate-pulse">
            Move your mouse to interact with the model
          </p>
        </div>
      )}
    </div>
  );
}