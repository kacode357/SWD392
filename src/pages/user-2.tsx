import { useEffect, useState } from 'react';
import axios from 'axios';

const User = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data when the component mounts
    axios
      .get('http://hieplxse160641-001-site1.ftempurl.com/api/appeal/test')
      .then(response => {
        setData(response.data); // Store the fetched data
        setLoading(false); // Set loading to false after data is fetched
      })
      .catch(err => {
        setError(err.message); // Handle errors
        setLoading(false); // Set loading to false in case of error
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Fetched Data:</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default User;
