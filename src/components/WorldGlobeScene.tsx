import { forwardRef, useEffect, useImperativeHandle, useMemo, useRef } from 'react';
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';
import {
  AdditiveBlending,
  BackSide,
  BufferAttribute,
  BufferGeometry,
  Group,
  LinearMipmapLinearFilter,
  MathUtils,
  Mesh,
  Raycaster,
  SRGBColorSpace,
  TextureLoader,
  Vector2,
} from 'three';
import type { Country } from '../countries/registry';
import {
  boundaryPositions,
  countryAtCoordinates,
  getCountryGeometry,
  latitudeLongitudeToVector,
  worldCountryFeatures,
} from '../globe/geography';

export type Globe3DHandle = {
  dragBy: (deltaX: number, deltaY: number) => void;
  reset: () => void;
  rotate: (radians: number) => void;
  selectAt: (normalizedX: number, normalizedY: number) => void;
};

type SceneProps = {
  countries: readonly Country[];
  selectedCountry?: Country;
  zoom: number;
  reducedMotion: boolean;
  lowPower: boolean;
  onSelect: (country: Country) => void;
  onReady: () => void;
  onContextLost: () => void;
};

const GLOBE_RADIUS = 2;
const DEFAULT_TILT = MathUtils.degToRad(10);
const DEFAULT_ROTATION = MathUtils.degToRad(8);

function geometryFromPositions(positions: Float32Array): BufferGeometry {
  const geometry = new BufferGeometry();
  geometry.setAttribute('position', new BufferAttribute(positions, 3));
  return geometry;
}

function shortestEquivalentAngle(angle: number, reference: number): number {
  let result = angle;
  while (result - reference > Math.PI) result -= Math.PI * 2;
  while (result - reference < -Math.PI) result += Math.PI * 2;
  return result;
}

