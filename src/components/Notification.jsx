import React, { useState, useEffect } from "react";

const Notification = ({ message, onClose, color }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShow(false);
      onClose();
    }, 3000);

    return () => clearTimeout(timeout);
  }, [onClose]);

  return (
    <div
      className={`fixed top-4 left-1/2 transform -translate-x-1/2 transition-opacity z-20 ${
        show ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        style={{ backgroundColor: color }}
        className="text-white text-center px-4 py-2 rounded-lg shadow-lg"
      >
        {message}
      </div>
    </div>
  );
};

export default Notification;
