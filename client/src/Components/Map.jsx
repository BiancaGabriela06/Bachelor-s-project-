import React, {useState} from 'react'

import {ComposableMap, Geographies, Geography, Marker, Annotation, ZoomableGroup } from "react-simple-maps";

import {Tooltip }from "react-tooltip";
import { Typography } from '@mui/material';

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const Map = () => {

    const [markers, setMarkers] = useState([]);
    const [content, setContent] = useState("");

    return (
         <div
           className='App'
           style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            color: 'green'
           }}
         >
            <Typography>
              Check the places you have been visited
            </Typography>
            <Tooltip>{content}</Tooltip>
            <div style={{width: "500px", borderStyle: "double"}}>
                <ComposableMap data-tip="">
                    <ZoomableGroup zoom={1}>
                        {" "}
                        <Geographies geography={geoUrl}>
                            {({ geographies}) => geographies.map((geo) => (
                                <Geography key={geo.rsmKey} geography={geo}
                                onMouseEnter={() => {
                                    const { NAME } = geo.properties;
                                    setContent (`${NAME}`);
                                }}
                                onMouseLeave={() => { setContent("")}}
                                style ={{
                                    hover: {
                                        fill : "#F53",
                                        outline: "none"
                                    }
                                }}
                                />
                            ))
                            }
                        </Geographies>

                        {markers.map(({name, coordinates, markerOffset}) => (
                            <Marker key= {name} coordinates={coordinates}>
                                <circle r={10} fill="#F00" stroke="#fff" strokeWidth={2}/>
                                <text textAnchor="middle" y={markerOffset} style={{fontFamily: "system-ui", fill: "#5D5A6D"}}>
                                   {name}
                                </text>
                            </Marker>

                        ))}
                    </ZoomableGroup>
                </ComposableMap>
            </div>
         </div>
    )
}

export default Map;