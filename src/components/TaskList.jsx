import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import config from "../../config/config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faCircle } from "@fortawesome/free-regular-svg-icons";
import Notification from "./Notification";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";

const TaskList = ({ userId }) => {
  // State to hold the fetched data
  const [taskData, setTaskData] = useState(null);
  const navigate = useNavigate();
  const [notification, setNotification] = useState(null);
  const [notificationColor, setNotificationColor] = useState("");

  const showNotification = (message, color) => {
    setNotification(message);
    setNotificationColor(color);
  };

  const closeNotification = () => {
    setNotification(null);
    setNotificationColor("");
  };

  // Effect to fetch data when the component mounts
  useEffect(() => {
    fetchData();
  }, []); // Empty dependency array ensures the effect runs only once when the component mounts

  const fetchData = async () => {
    try {
      // Make a GET request to your backend API endpoint
      const response = await axios.get(
        `${config.backend.url}/api/tasks/${userId}`
      );

      // Set the fetched data in state
      const tasks = response.data.tasks.reduce((acc, obj) => {
        const key = obj["status"];
        acc[key] = acc[key] || [];
        acc[key].push(obj);
        return acc;
      }, {});
      console.log(tasks);
      setTaskData(tasks);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleCircleClick = async (task, updatedStatus, notifColor) => {
    try {
      task.status = updatedStatus;
      const response = await axios.post(
        `${config.backend.url}/api/task-u`,
        task
      );
      showNotification(
        task.title + " has been updated to " + updatedStatus + " status",
        notifColor
      );
      fetchData();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div>
      <div>
        {notification && (
          <Notification
            message={notification}
            color={notificationColor}
            onClose={closeNotification}
          />
        )}
      </div>
      <div className="bg-white rounded-lg p-4">
        <h2 className="text-3xl text-left font-bold h-100 border-b my-2 mb-5">
          Tasks
        </h2>
        {taskData && Object.keys(taskData).includes("Unfinished") ? (
          <ul>
            {taskData["Unfinished"].map((task) => (
              <li
                className="mb-5 text-left bg-gray-100 rounded-lg p-2 hover:bg-black hover:text-white"
                key={task._id}
              >
                <div className="flex items-center relative">
                  <FontAwesomeIcon
                    icon={
                      task.status.toLowerCase() == "finished"
                        ? faCheckCircle
                        : faCircle
                    }
                    onClick={() =>
                      handleCircleClick(task, "Finished", "#00b300")
                    }
                    className="cursor-pointer transition duration-300 ease-in-out transform hover:opacity-100 opacity-50"
                  />
                  <p className="font-bold ml-3">{task.title}</p>
                  <div className="absolute right-0 flex">
                    <div className="border hover:bg-gray-700 bg-white text-black hover:text-white items-center px-2 rounded mx-1">
                      <FontAwesomeIcon icon={faPencil} size="xs" />
                    </div>
                    <div className="border hover:bg-gray-700 bg-white text-[#9a0000] hover:text-white items-center px-2 rounded mx-1">
                      <FontAwesomeIcon icon={faTrash} size="xs" />
                    </div>
                  </div>
                </div>
                <p className="ml-7 text-slate-500">{task.description}</p>
                <p className="ml-7 text-slate-500">{task.status}</p>
              </li>
            ))}
          </ul>
        ) : taskData && !Object.keys(taskData).includes("Unfinished") ? (
          <p>No tasks. Good Job! 🥳</p>
        ) : (
          <p>Loading...</p>
        )}
      </div>

      <div className="bg-white rounded-lg p-4">
        <h2 className="text-3xl text-left font-bold h-100 border-b my-2 mb-5">
          Finished Tasks
        </h2>
        {taskData && taskData["Finished"] !== undefined ? (
          <ul>
            {taskData["Finished"].map((task) => (
              <li className="mb-5 text-left" key={task._id}>
                <div className="flex items-center">
                  <FontAwesomeIcon
                    icon={
                      task.status.toLowerCase() == "finished"
                        ? faCheckCircle
                        : faCircle
                    }
                    onClick={() =>
                      handleCircleClick(task, "Unfinished", "#b30000")
                    }
                    className="cursor-pointer transition duration-300 ease-in-out transform hover:opacity-100 opacity-50"
                  />
                  <p className="font-bold ml-3">{task.title}</p>
                </div>
                <p className="ml-7 text-slate-500">{task.description}</p>
                <p className="ml-7 text-slate-500">{task.status}</p>
              </li>
            ))}
          </ul>
        ) : taskData && !Object.keys(taskData).includes("Finished") ? (
          <p>bro too lazy 😭</p>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default TaskList;
