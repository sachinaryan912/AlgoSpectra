import React, { useEffect, useState } from "react";
import LinkedList from "../../utils/LinkedList";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";
import "../../styles/linkedListStyle.css";

export default function LinkedListComponent() {
    const [linkedList] = useState(new LinkedList());
    const [elements, setElements] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [historyArr, setHistoryArr] = useState([]);

    useEffect(() => {}, []);

    const darkMode = useSelector((state) => state?.themeSlice?.darkMode) || true;

    const handleInsertHead = () => {
        if (inputValue.trim() === "") return;
        const newNode = { id: Date.now(), value: inputValue };
        linkedList.insertAtHead(newNode);
        setHistoryArr([...historyArr, ["insert head", inputValue]]);
        setElements(linkedList.getList());
        setInputValue("");
    };

    const handleInsertTail = () => {
        if (inputValue.trim() === "") return;
        const newNode = { id: Date.now(), value: inputValue };
        linkedList.insertAtTail(newNode);
        setHistoryArr([...historyArr, ["insert tail", inputValue]]);
        setElements(linkedList.getList());
        setInputValue("");
    };

    const handleDeleteHead = () => {
        if (!linkedList.isEmpty()) {
            const deletedNode = linkedList.deleteHead();
            if (deletedNode) {
                setHistoryArr([...historyArr, ["delete head", deletedNode.value]]);
                setElements(linkedList.getList());
            }
        }
    };

    const handleDeleteTail = () => {
        if (!linkedList.isEmpty()) {
            const deletedNode = linkedList.deleteTail();
            if (deletedNode) {
                setHistoryArr([...historyArr, ["delete tail", deletedNode.value]]);
                setElements(linkedList.getList());
            }
        }
    };

    const handleClear = () => {
        linkedList.clear();
        setHistoryArr([]);
        setElements([]);
    };

    return (
        <>
            {/* Header */}
            <nav className={`stack-navbar ${darkMode ? "glass-dark" : "glass-light"}`}>
        {/* Linked List Info Section */}
<div className={`ll-info-container ${darkMode ? "dark" : "light"}`}>
    <details className="ll-info-section">
        <summary className="ll-info-title">📘 What is a Linked List?</summary>
        <p>
            A Linked List is a linear data structure where elements are stored in nodes,
            and each node points to the next node using a reference or pointer. Unlike arrays,
            linked lists do not require contiguous memory locations.
        </p>
        <p>
            They are dynamic, meaning they can grow or shrink at runtime. Common types include
            singly linked lists, doubly linked lists, and circular linked lists.
        </p>
    </details>

    <details className="ll-info-section">
        <summary className="ll-info-title">📌 Key Rules of Linked Lists</summary>
        <ul>
            <li>Each node contains data and a pointer to the next node.</li>
            <li>Head points to the first node in the list.</li>
            <li>Tail is the last node, which usually points to <code>null</code>.</li>
            <li>Insertions and deletions are faster than arrays (especially at head).</li>
            <li>They do not allow random access like arrays (you must traverse).</li>
        </ul>
    </details>

    <details className="ll-info-section">
        <summary className="ll-info-title">🎓 Study Resources</summary>
        <ul>
            <li><a href="https://www.geeksforgeeks.org/data-structures/linked-list/" target="_blank" rel="noopener noreferrer">GeeksforGeeks: Linked List</a></li>
            <li><a href="https://www.youtube.com/watch?v=njTh_OwMljA" target="_blank" rel="noopener noreferrer">YouTube: Linked Lists (by mycodeschool)</a></li>
            <li><a href="https://leetcode.com/tag/linked-list/" target="_blank" rel="noopener noreferrer">LeetCode: Linked List Problems</a></li>
        </ul>
    </details>
</div>

      </nav>
            <div className="ll-container">
            


            {/* Linked List Visualization */}
            <div className="ll-visualization">
                <AnimatePresence>
                    {elements.map((item, index) => (
                        <React.Fragment key={item.id}>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.5, y: -20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0, y: -20 }}
                                transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 20 }}
                                className={`ll-node ${darkMode ? "dark" : "light"}`}
                            >
                                {item.value}
                            </motion.div>

                            {index !== elements.length - 1 && (
                                <motion.div
                                    initial={{ opacity: 0, x: -30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 30 }}
                                    transition={{ duration: 0.4, ease: "easeInOut" }}
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
                {/* Linked List Controls */}
                <div className="ll-controls">
                    <div className="ll-title">Linked List Operations</div>
                    <div className="ll-input-container">
                        <input
                            className={`ll-input ${darkMode ? "dark" : "light"}`}
                            placeholder="Enter Value"
                            type="text"
                            value={inputValue}
                            onChange={(e) => {
                                if (e.target.value > -1000000 && e.target.value < 1000000)
                                    setInputValue(e.target.value);
                            }}
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
                        <button className={`ll-clear-button ${darkMode ? "dark" : "light"}`} onClick={handleClear}>
                        <i className="fas fa-times-circle"></i> Clear
                    </button>
                    </div>
                  
                    
                </div>

                {/* Operations History */}
                <div className="ll-history">
                    <div className="ll-history-title">Operations History</div>
                    <AnimatePresence>
                        {historyArr.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ duration: 0.4 }}
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