import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "./../CSS/Declaration.css";
import "./../CSS/Container.css";

const Declaration = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleRegistration = (data) => {
    console.log(data);
    console.log("Future pdf");
  };

  const handleError = (errors) => {};

  const registerOptions = {
    name: { required: "Nombre es requerido" },
    idNumber: {
      required: "Cédula es requerida",
      maxLength: {
        value: 10,
        message: "Máximo 10 caracteres",
      },
    },
    district: { 
      required: "Distrito es requerido", 
      maxLength: {
        value: 50,
        message: "Máximo 50 caracteres",
      },
    },
    address: {
      required: "Dirección es requerida",
      maxLength: {
        value: 50,
        message: "Máximo 50 caracteres",
      },
    },
    canton: {
      required: "Cantón es requerida",
      maxLength: {
        value: 50,
        message: "Máximo 50 caracteres",
      },
    },
    province: {
      required: "Provincia es requerida",
      maxLength: {
        value: 50,
        message: "Máximo 50 caracteres",
      },
    },
    inAddr: {
      required: "Es requerida",
      maxLength: {
        value: 50,
        message: "Máximo 50 caracteres",
      },
    },
    hour: {
      required: "Hora es requerida",
      maxLength: {
        value: 10,
        message: "Máximo 10 caracteres",
      },
    },
    day: {
      required: "Día es requerida",
      maxLength: {
        value: 10,
        message: "Máximo 10 caracteres",
      },
    },
    month: {
      required: "Mes es requerida",
      maxLength: {
        value: 50,
        message: "Máximo 50 caracteres",
      },
    },
    year: {
      required: "Año es requerida",
      maxLength: {
        value: 7,
        message: "Máximo 7 caracteres",
      },
    }
  };

  return (
    <div className="wrapper-content">
      <div>
        <a
          id="logo-dec"
          rel="noreferrer"
          target="_blank"
        />

        <h3 className="title-declaration">
          Declaración jurada para la solicitud de exoneración de bienes
          inmuebles en la Municipalidad de Sarchí
        </h3>
        <form onSubmit={handleSubmit(handleRegistration, handleError)}>
          <div className="form-declaration">
            <div className="data">
              <div>Yo</div>
              <div>
                <input
                  className="inputForm-dec"
                  name="name"
                  type="text"
                  {...register("name", registerOptions.name)}
                />
                <small className="text-danger">
                  {errors?.name && errors.name.message}
                </small>
              </div>
              <div>, con domicilio en </div>
              <div>
                <input
                  className="inputForm-dec"
                  name="address"
                  type="text"
                  {...register("address", registerOptions.address)}
                />
                <small className="text-danger">
                  {errors?.address && errors.address.message}
                </small>
              </div>
              <div>distrito</div>
              <div>
                <input
                  className="inputForm-dec"
                  name="district"
                  type="text"
                  {...register("district", registerOptions.district)}
                />
                <small className="text-danger">
                  {errors?.district && errors.district.message}
                </small>
              </div>

              <div>cantón</div>
              <div>
                <input
                  className="inputForm-dec"
                  name="canton"
                  type="text"
                  {...register("canton", registerOptions.canton)}
                />
                <small className="text-danger">
                  {errors?.canton && errors.canton.message}
                </small>
              </div>

              <div>,provincia</div>
              <div>
                <input
                  className="inputForm-dec"
                  name="province"
                  type="text"
                  {...register("province", registerOptions.province)}
                />
                <small className="text-danger">
                  {errors?.province && errors.province.message}
                </small>
              </div>

              <div>,con documento de identidad Nº</div>
              <div>
                <input
                  className="inputForm-dec"
                  name="idNumber"
                  type="text"
                  {...register("idNumber", registerOptions.idNumber)}
                />       
                <small className="text-danger">
                  {errors?.idNumber && errors.idNumber.message}
                </small>
              </div>
            </div>

            <p>
              Solicito, a través de la presente declaración jurada, la
              exoneración de bienes inmuebles, declarando bajo fe de juramento
              que cumplo con los siguientes requisitos:
              <ul>
                <li>Estar al día con los pagos municipales.</li>
                <li>Contar con un único bien a nivel nacional.</li>
                <li>
                  Certificación del Registro Público Nacional donde indica que
                  posee un único bien inmueble a nivel nacional.
                </li>
              </ul>
            </p>

            <div>Firmo en </div>
            <div>
              <input
                className="inputForm-dec input-date"
                name="inAddr"
                type="text"
                {...register("inAddr", registerOptions.inAddr)}
              />
              <small className="text-danger">
                {errors?.inAddr && errors.inAddr.message}
              </small>
            </div>

            <div>, a las </div>
            <div>
              <input
                className="inputForm-dec input-date"
                name="hour"
                type="text"
                {...register("hour", registerOptions.hour)}
              />
              <small className="text-danger">
                {errors?.hour && errors.hour.message}
              </small>
            </div>

            <div>del dia </div>
            <div>
              <input
                className="inputForm-dec input-date"
                name="day"
                type="text"
                {...register("day", registerOptions.day)}
              />
              <small className="text-danger">
                {errors?.day && errors.day.message}
              </small>
            </div>

            <div>del mes </div>
            <div>
              <input
                className="inputForm-dec input-date"
                name="month"
                type="text"
                {...register("month", registerOptions.month)}
              />
              <small className="text-danger">
                {errors?.month && errors.month.message}
              </small>
            </div>

            <div>del año </div>
            <div>
              <input
                className="inputForm-dec input-date"
                name="year"
                type="text"
                {...register("year", registerOptions.year)}
              />
              <small className="text-danger">
                {errors?.year && errors.year.message}
              </small>
            </div>
          </div>
          <div className="signature">
            <h3> Firma: </h3>
          </div>

          <button className="btn-dec">
            Descargar PDF
          </button>
        </form>
      </div>
    </div>
  );
};

export default Declaration;
