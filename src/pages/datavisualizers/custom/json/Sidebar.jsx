import { useRef } from "react";
import { shallow } from "zustand/shallow";
import useStore from "../../store";
import DataModelSelector from "../../../../components/DataModelSelector";

const selector = (state) => ({
  needToRenderJson: state.needToRenderJson,
  setNeedToRenderJson: state.setNeedToRenderJson,
  needToRenderXml: state.needToRenderXml,
  setNeedToRenderXml: state.setNeedToRenderXml,
  needToRenderYaml: state.needToRenderYaml,
  setNeedToRenderYaml: state.setNeedToRenderYaml,
});

function Sidebar({ dataType }) {
  const {
    needToRenderJson,
    setNeedToRenderJson,
    needToRenderXml,
    setNeedToRenderXml,
    needToRenderYaml,
    setNeedToRenderYaml,
  } = useStore(selector, shallow);

  const textareaEl = useRef(null);

  const handleClick = () => {
    const inputValue = textareaEl.current.value;
    switch (dataType) {
      case "json":
        setNeedToRenderJson(JSON.parse(inputValue));
        break;
      case "xml":
        setNeedToRenderXml(inputValue);
        break;
      case "yaml":
        break;
      default:
        break;
    }
  };

  const getDefaultValue = () => {
    switch (dataType) {
      case "json":
        return JSON.stringify(needToRenderJson, null, 2);
      case "xml":
        return needToRenderXml;
      case "yaml":
        return needToRenderYaml;
      default:
        return "";
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebar__title-cont">
       
        <div className="sidebar__controls">
          {/* <DataModelSelector /> */}
          <button
            className="sidebar__title-cont__render-btn"
            onClick={handleClick}
          >
            Run
          </button>
        </div>
      </div>
      <textarea
        className="sidebar__text-cont"
        name=""
        id=""
        cols="30"
        rows="10"
        defaultValue={getDefaultValue()}
        ref={textareaEl}
      ></textarea>
    </div>
  );
}

export default Sidebar;