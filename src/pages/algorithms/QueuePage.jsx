// import ToggleButton from "./ToggleButton";
import React, { useState, useEffect } from "react";
import Queue from "../../utils/Queue";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";
import "../../styles/queueStyle.css";
import { Switch } from "@mui/material";
// import { setDashBoardElement } from "../dashboardElementSlice"

export default function QueuePage() {
    const [queue] = useState(new Queue());
    const [elements, setElements] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [historyArr, setHistoryArr] = useState([]);
    const [queueSize, setQueueSize] = useState("");
    const [isButtonOn, setIsButtonOn] = useState(false);
    const [overflow, setOverflow] = useState(false);
     const darkMode = useSelector((state)=>state?.themeSlice?.darkMode) || false;

    // const dispatch = useDispatch();
    useEffect(()=>{
        // dispatch(setDashBoardElement("Queue"))
    },[]);



    const handleEnqueue = () => {
        if (inputValue !== "") {
            if (isButtonOn && queue.getQueueLength() === Number(queueSize)) {
                setOverflow(!overflow);
                setHistoryArr([...historyArr, ["overflow", inputValue]]);
            } else {
                const newNode = { id: Date.now(), value: inputValue }; // Unique key for React
                queue.enqueue(newNode);
                setHistoryArr([...historyArr, ["enqueue", inputValue]]);
                setElements(queue.getQueue());
            }
            setInputValue("");
        }
    };

    const handleDequeue = () => {
        if (!queue.isEmpty()) {
            setHistoryArr([...historyArr, ["dequeue", queue.dequeue().value]]);
            setElements(queue.getQueue());
        }
    };

    const handleClear = () => {
        queue.clear();
        setHistoryArr([]);
        setElements([]);
    };

    const handleSizeButton = () => {
        if (isButtonOn) setQueueSize("");
        setIsButtonOn(!isButtonOn);
    };

    return (
      <>
        {/* Queue Visualization */}
        <div className="queue-visualization">
          <div className={`queue-info ${darkMode ? "light" : "dark"}`}>
              <div className="text-lg">Queue Size : {isButtonOn ? queueSize : "Dynamic"}</div>
              <div className="text-lg">Queue Length : {queue.getQueueLength()}</div>
          </div>
          <div
              className={`queue-box ${darkMode ? "dark-bg" : "light-bg"}`}
              style={
                  (!isButtonOn || queueSize === "")
                      ? { minWidth: "95%" }
                      : { width: `${queueSize * 80 + queueSize * 8 + 10}px` }
              }
          >
              <motion.div
                  initial={{ opacity: 0 }}
                  animate={overflow ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  onAnimationComplete={() => setTimeout(() => setOverflow(false), 5)}
                  className="overflow-msg"
              >
                  Overflow
              </motion.div>
              <AnimatePresence>
                  {elements.map((item) => (
                      <motion.div
                          key={item.id}
                          initial={{ opacity: 0, x: -100 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 100 }}
                          transition={{ duration: 0.7 }}
                          className={`queue-item ${darkMode ? "light" : "dark"}`}
                      >
                          {item.value}
                      </motion.div>
                  ))}
              </AnimatePresence>
          </div>
      </div>
      <div
      className="row2"
       >
         {/* Queue Controls */}
      <div className="queue-controls">
          <div className="queue-title">Queue Operations</div>
          <div className="input-row">
              <input
                  className={`queue-input ${isButtonOn ? (darkMode ? "dark" : "light") : `disabled ${darkMode ? "dark" : "light-disabled"}`}`}
                  disabled={!isButtonOn}
                  placeholder="Enter Queue Size"
                  type="number"
                  value={queueSize}
                  onChange={(e) => {
                      if (e.target.value < 1) setQueueSize("");
                      else if (e.target.value < 101) setQueueSize(e.target.value);
                  }}
              />
              <Switch
                    checked={isButtonOn}
                    onChange={handleSizeButton}
                    sx={{width: '4em',marginRight:'5em'}}
                    inputProps={{ 'aria-label': 'controlled' }}
                  />
          </div>
          <div className="input-row">
              <input
                  className={`queue-input ${darkMode ? "dark" : "light"}`}
                  placeholder="Enter Value"
                  value={inputValue}
                  onChange={(e) => {
                      if (e.target.value > -100000000000 && e.target.value < 100000000000)
                          setInputValue(e.target.value);
                  }}
              />
              <button className="enqueue-btn" onClick={handleEnqueue}>Enqueue</button>
          </div>
          <div className="btn-row">
              <button className="dequeue-btn" onClick={handleDequeue}>Dequeue</button>
              <button className={`clear-btn ${darkMode ? "light" : "dark"}`} onClick={handleClear}>Clear</button>
          </div>
      </div>
  
      {/* Operations History */}
      <div className="operations-history">
          <div className="history-title">Operations History</div>
          <AnimatePresence>
              {historyArr.map((item, index) => (
                  <motion.div key={index}
                      initial={{ opacity: 1, x: item[0] === "enqueue" ? -16 : 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 0 }}
                      transition={{ duration: 0.4 }}
                      className="history-item"
                  >
                      <span className={`history-op ${item[0] === "enqueue" ? "enqueue" : "dequeue"}`}>{item[0]}</span>
                      <span>{item[1]}</span>
                  </motion.div>
              ))}
          </AnimatePresence>
      </div>
      </div>
     
  
    
  </>
  
  
    );
}