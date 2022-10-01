import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Subtitle from "../Components/Subtitle";
import TextBox from "../Components/TextBox";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import Title from "../Components/Title";
import InputFile from "../Components/InputFile";
import { useForm } from "react-hook-form";

import "./../CSS/Form.css";
import "./../CSS/Container.css";

const Form = () => {
  const [accept, setAccept] = React.useState(false);
  const [showInput, setShowInput] = useState(false);
  // const [ test1, setTest1 ] = useState(null)
  // const [ test2, setTest2 ] = useState(null)

  const [dataUser, setDataUser] = useState({
    name: "",
    idNumber: "",
    email: "",
    phoneNumber1: "",
    phoneNumber2: "",
    address: "",
  });

  //Handler the Radio Button Click
  function handleClick(event) {
    if (event.target.value === accept) {
      setAccept("");
    } else {
      setAccept(event.target.value);
    }
  }

  let navigate = useNavigate();

  const handleChange = (event) => {
    setDataUser({ ...dataUser, [event.target.name]: event.target.value });
  };

  const deleteInput = () => {
    setShowInput(false);
    setDataUser({ ...dataUser, ["phoneNumber2"]: "" });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const handleRegistration = (data) => {
    navigate("/Form2", { state: data });
  };
  const handleError = (errors) => {};

  const registerOptions = {
    name: { required: "Nombre es requerido" },
    idNumber: {
      required: "Cédula es requerida",
      maxLength: {
        value: 10,
        message: "Cédula puede tener máximo 10 caracteres",
      },
    },
    email: { required: "Correo es requerido" },
    phoneNumber1: {
      required: "Número de teléfono es requerido",
      maxLength: {
        value: 15,
        message: "Número de teléfono puede tener máximo 10 caracteres",
      },
    },
    phoneNumber2: {
      maxLength: {
        value: 10,
        message: "Número de teléfono puede tener máximo 10 caracteres",
      },
    },
    address: {
      required: "Dirección es requerida",
      maxLength: {
        value: 500,
        message: "Número de teléfono puede tener máximo 500 caracteres",
      },
    },
  };

  return (
    <div className="wrapper-content">
      <Title title="Exoneración de bienes inmuebles" />

      <div className="content">
        <Subtitle subtitle="Solicitud de exoneración de bien único" />
        <TextBox />
        <form onSubmit={handleSubmit(handleRegistration, handleError)}>
          <div className="form">
            <div className="aa">
              <p>1. Nombre completo</p>
              <input
                className="inputForm name"
                name="name"
                type="text"
                {...register("name", registerOptions.name)}
              />
              <small className="text-danger">
                {errors?.name && errors.name.message}
              </small>
            </div>
            <div className="aa">
              <p>2. Número de identificación física:</p>
              <input
                className="inputForm"
                name="idNumber"
                type="text"
                {...register("idNumber", registerOptions.idNumber)}
              />
              <small className="text-danger">
                {errors?.idNumber && errors.idNumber.message}
              </small>
            </div>
            <div className="aa">
              <p>3. Correo electrónico para notificaciones: </p>
              <input
                className="inputForm"
                type="email"
                name="email"
                {...register("email", registerOptions.email)}
              />

              <div className="tooltip">
                <QuestionMarkIcon sx={{ color: "#24ACEA", fontSize: 20 }} />
                <span className="tooltiptext">
                  Recomendación correo no saturado y de uso frecuente
                </span>
              </div>
              <small className="text-danger">
                {errors?.email && errors.email.message}
              </small>
            </div>

            <div className="aa">
              <p>4. Número de teléfono :</p>
              <input
                className="inputForm"
                name="phoneNumber1"
                type="text"
                {...register("phoneNumber1", registerOptions.phoneNumber1)}
              />

              <IconButton onClick={() => setShowInput(true)}>
                <AddIcon sx={{ color: "#24ACEA", fontSize: 20 }} />
              </IconButton>
              <div className="App">
                {showInput ? (
                  <div>
                    <input
                      className="inputForm"
                      type="text"
                      name="phoneNumber2"
                      value={dataUser.phoneNumber2}
                      onChange={handleChange}
                    />
                    <IconButton onClick={deleteInput}>
                      <ClearIcon sx={{ color: "red", fontSize: 20 }} />
                    </IconButton>
                  </div>
                ) : null}
                              <small className="text-danger">
                {errors?.phoneNumber1 && errors.phoneNumber1.message}
              </small>
              </div>
            </div>
            <div className="aa">
              <p>5. Dirección física :</p>
              <input
                className="inputForm address"
                name="address"
                type="text"
                {...register("address", registerOptions.address)}
              />
              <small className="text-danger">
                {errors?.address && errors.address.message}
              </small>
            </div>

            <div className="aa">
              <label className="colorLabel">
                {" "}
                Al seleccionar la siguiente casilla solicito lo siguiente:{" "}
              </label>
              <p>
                La exoneración del impuesto de Bienes Inmuebles, con base en el
                artículo 4) inciso e) de la Ley Nº 7509 del 09 de mayo de 1995,
                reformada por la ley Nº 7729 del 01 de enero de 1998, publicada
                en la Gaceta Nº 245 del día 19 de diciembre de 1997. Por cuanto
                según publicación estoy exento (a) del pago de dicho impuesto.
              </p>
              <p>
                Y a la vez declaro bajo la fe del juramento que no poseo Bienes
                Inmuebles sin inscribir en el Registro Público de Propiedades, a
                nivel nacional.
              </p>
              <FormControl component="fieldset">
                <RadioGroup value={accept}>
                  <FormControlLabel
                    value="accept"
                    className="colorLabel"
                    control={<Radio onClick={handleClick} />}
                    label="Acepto y declaro bajo fé lo anterior"
                  />
                </RadioGroup>
              </FormControl>
              <br></br>
              <button disabled={!accept} className="btn">
                {" "}
                CONTINUAR{" "}
              </button>
            </div>
            {/* <InputFile title="1. Declaracion Jurada" uploadFile={setTest1} file={test1} isDownloadable={true}/>
            <InputFile title="2. Declaracion No Jurada" uploadFile={setTest2} file={test2} isDownloadable={false}/> */}
        
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;

/*        <div className="aa">
            <p>1. Nombre completo:</p>
            <input
              className="inputForm name"
              type="text"
              name="name"
              value={dataUser.name}
              onChange={handleChange}
            />
          </div>*/
