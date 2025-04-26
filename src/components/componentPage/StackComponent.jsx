import React, { useEffect, useState } from "react";
import Stack from "../../utils/Stack";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";
import "../../styles/stackStyle.css";
import { styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";

import DataStructureInfo from "../DataStructureInfo";

export default function StackComponent() {
  const [stack] = useState(new Stack());
  const [elements, setElements] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [historyArr, setHistoryArr] = useState([]);
  const [stackSize, setStackSize] = useState("");
  const [isButtonOn, setIsButtonOn] = useState(false);
  const [overflow, setOverflow] = useState(false);

  useEffect(() => {}, []);

  const darkMode = useSelector((state) => state?.themeSlice?.darkMode) || false;

  const handlePush = () => {
    if (inputValue !== "") {
      if (isButtonOn && stack.getStackLength() === Number(stackSize)) {
        setOverflow(true);
        setHistoryArr([...historyArr, ["overflow", inputValue]]);
        setTimeout(() => setOverflow(false), 2000); // hide after 2s
      } else {
        stack.push(inputValue);
        setHistoryArr([...historyArr, ["push", inputValue]]);
        setElements(stack.getStack());
      }
      setInputValue("");
    }
  };
  

  const handlePop = () => {
    if (!stack.isEmpty()) {
      setHistoryArr([...historyArr, ["pop", stack.pop()]]);
      setElements(stack.getStack());
    }
  };

  const handleClear = () => {
    stack.clear();
    setHistoryArr([]);
    setElements([]);
  };

  const handleSizeButton = () => {
    if (isButtonOn) setStackSize("");
    setIsButtonOn(!isButtonOn);
  };

  // Styled iOS-like Switch
  const IOSSwitch = styled(Switch)(({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    "& .MuiSwitch-switchBase": {
      padding: 1,
      margin: 2,
      transitionDuration: "300ms",
      "&.Mui-checked": {
        transform: "translateX(16px)",
        color: "#fff",
        "& + .MuiSwitch-track": {
          backgroundColor: darkMode ? "#65C466" : "#1976D2",
          opacity: 1,
          border: 0,
        },
      },
    },
    "& .MuiSwitch-thumb": {
      boxSizing: "border-box",
      width: 22,
      height: 22,
    },
    "& .MuiSwitch-track": {
      borderRadius: 26 / 2,
      backgroundColor: darkMode ? "#39393D" : "#E9E9EA",
      opacity: 1,
      transition: theme.transitions.create(["background-color"], {
        duration: 500,
      }),
    },
  }));

  return (
    <>

      <nav className={`stack-navbar ${darkMode ? "glass-dark" : "glass-light"}`}>

      <DataStructureInfo dataStructure="stack" />

      </nav>
  
      <div className={`stack-wrapper ${darkMode ? "dark-theme" : "light-theme"}`}>
        <div className="stack-container">
          {/* Controls Column */}
          <div className="stack-controls glass-panel">
            <h2 className="panel-title">Controls</h2>
  
            {/* Stack Size Control */}
            <div className="input-block">
              <input
                type="number"
                className="input-field"
                placeholder="Enter Stack Size"
                disabled={!isButtonOn}
                value={stackSize}
                onChange={(e) => {
                  if (e.target.value < 1) setStackSize("");
                  else if (e.target.value < 101) setStackSize(e.target.value);
                }}
              />
              <IOSSwitch checked={isButtonOn} onChange={handleSizeButton} />
            </div>
  
            {/* Value Input & Push */}
            <div className="input-block">
              <input
                type="number"
                className="input-field"
                placeholder="Enter Value"
                value={inputValue}
                onChange={(e) => {
                  if (
                    e.target.value > -100000000000 &&
                    e.target.value < 100000000000
                  )
                    setInputValue(e.target.value);
                }}
              />
              <button className="action-btn push" onClick={handlePush}>
                Push
              </button>
            </div>
  
            {/* Pop & Clear */}
            <div className="button-row">
              <button className="action-btn pop" onClick={handlePop}>Pop</button>
              <button className="action-btn clear" onClick={handleClear}>Clear</button>
            </div>
  
            {/* History */}
            <h2 className="panel-title mt">History</h2>
            <div className="history-list">
              <AnimatePresence>
                {historyArr.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: item[0] === "push" ? -20 : 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 0 }}
                    transition={{ duration: 0.4 }}
                    className="history-entry"
                  >
                    <span className={`tag ${item[0]}`}>{item[0]}</span>
                    <span>{item[1]}</span>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
  
          {/* Visualization Column */}
          <div className="stack-visual glass-panel">
            <div className="stack-info">
              <div>Size: {isButtonOn ? stackSize : "Dynamic"}</div>
              <div>Length: {stack.getStackLength()}</div>
            </div>
  
           <div className="parent-container">
           <div className="stack-glass-container"
  style={
    !isButtonOn || stackSize === ""
      ? { minHeight: "456px" }
      : { height: `${Math.max(stackSize * 56, 456)}px` }
  }
>
  {overflow && (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.4 }}
      className="overflow-notice"
    >
      Overflow
    </motion.div>
  )}

  <AnimatePresence>
    {elements.map((item, index) => (
      <motion.div
        key={index}
        initial={{ opacity: 0, y: -80 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -80 }}
        transition={{ duration: 0.6 }}
        className={index === 0 ? "stack-node-start" : "stack-node"}
      >
        {item}
      </motion.div>
    ))}
  </AnimatePresence>
</div>

           </div>
          </div>
        </div>
      </div>
    </>
  );
  
}