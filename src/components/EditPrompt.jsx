import React, { useState } from "react";
import axios from "axios";
import config from "../../config/config";
import Draggable from "react-draggable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const EditPrompt = ({ task, parentOnClose }) => {
  const nodeRef = React.useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [updatedData, setUpdatedData] = useState(task);

  const handleDrag = (e, ui) => {
    const { x, y } = ui;
    setPosition({ x, y });
  };

  const handleClose = () => {
    setPosition({ x: 0, y: 0 });
    parentOnClose(true, false, false);
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value == "" ? task[name] : e.target.value;
    setUpdatedData({
      ...updatedData,
      [name]: value,
    });
  };

  const updateData = async () => {
    try {
      const response = await axios.post(
        `${config.backend.url}/api/task-u`,
        updatedData
      );
      parentOnClose(true, true, true);
    } catch (error) {
      console.error("Error updating data:", error);
      parentOnClose(true, true, false);
    }
  };

  const bounds = {
    left: 0,
    right: window.innerWidth, // Adjust the width as needed
    top: 0,
    bottom: window.innerHeight, // Adjust the height as needed
  };

  return (
    <div className="absolute w-full h-full left-0 right-0 top-0 bottom-0 z-30">
      <div className="flex items-center justify-center h-screen">
        <Draggable
          nodeRef={nodeRef}
          position={position}
          onStop={(e, ui) => handleDrag(e, ui)}
          bounds="parent"
          handle=".draggable-handle"
        >
          <div
            ref={nodeRef}
            className="bg-white shadow-lg rounded-lg w-3/4 lg:w-2/5"
          >
            <div className="grid grid-cols-1">
              <div className="border-b p-4 flex draggable-handle">
                <p className="font-bold">Draggable Edit Prompt</p>
                <FontAwesomeIcon
                  className="ml-auto cursor-pointer items-center"
                  icon={faTimes}
                  onClick={handleClose}
                />
              </div>
              <div className="p-4">
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="title"
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    className="bg-white border rounded w-full py-2 px-3"
                    onChange={handleChange}
                    placeholder={task.title}
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="description"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    className="bg-white border rounded w-full py-2 px-3"
                    onChange={handleChange}
                    placeholder={task.description}
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="status"
                  >
                    Status
                  </label>
                  <input
                    type="text"
                    id="status"
                    name="status"
                    className="bg-white border rounded w-full py-2 px-3"
                    onChange={handleChange}
                    placeholder={task.status}
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="group"
                  >
                    Group
                  </label>
                  <input
                    type="text"
                    id="group"
                    name="group"
                    className="bg-white border rounded w-full py-2 px-3"
                    onChange={handleChange}
                    placeholder={task.group}
                  />
                </div>
              </div>
              <div className="border-t p-4 flex">
                <div className="ml-auto">
                  <button
                    className="p-2 px-3 bg-gray-300 rounded-md"
                    onClick={handleClose}
                  >
                    Close
                  </button>
                  <button
                    className="ml-2 p-2 px-3 bg-blue-200 rounded-md"
                    onClick={updateData}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Draggable>
      </div>
    </div>
  );
};

export default EditPrompt;
