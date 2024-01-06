import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Mousewheel, Navigation, Pagination } from 'swiper/modules';

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
                    src={`${import.meta.env.VITE_BASE_URL}${image.attributes.formats.medium.url}`}
                    alt={image.attributes.name}
                    onClick={handleImageClick}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
            <div className={`${isImageClicked ? 'clicked-details' : ''}`}>
              <p>{listingDetails.data.attributes.title}</p>
              <p>{listingDetails.data.attributes.kW}kW</p>
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
