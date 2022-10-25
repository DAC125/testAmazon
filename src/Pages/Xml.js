import React, { useState } from "react";
import { Button } from "@mui/material";
import { ConstructionOutlined } from "@mui/icons-material";

const xml = () => {

  function isXml(value) {
    const parser = new DOMParser();
    const str = value.split("\n").join("");
    const text = str.replace(/(?<=\>)\s+|\s+(?=\<)+|\s+(?=\>)+|(?<=\<)\s/g, "");
    const doc = parser.parseFromString(text, "text/xml");
    return doc;
  }

  // funtion to check all de single elements from node || return boolean
  const checkNodes = (node) => {
    for (let i = 0; i < node.parentNode.childNodes.length; i++) {
      let result;
      if (node.parentNode.childNodes[i].hasChildNodes()) {
        result = isDuplicated(node.parentNode.childNodes[i].firstChild);
        
      }
      if (result){
        return true
      }
      for (let y = i + 1; y < node.parentNode.childNodes.length; y++) {
        
        console.log("Data", node.parentNode.childNodes[i], node.parentNode.childNodes[y])
        // hola++;
        if (
          node.parentNode.childNodes[i].isEqualNode(
            node.parentNode.childNodes[y])
        ) {
          return true;
        }
        
      }
      
    }
    return false;
  };

  // recursive function to travel throw the node tree of xml || return boolean
  const isDuplicated = (xmlNode) => {
    let result;
    // console.log(xmlNode)
    if (xmlNode.hasChildNodes()) {
      result = isDuplicated(xmlNode.firstChild);
    } else {
      result = checkNodes(xmlNode);
    }
    // console.log("aaa", xmlNode)
    // if (xmlNode.parentNode.nextSibling && !result) {
    //   return isDuplicated(xmlNode.nextSibling) || checkNodes(xmlNode);
    // } else {
    //   return result;
    // }
  };

  let text = `
  <casa>
	<habitacion id="1">
		<add key="Exit" value="Maria" />
		<add key="Exit" value="Jose" />
		<add key="Exit" value="Barquero" />
	</habitacion>
		<habitacion id="2">
		<add key="Exit" value="Diego" />
		<add key="Exit" value="Acuna" />
	</habitacion>
</casa>
         `;

  const click = () => {
    const data = isXml(text);
    // console.log(data.childNodes[0])
    console.log("Finall result",isDuplicated(data.childNodes[0]));
  };

  return (
    <div className="App">
      <div>
      <h1>Test de XML</h1>
      <label>{text}</label>
      </div>
      <Button onClick={click}>Verify</Button>
    </div>
  );
};

export default xml;
