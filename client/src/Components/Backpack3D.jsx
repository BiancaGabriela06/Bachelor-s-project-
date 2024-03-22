import React from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, Stage, PresentationControls } from "@react-three/drei";
import {Grid} from "@mui/material"

function Model(props) {
    const { scene } = useGLTF("/backpack2.glb");
    return <primitive object={scene} {...props} />
  }

const Backpack = () => {
    return (
        <Grid container>
        <Grid item >
        <Canvas  shadows={false} camera={{ fov: 45 }} >
                
                <PresentationControls speed={1.5} global zoom={0.5} polar={[-0.1, Math.PI / 4]}>
                    <Stage shadows={false} environment={"sunset"}  >
                    <directionalLight
                            intensity={0.0}
                            position={[5, 10, 5]}
                            />
                    <Model scale={0.01} />
                    </Stage>
                </PresentationControls>
            </Canvas>
        </Grid>
     
      </Grid>
    )

}

export default Backpack