'use client';

import { useRef, useState } from 'react';
import { Canvas, useFrame, ThreeElements } from '@react-three/fiber';
import { Mesh } from 'three';
import styles from './cube.module.scss';
import { useTheme } from '@/hooks/useTheme';

function Box(props: ThreeElements['mesh']) {
    // Get current theme
    const theme = useTheme();

    // This reference will give us direct access to the mesh
    const meshRef = useRef<Mesh>(null!);

    // Set up state for the hovered and active state
    const [hovered, setHover] = useState(false);
    const [active, setActive] = useState(false);

    // Subscribe this component to the render-loop, rotate the mesh every frame
    useFrame((state, delta) => {
        //  Divide by 2 to slow rotation
        meshRef.current.rotation.x += delta / 3;
        meshRef.current.rotation.y += delta / 3;
    });

    return (
        <mesh
            {...props}
            ref={meshRef}
            scale={active ? 1.5 : 1}
            onClick={(event) => setActive(!active)}
            onPointerOver={(event) => setHover(true)}
            onPointerOut={(event) => setHover(false)}
        >
            <boxGeometry args={[3, 3, 3]} />
            <meshStandardMaterial
                color={hovered ? theme.values.accent : theme.values.primary}
            />
        </mesh>
    );
}

export function Cube() {
    return (
        <div className={styles.cube}>
            <Canvas>
                <ambientLight intensity={0.1} />
                <pointLight position={[10, 10, 10]} />
                <Box position={[0, 0, 0]} />
                {/* <Box position={[-1.2, 0, 0]} /> */}
                {/* <Box position={[1.2, 0, 0]} /> */}
            </Canvas>
        </div>
    );
}
