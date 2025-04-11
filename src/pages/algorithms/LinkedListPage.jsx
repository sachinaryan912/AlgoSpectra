import React, { useEffect, useState } from "react";
import LinkedList from "../../utils/LinkedList";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";
import "../../styles/linkedListStyle.css";

export default function LinkedListPage() {
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
            <header className="ll-header">
                <h1>Linked List Visualizer</h1>
            </header>

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
                            <i className="fas fa-arrow-up"></i> Insert Head
                        </button>
                        <button className="ll-button green" onClick={handleInsertTail}>
                            <i className="fas fa-arrow-down"></i> Insert Tail
                        </button>
                        <button className="ll-button red" onClick={handleDeleteHead}>
                            <i className="fas fa-trash-alt"></i> Delete Head
                        </button>
                        <button className="ll-button red" onClick={handleDeleteTail}>
                            <i className="fas fa-trash"></i> Delete Tail
                        </button>
                    </div>
                  
                    <button className={`ll-clear-button ${darkMode ? "dark" : "light"}`} onClick={handleClear}>
                        <i className="fas fa-times-circle"></i> Clear
                    </button>
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
        </>
    );
}