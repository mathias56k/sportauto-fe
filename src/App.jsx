import axios from "axios";
import { useEffect, useState } from "react";

const App = () => {
  const [error, setError] = useState(null);
  const [cars, setCars] = useState([]);

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_URL)
      .then(({ data }) => setCars(data.data))
      .catch((error) => setError(error));
  }, []);

  if (error) {
    // Print errors if any
    return <div>An error occured: {error.message}</div>;
  }

  return (
    <div className="App text-themeColors-text">
      <ul>
        {cars.map(({ id, attributes }) => (
          <li key={id}>{attributes.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;