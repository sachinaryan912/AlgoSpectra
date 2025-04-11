import { nanoid } from "nanoid/non-secure";
import { parseString } from "xml2js";

function convertXmlToTree(xml) {
  let tree = {
    id: nanoid(),
    key: "root",
    value: {},
    children: [],
  };

  parseString(xml, (err, result) => {
    if (err) {
      console.error("Invalid XML:", err);
      return;
    }

    const traverse = (obj, parent) => {
      Object.entries(obj).forEach(([key, value]) => {
        const node = {
          id: nanoid(),
          key: key,
          value: typeof value === "string" ? value : key,
          children: [],
        };

        if (typeof value === "object" && !Array.isArray(value)) {
          traverse(value, node);
        }

        parent.children.push(node);
      });
    };

    traverse(result, tree);
  });

  return tree;
}

export default convertXmlToTree;