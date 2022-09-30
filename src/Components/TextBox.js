import React from "react";
import "./../CSS/TextBox.css";
const TextBox = () => {
  return (
    <div className="box">
      <p>
        El siguiente formulario recopilará la información esencial para dar
        inicio al proceso de exoneración, de tipo bien único, según la ley 7509
        en la Municipalidad de Sarchí.
      </p>

      <p>
        Para completar el presente formulario son necesarios los siguientes
        requisitos:
      </p>

      <p>
        <span className="boldText">
          1- Estar al día con los pagos municipales.
        </span>
      </p>

      <p>
        <span className="boldText">
          2- Contar con un único bien a nivel nacional.
        </span>
      </p>
      <p>
        <span className="boldText">
          3- Adjuntar certificación del Registro Público Nacional donde indica
          que posee un único bien inmueble a nivel nacional:{" "}
          <a href="https://www.rnpdigital.com/shopping/login.jspx">
            https://www.rnpdigital.com/shopping/login.jspx
          </a>{" "}
          <span className="redText">/</span> Si tiene duda de como adquirirlo de{" "}
          <a href="localhost:3000">click</a> aqui
        </span>
      </p>

      <b>
        4- Adjuntar la siguiente declaración jurada firmada y escaneada: <span className="redText">XXXXXXXX</span>
      </b>
    </div>
  );
};

export default TextBox;
