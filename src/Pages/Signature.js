import React from "react";
import "./../CSS/Form.css";
import "./../CSS/TitleSignature.css";
import "./../CSS/Signature.css";


const Signature = () => {


  return (
    <div className="content-file">
         <h1 className="titleSignature"> Trámite con firma digital </h1>

         <div className="data">
            <h3>Favor adjuntar los siguientes requisitos:</h3>
            <label>Declaración jurada con firma digital</label>
         </div>
         <div className="data">
            <label>Certificación del Registro Público Nacional donde indica 
                que posee un único bien inmueble a nivel nacional</label>
         </div>
         <div className="data">
            <label>Comprobante de pago de la certificación del Registro Público Nacional</label>
         </div> 
    </div>
  );
};

export default Signature;