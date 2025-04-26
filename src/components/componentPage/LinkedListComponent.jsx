import React, { useState } from "react";
import { useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import DataStructureInfo from "../DataStructureInfo";
import "../../styles/ArrayVisualizer.css";

function ArrayComponent() {
  const [array, setArray] = useState([1, 2, 3]);
  const [inputValue, setInputValue] = useState("");
  const [indexValue, setIndexValue] = useState("");
  const [arraySize, setArraySize] = useState(5);
  const [isDynamic, setIsDynamic] = useState(false);
  const [isIndexBased, setIsIndexBased] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const darkMode = useSelector((state) => state?.themeSlice?.darkMode) || true;

  const showPopup = (message) => {
    setPopupMessage(message);
    setTimeout(() => setPopupMessage(""), 2000);
  };

  const handleInsert = () => {
    if (inputValue === "") return;

    const value = parseInt(inputValue);
    const idx = parseInt(indexValue);

    if (!isDynamic && array.length >= arraySize) {
      showPopup("❌ Overflow: Array is full");
      return;
    }

    if (isIndexBased && indexValue !== "") {
      if (idx < 0 || idx > array.length) {
        showPopup("⚠️ Invalid index");
        return;
      }
      const newArray = [...array.slice(0, idx), value, ...array.slice(idx)];
      setArray(newArray);
    } else {
      setArray([...array, value]);
    }

    setInputValue("");
    setIndexValue("");
  };

  const handleDelete = () => {
    if (array.length === 0) {
      showPopup("⚠️ Underflow: Array is empty");
      return;
    }

    if (isIndexBased && indexValue !== "") {
      const idx = parseInt(indexValue);
      if (idx < 0 || idx >= array.length) {
        showPopup("⚠️ Invalid index");
        return;
      }
      const newArray = [...array.slice(0, idx), ...array.slice(idx + 1)];
      setArray(newArray);
    } else {
      setArray(array.slice(0, -1));
    }

    setIndexValue("");
  };

  const updateArraySize = () => {
    const size = parseInt(arraySize);
    if (isNaN(size) || size <= 0) {
      showPopup("⚠️ Invalid array size");
      return;
    }
    setArray(new Array(size).fill(0));
  };

  return (
    <>
      <nav className={`stack-navbar ${darkMode ? "glass-dark" : "glass-light"}`}>
        <DataStructureInfo dataStructure="array" />
      </nav>

      <div className={`array-visualizer-container ${darkMode ? "dark" : "light"}`}>
        <h2>🔢 Array Visualizer</h2>

        <div className="switch-container">
          <label>Array Type:</label>
          <div className="switch">
            <button className={!isDynamic ? "active" : ""} onClick={() => setIsDynamic(false)}>Static</button>
            <button className={isDynamic ? "active" : ""} onClick={() => setIsDynamic(true)}>Dynamic</button>
          </div>
        </div>

        {!isDynamic && (
          <div className="size-config">
            <input
              type="number"
              value={arraySize}
              onChange={(e) => setArraySize(e.target.value)}
              placeholder="Array Size"
            />
            <button onClick={updateArraySize}>Set Size</button>
          </div>
        )}

        <div className="switch-container">
          <label>Operation:</label>
          <div className="switch">
            <button className={!isIndexBased ? "active" : ""} onClick={() => setIsIndexBased(false)}>End Based</button>
            <button className={isIndexBased ? "active" : ""} onClick={() => setIsIndexBased(true)}>Index Based</button>
          </div>
        </div>

        <div className="array-box">
          <AnimatePresence>
            {array.map((val, index) => (
              <motion.div
                key={index}
                className="array-element"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.3 }}
              >
                {val}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="controls">
          <input
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Element"
          />
          {isIndexBased && (
            <input
              type="number"
              value={indexValue}
              onChange={(e) => setIndexValue(e.target.value)}
              placeholder="Index"
            />
          )}
          <button onClick={handleInsert}>Insert</button>
          <button onClick={handleDelete}>Delete</button>
        </div>

        <AnimatePresence>
          {popupMessage && (
            <motion.div
              className="popup-message"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              {popupMessage}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

export default ArrayComponent;
