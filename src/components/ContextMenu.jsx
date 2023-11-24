import React, { useState } from "react";

const CustomContextMenu = ({ x, y, onClose, options }) => {
  console.log(options);
  return (
    <div
      className="p-4 bg-white shadow-lg rounded-lg"
      style={{
        position: "absolute",
        top: y,
        left: x,
      }}
    >
      {options.map((item, index) => (
        <div
          key={index}
          className="hover:bg-gray-400 transition duration-300 ease-in-out rounded p-2 cursor-pointer"
          onClick={() => console.log("Option 1")}
        >
          {item.option}
        </div>
      ))}

      <div
        className="hover:bg-gray-400 transition duration-300 ease-in-out rounded p-2 cursor-pointer"
        onClick={() => console.log("Option 2")}
      >
        Option 2
      </div>
      <div
        className="hover:bg-gray-400 transition duration-300 ease-in-out rounded p-2 cursor-pointer"
        onClick={() => console.log("Option 3")}
      >
        Option 3
      </div>
    </div>
  );
};

const ContextMenu = ({ children, options }) => {
  const [contextMenu, setContextMenu] = useState(null);

  const handleContextMenu = (e) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY });
  };

  const handleCloseContextMenu = () => {
    setContextMenu(null);
  };

  return (
    <div onContextMenu={handleContextMenu} onClick={handleCloseContextMenu}>
      {children}

      {contextMenu && (
        <CustomContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          onClose={handleCloseContextMenu}
          options={options}
        />
      )}
    </div>
  );
};

export default ContextMenu;
