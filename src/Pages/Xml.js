import React, { useState } from "react";
import { Button } from "@mui/material";
import {
  Check,
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
  const isDuplicated = (xmlFile) => {
    for (let i = 0; i < xmlFile.childNodes.length; i++) {
      if (xmlFile.childNodes[i].hasChildNodes) {
        if (isDuplicated(xmlFile.childNodes[i])){
          return true
        }
      }
      for (let y = i + 1; y < xmlFile.childNodes.length; y++) {
        // console.log(
        //   "Data",
        //   xmlFile.childNodes[i],
        //   xmlFile.childNodes[y]
        // );
        if (xmlFile.childNodes[i].isEqualNode(xmlFile.childNodes[y])) {
          return true;
        }
      }
    }
    return false;
    
  };

  // let text = `
  //   <settings>
  //     <add key="test2" value="1" /> 
  //     <add key="test1" value="2" />
  //     <add key="test3" value="false" /> 
  //     <add key="test4" value="8000" />
  //     <routes>
  //       <menu>
  //         <menuitem Name="home" /> 
  //         <menuitem Name="login" />
  //         <menuitem Name="signup" /> 
  //         <menuitem Name="test" />
  //         <menuitem Name="test" />
  //       </menu>
  //       <menuitem Name="dac" />
  //     </routes>
  //     <uris>
  //       <add key="Game" value="true" />
  //       <add key="Exit" value="false" />
  //       <add key="test5" value="true" />
  //       <add key="test6" value="true" />
  //     </uris>
  //     <add key="test7" value="1" /> <add key="test8" value="2" />
  //     <add key="test9" value="false" /> <add key="test10" value="8000" />
  //   </settings>`;
let text = `
<casa>
  <habitacion id="1">
    <add key="Exit" value="Maria" />
    <add key="Exit" value="Jose" />
    <add key="Exit" value="Barquero" />
  </habitacion>
  <habitacion id="2">
    <add key="Exit" value="Maria" />
    <add key="Exit" value="Jose" />
    <add key="Exit" value="Barquero" />
  </habitacion>
</casa>`

  const click = () => {
    const data = isXml(text);
    console.log("Finall result", isDuplicated(data.childNodes[0]));
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
