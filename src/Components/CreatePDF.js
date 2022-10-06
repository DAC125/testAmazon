import {
  usePDF,
  Document,
  Page,
  Text,
  // PDFViewer,
  View,
} from "@react-pdf/renderer";
import React from "react";

const MyDoc = (
  <Document>
    <Page size="A4">
      <View>
        <Text>hola mundo</Text>
      </View>
    </Page>
  </Document>
);

const CreatePDF = (props) => {
  const [instance] = usePDF({ document: MyDoc });

  const getBase64 = (file, cb) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = function () {
      cb(reader.result);
    };
  };

  const handleClick = () => {
    getBase64(instance.blob, (result) => {
      console.log(result);
      props.setDocumentPDF(result);
    });
  };

  return (
    <div>
      {/* <PDFViewer style={{ width: "100%", height: "100%" }}>{MyDoc}</PDFViewer> */}
      <button onClick={handleClick}> base64</button>
    </div>
  );
};

export default CreatePDF;
