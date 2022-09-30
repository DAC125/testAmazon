import React, { useState } from "react";
import Title from "../Components/Title";
import "./../CSS/RequestDetail.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

export default function RequestDetail() {
  const location = useLocation();

  const [data, setData] = React.useState({
    status: location.state.status || "",
    name: location.state.name || "",
    idNumber: location.state.idNumber || "",
    email: location.state.email || "",
    phoneNumber1: location.state.phoneNumber1 || "",
    phoneNumber2: location.state.phoneNumber2 || "",
    address: location.state.address || "",
    declaration: "",
    certificate: "",
    paymentProof: "",
  });

  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
    setValue([event.target.name], event.target.value);
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const handleRegistration = (data) => console.log(data);
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
              onChange={handleChange}
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
              onChange={handleChange}
              {...register("idNumber", registerOptions.idNumber)}
            />
            <small className="text-danger">
              {errors?.idNumber && errors.idNumber.message}
            </small>
          </div>

          <div className="data-details">
            <label>3. Dirección física para notificaciones</label>
            <input
              className="input-data-detail"
              name="address"
              type="text"
              value={data.address}
              onChange={handleChange}
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
              onChange={handleChange}
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
              onChange={handleChange}
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
              onChange={handleChange}
              {...register("email", registerOptions.email)}
            />
            <small className="text-danger">
              {errors?.email && errors.email.message}
            </small>
          </div>
          <button>Submit</button>
        </form>
      </div>
    </div>
  );
}

/*
     <div className="data-details">
        <h3 className="title-data">Datos del solicitante</h3>
        <label>1. Nombre completo</label>
        <input className="input-data-detail" onChange={setName(name)} value={data.name}></input>
        <label>2. Número de cédula</label>
        <input className="input-data-detail" onChange={setIdNumber(idNumber)} value={data.idNumber}></input>
        <label>3. Dirección física para notificaciones </label>
        <input className="input-data-detail" onChange={setAddress(address)} value={data.address}></input>
        <label>4. Número de teléfono </label>
        <input className="input-data-detail" onChange={setPhone1(phoneNumber1)} value={data.phoneNumber1}></input>
        <label>5. Número de celular </label>
        <input className="input-data-detail" onChange={setPhone2(phoneNumber2)} value={data.phoneNumber2}></input>
        <label>6.Correo electrónico para notificaciones </label>
        <input className="input-data-detail"  onChange={setEmail(email)}value={data.email}></input>
      </div>
*/
