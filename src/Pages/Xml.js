import React, { useState } from "react";
import { Button } from "@mui/material";
import {
  ConnectingAirportsOutlined,
  ConstructionOutlined,
  ContactlessOutlined,
} from "@mui/icons-material";

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
      if (node.parentNode.childNodes[i].hasChildNodes()) {
        if (isDuplicatedAux(node.parentNode.childNodes[i].firstChild))
          return true;
      }

      for (let y = i + 1; y < node.parentNode.childNodes.length; y++) {
        console.log(i,y)
        console.log(
          "Data",
          node.parentNode.childNodes[i],
          node.parentNode.childNodes[y]
        );
        // hola++;
        if (
          node.parentNode.childNodes[i].isEqualNode(
            node.parentNode.childNodes[y]
          )
        ) {
          return true;
        }
      }
    }
    return false;
  };

  // recursive function to travel throw the node tree of xml || return boolean
  const isDuplicatedAux = (xmlNode) => {
    // console.log(xmlNode)
    // console.log(xmlNode)
    if (xmlNode.hasChildNodes()) {
      return isDuplicatedAux(xmlNode.firstChild);
    } else {
      return checkNodes(xmlNode);
    }
    // console.log("oooooo", xmlNode.parentNode.nextSibling)

    // return result

    // if (xmlNode.nextSibling && !result) {
    //   return isDuplicated(xmlNode.parentNode.nextSibling)
    // } else {
    //   return result;
    // }
  };

  const isDuplicated = (xmlFile) => {
    console.log(isDuplicatedAux(xmlFile.childNodes[0]))
    // xmlFile.childNodes.forEach((element) => {
    //   if (isDuplicatedAux(element)) {
    //     return true;
    //   }
    // });
    // return false;
    
  };

  let text = (`
    <settings>
      <add key="test2" value="1" /> 
      <add key="test1" value="2" />
      <add key="test3" value="false" /> 
      <add key="test4" value="8000" />
      <routes>
        <menu>
          <menuitem Name="home" /> 
          <menuitem Name="login" />
          <menuitem Name="signup" /> 
          <menuitem Name="test" />
          <menuitem Name="test" />
        </menu>
        <menuitem Name="dac" />
      </routes>
      <uris>
        <add key="Game" value="true" /> <add key="Exit" value="false" />
        <add key="Exit" value="false" /> <add key="test5" value="true" />
        <add key="test6" value="true" />
      </uris>
      <add key="test7" value="1" /> <add key="test8" value="2" />
      <add key="test9" value="false" /> <add key="test10" value="8000" />
    </settings>`
  );

  const click = () => {
    const data = isXml(text);
    console.log(data.childNodes[0].childNodes[4])
    // console.log(data.childNodes[0].childNodes[4].childNodes[0].childNodes[3].isEqualNode(data.childNodes[0].childNodes[4].childNodes[0].childNodes[4]))
    console.log("Finall result", isDuplicated(data.childNodes[0].childNodes[4]));
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
