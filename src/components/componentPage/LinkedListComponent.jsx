// src/components/LinkedListComponent.jsx

import React, { useState } from "react";
import LinkedList from "../../utils/LinkedList";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";
import "../../styles/linkedListStyle.css";
import DataStructureInfo from "../DataStructureInfo";

export default function LinkedListComponent() {
  const [linkedList] = useState(new LinkedList());
  const [elements, setElements] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [historyArr, setHistoryArr] = useState([]);

  const darkMode = useSelector((state) => state?.themeSlice?.darkMode) ?? true;

  const refreshList = () => {
    setElements(linkedList.getList());
  };

  const handleInsertHead = () => {
    if (inputValue.trim() === "") return;
    const newNode = { id: Date.now(), value: inputValue };
    linkedList.insertAtHead(newNode);
    setHistoryArr((prev) => [...prev, ["insert head", inputValue]]);
    refreshList();
    setInputValue("");
  };

  const handleInsertTail = () => {
    if (inputValue.trim() === "") return;
    const newNode = { id: Date.now(), value: inputValue };
    linkedList.insertAtTail(newNode);
    setHistoryArr((prev) => [...prev, ["insert tail", inputValue]]);
    refreshList();
    setInputValue("");
  };

  const handleDeleteHead = () => {
    const deletedNode = linkedList.deleteHead();
    if (deletedNode) {
      setHistoryArr((prev) => [...prev, ["delete head", deletedNode.value]]);
      refreshList();
    }
  };

  const handleDeleteTail = () => {
    const deletedNode = linkedList.deleteTail();
    if (deletedNode) {
      setHistoryArr((prev) => [...prev, ["delete tail", deletedNode.value]]);
      refreshList();
    }
  };

  const handleClear = () => {
    linkedList.clear();
    setHistoryArr([]);
    refreshList();
  };

  return (
    <>
      <nav className={`stack-navbar ${darkMode ? "glass-dark" : "glass-light"}`}>
        <DataStructureInfo dataStructure="linkedlist" />
      </nav>

      <div className="ll-container">
        {/* Linked List Visualization */}
        <div className="ll-visualization">
          <AnimatePresence>
            {elements.map((item, index) => (
              <React.Fragment key={item.id}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.7 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className={`ll-node ${darkMode ? "dark" : "light"}`}
                >
                  {item.value}
                </motion.div>

                {index !== elements.length - 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="ll-arrow"
                  >
                    ➜
                  </motion.div>
                )}
              </React.Fragment>
            ))}
          </AnimatePresence>
        </div>

        <div className="row2">
          {/* Controls */}
          <div className="ll-controls">
            <div className="ll-title">Linked List Operations</div>
            <div className="ll-input-container">
              <input
                className={`ll-input ${darkMode ? "dark" : "light"}`}
                placeholder="Enter Value"
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
            </div>

            <div className="ll-button-group">
              <button className="ll-button green" onClick={handleInsertHead}>
                <i className="fas fa-plus"></i> Head
              </button>
              <button className="ll-button green" onClick={handleInsertTail}>
                <i className="fas fa-plus"></i> Tail
              </button>
              <button className="ll-button red" onClick={handleDeleteHead}>
                <i className="fas fa-trash-alt"></i> Head
              </button>
              <button className="ll-button red" onClick={handleDeleteTail}>
                <i className="fas fa-trash"></i> Tail
              </button>
              <button
                className={`ll-clear-button ${darkMode ? "dark" : "light"}`}
                onClick={handleClear}
              >
                <i className="fas fa-times-circle"></i> Clear
              </button>
            </div>
          </div>

          {/* History */}
          <div className="ll-history">
            <div className="ll-history-title">Operations History</div>
            <AnimatePresence>
              {historyArr.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="ll-history-item"
                >
                  <span
                    className={`ll-history-label ${
                      item[0].includes("insert") ? "green" : "red"
                    }`}
                  >
                    {item[0]}
                  </span>
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
