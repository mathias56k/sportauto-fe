import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Lightbox from 'yet-another-react-lightbox';
import Inline from 'yet-another-react-lightbox/plugins/inline';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import Counter from "yet-another-react-lightbox/plugins/counter";
import 'yet-another-react-lightbox/styles.css';
import "yet-another-react-lightbox/plugins/counter.css";
import Navbar from './Navbar';

import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

const ListingDetails = () => {
  const { id } = useParams();
  const [listingDetails, setListingDetails] = useState(null);
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [slides, setSlides] = useState([]);
  
  const toggleOpen = (state) => () => setOpen(state);
  
  const updateIndex = ({ index: current }) => setIndex(current);

  useEffect(() => {
    const fetchListingDetails = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/listings/${id}?populate=*`
        );
        const details = response.data;
        setListingDetails(details);

        const imageUrls = details.data.attributes.images.data.map((image) => ({
          src: image.attributes.formats.medium.url,
        }));
        setSlides(imageUrls);
      } catch (error) {
        console.error('Error fetching listing details:', error);
        setListingDetails(null);
      }
    };

    fetchListingDetails();
  }, [id]);

  return (
    <>
    <Navbar />
      <div className="flex flex-col items-center mt-8 relative">
        {listingDetails ? (
          <div className="flex flex-col justify-center items-center w-[100%]">
      <Lightbox
        styles={{ 
          container: { borderRadius: "1rem" },
          navigationPrev: { color: "#F7F402", fontSize: "3rem"},
          navigationNext: { color: "#F7F402", fontSize: "3rem"}
        }}
        index={index}
        slides={slides}
        plugins={[Inline, Counter]}
        counter={{ container: { style: { top: "unset", bottom: -10, left: "46%" } } }}
        on={{
          view: updateIndex,
          click: toggleOpen(true),
        }}
        carousel={{
          padding: 0,
          spacing: 0,
          imageFit: "cover",
          finite: true
        }}
        inline={{
          style: {
            width: "100%",
            maxWidth: "746px",
            aspectRatio: "3 / 2",
            margin: "0 0",
          },
        }}
        render={{
          iconPrev: () => <IoIosArrowBack />,
          iconNext: () => <IoIosArrowForward />
        }}
        
      />
      <Lightbox
        styles={{ 
          container: { backgroundColor: "#27242B" },
          navigationPrev: { color: "#F7F402", fontSize: "3rem"},
          navigationNext: { color: "#F7F402", fontSize: "3rem"}
        }}
        open={open}
        close={toggleOpen(false)}
        index={index}
        slides={slides}
        plugins={[Zoom, Counter]}
        on={{ view: updateIndex }}
        animation={{ zoom : 500 }}
        zoom={{
          maxZoomPixelRatio : 5,
          zoomInMultiplier : 2,
          doubleTapDelay : 300,
          doubleClickDelay : 300,
          doubleClickMaxStops : 2,
          keyboardMoveDistance : 50,
          wheelZoomDistanceFactor : 100,
          pinchZoomDistanceFactor : 100,
          scrollToZoom : false,
        }}
        controller={{ 
          closeOnPullDown: true, 
          closeOnBackdropClick: true 
        }}
        noScroll={{disabled: true}}
        carousel={{finite: true}}
        render={{
          iconPrev: () => <IoIosArrowBack />,
          iconNext: () => <IoIosArrowForward />
        }}
      />
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  );
};

export default ListingDetails;
