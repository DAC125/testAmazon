import React from "react";
import "./../CSS/Form.css";
import "./../CSS/FormPhase2.css";
import "./../CSS/Container.css";
import Subitle from "../Components/Subtitle";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Signature from "./Signature";
import NonSignature from "./NonSignature";
import Title from "../Components/Title";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const FormPhase2 = () => {
  let navigate = useNavigate();
  const location = useLocation();

  const [accept, setAccept] = React.useState(true);
  const [status, setStatus] = React.useState("yes");

  //Handler the Radio Button Click
  function handleClick(event) {
    if (event.target.value === "yes") {
      setAccept(true);
      setStatus(event.target.value);
    } else {
      setAccept(false);
      setStatus(event.target.value);
    }
  }

  const handleSubmit = () => {
    
    const data = {
      status: "Pendiente",
      name: location.state.name,
      idNumber: location.state.idNumber,
      email: location.state.email,
      phoneNumber1: location.state.phoneNumber1,
      phoneNumber2: location.state.phoneNumber2 || '',
      address: location.state.address,
      declaration: "",
      certificate: "",
      paymentProof: "",
      digitalSignature: accept ? 'yes' : 'no'
    };

    axios.post(`http://localhost:3000/api/request/`, {data}).then((res) => {
      console.log(res);
    });

    navigate("/SuccessRegister");
  };

  return (
    <div className="wrapper-content">
      <Title title="Exoneración de bienes inmuebles" />
      <div className="content">
        <Subitle subtitle="Solicitud de inicio de proceso de exoneración de bien único" />
        <div className="aa">
          <h4>¿Posee firma digital?</h4>
          <FormControl component="fieldset">
            <RadioGroup value={status}>
              <FormControlLabel
                value="yes"
                className="colorLabel"
                control={<Radio onClick={handleClick} />}
                label="Si"
              />
              <FormControlLabel
                value="no"
                className="colorLabel"
                control={<Radio onClick={handleClick} />}
                label="No"
              />
            </RadioGroup>
          </FormControl>
          <br></br>
          <div> {accept ? <Signature /> : <NonSignature />}</div>
          <button className="btn" onClick={handleSubmit}>
            {" "}
            ENVIAR FORMULARIO{" "}
          </button>
          
        </div>
      </div>
    </div>
  );
};

export default FormPhase2;
