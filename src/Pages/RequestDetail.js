import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import InputFile from "../Components/InputFile";
import axios from "axios";
import Header from "../Components/Header";
import Title from "../Components/Title";
import "./../CSS/RequestDetail.css";

export default function RequestDetail() {
  const location = useLocation();

  const [data, setData] = React.useState({
    seq: location.state.seq || "",
    status: location.state.status || "",
    name: location.state.name || "",
    idNumber: location.state.idNumber || "",
    email: location.state.email || "",
    phoneNumber1: location.state.phoneNumber1 || "",
    phoneNumber2: location.state.phoneNumber2 || "",
    address: location.state.address || "",
  });

  const [file1, setFile1] = useState(location.state.declaration || null);
  const [file2, setFile2] = useState(location.state.certificate || null);
  const [file3, setFile3] = useState(location.state.paymentProof || null);
  const [acceptData, setAcceptData] = React.useState(
    JSON.parse(location.state.acceptData || "false")
  );
  const [acceptFile1, setAcceptFile1] = React.useState(
    JSON.parse(location.state.acceptFile1 || "false")
  );
  const [acceptFile2, setAcceptFile2] = React.useState(
    JSON.parse(location.state.acceptFile2 || "false")
  );
  const [acceptFile3, setAcceptFile3] = React.useState(
    JSON.parse(location.state.acceptFile3 || "false")
  );

  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleRegistration = (dataV) => {
    if (acceptData && acceptFile1 && acceptFile2 && acceptFile3) {
      const dataS = {
        status: "Pendiente",
        name: dataV.name,
        idNumber: dataV.idNumber,
        email: dataV.email,
        phoneNumber1: dataV.phoneNumber1,
        phoneNumber2: dataV.phoneNumber2 || "",
        address: dataV.address,
        declaration: file1,
        certificate: file2,
        paymentProof: file3,
        acceptData: acceptData,
        acceptFile1: acceptFile1,
        acceptFile2: acceptFile2,
        acceptFile3: acceptFile3,
      };

      axios
        .post(`http://localhost:3000/api/request/updateRequest/${data.seq}`, {
          dataS,
        })
        .then((res) => {
          console.log(res);
        }).catch((error) => {
          console.log(error)
        });
    } else {
      alert("No se puede enviar, alguno de los datos no ha sido aprobado");
    }
  };

  const handleError = (errors) => {};

  const handleReject = (event) => {
    const newPhase = { status: "Rechazado" };
    axios
      .post(`http://localhost:3000/api/request/updatePhase/${data.seq}`, {
        newPhase,
      })
      .then((res) => {
        alert("Se actualizó correctamente la solicitud");
        axios
        .post(`http://localhost:3000/api/request/notAllowRequest`, {
          data,
        })
        .then((res2) => {
          console.log(res2);
          alert("Se envío el correo correctamente");
        }).catch((error) => {
          console.log(error);
          alert("No se pudo enviar el correo correctamente al usuario");
        });
      }).catch((error) => {
        alert("No se pudo actualizar la solicitud correctamente");
      });
  };
  const handleChangeAcceptData = (event) => {
    setAcceptData(event.target.checked);
  };

  const handleChangeAcceptFile1 = (event) => {
    setAcceptFile1(event.target.checked);
  };

  const handleChangeAcceptFile2 = (event) => {
    setAcceptFile2(event.target.checked);
  };

  const handleChangeAcceptFile3 = (event) => {
    setAcceptFile3(event.target.checked);
  };

  const registerOptions = {
    name: { required: "Nombre es requerido", onChange: (e) => handleChange(e) },
    idNumber: {
      required: "Cédula es requerida",
      maxLength: {
        value: 10,
        message: "Cédula puede tener máximo 10 caracteres",
      },
      onChange: (e) => handleChange(e),
    },
    email: {
      required: "Correo es requerido",
      onChange: (e) => handleChange(e),
    },
    phoneNumber1: {
      required: "Número de teléfono es requerido",
      maxLength: {
        value: 15,
        message: "Número de teléfono puede tener máximo 15 caracteres",
      },
      onChange: (e) => handleChange(e),
    },
    phoneNumber2: {
      maxLength: {
        value: 15,
        message: "Número de teléfono puede tener máximo 15 caracteres",
      },
      onChange: (e) => handleChange(e),
    },
    address: {
      required: "Dirección es requerida",
      maxLength: {
        value: 500,
        message: "Número de teléfono puede tener máximo 500 caracteres",
      },
      onChange: (e) => handleChange(e),
    },
  };

  useEffect(() => {
    if (acceptData && acceptFile1 && acceptFile2 && acceptFile3) {
      console.log(
        "Desea actualizar los datos y el estado de solicitud por aceptado?"
      );
    }

    //Yes update data, and validate files are no empty
  }, [acceptData, acceptFile1, acceptFile2, acceptFile3]);

  return (
    <div>
      <Header />
      <div className="wrapper-content">
      <Title title="Exoneración de bienes inmuebles" />
      <div>
        <h3 className="title-data">Datos del solicitante</h3>
        <form onSubmit={handleSubmit(handleRegistration, handleError)}>
          <div className="data-details">
            <label>1. Nombre completo</label>
            <input
              className="input-data-detail"
              name="name"
              type="text"
              value={data.name}
              {...register("name", registerOptions.name)}
            />
            <small className="text-danger">
              {errors?.name && errors.name.message}
            </small>
          </div>
          <div className="data-details">
            <label>2. Número de cédula</label>
            <input
              className="input-data-detail"
              name="idNumber"
              type="text"
              value={data.idNumber}
              {...register("idNumber", registerOptions.idNumber)}
            />
            <small className="text-danger">
              {errors?.idNumber && errors.idNumber.message}
            </small>
          </div>

          <div className="data-details">
            <label>3. Dirección física para notificaciones</label>
            <input
              className="input-data-detail address-detail"
              name="address"
              type="text"
              value={data.address}
              {...register("address", registerOptions.address)}
            />
            <small className="text-danger">
              {errors?.address && errors.address.message}
            </small>
          </div>
          <div className="data-details">
            <label>4. Número de teléfono</label>
            <input
              className="input-data-detail"
              name="phoneNumber1"
              type="text"
              value={data.phoneNumber1}
              {...register("phoneNumber1", registerOptions.phoneNumber1)}
            />
            <small className="text-danger">
              {errors?.phoneNumber1 && errors.phoneNumber1.message}
            </small>
          </div>
          <div className="data-details">
            <label>5. Número de celular</label>
            <input
              className="input-data-detail"
              name="phoneNumber2"
              type="text"
              value={data.phoneNumber2}
              {...register("phoneNumber2", registerOptions.phoneNumber2)}
            />
            <small className="text-danger">
              {errors?.phoneNumber2 && errors.phoneNumber2.message}
            </small>
          </div>
          <div className="data-details">
            <label>6.Correo electrónico para notificaciones</label>
            <input
              className="input-data-detail"
              type="email"
              name="email"
              value={data.email}
              {...register("email", registerOptions.email)}
            />
            <small className="text-danger">
              {errors?.email && errors.email.message}
            </small>
          </div>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={acceptData}
                  onChange={handleChangeAcceptData}
                />
              }
              label="Datos del solicitante"
            />
          </FormGroup>
          <div>
            <h3 className="title-data2">Archivos Adjuntos</h3>
            <div className="files">
              <div className="file-details">
                <InputFile
                  title="1. Declaracion Jurada"
                  uploadFile={setFile1}
                  file={file1}
                  isDownloadable={true}
                />
              </div>
              <div className="file-checkbox">
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={acceptFile1}
                        onChange={handleChangeAcceptFile1}
                      />
                    }
                    label="Declaracion Jurada"
                  />
                </FormGroup>
              </div>
            </div>

            <div className="files">
              <div className="file-details">
                <InputFile
                  title="2. Certificación del Registro Público Nacional donde indica que posee un único bien inmueble a nivel nacional"
                  uploadFile={setFile2}
                  file={file2}
                  isDownloadable={true}
                />
              </div>
              <div className="file-checkbox">
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={acceptFile2}
                        onChange={handleChangeAcceptFile2}
                      />
                    }
                    label="Certificación registro nacional"
                  />
                </FormGroup>
              </div>
            </div>

            <div className="files">
              <div className="file-details">
                <InputFile
                  title="3. Comprobante de pago de la certificación del Registro Público Nacional"
                  uploadFile={setFile3}
                  file={file3}
                  isDownloadable={true}
                />
              </div>
              <div className="file-checkbox">
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={acceptFile3}
                        onChange={handleChangeAcceptFile3}
                      />
                    }
                    label="Comprobante de pago"
                  />
                </FormGroup>
              </div>
            </div>
          </div>
          <div className="btn-container-detail">
            <button className="btn-detail1">Enviar Comprobante</button>
          </div>
        </form>
        <button onClick={handleReject} className="btn-detail2">
          Rechazar Solicitud
        </button>
      </div>
    </div>
    </div>
  );
}
