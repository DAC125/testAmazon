import React, { useEffect } from "react";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import SearchIcon from "@mui/icons-material/Search";
import SimCardDownloadIcon from "@mui/icons-material/SimCardDownload";
import IconButton from "@mui/material/IconButton";
import MainTable from "./Table";
import Title from "../Components/Title";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import axios from 'axios';
import Header from "../Components/Header";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import "./../CSS/Main.css";

export default function Main() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [infoRows,setRows] = React.useState('');
  const options = ['Sin filtro','Solicitudes aprobadas','Solicitudes rechazadas','Solicitudes pendientes','Fecha']
  const status = ['SinFiltro','Aprobado','Rechazado','Pendiente'];
  const [search, setSearch] = React.useState(sessionStorage.getItem('ParameterSearch') || ''); 
  const [date, setDate] = React.useState(dayjs('2014-08-18T21:11:54'));

  const [openModal,setOpenModal] = React.useState(false);;
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChangeSearch = (event) => {
    setSearch(event.target.value);
  }

  const handleChangeDate = (newValue) => {
    setDate(newValue);
  };


  const handleFirstFilter = () => {
    const localV = sessionStorage.getItem('ParameterFilter');
    let index = localV === undefined ? "0" : localV;

    index = parseInt(index);
    if (index === 2 || index === 3){
      axios.get(`http://localhost:3000/api/request/statusRequest/${status[index]}`).then((res) => {
        setRows(res.data);
      });
    }else if (index === 4){
      console.log('date');
    }else{
      axios.get(`http://localhost:3000/api/request/mainData`).then((res) => {
        setRows(res.data);
      });
    }

    return index;
  }
  const [filterValue,setFilterValue] = React.useState(handleFirstFilter);


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
      handleOpenModal();
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

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };

  return (
    <div>
      <Header />
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
      <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Modal
        hideBackdrop
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          <h2 id="child-modal-title">Seleccione el rango de fecha</h2>
          <p id="child-modal-description">
          <DesktopDatePicker
          label="Date desktop"
          inputFormat="MM/DD/YYYY"
          value={date}
          onChange={handleChangeDate}
          renderInput={(params) => <TextField {...params} />}
        />
          </p>
          <Button onClick={handleCloseModal}>Close</Button>
        </Box>
      </Modal>
      </LocalizationProvider>
    </div>
    </div>
  );
}
