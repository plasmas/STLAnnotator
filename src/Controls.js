import React, { useRef } from "react";
import { useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

function Controls() {
    const { camera, gl } = useThree();
    const controlsRef = useRef();
    return <OrbitControls ref={controlsRef} args={[camera, gl.domElement]} />;
}

export default Controls;
