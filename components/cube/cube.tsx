'use client';

import { useRef, useState, Suspense, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Mesh } from 'three';
import { useTheme } from '@/hooks/useTheme';
import { OrbitControls, Text } from '@react-three/drei';
import styles from './cube.module.scss';
import { Fallback } from '@/components/fallback';

function Loader() {
    return (
        <span className={styles.loader}>
            <Fallback />
        </span>
    );
}

function Box({
    text = '',
    geometry = [1, 1, 1],
    canFollowCam = true,
    ...props
}) {
    const theme = useTheme();
    const ref = useRef<Mesh>(null!);

    useFrame(({ mouse, viewport }) => {
        if (!canFollowCam) {
            return;
        }

        console.log(canFollowCam);

        const x = (mouse.x * viewport.width) / 20;
        const y = (mouse.y * viewport.height) / 20;

        ref.current.lookAt(x, y, 1);
    });

    return (
        <mesh {...props} ref={ref}>
            <boxGeometry args={[4, 4, 4]} />
            <meshStandardMaterial color={theme.values.primary} />
            <Text fontSize={0.3} position-z={0.3}>
                {text}
            </Text>
            {props.children}
        </mesh>
    );
}

export function Cube() {
    const [showOrbitControls, setShowOrbitControls] = useState(false);

    useEffect(() => {
        if (isTouch()) {
            setShowOrbitControls(true);
        }
    }, []);

    return (
        <div className={[styles.cube, styles.flex].join(' ')}>
            <Suspense fallback={<Loader />}>
                <Canvas camera={{ position: [0, 0, 10] }}>
                    {showOrbitControls && <OrbitControls enableZoom={false} />}
                    <ambientLight intensity={0.2} />
                    <pointLight position={[10, 10, 10]} intensity={0.5} />
                    <Box
                        position={[0, 0, 0]}
                        canFollowCam={!showOrbitControls}
                    />
                </Canvas>
            </Suspense>
        </div>
    );
}

function isTouch() {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}
