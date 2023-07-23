'use client';

import { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame, useThree, ThreeElements } from '@react-three/fiber';
import { Mesh, Vector3, Color } from 'three';
import { useTheme } from '@/hooks/useTheme';
import { Stats, Text } from '@react-three/drei';
import styles from './cube.module.scss';

// function Box(props: ThreeElements['mesh']) {
//     // Get current theme
//     const theme = useTheme();

//     // This reference will give us direct access to the mesh
//     const meshRef = useRef<Mesh>(null!);

//     // Set up state for the hovered and active state
//     const [hovered, setHover] = useState(false);
//     const [active, setActive] = useState(false);

//     // Subscribe this component to the render-loop, rotate the mesh every frame
//     useFrame((state, delta) => {
//         //  Divide by 2 to slow rotation
//         meshRef.current.rotation.x += delta / 3;
//         meshRef.current.rotation.y += delta / 3;
//     });

//     return (
//         <mesh
//             {...props}
//             ref={meshRef}
//             scale={active ? 1.5 : 1}
//             onClick={(event) => setActive(!active)}
//             onPointerOver={(event) => setHover(true)}
//             onPointerOut={(event) => setHover(false)}
//         >
//             <boxGeometry args={[2, 2, 2]} />
//             <meshStandardMaterial
//                 color={hovered ? theme.values.accent : theme.values.primary}
//             />
//         </mesh>
//     );
// }

// TODO: When the mouse leaves the viewport, softly return it's position to [0,0,0].
function Box({ text = '', geometry = [1, 1, 1], ...props }) {
    const theme = useTheme();
    const ref = useRef<Mesh>(null!);
    const [hovered, setHovered] = useState(false);

    useFrame(({ mouse, viewport }) => {
        // NOTE: Increase denominator to reduce camera sensitivity.
        // const x = (mouse.x * viewport.width) / 2.5;
        // const y = (mouse.y * viewport.height) / 2.5;
        const x = (mouse.x * viewport.width) / 10;
        const y = (mouse.y * viewport.height) / 10;

        ref.current.lookAt(x, y, 1);
    });

    return (
        <mesh
            {...props}
            ref={ref}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
        >
            {/* @ts-ignore */}
            <boxGeometry args={geometry} />
            <meshStandardMaterial
                color={hovered ? theme.values.accent : theme.values.primary}
            />
            <Text fontSize={0.3} position-z={0.3}>
                {text}
            </Text>
            {props.children}
        </mesh>
    );
}

// Why does this exist?
function Rig() {
    const { camera, mouse } = useThree();
    const vec = new Vector3();

    return useFrame(() => {
        camera.position.lerp(
            vec.set(mouse.x, mouse.y, camera.position.z),
            0.05
        );
        camera.lookAt(0, 0, 0);
    });
}

export function Cube() {
    return (
        <div className={[styles.cube, styles.flex].join(' ')}>
            <Canvas camera={{ position: [0, 0, 10] }}>
                <directionalLight position={[0, 0, 1]} intensity={0.5} />
                {/* {[...Array(10).keys()].map((i) => (
                    <group key={i * 10}>
                        <Box position={[-5, -5 + i * 1, 0]} text={'0'} />
                        <Box position={[-4, -5 + i * 1, 0]} text={'1'} />
                        <Box position={[-3, -5 + i * 1, 0]} text={'2'} />
                        <Box position={[-2, -5 + i * 1, 0]} text={'3'} />
                        <Box position={[-1, -5 + i * 1, 0]} text={'4'} />
                        <Box position={[1, -5 + i * 1, 0]} text={'5'} />
                        <Box position={[2, -5 + i * 1, 0]} text={'6'} />
                        <Box position={[3, -5 + i * 1, 0]} text={'7'} />
                        <Box position={[4, -5 + i * 1, 0]} text={'8'} />
                        <Box position={[5, -5 + i * 1, 0]} text={'9'} />
                    </group>
                ))} */}
                <Box geometry={[3, 3, 3]} position={[0, 0, 0]} />
                {/* <Rig /> */}
                {/* <Stats /> */}
            </Canvas>
        </div>
    );
}

// DEV:

{
    /* <Canvas>
    <ambientLight intensity={0.1} />
    <pointLight position={[10, 10, 10]} />
    <Box position={[0, 0, 0]} />
</Canvas> */
}

{
    /* <div className={[styles.cube, styles.flex].join(' ')}>
    <Canvas>
        <ambientLight intensity={0.1} />
        <pointLight position={[10, 10, 10]} />
        <Box position={[-1.2, 0, 0]} />
        <Box position={[1.2, 0, 0]} />
    </Canvas>
</div> */
}
