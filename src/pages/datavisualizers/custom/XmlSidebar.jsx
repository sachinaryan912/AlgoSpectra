import { useRef } from "react";
import { shallow } from "zustand/shallow";
import useStore from "../store";

const selector = (state) => ({
  needToRenderXml: state.needToRenderXml,
  setNeedToRenderXml: state.setNeedToRenderXml,
});

function XmlSidebar() {
  const { needToRenderXml, setNeedToRenderXml } = useStore(selector, shallow);
  const textareaEl = useRef(null);

  const handleClick = () => {
    const xmlVal = textareaEl.current.value;
    setNeedToRenderXml(xmlVal);
  };

  return (
    <div className="sidebar">
      <div className="sidebar__title-cont">
        <h1 className="sidebar__title-cont__title">XML Visualizer</h1>
        <button
          className="sidebar__title-cont__render-btn"
          onClick={handleClick}
        >
          Run
        </button>
      </div>
      <textarea
        className="sidebar__text-cont"
        name=""
        id=""
        cols="30"
        rows="10"
        defaultValue={needToRenderXml}
        ref={textareaEl}
      ></textarea>
    </div>
  );
}

export default XmlSidebar;