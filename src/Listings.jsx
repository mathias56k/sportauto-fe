import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

const Listings = () => {
  const [error, setError] = useState(null);
  const [listings, setListings] = useState([]);

  const formatWithSpaces = (number) => {
    if (number >= 10000) {
      return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }
    return number.toString();
  };

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_FULL_URL)
      .then(({ data }) => setListings(data.data))
      .catch((error) => setError(error));
  }, []);

  if (error) {
    // Print errors if any
    return <div>An error occured: {error.message}</div>;
  }

  const VITE_BASE_URL = import.meta.env.VITE_BASE_URL

  return (
    <div className="text-themeColors-text font-display">
        {listings.map(({ id, attributes }) => (
          <Link to={`/listings/${id}`} key={id} className="flex flex-col items-center mt-8 gap-8">
          <div className="bg-themeColors-bg-2 w-[90%] rounded-2xl flex flex-col items-center">
            <div>
              <img className="w-full rounded-t-2xl" src={`${VITE_BASE_URL}${attributes.images.data[0]?.attributes?.formats?.medium?.url}`} alt="Thumbnail" />
            </div>
            <div className="mt-3 mb-1">
              <h3 className="text-[1.15rem] font-bold">{attributes.title}</h3>
            </div>
            <div className="flex text-[1.05rem] w-full text-[#E6E3E8]">
              <p className="ml-6 w-[33.33%] flex justify-start">{formatWithSpaces(attributes.mileage)}km</p>
              <p className="w-[33.33%] flex justify-center">{attributes.year}</p>
              <p className="mr-6 w-[33.33%] flex justify-end">{attributes.kW}kW</p>
            </div>
            <div className="font-small text-3xl font-extrabold bg-[#F7F402] text-themeColors-bg-2 w-full flex justify-center mt-3 rounded-b-2xl p-2">
              <p>{formatWithSpaces(attributes.price)}€</p>
            </div>
          </div>
          </Link>
        ))}
      <hr className="w-full h-1 border-0 bg-themeColors-bg"/>
    </div>
  );
};

export default Listings;