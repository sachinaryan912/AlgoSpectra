
import React, { useEffect, useState, useRef } from "react";
import Stack from "../../utils/Stack";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
// import { setDashBoardElement } from "../dashboardElementSlice"
import { hasEqualBrackets } from "../../utils/fuctions";
import "../../styles/infixToPostfixStyle.css";



let result = []
let stringArr = [];
export default function InfixToPostfix()
{
const darkMode = useSelector((state) => state?.themeSlice?.darkMode) || true;
    const [expression, setExpression] = useState("");
    const [resultIndex, setResultIndex] = useState(-1);
    const [isStart, setIsStart] = useState(false);
    const [isWrongInput, setIsWrongInput] = useState([false,""]);
    const [isAnimation, setIsAnimation] = useState(false);
    const intervalRef = useRef(null); // Store interval reference


    const dispatch = useDispatch();
    useEffect(()=>{
        // dispatch(setDashBoardElement("Infix to Postfix"))
    },[]);

    const handleChange = (e) => {
        const exp = e.target.value;
        const lastChar = exp[exp.length - 1];
    
        if (exp === "" || lastChar===' ') {
            setExpression(exp);
            setIsWrongInput([false,""]);
        } 
        else if (/[a-zA-Z]/.test(lastChar)) {
            if (exp.length === 1 || '(*/-+^ '.includes(exp[exp.length - 2])) {
                setExpression(exp);
                setIsWrongInput([false,""]);
            }
            else if(exp[exp.length - 2]===')')
            {
                setIsWrongInput([true,"An infix expression can't have ')' and operand consecutively."]);
            }
            else
            {
                setIsWrongInput([true,"An infix expression can't have two variables consecutively."]);
            }
        } 
        else if ('*/-+^'.includes(lastChar)) {
            if (exp.length > 1 && !'*/-+^'.includes(exp[exp.length - 2])) {
                setExpression(exp);
                setIsWrongInput([false,""]);
            }
            else if(exp.length === 1)
            {
                setIsWrongInput([true,"An infix expression can't start with operators."]);
            }
            else
            {
                setIsWrongInput([true,"An infix expression can't have two operators consecutively."]);
            }
        }
        else if(lastChar===')')
        {
            if(exp.length === 1)
            {
                setIsWrongInput([true,"An infix expression can't start with ')'"]);
            }
            else{
                const brackets = hasEqualBrackets(exp);
                if(brackets[0]==true)
                {
                    setExpression(exp);
                    setIsWrongInput([false,""]);
                }
                else if(brackets[1]==0)
                    setIsWrongInput([true,"You haven't used '(' in the expression."]);
                else
                    setIsWrongInput([true,"An infix expression should have an equal number of left and right brackets."]);
            }
        }
        else if(lastChar==='(')
        {
            if(exp.length === 1 || '(*/-+^ '.includes(exp[exp.length - 2]))
            {
                setExpression(exp);
                setIsWrongInput([false,""]);
            }
            else if(exp[exp.length - 2]===')')
            {
                setIsWrongInput([true,"An infix expression must have operator between ')' and '(' ."]);
            }
            else
            {
                setIsWrongInput([true,"An infix expression must have operator between variable and '(' ."]);
            }
        }
        else
        {
            setIsWrongInput([true,"Please only use variables, operators, or brackets (e.g., a * (b + c) / d)."]);
        }
    };
    

    const handleEvaluate = () => {
        if(isStart)
        {
            result = []
            stringArr = [];
            setIsAnimation(false);
            setExpression("");
            setResultIndex(-1);
            setIsStart(false);
        }
        else{
            if(expression==="")
                return;
            if('*/-+^'.includes(expression.charAt(expression.length-1)))
            {
                setIsWrongInput([true,"An infix expression should not end with an operator."]);
            }
            else if(hasEqualBrackets(expression)[0]===false)
            {
                setIsWrongInput([true,"An infix expression should have an equal number of left and right brackets."]);
            }
            else
            {
                setIsWrongInput([false,""]);
                const stringWithOutSpaces = expression.replace(/\s+/g, ""); // Removes all spaces (including tabs & newlines)
                result = Stack.InfixToPostfix(stringWithOutSpaces);
                stringArr = Array.from(stringWithOutSpaces)
                setIsStart(true);
            }
        }
    }

    const handleNextButton = () => {
        
        if(resultIndex<result.length-1){
            setResultIndex(resultIndex+1);
        }
    }

const handleAnimation = () => {
    if (isAnimation) {
        setIsAnimation(false);
        clearInterval(intervalRef.current);
        intervalRef.current = null;
    } else {
        if (resultIndex === result.length-1) {
            setResultIndex(-1);
        }
        
        intervalRef.current = setInterval(() => {
            setResultIndex((prevIndex) => {
                if (prevIndex >= result.length - 1) {
                    clearInterval(intervalRef.current);
                    intervalRef.current = null;
                    setIsAnimation(false);
                    return prevIndex; // Keep at last step
                }
                return prevIndex + 1;
            });
        }, 1500); // Move to the next step every 1.5 seconds

        setIsAnimation(true);
    }
};

      
    return(
        <>
        <nav className={`stack-navbar ${darkMode ? "glass-dark" : "glass-light"}`}>
  <h3 className="stack-title">Infix to Postfix Visualizer</h3>

  {/* Infix to Postfix Info Section */}
  <div className={`ll-info-container ${darkMode ? "dark" : "light"}`}>
    <details className="ll-info-section">
      <summary className="ll-info-title">📘 What is Infix & Postfix?</summary>
      <p>
        <strong>Infix</strong> expressions are the common form of expressions like <code>A + B</code>,
        where operators are placed between operands. <br />
        <strong>Postfix</strong> (or Reverse Polish Notation) places the operator after the operands, like <code>AB+</code>.
      </p>
      <p>
        Postfix expressions eliminate the need for parentheses and make evaluation easier for computers using stacks.
      </p>
    </details>

    <details className="ll-info-section">
      <summary className="ll-info-title">📌 Key Rules of Conversion</summary>
      <ul>
        <li>Use a stack to keep track of operators.</li>
        <li>Operands go directly to the output.</li>
        <li>Pop operators from the stack based on precedence and associativity.</li>
        <li>Parentheses are handled specially: push <code>(</code> and pop until <code>)</code> is found.</li>
        <li>After the expression is read, pop all remaining operators to the output.</li>
      </ul>
    </details>

    <details className="ll-info-section">
      <summary className="ll-info-title">🎓 Study Resources</summary>
      <ul>
        <li><a href="https://www.geeksforgeeks.org/convert-infix-expression-to-postfix-expression/" target="_blank" rel="noopener noreferrer">GFG: Infix to Postfix</a></li>
        <li><a href="https://www.youtube.com/watch?v=2kZz_1Y8cJw" target="_blank" rel="noopener noreferrer">YouTube: Infix to Postfix (Stack Algorithm)</a></li>
        <li><a href="https://leetcode.com/problems/basic-calculator/" target="_blank" rel="noopener noreferrer">LeetCode: Expression Parsing</a></li>
      </ul>
    </details>
  </div>
</nav>

       <div className="parent-data">
      
        {/* Operations History */}
        <div className="history-panel">
          <div className="relative h-[70%] flex justify-center items-center">
            <div className={`history-content ${darkMode ? "dark" : "light"}`}>
              {stringArr.map((char, index) => (
                <div
                  key={index}
                  className={`history-char ${
                    resultIndex > -1 &&
                    index === result[resultIndex][3] &&
                    (darkMode ? "active dark" : "active light")
                  }`}
                >
                  {char}
                </div>
              ))}
            </div>
          </div>
      
          <div className="h-[30%] flex flex-col justify-center">
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 1, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 0 }}
                transition={{ duration: 0.4 }}
                className="animation-text"
              >
                <div>
                  {resultIndex > -1 && resultIndex < result.length
                    ? `${resultIndex + 1}) ${result[resultIndex][0][1]}`
                    : ""}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        
        
                  
        <div className="controls-data">
        
       {/* Stack Controls */}
       <div className={`stack-controls ${darkMode ? "dark" : "light"}`}>
       <div className={`validation-msg ${isWrongInput[0] ? "hidden" : ""}`}>
            Only use variables, operators, or brackets ( e.g., a * (b + c) / d ).
          </div>
          <div className="input-wrapper">
            <input
              id="inputValue"
              className={`input-field ${darkMode ? "text-white" : "text-black"}`}
              placeholder="Enter expression (use variables only)"
              type="text"
              value={expression}
              disabled={isStart}
              onChange={handleChange}
            />
            <button className="start-btn" onClick={handleEvaluate}>
              {isStart ? "Reset" : "Start"}
            </button>
          </div>
      
         
          <div className={`validation-msg ${isWrongInput[0] ? "" : "hidden"}`}>
            {isWrongInput[1]}
          </div>
      
          <div className="controls">
            <button
              className={`control-btn red ${isStart ? "" : "disabled"}`}
              disabled={!isStart}
              onClick={handleAnimation}
            >
              {isAnimation ? "Stop" : "Animation"}
            </button>
            <button
              className={`control-btn ${darkMode ? "white" : "black"} ${
                isStart ? "" : "disabled"
              }`}
              disabled={!isStart}
              onClick={() => {
                if (resultIndex > -1) setResultIndex(resultIndex - 1);
              }}
            >
              Step Back
            </button>
            <button
              className={`control-btn ${darkMode ? "white" : "black"} ${
                isStart ? "" : "disabled"
              }`}
              disabled={!isStart}
              onClick={handleNextButton}
            >
              {`Step ${resultIndex + 2}`}
            </button>
          </div>
        </div>
        {/* Stack Visualization */}
        <div className="stack-visualization">
          <div className={`stack-result ${darkMode ? "dark" : "light"}`}>
            <span>
              <strong>Result : </strong>
            </span>
            {resultIndex > -1 && resultIndex < result.length
              ? result[resultIndex][1]
              : ""}
          </div>
      
          <div className="w-full flex justify-center items-center">
            <div className={`stack-box ${darkMode ? "dark" : "light"}`}>
              <AnimatePresence>
                {resultIndex > -1 && resultIndex < result.length
                  ? result[resultIndex][2].map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: -70 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -70 }}
                        transition={{ duration: 0.7 }}
                        className={`stack-item ${darkMode ? "dark" : "light"}`}
                      >
                        {item}
                      </motion.div>
                    ))
                  : []}
              </AnimatePresence>
            </div>
          </div>
        </div>
        </div>
        </div>
      </>
      
    )
}