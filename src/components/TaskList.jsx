import axios from "axios";
import { useEffect, useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useNavigate } from "react-router-dom";

import { faCheckCircle, faCircle } from "@fortawesome/free-regular-svg-icons";
import {
  faCirclePlus,
  faEye,
  faPen,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import config from "../../config/config";
import AddPrompt from "./AddPrompt";
import EditPrompt from "./EditPrompt";
import Notification from "./Notification";

const ItemType = "LIST_ITEM";

// Component for task list item
const DraggableListItem = ({
  id,
  task,
  index,
  moveItem,
  handleCircleClick,
  showEditPrompt,
}) => {
  const [, ref] = useDrag({
    type: ItemType,
    item: { id, index },
  });

  const [, drop] = useDrop({
    accept: ItemType,
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveItem(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  return (
    <li
      ref={(node) => ref(drop(node))}
      className="mb-5 cursor-grab list-none"
      key={task._id}
    >
      <div className="flex items-center">
        <FontAwesomeIcon
          className="text-slate-500 cursor-pointer transition duration-300 ease-in-out transform hover:opacity-100 opacity-50"
          onClick={() => handleCircleClick(task, "Finished", "#00b300")}
          icon={
            task.status.toLowerCase() == "finished" ? faCheckCircle : faCircle
          }
        />
        <div className="w-full ml-3 flex justify-between">
          <p className="font-bold">{task.title}</p>
          <div className="text-slate-300 flex gap-4">
            <FontAwesomeIcon
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
              className="task-action-icon"
              icon={faTrash}
              size="sm"
            />
          </div>
        </div>
      </div>
      <p className="ml-7 text-slate-500">{task.description}</p>
    </li>
  );
};

const TaskList = ({ userID }) => {
  // State to hold the fetched data
  const [taskData, setTaskData] = useState(null);
  const [unfinishedTaskData, setUnfinishedTaskData] = useState(null);
  const [notification, setNotification] = useState(null);
  const [editPrompt, setEditPrompt] = useState(null);
  const [addPrompt, setAddPrompt] = useState(null);
  const [editTaskSelected, setEditTaskSelected] = useState(null);
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

  const showEditPrompt = (task) => {
    setEditTaskSelected(task);
    handleEditPromptVisibility(false);
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
      const response = await axios.get(
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
      {notification && (
        <Notification
          message={notification}
          color={notificationColor}
          onClose={closeNotification}
        />
      )}
      <div className="flex justify-center gap-8">
        <div className="h-fit bg-white rounded-lg p-8 drop-shadow-md flex-1 ">
          <div className="flex items-center border-b-2 pb-4 mb-8">
            <h2 className="mr-3 text-3xl font-bold">Tasks</h2>
            <div className="circle-sm bg-primary text-white">
              <span>5</span>
            </div>
          </div>
          <DndProvider backend={HTML5Backend}>
            <div>
              {unfinishedTaskData ? (
                unfinishedTaskData.map((task, index) => (
                  <DraggableListItem
                    id={task._id}
                    task={task}
                    index={index}
                    moveItem={moveItem}
                    handleCircleClick={handleCircleClick}
                    showEditPrompt={showEditPrompt}
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
          </DndProvider>
          <div className="mt-7 flex border-t-2">
            <div className="flex gap-4">
              <div
                className="mt-4 text-primary opacity-60 flex items-center relative cursor-pointer transition duration-300 ease-in-out transform hover:opacity-100"
                onClick={showAddPrompt}
              >
                <FontAwesomeIcon icon={faCirclePlus} />
                <p className="ml-3 font-medium">Add a new task</p>
              </div>
            </div>
          </div>
        </div>

        <div className="h-fit bg-white rounded-lg p-8 drop-shadow-md flex-1">
          <div className="flex items-center border-b-2 pb-4 mb-8">
            <h2 className="mr-3 text-3xl font-bold">Completed</h2>
            <div className="circle-sm bg-success text-white">
              <span>2</span>
            </div>
          </div>
          {taskData && taskData["finished"] !== undefined ? (
            <ul>
              {taskData["finished"].map((task) => (
                <li className="mb-5 text-left" key={task._id}>
                  <div className="flex items-center">
                    <FontAwesomeIcon
                      icon={
                        task.status.toLowerCase() == "finished"
                          ? faCheckCircle
                          : faCircle
                      }
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
