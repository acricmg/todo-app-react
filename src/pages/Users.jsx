import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import config from "../../config/config";
import Layout from "../components/Layout";

const Users = () => {
  // State to hold the fetched data
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  // Effect to fetch data when the component mounts
  useEffect(() => {
    // Function to fetch data
    const fetchData = async () => {
      try {
        // Make a GET request to your backend API endpoint
        const response = await axios.get(`${config.backend.url}/api/users`);

        // Set the fetched data in state
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Call the fetch data function
    fetchData();
  }, []); // Empty dependency array ensures the effect runs only once when the component mounts

  // Move to another page
  const handleButtonClick = () => {
    // Use history.push to navigate to another route
    navigate("/register");
  };
  // Render the component with the fetched data
  return (
    <Layout>
      <h2 className="text-3xl font-bold underline h-100">User Data</h2>
      {userData ? (
        <ul>
          {userData.map((user) => (
            <li key={user._id}>{user.name}</li>
          ))}
        </ul>
      ) : (
        <p>Loading...</p>
      )}
      <button onClick={handleButtonClick}>Create user</button>

      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </Layout>
  );
};

export default Users;
