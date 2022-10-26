let text = '<casa><habitacion id="1"><add key="Exit" value="Maria" /><add key="Exit" value="Jose" /><add key="Exit" value="Barquero" /></casa>'

var DOMParser = require('xmldom').DOMParser;
const parser = new DOMParser();
const doc = parser.parseFromString(text, "text/xml");

console.log(doc.childNodes[0].childNodes[0])