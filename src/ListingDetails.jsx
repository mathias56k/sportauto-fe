import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Mousewheel, Navigation, Pagination } from 'swiper/modules';

import Navbar from './Navbar';

const ListingDetails = () => {
  const { id } = useParams();
  const [listingDetails, setListingDetails] = useState(null);
  const [isImageClicked, setIsImageClicked] = useState(false);

  const handleImageClick = () => {
    setIsImageClicked(true);
  };

  const handleCloseButtonClick = () => {
    setIsImageClicked(false);
  };

  const closeButton = (
    <button
      className="bg-themeColors-bg-2 text-themeColors-accent rounded-tr-2xl rounded-bl-2xl w-16 h-16 flex justify-center items-center text-3xl"
      onClick={handleCloseButtonClick}
    >
      X
    </button>
  );

  useEffect(() => {
    const fetchListingDetails = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/listings/${id}?populate=*`);
        setListingDetails(response.data);
      } catch (error) {
        console.error('Error fetching listing details:', error);
        setListingDetails(null);
      }
    };

    fetchListingDetails();
  }, [id]);

    return (
      <>
        <div className={`${isImageClicked ? 'clicked-details' : ''}`}>
          <Navbar />
        </div>
        <div className={`flex flex-col items-center mt-8 relative ${isImageClicked ? 'clicked-container-mt' : ''}`}>
          {listingDetails ? (
          <div className={`flex flex-col justify-center items-center w-[100%] ${isImageClicked ? 'clicked-wh' : ''}`}>
            <Swiper
              className={`max-w-[70rem] w-[90%] rounded-3xl ${isImageClicked ? 'clicked-w' : ''}`}
              navigation={true}
              mousewheel={true}
              pagination={{
                dynamicBullets: true,
              }}
              modules={[Navigation, Pagination, Mousewheel]}
            >
              {listingDetails.data.attributes.images.data.map((image) => (
                <SwiperSlide key={image.id}>
                  <div className='absolute right-0'>
                    {isImageClicked && closeButton}
                  </div>
                  <img
                    className={`max-w-[70rem] w-full rounded-3xl ${isImageClicked ? 'clicked-image' : ''}`}
                    src={`${image.attributes.formats.medium.url}`}
                    alt={image.attributes.name}
                    onClick={handleImageClick}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
            <div className={`mt-4 w-[90%] text-themeColors-text flex flex-col items-center ${isImageClicked ? 'clicked-details' : ''}`}>
              <div className='flex justify-center'>
                <h3 className='font-bold text-[1.75rem]'>{listingDetails.data.attributes.title}</h3>
              </div>
              <div className='flex justify-between mt-4 w-[90%]'>
                <div className='flex flex-col justify-center items-center w-[33.33%]'>
                  <p className='font-bold'>Mileage</p>
                  <p>{listingDetails.data.attributes.mileage}km</p>
                </div>
                <div className='flex flex-col justify-center items-center w-[33.33%]'>
                  <p className='font-bold'>First Registration</p>
                  <p>{listingDetails.data.attributes.firstRegistration}</p>
                </div>
                <div className='flex flex-col justify-center items-center w-[33.33%]'>
                  <p className='font-bold'>Year</p>
                  <p>{listingDetails.data.attributes.year}</p>
                </div>
              </div>
              <div className='flex justify-between mt-4 w-[90%]'>
                <div className='flex flex-col justify-center items-center w-[33.33%]'>
                  <p className='font-bold'>Engine</p>
                  <p>{listingDetails.data.attributes.engine} {listingDetails.data.attributes.kW}kW</p>
                </div>
                <div className='flex flex-col justify-center items-center w-[33.33%]'>
                  <p className='font-bold'>Gearbox</p>
                  <p className='text-center'>{listingDetails.data.attributes.gearbox}</p>
                </div>
                <div className='flex flex-col justify-center items-center w-[33.33%]'>
                  <p className='font-bold'>0-100 km/h</p>
                  <p>{listingDetails.data.attributes.acceleration}s</p>
                </div>
              </div>
              <div className='flex justify-between mt-4 w-[90%]'>
                <div className='flex flex-col justify-center items-center w-[33.33%]'>
                  <p className='font-bold'>Weight</p>
                  <p className='text-center'>{listingDetails.data.attributes.weight} kg</p>
                </div>
                <div className='flex flex-col justify-center items-center w-[33.33%]'>
                  <p className='font-bold'>Top speed</p>
                  <p>{listingDetails.data.attributes.topSpeed} km/h</p>
                </div>
                <div className='flex flex-col justify-center items-center w-[33.33%]'>
                  <p className='font-bold'>PWR</p>
                  <p>
                    {Math.floor(
                      (listingDetails.data.attributes.kW / listingDetails.data.attributes.weight) * 1000
                    )} W/kg
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  );
};

export default ListingDetails;
