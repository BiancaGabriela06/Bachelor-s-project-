import React from 'react';
import 'devextreme/dist/css/dx.light.css';
 import { Gallery } from 'devextreme-react/gallery';
import photo1 from "../../assets/images/Couple.png";
import photo2 from "../../assets/images/Bicycle.png"
import {Grid} from "@mui/material"

const Intro = () => {
   
    const dataSource = [photo1, photo2];
    return(
        <>
        <Gallery
                dataSource={dataSource}
                height={300}
                loop={true}
                slideshowDelay={3000}
            />
        </>
    )

}

export default Intro;
