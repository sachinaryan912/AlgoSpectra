import React from "react";
import { dataStructureRef } from '../data/DataStructureRef';
import "../styles/ds-info.css";
// Generic component for displaying data structure info
const DataStructureInfo = ({ dataStructure }) => {
  // Retrieve the data structure from the dataStructureRef object
  const infoData = dataStructureRef[dataStructure.toLowerCase()];

  if (!infoData) {
    return <div>Data info not found.</div>; // Handle case if dataStructure is not valid
  }

  return (
    <div className={`ds-info-container`}>
      {infoData.map((section, index) => (
        <details key={index} className="ds-info-section">
          <summary className="ds-info-title">{section.title}</summary>
          {section.type === "text" ? (
            <p>{section.content}</p>
          ) : (
            <ul>
              {section.content.map((item, itemIndex) => (
                <li key={itemIndex}>
                  {item.url ? (
                    <a href={item.url} target="_blank" rel="noopener noreferrer">{item.text}</a>
                  ) : (
                    item
                  )}
                </li>
              ))}
            </ul>
          )}
        </details>
      ))}
    </div>
  );
};

export default DataStructureInfo;
