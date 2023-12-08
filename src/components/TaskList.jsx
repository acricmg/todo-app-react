import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import config from "../../config/config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faCircle } from "@fortawesome/free-regular-svg-icons";
import Notification from "./Notification";
import {
  faPencil,
  faTrash,
  faCirclePlus,
  faFloppyDisk,
} from "@fortawesome/free-solid-svg-icons";
import EditPrompt from "./EditPrompt";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

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
      className="mb-5 text-left shadow border bg-white rounded-lg p-2 cursor-grab"
      key={task._id}
    >
      <div className="flex items-center relative">
        <FontAwesomeIcon
          icon={
            task.status.toLowerCase() == "finished" ? faCheckCircle : faCircle
          }
          onClick={() => handleCircleClick(task, "Finished", "#00b300")}
          className="cursor-pointer transition duration-300 ease-in-out transform hover:opacity-100 opacity-50"
        />
        <p className="font-bold ml-3">{task.title}</p>
        <div className="absolute right-0 flex">
          <div
            onClick={() => showEditPrompt(task)}
            className="border hover:bg-gray-700 bg-white text-black hover:text-white items-center px-2 rounded mx-1 cursor-pointer"
          >
            <FontAwesomeIcon icon={faPencil} size="xs" />
          </div>
          <div className="border hover:bg-gray-700 bg-white text-[#9a0000] hover:text-white items-center px-2 rounded mx-1 cursor-pointer">
            <FontAwesomeIcon icon={faTrash} size="xs" />
          </div>
        </div>
      </div>
      <p className="ml-7 text-slate-500">{task.description}</p>
      <p className="ml-7 text-slate-500">{task.status}</p>
    </li>
  );
};

const TaskList = ({ userId }) => {
  // State to hold the fetched data
  const [taskData, setTaskData] = useState(null);
  const [newTask, setNewTask] = useState({
    status: "unfinished",
    assignedTo: userId,
    group: "",
  });
  const [unfinishedTaskData, setUnfinishedTaskData] = useState(null);
  const navigate = useNavigate();
  const [notification, setNotification] = useState(null);
  const [editPrompt, setEditPrompt] = useState(null);
  const [editTaskSelected, setEditTaskSelected] = useState(null);
  const [notificationColor, setNotificationColor] = useState("");

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

  const showEditPrompt = (task) => {
    setEditTaskSelected(task);
    handleEditPromptVisibility(false);
  };

  const moveItem = (fromIndex, toIndex) => {
    const updatedItems = [...unfinishedTaskData];
    const [movedItem] = updatedItems.splice(fromIndex, 1);
    updatedItems.splice(toIndex, 0, movedItem);
    setUnfinishedTaskData(updatedItems);
  };

  const handleNewTaskChange = (e) => {
    const name = e.target.name;
    const value = e.target.value == "" ? task[name] : e.target.value;
    setNewTask({
      ...newTask,
      [name]: value,
    });
  };

  const createTask = async () => {
    try {
      const response = await axios.post(
        `${config.backend.url}/api/task-c`,
        newTask
      );
      fetchData();
    } catch (error) {
      console.error("Error updating data:", error);
    }
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

  return (
    <div>
      {editPrompt && (
        <EditPrompt
          task={editTaskSelected}
          parentOnClose={handleEditPromptVisibility}
        />
      )}
      <div>
        {notification && (
          <Notification
            message={notification}
            color={notificationColor}
            onClose={closeNotification}
          />
        )}
      </div>
      <div className="border bg-white rounded-lg p-4 mr-0 mb-3 w-auto">
        <h2 className="text-3xl text-left font-bold h-100 border-b my-2 mb-5">
          Tasks
        </h2>
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
        <div className="flex mb-3 mt-5 border-t pt-3">
          <div className="flex-1 gap-4">
            <div className="flex items-center relative">
              <FontAwesomeIcon
                icon={faCirclePlus}
                className="cursor-pointer transition duration-300 ease-in-out text-blue-600 transform hover:opacity-100 opacity-50"
              />
              <input
                className="ml-3 bg-white border-b"
                id="title"
                name="title"
                onChange={handleNewTaskChange}
                type="text"
                placeholder="Task Title"
              />
            </div>
            <div className="relative items-center">
              <textarea
                id="description"
                name="description"
                onChange={handleNewTaskChange}
                className="mt-5 ml-7 bg-white border w-full rounded py-2"
                placeholder="New Task description"
              />
            </div>
            <div></div>
            {newTask.dueDate}
          </div>
          <div className="w-[50px] relative ml-10">
            {newTask.title != null ? (
              <button className="absolute right-0 top-0 bottom-0 bg-blue-200 h-1/2 px-3 rounded-lg my-auto h-45">
                <FontAwesomeIcon
                  className="text-white"
                  icon={faFloppyDisk}
                  onClick={createTask}
                />
              </button>
            ) : (
              ""
            )}
          </div>
        </div>
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
                      handleCircleClick(task, "unfinished", "#b30000")
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
