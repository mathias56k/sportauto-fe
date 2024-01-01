import axios from "axios";
import { useEffect, useState } from "react";

const Listings = () => {
  const [error, setError] = useState(null);
  const [listings, setListings] = useState([]);

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
      <div className="flex flex-col items-center mt-8">
        {listings.map(({ id, attributes }) => (
          <div className="bg-themeColors-bg-2 w-[90%] rounded-2xl flex flex-col items-center" key={id}>
            <div>
              <img className="w-full rounded-t-2xl" src={`${VITE_BASE_URL}${attributes.images.data[0]?.attributes?.formats?.medium?.url}`} alt="Thumbnail" />
            </div>
            <div>
              <h3 className="text-2xl font-bold">{attributes.title}</h3>
            </div>
            <hr className="w-full h-1 border-0 bg-themeColors-bg"/>
            <div className="flex font-small">
              <p>{attributes.mileage}km</p>
              <p>{attributes.year}</p>
              <p>{attributes.kW}kW</p>
            </div>
            <div className="font-small">
              <p>{attributes.price}€</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Listings;