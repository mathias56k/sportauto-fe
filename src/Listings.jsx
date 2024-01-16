import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Navbar from "./components/Navbar";
import Contacts from "./components/Contacts";
import Footer from "./components/Footer";

const Listings = () => {
  const [error, setError] = useState(null);
  const [listings, setListings] = useState([]);
  const [sortBy, setSortBy] = useState("price-reverse");
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [seeAll, setSeeAll] = useState(false);

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
    return <div>An error occured: {error.message}</div>;
  }

  const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

  const sortListings = (listings) => {
    const sortedListings = [...listings];

    if (sortBy === "price") {
      sortedListings.sort((a, b) => a.attributes.price - b.attributes.price);
    } else if (sortBy === "price-reverse") {
      sortedListings.sort((a, b) => b.attributes.price - a.attributes.price);
    } else if (sortBy === "year") {
      sortedListings.sort((a, b) => a.attributes.year - b.attributes.year);
    } else if (sortBy === "year-reverse") {
      sortedListings.sort((a, b) => b.attributes.year - a.attributes.year);
    } else if (sortBy === "name") {
      sortedListings.sort((a, b) =>
        a.attributes.title.localeCompare(b.attributes.title)
      );
    } else if (sortBy === "name-reverse") {
      sortedListings.sort((a, b) =>
        b.attributes.title.localeCompare(a.attributes.title)
      );
    }

    useEffect(() => {
      const handleResize = () => {
        setWindowWidth(window.innerWidth);
      };
  
      window.addEventListener("resize", handleResize);
  
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, []);

    return sortedListings;
  };

  const itemsPerPage = seeAll ? listings.length : (windowWidth < 888 ? 3 : listings.length);

  return (
    <div className="text-themeColors-text font-display flex flex-col items-center">
      <Navbar />
      <div className="w-[90%] mt-8 flex flex-wrap justify-center gap-8">
        {sortListings(listings).slice(0, itemsPerPage).map(({ id, attributes }) => (
          <Link to={`/listings/${id}`} key={id} className="max-w-[24rem]">
            <div className="bg-themeColors-bg-2 rounded-2xl flex flex-col items-center">
              <div>
                <img
                  className="w-full rounded-t-2xl"
                  src={`${attributes.images.data[0]?.attributes?.formats?.medium?.url}`}
                  alt="Thumbnail"
                />
              </div>
              <div className="mt-3 mb-1">
                <h3 className="text-[1.15rem] font-bold">{attributes.title}</h3>
              </div>
              <div className="flex text-[1.05rem] w-full text-[#E6E3E8]">
                <p className="ml-6 w-[33.33%] flex justify-start">
                  {formatWithSpaces(attributes.mileage)}km
                </p>
                <p className="w-[33.33%] flex justify-center">
                  {attributes.year}
                </p>
                <p className="mr-6 w-[33.33%] flex justify-end">
                  {attributes.kW}kW
                </p>
              </div>
              <div className="font-small text-3xl font-extrabold bg-[#F7F402] text-themeColors-bg-2 w-full flex justify-center mt-3 rounded-b-2xl p-2">
                <p>{formatWithSpaces(attributes.price)}€</p>
              </div>
            </div>
          </Link>
        ))}
        {windowWidth < 888 && !seeAll && (
          <div className="max-w-[24rem] w-[100%]">
            <div className="bg-themeColors-bg-2 rounded-2xl flex flex-col items-center p-4">
              <button className="text-themeColors-text text-2xl font-bold" onClick={() => setSeeAll(true)}>
                See All
              </button>
            </div>
          </div>
        )}
      </div>
      <Contacts />
      <Footer />
    </div>
  );
};

export default Listings;
