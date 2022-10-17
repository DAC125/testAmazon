import React, { useEffect } from "react";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import SearchIcon from "@mui/icons-material/Search";
import SimCardDownloadIcon from "@mui/icons-material/SimCardDownload";
import IconButton from "@mui/material/IconButton";
import MainTable from "./Table";
import Title from "../Components/Title";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";
import Header from "../Components/Header";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import "./../CSS/Main.css";

export default function Main() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [infoRows, setRows] = React.useState("");
  const [selected, setSelected] = React.useState([]);
  const options = [
    "Sin filtro",
    "Solicitudes aprobadas",
    "Solicitudes rechazadas",
    "Solicitudes pendientes",
    "Fecha",
  ];

  const status = ["SinFiltro", "Aprobado", "Rechazado", "Pendiente"];

  const style = {
    position: "absolute",
    top: "65%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };

  const [search, setSearch] = React.useState(
    sessionStorage.getItem("ParameterSearch") || ""
  );
  const [dateI, setDateI] = React.useState(dayjs());
  const [dateF, setDateF] = React.useState(dayjs());

  const [openModal, setOpenModal] = React.useState(false);
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
  };

  const handleChangeDateI = (newValue) => {
    setDateI(newValue);
  };

  const handleChangeDateF = (newValue) => {
    setDateF(newValue);
  };

  const handleFirstFilter = () => {
    const localV = sessionStorage.getItem("ParameterFilter");
    let index = localV === undefined ? "0" : localV;

    index = parseInt(index);
    if (index === 2 || index === 3) {
      axios
        .get(`http://localhost:3000/api/request/statusRequest/${status[index]}`)
        .then((res) => {
          setRows(res.data);
        }).catch((error) => {
          console.log(error)
        });
    } else if (index === 4) {
      console.log("date");
    } else {
      axios.get(`http://localhost:3000/api/request/mainData`).then((res) => {
        setRows(res.data);
      }).catch((error) => {
        console.log(error)
      });
    }

    return index;
  };
  const [filterValue, setFilterValue] = React.useState(handleFirstFilter);

  const handleChangeValue = (event, index) => {
    setFilterValue(index);
    setAnchorEl(null);

    sessionStorage.setItem("ParameterFilter", index);

    if (index === 0) {
      axios.get(`http://localhost:3000/api/request/mainData`).then((res) => {
        setRows(res.data);
      });
    } else if (index <= 3) {
      axios
        .get(`http://localhost:3000/api/request/statusRequest/${status[index]}`)
        .then((res) => {
          setRows(res.data);
        });
    } else {
      console.log("date");
      handleOpenModal();
    }
  };

  const convertToDate = (day) => {
    return `${dayjs(day).get("year")}-${dayjs(day).format("MM")}-${dayjs(day).format("DD")}`;
  };

  const filterByDate = () => {
    axios
      .get(
        `http://localhost:3000/api/request/dateRequest/${convertToDate(
          dateI
        )}/${convertToDate(dateF)}`
      )
      .then((res) => {
        setRows(res.data);
      }).catch((error) => {
        console.log(error)
      });
    handleCloseModal();
  };

  const handleClickSearch = () => {
    console.log(search);
    sessionStorage.setItem("ParameterSearch", search);

    if (search === "" || search === null) {
      axios.get(`http://localhost:3000/api/request/mainData`).then((res) => {
        setRows(res.data);
      }).catch((error) => {
        console.log(error)
      });
    } else {
      axios
        .get(`http://localhost:3000/api/request/specificRequest/${search}`)
        .then((res) => {
          setRows(res.data);
        }).catch((error) => {
          console.log(error)
        });
    }
  };

  const handleDownload = () => {
    console.log("Informacion para descargar", selected);
  }

  return (
    <div>
      <Header />
      <div className="wrapper-content">
        <Title title="Exoneración de bienes inmuebles" />
        <div className="Navbar">
          <IconButton
            onClick={handleClick}
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
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
          <IconButton onClick={handleDownload} aria-label="Example">
            <SimCardDownloadIcon sx={{ color: "#ffffff" }} />
            <h6 className="filter navbar-text">Descargar Solicitudes</h6>
          </IconButton>
        </div>
        <MainTable data={infoRows} selected = {selected} setSelected={setSelected}/>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            role: "listbox",
          }}
        >
          {options.map((option, index) => (
            <MenuItem
              key={option}
              selected={index === filterValue}
              onClick={(event) => handleChangeValue(event, index)}
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
                <h4>Desde</h4>
                <DesktopDatePicker
                  inputFormat="YYYY-MM-DD"
                  value={dateI}
                  onChange={handleChangeDateI}
                  renderInput={(params) => <TextField {...params} />}
                />
                <h4>Hasta</h4>
                <DesktopDatePicker
                  inputFormat="YYYY-MM-DD"
                  value={dateF}
                  onChange={handleChangeDateF}
                  renderInput={(params) => <TextField {...params} />}
                />
              </p>
              <div>
                <Button onClick={handleCloseModal}>Cerrar</Button>
                <Button onClick={filterByDate}>Filtrar</Button>
              </div>
            </Box>
          </Modal>
        </LocalizationProvider>
      </div>
    </div>
  );
}
