import React from "react";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import SearchIcon from "@mui/icons-material/Search";
import SimCardDownloadIcon from "@mui/icons-material/SimCardDownload";
import IconButton from "@mui/material/IconButton";
import MainTable from "./Table";
import Title from "../Components/Title";
import "./../CSS/Main.css";

export default function Main() {
  return (
    <div className="wrapper-content">
      <Title title="Exoneración de bienes inmuebles" />
      <div className="Navbar">
        <IconButton aria-label="Example">
          <FilterAltIcon sx={{ color: "#ffffff" }} />
        </IconButton>
        <h4 className="navbar-text">Filtrar</h4>
        <h4 className="space">|</h4>
        <IconButton aria-label="Example">
          <SearchIcon sx={{ color: "#ffffff" }} />
        </IconButton>
        <input
          className="navbar-text input-filter"
          placeholder="Buscar Solicitud"
        ></input>
        <h4 className="space">|</h4>
        <IconButton aria-label="Example">
          <SimCardDownloadIcon sx={{ color: "#ffffff" }} />
        </IconButton>
        <h4 className="navbar-text">Descargar Solicitudes</h4>
      </div>
      <MainTable />
    </div>
  );
}
