import React, { useState, useEffect } from "react";
import { Alert, Button, Snackbar  } from "@mui/material";
import {
  Check,
  ConnectingAirportsOutlined,
  ConstructionOutlined,
  ContactlessOutlined,
} from "@mui/icons-material";
import DomParser from "dom-parser";

const Xml = () => {
  const [error, setError] =  useState();
  const [open, setOpen] =  useState(false);

  function isXml(value) {
    const parser = new DOMParser();
    const str = value.split("\n").join("");
    const text = str.replace(/(?<=\>)\s+|\s+(?=\<)+|\s+(?=\>)+|(?<=\<)\s/g, "");
    const doc = parser.parseFromString(text, "text/xml");
    return doc;
  }
  

  // funtion to check all de single elements from node || return boolean
  const isDuplicated = (xmlFile) => {
    // console.log(xmlFile)
    for (let i = 0; i < xmlFile.childNodes.length; i++) {

      if (xmlFile.childNodes[i].hasChildNodes) {
        if (isDuplicated(xmlFile.childNodes[i])){
          return true
        }
      }
      for (let y = i + 1; y < xmlFile.childNodes.length; y++) {
        console.log(
          "Data",
          xmlFile.childNodes[i],
          xmlFile.childNodes[y]
        );
        if (xmlFile.childNodes[i].isEqualNode(xmlFile.childNodes[y])) {
          let err = "El error a sido en el elemento: <"+xmlFile.childNodes[i].nodeName
          for(let el=0; el< xmlFile.childNodes[i].attributes.length; el++){
            err = err + " " +xmlFile.childNodes[i].attributes[el].name+"="+xmlFile.childNodes[i].attributes[el].value
          }
          setError(err);
          return true;

        }
      }
    }
    return false;
    
  };

  let text = `
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
          <menuitem Name="test" LastName="test2" />
          <menuitem Name="test" LastName="test2" />
        </menu>
        <menuitem Name="dac" />
      </routes>
      <uris>
        <add key="Game" value="true" />
        <add key="Exit" value="false" />
        <add key="test5" value="true" />
        <add key="test6" value="true" />
      </uris>
      <add key="test7" value="1" /> <add key="test8" value="2" />
      <add key="test9" value="false" /> <add key="test10" value="8000" />
    </settings>`;
    
// let text = `
// <casa>
//   <habitacion id="1">
//     <add key="Exit" value="Maria" />
//     <add key="Exit" value="Jose" />
//     <add key="Exit" value="Barquero" />
//   </habitacion>
//   <habitacion id="2">
//     <add key="Exit" value="Maria" />
//     <add key="Exit" value="Jose" />
//     <add key="Exit" value="Barquero" />
//   </habitacion>
// </casa>`

  const click = async () => {
    const data = isXml(text);
    let result = await isDuplicated(data.childNodes[0])
    console.log("Finall result", result);

  };

  

  useEffect(() => {
    if(error){
      setOpen(true)
    }
    
    
    // var s = new XMLSerializer();
    // console.log(error.value)
    // let aa = error.toXMLString();
    // console.log(aa)
    // var newXmlStr = s.serializeToString(error.node());
    // console.log(newXmlStr)
}, [error]);

  return (
    <div className="App">
      <div>
        <h1>Test de XML</h1>
        <label>{text}</label>
      </div>
      <Button onClick={click}>Verify</Button>
      <Snackbar anchorOrigin={{vertical: "top", horizontal: "right"}} open={open}>
        <Alert severity="error" sx={{width: "100%"}}>
           {error}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Xml;
