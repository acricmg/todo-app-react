import axiosInstance from "../services/axiosInstance";
import { useEffect, useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useNavigate } from "react-router-dom";

import { faCheckCircle, faCircle } from "@fortawesome/free-regular-svg-icons";
import {
  faCirclePlus,
  faEllipsis,
  faEye,
  faPen,
  faTrash,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import config from "../../config/config";
import AddPrompt from "./AddPrompt";
import EditPrompt from "./EditPrompt";
import Notification from "./Notification";
import ViewPrompt from "./ViewPrompt";

const ItemType = "LIST_ITEM";

// Component for task list item
const DraggableListItem = ({
  task,
  handleCircleClick,
  showEditPrompt,
  showDeletePrompt,
  showViewPrompt,
}) => {
  const [contextMenuVis, setContextMenuVis] = useState(false);

  const handleToggle = () => {
    setContextMenuVis(!contextMenuVis);
  };

  return (
    <li className="mb-5 text-sm sm:text-base list-none" key={task._id}>
      <div className="flex items-center">
        <FontAwesomeIcon
          className="text-slate-500 cursor-pointer transition duration-300 ease-in-out transform hover:opacity-100 opacity-50"
          onClick={() => handleCircleClick(task, "Finished", "#00b300")}
          icon={faCircle}
        />
        <div className="w-full ml-3 flex justify-between">
          <p className="font-bold">{task.title}</p>
          <div className="text-slate-300 gap-4 hidden sm:flex">
            <FontAwesomeIcon
              onClick={() => showViewPrompt(task)}
              className="task-action-icon"
              icon={faEye}
              size="sm"
            />
            <FontAwesomeIcon
              onClick={() => showEditPrompt(task)}
              className="task-action-icon"
              icon={faPen}
              size="sm"
            />
            <FontAwesomeIcon
              onClick={() => showDeletePrompt(task)}
              className="task-action-icon"
              icon={faTrash}
              size="sm"
            />
          </div>
          <div className="sm:hidden relative">
            <FontAwesomeIcon
              onClick={() => handleToggle()}
              className="text-slate-300 task-action-icon"
              icon={faEllipsis}
            />
            {contextMenuVis && (
              <div className="absolute bg-white border p-3 z-10 right-1 rounded-md shadow-sm">
                <div
                  className="hover:bg-gray-100 flex items-center cursor-pointer"
                  onClick={() => {
                    showEditPrompt(task);
                    handleToggle();
                  }}
                >
                  <FontAwesomeIcon
                    className="task-action-icon mr-1"
                    icon={faPen}
                    size="sm"
                  />
                  <p>Edit</p>
                </div>
                <div
                  className="hover:bg-gray-100 flex items-center cursor-pointer"
                  onClick={() => {
                    showDeletePrompt(task);
                    handleToggle();
                  }}
                >
                  <FontAwesomeIcon
                    className="task-action-icon mr-1"
                    icon={faTrash}
                    size="sm"
                  />
                  <p>Delete</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <p className="ml-7 text-slate-500">{task.description}</p>
    </li>
  );
};

const DeletePrompt = ({ task, parentOnClose, showNotification }) => {
  const handleClose = () => {
    parentOnClose(true, false, false);
  };

  const deleteTask = async (task, notifColor) => {
    try {
      const response = await axiosInstance.post(
        `${config.backend.url}/api/task-d`,
        task
      );
      console.log(response);
      showNotification('"' + task.title + '" has been deleted.', notifColor);
      handleClose();
    } catch (error) {
      showNotification("An error occured. Please try again later", "#b30000");
      console.error("Error fetching data:", error);
    }
  };
  return (
    <div className="absolute w-full h-full left-0 right-0 top-0 bottom-0 z-30">
      <div className="flex items-center justify-center h-screen">
        <div className="bg-gray-50 shadow-lg rounded-lg w-3/4 lg:w-2/5">
          <div className="grid grid-cols-1">
            <div className="border-b p-4 flex draggable-handle">
              <p className="font-bold">Delete Task</p>
              <FontAwesomeIcon
                className="ml-auto cursor-pointer items-center"
                icon={faTimes}
                onClick={handleClose}
              />
            </div>
            <div className="p-4">
              Are you sure you want to delete "{task.title}"?
            </div>
            <div className="border-t p-4 flex">
              <div className="ml-auto">
                <button
                  className="p-2 px-3 text-gray-400 border-2 border-gray-300 rounded-md"
                  onClick={handleClose}
                >
                  No
                </button>
                <button
                  className="ml-2 p-2 px-3 bg-red-600 text-white rounded-md"
                  onClick={() => deleteTask(task, "#00b300")}
                >
                  Yes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const TaskList = ({ userID }) => {
  // State to hold the fetched data
  const [taskData, setTaskData] = useState(null);
  const [unfinishedTaskData, setUnfinishedTaskData] = useState(null);
  const [notification, setNotification] = useState(null);
  const [editPrompt, setEditPrompt] = useState(null);
  const [viewPrompt, setViewPrompt] = useState(null);
  const [deletePrompt, setDeletePrompt] = useState(null);
  const [addPrompt, setAddPrompt] = useState(null);
  const [editTaskSelected, setEditTaskSelected] = useState(null);
  const [taskSelected, setTaskSelected] = useState(null);
  const [notificationColor, setNotificationColor] = useState("");
  const navigate = useNavigate();

  const [selection, setSelection] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  const showNotification = (message, color) => {
    setNotification(message);
    setNotificationColor(color);
  };

  const closeNotification = () => {
    setNotification(null);
    setNotificationColor("");
  };

  const handleEditPromptVisibility = (closed, alert, success) => {
    setEditPrompt(closed ? null : true);
    if (alert) {
      if (success) {
        showNotification("Task updated", "#00b300");
      } else {
        showNotification("Task not updated", "#b30000");
      }
    }
    fetchData();
  };

  const handleViewPromptVisibility = (closed) => {
    setViewPrompt(closed ? null : true);
  };

  const handleAddPromptVisibility = (closed, alert, success) => {
    setAddPrompt(closed ? null : true);
    if (alert) {
      if (success) {
        showNotification("Task created", "#00b300");
      } else {
        showNotification("Task not created", "#b30000");
      }
    }
    fetchData();
  };

  const handleDeletePromptVisibility = (closed, alert, success) => {
    setDeletePrompt(closed ? null : true);
    if (alert) {
      if (success) {
        showNotification("Task created", "#00b300");
      } else {
        showNotification("Task not created", "#b30000");
      }
    }
    fetchData();
  };

  const showDeletePrompt = (task) => {
    setTaskSelected(task);
    handleDeletePromptVisibility(false);
  };

  const showEditPrompt = (task) => {
    setEditTaskSelected(task);
    handleEditPromptVisibility(false);
  };

  const showViewPrompt = (task) => {
    setTaskSelected(task);
    handleViewPromptVisibility(false);
  };

  const showAddPrompt = () => {
    handleAddPromptVisibility(false);
  };

  const moveItem = (fromIndex, toIndex) => {
    const updatedItems = [...unfinishedTaskData];
    const [movedItem] = updatedItems.splice(fromIndex, 1);
    updatedItems.splice(toIndex, 0, movedItem);
    setUnfinishedTaskData(updatedItems);
  };

  const fetchData = async () => {
    try {
      // Make a GET request to your backend API endpoint
      const response = await axiosInstance.get(
        `${config.backend.url}/api/tasks/${userID}`
      );

      // Set the fetched data in state
      const tasks = response.data.tasks.reduce((acc, obj) => {
        const key = obj["status"].toLowerCase();
        acc[key] = acc[key] || [];
        acc[key].push(obj);
        return acc;
      }, {});
      setTaskData(tasks);
      setUnfinishedTaskData(tasks[["unfinished"]]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleCircleClick = async (task, updatedStatus, notifColor) => {
    try {
      task.status = updatedStatus;
      const response = await axiosInstance.post(
        `${config.backend.url}/api/task-u`,
        task
      );
      console.log(response);
      showNotification(
        '"' + task.title + '" has been updated to ' + updatedStatus + " status",
        notifColor
      );
      fetchData();
    } catch (error) {
      showNotification("An error occured. Please try again later", "#b30000");
      console.error("Error fetching data:", error);
    }
  };

  // Effect to fetch data when the component mounts
  useEffect(() => {
    fetchData();
  }, []); // Empty dependency array ensures the effect runs only once when the component mounts
  return (
    <div className="w-full p-7">
      {addPrompt && (
        <AddPrompt userID={userID} parentOnClose={handleAddPromptVisibility} />
      )}
      {editPrompt && (
        <EditPrompt
          task={editTaskSelected}
          parentOnClose={handleEditPromptVisibility}
        />
      )}
      {viewPrompt && (
        <ViewPrompt
          task={taskSelected}
          parentOnClose={handleViewPromptVisibility}
        />
      )}
      {deletePrompt && (
        <DeletePrompt
          task={taskSelected}
          parentOnClose={handleDeletePromptVisibility}
          showNotification={showNotification}
        />
      )}
      {notification && (
        <Notification
          message={notification}
          color={notificationColor}
          onClose={closeNotification}
        />
      )}
      <div className="flex flex-col lg:flex-row justify-center gap-8">
        <div className="h-fit bg-white rounded-lg p-8 border flex-1 ">
          <div className="flex items-center border-b-2 pb-4 mb-8">
            <h2 className="mr-2 sm:mr-3 text-2xl sm:text-3xl font-bold">
              Tasks
            </h2>
            <div className="circle-sm bg-primary text-white">
              <span>
                {unfinishedTaskData && unfinishedTaskData !== undefined
                  ? unfinishedTaskData.length
                  : 0}
              </span>
            </div>
          </div>
          <div>
            {unfinishedTaskData ? (
              unfinishedTaskData.map((task, index) => (
                <DraggableListItem
                  key={index}
                  id={task._id}
                  task={task}
                  index={index}
                  moveItem={moveItem}
                  handleCircleClick={handleCircleClick}
                  showEditPrompt={showEditPrompt}
                  showDeletePrompt={showDeletePrompt}
                  showViewPrompt={showViewPrompt}
                />
              ))
            ) : taskData && !Object.keys(taskData).includes("unfinished") ? (
              <div>
                <p>No tasks. Good Job! 🥳</p>
              </div>
            ) : (
              <p>Loading...</p>
            )}
          </div>
          <div className="mt-7 flex border-t-2">
            <div className="flex gap-4">
              <div
                className="mt-4 text-primary opacity-60 flex items-center relative cursor-pointer transition duration-300 ease-in-out transform hover:opacity-100"
                onClick={showAddPrompt}
              >
                <FontAwesomeIcon className="h-3.5 sm:h-4" icon={faCirclePlus} />
                <p className="ml-3 text-sm sm:text-base font-medium">
                  Add a new task
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="h-fit bg-white rounded-lg p-8 border flex-1">
          <div className="flex items-center border-b-2 pb-4 mb-8">
            <h2 className="mr-2 sm:mr-3 text-2xl sm:text-3xl font-bold">
              Completed
            </h2>
            <div className="circle-sm bg-success text-white">
              <span>
                {taskData && taskData["finished"] !== undefined
                  ? taskData["finished"].length
                  : 0}
              </span>
            </div>
          </div>
          {taskData && taskData["finished"] !== undefined ? (
            <ul>
              {taskData["finished"].map((task) => (
                <li className="mb-5 text-sm sm:text-base" key={task._id}>
                  <div className="flex items-center">
                    <FontAwesomeIcon
                      icon={faCheckCircle}
                      onClick={() =>
                        handleCircleClick(task, "unfinished", "#b30000")
                      }
                      className="cursor-pointer transition duration-300 ease-in-out transform hover:opacity-100 opacity-50"
                    />
                    <p className="font-bold ml-3">{task.title}</p>
                  </div>
                  <p className="ml-7 text-slate-500">{task.description}</p>
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
    </div>
  );
};

export default TaskList;