function Earth({
  countries,
  selectedCountry,
  zoom,
  reducedMotion,
  lowPower,
  onSelect,
  onReady,
  onContextLost,
  globeRef,
}: SceneProps & { globeRef: React.ForwardedRef<Globe3DHandle> }): React.JSX.Element {
  const group = useRef<Group>(null);
  const earth = useRef<Mesh>(null);
  const targetRotation = useRef<{ x: number; y: number } | undefined>(undefined);
  const pauseAutoUntil = useRef(0);
  const targetCameraDistance = 5.55 - zoom * 1.15;
  const { camera, gl, invalidate } = useThree();
  const texture = useLoader(TextureLoader, `${import.meta.env.BASE_URL}media/earth-blue-marble-1024.webp`);

  const worldBoundaries = useMemo(() => geometryFromPositions(boundaryPositions(worldCountryFeatures, GLOBE_RADIUS + .012)), []);
  const selectedBoundaries = useMemo(() => {
    if (!selectedCountry) return undefined;
    const selectedGeometry = getCountryGeometry(selectedCountry.isoNumeric);
    return selectedGeometry
      ? geometryFromPositions(boundaryPositions([selectedGeometry], GLOBE_RADIUS + .028))
      : undefined;
  }, [selectedCountry]);

  useEffect(() => () => {
    worldBoundaries.dispose();
    selectedBoundaries?.dispose();
  }, [selectedBoundaries, worldBoundaries]);

  useEffect(() => {
    texture.colorSpace = SRGBColorSpace;
    texture.anisotropy = Math.min(4, gl.capabilities.getMaxAnisotropy());
    texture.minFilter = LinearMipmapLinearFilter;
    texture.needsUpdate = true;
    onReady();
    invalidate();
  }, [gl, invalidate, onReady, texture]);

  useEffect(() => {
    const canvas = gl.domElement;
    const handleLoss = (event: Event) => {
      event.preventDefault();
      onContextLost();
    };
    canvas.addEventListener('webglcontextlost', handleLoss);
    return () => canvas.removeEventListener('webglcontextlost', handleLoss);
  }, [gl, onContextLost]);

  useEffect(() => {
    if (!selectedCountry || !group.current) return;
    const [latitude, longitude] = selectedCountry.coordinates;
    const currentY = group.current.rotation.y;
    targetRotation.current = {
      x: MathUtils.clamp(MathUtils.degToRad(latitude), -.72, .72),
      y: shortestEquivalentAngle(-MathUtils.degToRad(longitude), currentY),
    };
    pauseAutoUntil.current = Number.POSITIVE_INFINITY;
    if (reducedMotion) {
      group.current.rotation.set(targetRotation.current.x, targetRotation.current.y, 0);
      targetRotation.current = undefined;
    }
    invalidate();
  }, [invalidate, reducedMotion, selectedCountry]);

  useImperativeHandle(globeRef, () => ({
    dragBy: (deltaX: number, deltaY: number) => {
      if (!group.current) return;
      targetRotation.current = undefined;
      group.current.rotation.y += deltaX * .006;
      group.current.rotation.x = MathUtils.clamp(group.current.rotation.x + deltaY * .004, -.82, .82);
      pauseAutoUntil.current = performance.now() + 3500;
      invalidate();
    },
    reset: () => {
      if (!group.current) return;
      targetRotation.current = { x: DEFAULT_TILT, y: DEFAULT_ROTATION };
      pauseAutoUntil.current = performance.now() + 3500;
      if (reducedMotion) group.current.rotation.set(DEFAULT_TILT, DEFAULT_ROTATION, 0);
      invalidate();
    },
    rotate: (radians: number) => {
      if (!group.current) return;
      targetRotation.current = undefined;
      group.current.rotation.y += radians;
      pauseAutoUntil.current = performance.now() + 3500;
      invalidate();
    },
    selectAt: (normalizedX: number, normalizedY: number) => {
      if (!earth.current || !group.current) return;
      const raycaster = new Raycaster();
      raycaster.setFromCamera(new Vector2(normalizedX * 2 - 1, 1 - normalizedY * 2), camera);
      const intersection = raycaster.intersectObject(earth.current, false)[0];
      if (!intersection) return;
      const localPoint = group.current.worldToLocal(intersection.point.clone()).normalize();
      const latitude = MathUtils.radToDeg(Math.asin(MathUtils.clamp(localPoint.y, -1, 1)));
      const longitude = MathUtils.radToDeg(Math.atan2(localPoint.x, localPoint.z));
      const selected = countryAtCoordinates(longitude, latitude, countries);
      if (selected) onSelect(selected);
    },
  }), [camera, countries, globeRef, invalidate, onSelect, reducedMotion]);

  useFrame((state, delta) => {
    if (!group.current) return;
    const target = targetRotation.current;
    if (target) {
      const smoothing = reducedMotion ? 1 : 1 - Math.exp(-delta * 5);
      group.current.rotation.x = MathUtils.lerp(group.current.rotation.x, target.x, smoothing);
      group.current.rotation.y = MathUtils.lerp(group.current.rotation.y, target.y, smoothing);
      if (Math.abs(group.current.rotation.x - target.x) < .001 && Math.abs(group.current.rotation.y - target.y) < .001) {
        targetRotation.current = undefined;
      }
    } else if (!reducedMotion && performance.now() > pauseAutoUntil.current) {
      group.current.rotation.y += delta * .045;
    }
    const cameraSmoothing = reducedMotion ? 1 : 1 - Math.exp(-delta * 6);
    camera.position.z = MathUtils.lerp(camera.position.z, targetCameraDistance, cameraSmoothing);
    camera.lookAt(0, 0, 0);
    if (state.frameloop === 'demand' && (target || Math.abs(camera.position.z - targetCameraDistance) > .002)) invalidate();
  });

  const marker = selectedCountry
    ? latitudeLongitudeToVector(selectedCountry.coordinates[0], selectedCountry.coordinates[1], GLOBE_RADIUS + .065)
    : undefined;
  const segmentCount = lowPower ? 40 : 64;

  return (
    <>
      <ambientLight intensity={.72} />
      <directionalLight position={[4, 3, 5]} intensity={1.65} color="#fff7e8" />
      <directionalLight position={[-4, -1, -3]} intensity={.28} color="#83b9ca" />
      <group ref={group} rotation={[DEFAULT_TILT, DEFAULT_ROTATION, 0]}>
        <mesh ref={earth} rotation={[0, -Math.PI / 2, 0]}>
          <sphereGeometry args={[GLOBE_RADIUS, segmentCount, segmentCount / 2]} />
          <meshStandardMaterial map={texture} roughness={.78} metalness={0} />
        </mesh>
        <lineSegments geometry={worldBoundaries} raycast={() => null}>
          <lineBasicMaterial color="#d5e6dc" transparent opacity={.22} />
        </lineSegments>
        {selectedBoundaries && (
          <lineSegments geometry={selectedBoundaries} raycast={() => null}>
            <lineBasicMaterial color="#fff4be" transparent opacity={.96} />
          </lineSegments>
        )}
        {marker && (
          <mesh position={marker} raycast={() => null}>
            <sphereGeometry args={[.045, 16, 12]} />
            <meshBasicMaterial color="#fff3b0" />
          </mesh>
        )}
      </group>
      <mesh raycast={() => null}>
        <sphereGeometry args={[GLOBE_RADIUS + .12, lowPower ? 32 : 48, lowPower ? 18 : 28]} />
        <meshBasicMaterial color="#7fd2dc" transparent opacity={.075} side={BackSide} blending={AdditiveBlending} depthWrite={false} />
      </mesh>
    </>
  );
}

export const WorldGlobeScene = forwardRef<Globe3DHandle, SceneProps>(function WorldGlobeScene(props, ref) {
  return (
    <Canvas
      aria-hidden="true"
      camera={{ position: [0, 0, 5.55], fov: 43, near: .1, far: 40 }}
      dpr={props.lowPower ? [1, 1.2] : [1, 1.65]}
      frameloop={props.reducedMotion ? 'demand' : 'always'}
      gl={{
        alpha: true,
        antialias: !props.lowPower,
        powerPreference: props.lowPower ? 'low-power' : 'high-performance',
        failIfMajorPerformanceCaveat: true,
      }}
    >
      <Earth {...props} globeRef={ref} />
    </Canvas>
  );
});
