import React from "react";
import InputFile from "../Components/InputFile";
import "./../CSS/Form.css";
import "./../CSS/TitleSignature.css";

const NonSignature = (props) => {
  return (
    <div className="content">
         <h1 className="titleSignature"> Trámite sin firma digital </h1>
         <div className="data">
            <h3>Favor adjuntar los siguientes requisitos:</h3>
         </div>
         <InputFile title="1. Declaración jurada firmada físicamente y escaneada" uploadFile={props.uploadFile1} file={props.file1} isDownloadable={false}/>
         <InputFile title="2. Certificación del Registro Público Nacional donde indica que posee un único bien inmueble a nivel nacional" uploadFile={props.uploadFile2} file={props.file2} isDownloadable={false}/>
         <InputFile title="3. Comprobante de pago de la certificación del Registro Público Nacional" uploadFile={props.uploadFile3} file={props.file3} isDownloadable={false}/>
    </div>
  );
};

export default NonSignature;