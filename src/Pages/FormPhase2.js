import React, { useState } from "react";
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
import { createPDF } from "../Components/CreatePDF";
import Header from "../Components/Header";
import {Buffer} from 'buffer';

import "./../CSS/Form.css";
import "./../CSS/FormPhase2.css";
import "./../CSS/Container.css";

const FormPhase2 = () => {
  let navigate = useNavigate();
  const location = useLocation();
  const [accept, setAccept] = React.useState(true);
  const [status, setStatus] = React.useState("yes");
  const [file1, setFile1] = useState(null);
  const [file2, setFile2] = useState(null);
  const [file3, setFile3] = useState(null);

  const [file4, setFile4] = useState(null);
  
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
    const condition1 = file1 === "" || file2 === "" || file3 === "";
    const condition2 = file1 === null || file2 === null || file3 === null;

    if (condition1 || condition2) {
      console.log("No se subieron todos los archivos");
    } else {
      let data = {
        status: "Pendiente",
        name: location.state.data.name,
        idNumber: location.state.data.idNumber,
        email: location.state.data.email,
        phoneNumber1: location.state.data.phoneNumber1,
        phoneNumber2: location.state.delete === true ? "" : location.state.data.phoneNumber2 || "",
        address: location.state.data.address,
        digitalSignature: accept ? "yes" : "no",
        declaration: file1, 
        certificate : file2,
        paymentProof : file3,
        acceptData : false,
        acceptFile1 : false,
        acceptFile2 : false,
        acceptFile3 : false
      };
      axios.post(`http://localhost:3000/api/request/`, { data }).then( async (res) => {
        console.log(res.data.sequence);
        navigate("/SuccessRegister");
        data={...data, seq: res.data.sequence}
        const docBase64 = await createPDF({doc: "declaracion", data:{data}})
        // console.log(data)
        const dataFile = {
          email: location.state.data.email,
          file4: docBase64,
          seq: res.data.sequence,
        };
        axios.post(`http://localhost:3000/api/request/sendEmailRequest/`, { dataFile }).then((res) => {
          console.log(res);
          
        }).catch((error) => {
          console.log(error)
          navigate("/FailedRegister");
        });

      }).catch((error) => {
        console.log(error);
        navigate("/FailedRegister");
      });

      /*axios({
        url: `http://localhost:3000/api/request/`,
        method: "POST", 
        data: data,
        maxContentLength: "infinity",
        maxBodyLength: "infinity",
      });*/

    }
  };

  return (
    <div>
      <Header />
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
          <div>
            {" "}
            {accept ? (
              <Signature
                uploadFile1={setFile1}
                file1={file1}
                uploadFile2={setFile2}
                file2={file2}
                uploadFile3={setFile3}
                file3={file3}
              />
            ) : (
              <NonSignature
                uploadFile1={setFile1}
                file1={file1}
                uploadFile2={setFile2}
                file2={file2}
                uploadFile3={setFile3}
                file3={file3}
              />
            )}
          </div>
          <button className="btn" onClick={handleSubmit}>
            {" "}
            ENVIAR FORMULARIO{" "}
          </button>
        </div>
      </div>
      <h1>{file4}</h1>
    </div>
    </div>
  );
};

export default FormPhase2;
