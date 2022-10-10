import React from "react";
import "./../CSS/SuccessRegister.css";
import Title from "../Components/Title";
import Subitle from "../Components/Subtitle";
import { useNavigate } from "react-router-dom";
import EmailIcon from '@mui/icons-material/Email';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PhoneEnabledIcon from '@mui/icons-material/PhoneEnabled';
import FaxIcon from '@mui/icons-material/Fax';
import Header from "../Components/Header";

const Register = () => {
  let navigate = useNavigate();

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div>
      <Header />
      <div className="wrapper-content">
      <Title title="Exoneración de bienes inmuebles" />
      <div className="content-su">
        <Subitle subtitle="Estimado(a) solicitante," />

        <p className="message">
          No se ha podido registrar su solicitud correctamente, por favor intente de nuevo. 
        </p>
        <button className="btn-su" onClick={handleBack}>
          {" "}
          VOLVER AL INICIO{" "}
        </button>
      </div>
      <div>
          <label className="more-info">
            Para más información sobre el trámite contactar:
          </label>
          <p>
            <EmailIcon className="icons-footer" sx={{ color: "#24ACEA" }}/>
            <label>melanie.marin@munisarchi.go.cr</label> <br />
            <AccessTimeIcon className="icons-footer" sx={{ color: "#24ACEA" }}/>
            <label>Lunes a viernes: 7:00a.m. - 4:00 p.m.</label> <br />
            <PhoneEnabledIcon className="icons-footer" sx={{ color: "#24ACEA" }}/>
            <label>2454 4001, ext. 111</label> <br />
            <FaxIcon className="icons-footer" sx={{ color: "#24ACEA" }}/>
            <label>2454-1664</label> <br />
          </p>
        </div>
    </div>
    </div>
  );
};

export default Register;
