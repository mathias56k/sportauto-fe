import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Carousel } from 'flowbite-react'; // Import the Carousel component

const ListingDetails = () => {
  const { id } = useParams();
  const [listingDetails, setListingDetails] = useState(null);

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
      {listingDetails ? (
        <div className="h-[16rem]">
          <Carousel slide={false}>
            {listingDetails.data.attributes.images.data.map((image) => (
              <img
                key={image.id}
                src={`${import.meta.env.VITE_BASE_URL}${image.attributes.formats.medium.url}`}
                alt={image.attributes.name}
              />
            ))}
          </Carousel>
          <div>
            <p>{listingDetails.data.attributes.title}</p>
            <p>{listingDetails.data.attributes.kW}kW</p>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default ListingDetails;
