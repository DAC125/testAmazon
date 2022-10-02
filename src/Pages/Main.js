import React from "react";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import SearchIcon from "@mui/icons-material/Search";
import SimCardDownloadIcon from "@mui/icons-material/SimCardDownload";
import IconButton from "@mui/material/IconButton";
import MainTable from "./Table";
import Title from "../Components/Title";
import "./../CSS/Main.css";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import axios from 'axios';

export default function Main() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [infoRows,setRows] = React.useState('');
  const [filterValue,setFilterValue] = React.useState(sessionStorage.getItem('ParameterFilter') || '');
  const options = ['Sin filtro','Solicitudes aprobadas','Solicitudes rechazadas','Solicitudes pendientes','Fecha']
  const status = ['SinFiltro','Aprobado','Rechazado','Pendiente'];
  const [search, setSearch] = React.useState(sessionStorage.getItem('ParameterSearch') || ''); 

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChangeSearch = (event) => {
    setSearch(event.target.value);
  }

  const handleChangeValue = (event, index) => {
    setFilterValue(index);
    setAnchorEl(null);

    sessionStorage.setItem('ParameterFilter',index);

    if (index === 0){
      axios.get(`http://localhost:3000/api/request/mainData`).then((res) => {
        setRows(res.data);
      });
    } else if (index <= 3){
      axios.get(`http://localhost:3000/api/request/statusRequest/${status[index]}`).then((res) => {
        setRows(res.data);
      });
    }else{
      console.log('date');
    }
  }

  const handleClickSearch = () => {
    console.log(search);
    sessionStorage.setItem('ParameterSearch',search);
    
    if (search === '' || search === null){
      axios.get(`http://localhost:3000/api/request/mainData`).then((res) => {
        setRows(res.data);
      });
    }else {
      axios.get(`http://localhost:3000/api/request/specificRequest/${search}`).then((res) => {
        setRows(res.data);
      });
    }
  }

  return (
    <div className="wrapper-content">
      <Title title="Exoneración de bienes inmuebles" />
      <div className="Navbar">
        <IconButton
            onClick={handleClick}
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
           <FilterAltIcon sx={{ color: "#ffffff" }} />
           <h6 className="filter navbar-text">Filtrar</h6>
        </IconButton>
        <h4 className="space">|</h4>
        <IconButton aria-label="Example" onClick={handleClickSearch}>
          <SearchIcon sx={{ color: "#ffffff" }} />
        </IconButton>
        <input
          className="navbar-text input-filter"
          placeholder="Buscar Número de Solicitud - DOC-XXXXX-XXXX"
          onChange={handleChangeSearch}
          value={search}
        ></input>
        <h4 className="space">|</h4>
        <IconButton aria-label="Example">
          <SimCardDownloadIcon sx={{ color: "#ffffff" }} />
          <h6 className="filter navbar-text">Descargar Solicitudes</h6>
        </IconButton>

      </div>
      <MainTable data = {infoRows}/>
      <Menu
           anchorEl={anchorEl}
           open={open}
           onClose={handleClose}
           MenuListProps={{
            role: 'listbox'
           }}
      >
        {options.map((option, index) => (
          <MenuItem 
             key={option}
             selected={index === filterValue}
             onClick={(event) => handleChangeValue(event,index)}
          >
            {option}
        </MenuItem>
        ))}
      </Menu>
    </div>
  );
}