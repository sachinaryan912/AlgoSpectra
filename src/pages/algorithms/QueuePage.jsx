import React, { useState, useEffect } from "react";
import Queue from "../../utils/Queue";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";
import "../../styles/queueStyle.css";
import { Switch } from "@mui/material";

export default function QueuePage() {
    const [queue] = useState(new Queue());
    const [elements, setElements] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [historyArr, setHistoryArr] = useState([]);
    const [queueSize, setQueueSize] = useState("");
    const [isButtonOn, setIsButtonOn] = useState(false);
    const [overflow, setOverflow] = useState(false);
    const darkMode = useSelector((state) => state?.themeSlice?.darkMode) || true;

    useEffect(() => {
        // dispatch(setDashBoardElement("Queue"))
    }, []);

    const handleEnqueue = () => {
        if (inputValue !== "") {
            if (isButtonOn && queue.getQueueLength() === Number(queueSize)) {
                setOverflow(!overflow);
                setHistoryArr([...historyArr, ["overflow", inputValue]]);
            } else {
                const newNode = { id: Date.now(), value: inputValue };
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
        <nav className={`stack-navbar ${darkMode ? "glass-dark" : "glass-light"}`}>
        <h3 className="stack-title">Queue Visualizer</h3>
      </nav>

      <div className="queue-container">
             

             <div className="queue-visualization">
                 <div className="queue-info">
                     <div className="info-text">Queue Size: {isButtonOn ? queueSize : "Dynamic"}</div>
                     <div className="info-text">Queue Length: {queue.getQueueLength()}</div>
                 </div>
 
                 <div
                     className="queue-box-glass"
                     style={
                         (!isButtonOn || queueSize === "")
                             ? { minWidth: "100%" }
                             : { width: `${queueSize * 80 + queueSize * 8 + 10}px` }
                     }
                 >
                     <motion.div
                         initial={{ opacity: 0 }}
                         animate={overflow ? { opacity: 1 } : { opacity: 0 }}
                         transition={{ duration: 0.4 }}
                         onAnimationComplete={() => setTimeout(() => setOverflow(false), 5)}
                         className="overflow-msg"
                     >
                         Overflow
                     </motion.div>
                     <AnimatePresence initial={false}>
                         {[...elements].reverse().map((item) => (
                             <motion.div
                                 key={item.id}
                                 initial={{ opacity: 0, y: -100 }}
                                 animate={{ opacity: 1, y: 0 }}
                                 exit={{ opacity: 0, y: 100 }}
                                 transition={{ duration: 0.4 }}
                                 className="queue-item-glass"
                             >
                                 {item.value}
                             </motion.div>
                         ))}
                     </AnimatePresence>
 
                 </div>
             </div>
 
             <div className="queue-bottom">
                 <div className="queue-controls-glass">
                     <h2 className="section-title">Queue Operations</h2>
                     <div className="input-row">
                         <input
                             className="queue-input"
                             disabled={!isButtonOn}
                             placeholder="Enter Queue Size"
                             type="number"
                             value={queueSize}
                             onChange={(e) => {
                                 if (e.target.value < 1) setQueueSize("");
                                 else if (e.target.value < 101) setQueueSize(e.target.value);
                             }}
                         />
                         <div className="switch-container">
                             <span className="switch-label">Fixed Size</span>
                             <div
                                 className={`switch-ios ${isButtonOn ? "active" : ""}`}
                                 onClick={handleSizeButton}
                             ></div>
                         </div>
                     </div>
                     
                     <div className="input-row">
                         <input
                             className="queue-input"
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
                         
                     </div>
                     <div className="btn-row">
                         <button className="btn enqueue" onClick={handleEnqueue}>
                             <i className="fas fa-plus-circle"></i> Enqueue
                         </button>
                         <button className="btn dequeue" onClick={handleDequeue}>
                             <i className="fas fa-minus-circle"></i> Dequeue
                         </button>
                         <button className="btn clear" onClick={handleClear}>
                             <i className="fas fa-trash-alt"></i> Clear
                         </button>
                     </div>
                 </div>
 
                 <div className="operations-history-glass">
                     <h2 className="section-title">Operations History</h2>
                     <AnimatePresence>
                         {historyArr.map((item, index) => (
                             <motion.div
                                 key={index}
                                 initial={{ opacity: 1, x: item[0] === "enqueue" ? -16 : 16 }}
                                 animate={{ opacity: 1, x: 0 }}
                                 exit={{ opacity: 0, x: 0 }}
                                 transition={{ duration: 0.4 }}
                                 className="history-item-glass"
                             >
                                 <span className={`history-op ${item[0]}`}>{item[0]}</span>
                                 <span>{item[1]}</span>
                             </motion.div>
                         ))}
                     </AnimatePresence>
                 </div>
             </div>
         </div>
        
        </>
       
    );
}
