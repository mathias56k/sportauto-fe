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

  const formatWithSpaces = (number) => {
    if (number >= 10000) {
      return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }
    return number.toString();
  };

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
      <div className="flex flex-col items-center my-8 relative">
        {listingDetails ? (
      <div className="flex flex-col justify-center items-center w-[90%]">
      <Lightbox
        styles={{ 
          container: { borderRadius: "1rem" },
          navigationPrev: { color: "#F7F402", fontSize: "3rem", marginLeft: "-1rem" },
          navigationNext: { color: "#F7F402", fontSize: "3rem", marginRight: "-1rem" }
        }}
        index={index}
        slides={slides}
        plugins={[Inline, Counter]}
        counter={{ container: { style: { top: "unset", bottom: -10, left: "44%" } } }}
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
      <div className='mt-6'>
        <h3 className='font-bold text-themeColors-text text-2xl'>{listingDetails.data.attributes.title}</h3>
      </div>
      <div className='text-themeColors-accent text-[3rem] font-bold flex justify-center w-[90%] mb-10'>
        <p className=''>{formatWithSpaces(listingDetails.data.attributes.price)}€</p>
      </div>
      <div className='text-themeColors-text text-[1.2rem] font-extralight flex justify-between w-[90%]'>
        <p className='font-medium'>VIN</p>
        <p className=''>{listingDetails.data.attributes.VIN}</p>
      </div>
      <hr className='h-px w-[90%] bg-themeColors-bg-2 border-0 my-2'/>
      <div className='text-themeColors-text text-[1.2rem] font-extralight flex justify-between w-[90%]'>
        <p className='font-medium'>Model year</p>
        <p className=''>{listingDetails.data.attributes.year}</p>
      </div>
      <hr className='h-px w-[90%] bg-themeColors-bg-2 border-0 my-2'/>
      <div className='text-themeColors-text text-[1.2rem] font-extralight flex justify-between w-[90%]'>
        <p className='font-medium'>First registration</p>
        <p className=''>{listingDetails.data.attributes.firstRegistration}</p>
      </div>
      <hr className='h-px w-[90%] bg-themeColors-bg-2 border-0 my-2'/>
      <div className='text-themeColors-text text-[1.2rem] font-extralight flex justify-between w-[90%]'>
        <p className='font-medium'>Mileage</p>
        <p className=''>{listingDetails.data.attributes.mileage} km</p>
      </div>
      <hr className='h-px w-[90%] bg-themeColors-bg-2 border-0 my-2'/>
      <div className='text-themeColors-text text-[1.2rem] font-extralight flex justify-between w-[90%]'>
        <p className='font-medium'>Engine</p>
        <p className=''>{listingDetails.data.attributes.engine} {listingDetails.data.attributes.kW}kW</p>
      </div>
      <hr className='h-px w-[90%] bg-themeColors-bg-2 border-0 my-2'/>
      <div className='text-themeColors-text text-[1.2rem] font-extralight flex justify-between w-[90%]'>
        <p className='font-medium'>Gearbox</p>
        <p className=''>{listingDetails.data.attributes.gearbox}</p>
      </div>
      <hr className='h-px w-[90%] bg-themeColors-bg-2 border-0 my-2'/>
      <div className='text-themeColors-text text-[1.2rem] font-extralight flex justify-between w-[90%]'>
        <p className='font-medium'>Acceleration 0-100 km/h</p>
        <p className=''>{listingDetails.data.attributes.acceleration} sec</p>
      </div>
      <hr className='h-px w-[90%] bg-themeColors-bg-2 border-0 my-2'/>
      <div className='text-themeColors-text text-[1.2rem] font-extralight flex justify-between w-[90%]'>
        <p className='font-medium'>Top speed</p>
        <p className=''>{listingDetails.data.attributes.topSpeed} km/h</p>
      </div>
      <hr className='h-px w-[90%] bg-themeColors-bg-2 border-0 my-2'/>
      <div className='text-themeColors-text text-[1.2rem] font-extralight flex justify-between w-[90%]'>
        <p className='font-medium'>Weight</p>
        <p className=''>{listingDetails.data.attributes.weight} kg</p>
      </div>
      <hr className='h-px w-[90%] bg-themeColors-bg-2 border-0 my-2'/>
      <div className='text-themeColors-text text-[1.2rem] font-extralight flex justify-between w-[90%]'>
        <p className='font-medium'>Power-to-weight ratio</p>
        <p className=''>{Math.floor((listingDetails?.data?.attributes?.kW / listingDetails?.data?.attributes?.weight) * 1000)} W/kg</p>
      </div>
      <div className='text-themeColors-text text-[1.2rem] font-extralight flex justify-between w-[90%] mt-10'>
        <p className='font-medium'>Exterior</p>
        <p className=''>{listingDetails.data.attributes.exterior}</p>
      </div>
      <hr className='h-px w-[90%] bg-themeColors-bg-2 border-0 my-2'/>
      <div className='text-themeColors-text text-[1.2rem] font-extralight flex justify-between w-[90%]'>
        <p className='font-medium'>Interior</p>
        <p className=''>{listingDetails.data.attributes.interior}</p>
      </div>
      <div className='text-themeColors-text text-[1.2rem] font-extralight flex justify-between w-[90%] mt-10'>
        <p className='font-medium'>Warranty</p>
        <p className=''>{listingDetails.data.attributes.warrantyStatus[0].warranty ? listingDetails.data.attributes.warrantyStatus[0].warrantyTill : 'No'}</p>
      </div>
      <hr className='h-px w-[90%] bg-themeColors-bg-2 border-0 my-2'/>
      <div className='text-themeColors-text text-[1.2rem] font-extralight flex justify-between w-[90%]'>
        <p className='font-medium'>Accident free</p>
        <p className=''>{listingDetails.data.attributes.accidentFree}</p>
      </div>
      <hr className='h-px w-[90%] bg-themeColors-bg-2 border-0 my-2'/>
      <div className='text-themeColors-text text-[1.2rem] font-extralight flex justify-between w-[90%]'>
        <p className='font-medium'>Service history</p>
        <p className=''>{listingDetails.data.attributes.serviceHistory}</p>
      </div>
      <hr className='h-px w-[90%] bg-themeColors-bg-2 border-0 my-2'/>
      <div className='text-themeColors-text text-[1.2rem] font-extralight flex justify-between w-[90%]'>
        <p className='font-medium'>Number of owners</p>
        <p className=''>{listingDetails.data.attributes.numberOfOwners}</p>
      </div>
      <hr className='h-px w-[90%] bg-themeColors-bg-2 border-0 my-2'/>
      <div className='text-themeColors-text text-[1.2rem] font-extralight flex justify-between w-[90%]'>
        <p className='font-medium'>Location</p>
        <p className=''>{listingDetails.data.attributes.location}</p>
      </div>
      
      <div className='text-themeColors-text text-[1.2rem] font-extralight flex flex-col w-[90%] mt-10'>
        <p className='font-medium mb-4'>Equipment:</p>
        <div className='max-h-96 overflow-scroll border-4 border-themeColors-bg-2 rounded-xl p-2'>
          {listingDetails.data.attributes.equipment.map((equipment, index) => (
            <p key={index} className="text-themeColors-text text-[1.2rem] font-light mb-0.5">
              {equipment.children[0].text}
            </p>
          ))}
        </div>
      </div>

      <div className='text-themeColors-text text-[1.2rem] font-extralight flex flex-col w-[90%] mt-10'>
        <p className='font-medium mb-4'>Comments:</p>
        <div>
          {listingDetails.data.attributes.comment.map((comment, index) => (
            <p key={index} className="text-themeColors-text text-[1.2rem] font-light mb-0.5">
              {comment.children[0].text}
            </p>
          ))}
        </div>
      </div>
      
          </div>
        ) : (
          <p className='text-themeColors-text font-bold text-2xl'>Loading...</p>
        )}
      </div>
    </>
  );
};

export default ListingDetails;
