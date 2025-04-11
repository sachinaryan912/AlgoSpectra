// import ToggleButton from "./ToggleButton";
import React, { useEffect, useState } from "react";
import Stack from "../../utils/Stack";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";
// import { useDispatch } from "react-redux";
// import { setDashBoardElement } from "../dashboardElementSlice"
import "../../styles/stackStyle.css";
import { Switch } from "@mui/material";

export default function StackPage()
{
    const [stack] = useState(new Stack());
    const [elements, setElements] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [historyArr, setHistoryArr] = useState([]);
    const [stackSize, setStackSize] = useState("");
    const [isButtonOn, setIsButtonOn] = useState(false);
    const [overflow, setOverflow] = useState(false);

    // const dispatch = useDispatch();
    useEffect(()=>{
        // dispatch(setDashBoardElement("Stack"))
    },[]);

    const darkMode = useSelector((state)=>state?.themeSlice?.darkMode) || false;

    const handlePush = () => {
    if(inputValue!=="")
    {
        if(isButtonOn && (stack.getStackLength() === Number(stackSize)))
        {
            setOverflow(!overflow);
            setHistoryArr([...historyArr, ["overflow",inputValue]]);
        }
        else
        {
            stack.push(inputValue);
            setHistoryArr([...historyArr, ["push",inputValue]]);
            setElements(stack.getStack());
        }
        setInputValue("");
    }
    };

    const handlePop = () => {
    if (!stack.isEmpty()) {
        setHistoryArr([...historyArr, ["pop",stack.pop()]]);
        setElements(stack.getStack());
    }
    };

    const handleClear = () => {
    stack.clear();
    setHistoryArr([]);
    setElements([]);
    };


    const handleSizeButton = () => {
        if(isButtonOn)
            setStackSize("");
        setIsButtonOn(!isButtonOn);
    };
      
    return(
      <>
     <div className="main-container">
     
       <div className="left-column"> 

          {/* Stack Controls */}
       <div className="stack-controls">
        <div className="title">Stack Operations</div>
        <div className="input-group">
          <input
            id="inputSize"
            className={`stack-input ${isButtonOn ? (darkMode ? "dark-bg" : "light-bg") : `disabled ${darkMode ? "dark-disabled" : "light-disabled"}`}`}
            disabled={!isButtonOn}
            placeholder="Enter Stack Size"
            type="number"
            value={stackSize}
            onChange={(e) => {
              if (e.target.value < 1) setStackSize("");
              else if (e.target.value < 101) setStackSize(e.target.value);
            }}
          />
           <Switch
      checked={isButtonOn}
      onChange={handleSizeButton}
      sx={{width: '4em',marginRight:'5em'}}
      inputProps={{ 'aria-label': 'controlled' }}
    />
            
        </div>
        <div className="input-group">
          <input
            id="inputValue"
            className={`stack-input ${darkMode ? "white-text" : "black-text"}`}
            placeholder="Enter Value"
            type="number"
            value={inputValue}
            onChange={(e) => {
              if (e.target.value > -100000000000 && e.target.value < 100000000000) setInputValue(e.target.value);
            }}
          />
          <button className="btn push" onClick={handlePush}>Push</button>
        </div>
        <div className="button-group">
          <button className="btn pop" onClick={handlePop}>Pop</button>
          <button className={`btn clear ${darkMode ? "light-bg dark-text" : "dark-bg light-text"}`} onClick={handleClear}>Clear</button>
        </div>
      </div>

      {/* Operations History */}
      <div className={`history-container ${darkMode ? "dark-bg" : "light-bg"}`}>
        <div className="history-title">Operations History</div>
        <AnimatePresence>
          {historyArr.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 1, x: (item[0] === "push" ? -16 : item[0] === "pop" ? 16 : 0) }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 0 }}
              transition={{ duration: 0.4 }}
              className="history-item"
            >
              <span className={`operation-label ${item[0] === "push" ? "push-color" : item[0] === "pop" ? "pop-color" : "other-color"}`}>
                {item[0]}
              </span>
              <span>{item[1]}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
       </div>
    
      
    
      {/* Stack Visualization */}
     <div className="right-column">
     <div className={`stack-visualization ${darkMode ? "visual-dark" : "visual-light"}`}>
        <div className={`stack-header ${darkMode ? "light-bg dark-text" : "dark-bg light-text"}`}>
          <div className="text-lg">Stack Size : {isButtonOn ? stackSize : "Dynamic"}</div>
          <div className="text-lg">Stack Length : {stack.getStackLength()}</div>
        </div>
        <div
          className={`stack-box ${darkMode ? "box-dark" : "box-light"}`}
          style={
            !isButtonOn || stackSize === ""
              ? { minHeight: "456px" }
              : { height: `${stackSize * 48 + stackSize * 8 + 10}px` }
          }
        >
          <motion.div
            initial={{ opacity: 0, display: "none" }}
            animate={overflow ? { opacity: 1, display: "flex" } : { opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            onAnimationComplete={() => setTimeout(() => setOverflow(false), 5)}
            className="overflow-banner"
          >
            Overflow
          </motion.div>
          <AnimatePresence>
            {elements.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: -70 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -70 }}
                transition={{ duration: 0.7 }}
                className={`stack-item ${darkMode ? "dark-bg light-text" : "light-bg dark-text"}`}
              >
                {item}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
     </div>
     </div>
    </>
    
    )
}