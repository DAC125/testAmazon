import {
  usePDF,
  Document,
  Page,
  Text,
  PDFViewer,
  Image,
  View
} from "@react-pdf/renderer";
import { useState } from "react";

// src/Images/logo.png
// src/Components/CreatePDF.js
const MyDoc = (
  <Document>
    <Page size="A4">
        <View>
        {/* <Image src="https://ibb.co/82pgFdv" /> */}
      <Text>hola mundo</Text>
        </View>
      
    </Page>
  </Document>
);

const CreatePDF = () => {
  const [instance, updateInstance] = usePDF({ document: MyDoc });

  const [text, setText] = useState("");

  const getBase64 = (file, cb) => {
    let reader = new FileReader();
    reader.readAsDataURL(instance.blob);
    reader.onloadend = function () {
      let base64data = reader.result;
      console.log(base64data);
    };
  };

  const handleClick = () => {
    // console.log(instance.blob);

    // var reader = new FileReader();
    // reader.readAsDataURL(instance.blob);
    // reader.onloadend = function () {
    //   var base64data = reader.result;
    //   console.log(base64data);
    // };
    getBase64(instance, (result) => {
      setText(result);
    });
  };

  if (instance.loading) return <div>Loading ...</div>;

  //   if (instance.error) return <div>Something went wrong: {error}</div>;

  return (
    <div>
    <PDFViewer style={{ width: "100%", height: "100%" }}>{MyDoc}</PDFViewer>
    <button onClick={handleClick}> base64</button>
    </div>
  );
};

export default CreatePDF;
