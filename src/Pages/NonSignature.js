import React from "react";
import "./../CSS/Form.css";
import "./../CSS/TitleSignature.css";

const NonSignature = () => {
  return (
    <div className="content">
         <h1 className="titleSignature"> Trámite sin firma digital </h1>
         <div className="data">
            <h3>Favor adjuntar los siguientes requisitos:</h3>
            <label>Declaración jurada firmada físicamente y escaneada</label>
         </div>
         <div className="data">
            <label>Certificación del Registro Público Nacional donde indica que posee un único bien inmueble a nivel nacional </label>
         </div>
         <div className="data">
            <label>Comprobante de pago de la certificación del Registro Público Nacional</label>
         </div>
    </div>
  );
};

export default NonSignature;