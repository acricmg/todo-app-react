import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useLocation } from "react-router-dom";
import axiosInstance from "../services/axiosInstance";
import config from "../../config/config";

const TaskView = () => {
  const location = useLocation();
  const [taskData, setTaskData] = useState(null);
  const fetchData = async () => {
    try {
      const searchParams = new URLSearchParams(location.search);
      const task = searchParams.get("task");

      const response = await axiosInstance.get(
        `${config.backend.url}/api/task/${task}`
      );

      setTaskData(response.data.taskObject);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Effect to fetch data when the component mounts
  useEffect(() => {
    fetchData();
  }, []); // Empty dependency array ensures the effect runs only once when the component mounts
  return (
    <Layout>
      <div className="flex items-center justify-center">
        <div className="m-5 bg-white rounded-lg drop-shadow-md items-center">
          <div className="border-b w-full">
            <p className="font-bold p-2 px-3 ">Task Details</p>
          </div>
          <div className="items-center pb-4 mb-8 p-3">
            <div>
              {taskData ? (
                <div> Title: {taskData.title} </div>
              ) : (
                <p>Loading...</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TaskView;
