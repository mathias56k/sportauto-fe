import { BrowserRouter, Routes, Route } from "react-router-dom";
import Listings from './Listings';
import ListingDetails from './ListingDetails';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Listings />} />
        <Route path="/listings/:id" element={<ListingDetails />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
