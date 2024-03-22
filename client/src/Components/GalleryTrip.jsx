import react from 'react';
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Image from 'react-bootstrap/Image';


const GalleryTrip = () => {
    return (
        <div className="container" style={{ padding: 5 }}>
            <div className='row'>
                <div className='col-md-8 mx-auto'>
                <Carousel useKeyboardArrows={true} showThumbs={false} showStatus={false} interval={2000}
                  style={{width: "100%"}}>
                    <div className="slide">
                        <Image alt="sample_file1" src={require("../assets/images/attractive-happy-couple.jpg" )} fluid/>
                    </div>
                    <div className="slide">
                        <Image alt="sample_file2" src={require("../assets/images/female-traveler-with-camera-holding-map-hand.jpg")} fluid />
                    </div>
                    <div className="slide">
                        <Image alt="sample_file3" src={require("../assets/images/front-view-tourist-woman-with-backpack.jpg")} fluid />
                    </div>

                    </Carousel>
                </div>
            </div>
        </div>
    )
}

export default GalleryTrip;