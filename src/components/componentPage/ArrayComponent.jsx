import React, { useState } from "react";
import { useSelector } from "react-redux";
import DataStructureInfo from "../DataStructureInfo";
import "../../styles/ArrayVisualizer.css";
import { motion, AnimatePresence } from "framer-motion";

function ArrayComponent() {
  const [array, setArray] = useState([1, 2, 3, 4, 5]);
  const [inputValue, setInputValue] = useState("");
  const [indexValue, setIndexValue] = useState("");
  const [arraySize, setArraySize] = useState(5);
  const [isDynamic, setIsDynamic] = useState(false);
  const [isIndexBased, setIsIndexBased] = useState(false);
  const [popup, setPopup] = useState({ message: "", type: "" });
  const darkMode = useSelector((state) => state?.themeSlice?.darkMode) || true;
  const [activeIndex, setActiveIndex] = useState(null);


  const showPopup = (message, type = "error") => {
    setPopup({ message, type });
    setTimeout(() => setPopup({ message: "", type: "" }), 3000);
  };

  const handleInsert = () => {
    if (inputValue === "") return;
    const value = parseInt(inputValue);

    if (!isDynamic && array.length >= arraySize) {
      showPopup("Overflow: Array is full", "error");
      return;
    }

    if (isIndexBased && indexValue !== "") {
      const idx = parseInt(indexValue);
      if (idx >= 0 && idx <= array.length) {
        const newArray = [
          ...array.slice(0, idx),
          value,
          ...array.slice(idx),
        ];
        setArray(newArray);
        // showPopup(`Inserted ${value} at index ${idx}`, "success");
      } else {
        showPopup("Index out of bounds", "error");
      }
    } else {
      setArray([...array, value]);
      // showPopup(`Inserted ${value}`, "success");
    }

    setInputValue("");
    setIndexValue("");
  };

  const handleDelete = () => {
    if (array.length === 0) {
      showPopup("Underflow: Array is empty", "error");
      return;
    }

    if (isIndexBased && indexValue !== "") {
      const idx = parseInt(indexValue);
      if (idx >= 0 && idx < array.length) {
        const newArray = [
          ...array.slice(0, idx),
          ...array.slice(idx + 1),
        ];
        setArray(newArray);
        // showPopup(`Deleted ${deletedValue} from index ${idx}`, "success");
      } else {
        showPopup("Index out of bounds", "error");
      }
    } else {
      setArray(array.slice(0, -1));
      // showPopup(`Deleted ${deletedValue}`, "success");
    }

    setIndexValue("");
  };

  const handleGet = () => {
    const idx = parseInt(indexValue);
    if (idx >= 0 && idx < array.length) {
      // showPopup(`Element at index ${idx}: ${array[idx]}`, "success");
      setActiveIndex(idx);
      setTimeout(() => setActiveIndex(null), 600);  // Reset after animation
    } else {
      showPopup("Invalid index", "error");
    }
  };
  
  const handleUpdate = () => {
    const idx = parseInt(indexValue);
    const value = parseInt(inputValue);
    if (idx >= 0 && idx < array.length) {
      const newArray = [...array];
      newArray[idx] = value;
      setArray(newArray);
      // showPopup(`Updated index ${idx} to ${value}`, "success");
      setActiveIndex(idx);
      setTimeout(() => setActiveIndex(null), 600);  // Reset after animation
    } else {
      showPopup("Invalid index", "error");
    }
  };
  

  const updateArraySize = () => {
    const size = parseInt(arraySize);
    if (isNaN(size) || size < 0) {
      showPopup("Enter a valid size", "error");
      return;
    }
    setArray([]); // initialize empty array
  };

  return (
    <>
      <nav className={`stack-navbar ${darkMode ? "glass-dark" : "glass-light"}`}>
        <DataStructureInfo dataStructure="array" />
      </nav>

      <div className={`array-visualizer-container ${darkMode ? "dark" : "light"}`}>
        {popup.message !== "" && (
          <AnimatePresence>
            <motion.div
              className={`popup-message ${popup.type}`}
              initial={{ opacity: 0, y: 220 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              {popup.message}
            </motion.div>
          </AnimatePresence>
        )}


        <div className="array-container">

        <motion.div
            layout
            className="array-box"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <AnimatePresence>
              {array.map((value, index) => (
                <motion.div
                  layout
                  key={index}
                  className="array-element"
                  initial={{ scale: 0 }}
                  animate={{
                    scale: activeIndex === index ? 1.2 : 1,
                    backgroundColor: activeIndex === index ? "#00ffaa" : "rgba(255, 255, 255, 0.08)",
                  }}
                  exit={{ scale: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  {value}
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

        </div>




<div className="type-container">
<div className="switch-container ios-switch-wrapper">
  <div className="ios-switch">
    <motion.div
      className="ios-switch-thumb"
      animate={{ x: isDynamic ? 90 : 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    />
    <div className="ios-option" onClick={() => setIsDynamic(false)}>
      Static
    </div>
    <div className="ios-option" onClick={() => setIsDynamic(true)}>
      Dynamic
    </div>
  </div>
</div>

        {!isDynamic && (
          <div className="size-config">
            <input
              type="number"
              value={arraySize}
              onChange={(e) => setArraySize(e.target.value)}
              placeholder="Enter array size"
            />
            <button onClick={updateArraySize}>Update Size</button>
          </div>
        )}
</div>

<div className="switch-container ios-switch-wrapper">
  <div className="ios-switch">
    <motion.div
      className="ios-switch-thumb"
      animate={{ x: isIndexBased ? 90 : 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    />
    <div className="ios-option" onClick={() => setIsIndexBased(false)}>
      No Index
    </div>
    <div className="ios-option" onClick={() => setIsIndexBased(true)}>
      Index
    </div>
  </div>
</div>






        <div className="controls">
         <div className="input-container">
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
         </div>
         <div className="button-container">
          <button onClick={handleInsert}>Insert</button>
          
          {isIndexBased && (
            <>
            <button onClick={handleDelete}>Delete</button>
              <button onClick={handleUpdate}>Update</button>
              <button onClick={handleGet}>Get</button>
            </>
          )}
         </div>
        </div>
      </div>
    </>
  );
}

export default ArrayComponent;
