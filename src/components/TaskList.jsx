import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import config from "../../config/config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-regular-svg-icons";

const TaskList = () => {
  // State to hold the fetched data
  const [taskData, setTaskData] = useState(null);
  const navigate = useNavigate();

  // Effect to fetch data when the component mounts
  useEffect(() => {
    // Function to fetch data
    const fetchData = async () => {
      try {
        // Make a GET request to your backend API endpoint
        const response = await axios.get(
          `${config.backend.url}/api/tasks/655f6311b209483dd4225cd7`
        );

        // Set the fetched data in state
        setTaskData(response.data.tasks);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    console.log("noice");
    console.log(taskData);
  }, []); // Empty dependency array ensures the effect runs only once when the component mounts

  const [isOpen, setIsOpen] = useState(false);
  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="bg-white rounded-lg p-4">
      <h2 className="text-3xl text-left font-bold h-100 border-b my-2 mb-5">
        Tasks
      </h2>
      {taskData ? (
        <ul>
          {taskData.map((task) => (
            <li className="mb-5 text-left" key={task._id}>
              <div className="flex items-center">
                <FontAwesomeIcon icon={faCircle} />
                <p className="font-bold ml-3">{task.title}</p>
              </div>
              <p className="ml-7 text-slate-500">{task.description}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default TaskList;
