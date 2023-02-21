

// @mui material components
import Card from "@mui/material/Card";
// import Icon from "@mui/material/Icon";
import MDInput from "components/MDInput";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import { React, useState, useEffect } from "react";
// import * as React from "react";
import MDTypography from "components/MDTypography";


import IconButton from "@mui/material/IconButton/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TimelineItem from "examples/Timeline/TimelineItem";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CircularProgress from "../../../../components/CircularProgress/CircularProgress"
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  
  boxShadow: 24,
  p: 4,
};

function OrdersOverview() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [data, setData] = useState([]);
  const [filto, setFiltro] = useState([]);
  const [loscinco, setLoscinco] = useState([]);

 
  async function fetchFiltro() {
    const response = await fetch(`coincidences/${filto}`);
    setData(await response.json());
    console.log(data);
  }
  async function fetchLoscinco() {
    const response = await fetch(
      `coincidences/casosSignificativos`
    );
    setLoscinco(await response.json());
    console.log(loscinco);
  }
 
  useEffect(() => {
    fetchLoscinco();
  }, []);

  const lupa = async (e) => {
    e.preventDefault();
    await fetchFiltro();
  };
  return (
    <Card sx={{ height: "100%" }}>
      <MDBox pt={3} px={3}>
        <MDTypography variant="h6" fontWeight="medium">
          Casos
        </MDTypography>
        <MDBox mt={0} mb={2}>
          <form onSubmit={lupa}>
            <MDInput
              label="Buscar ..."
              onChange={(event) => {
                setFiltro(event.target.value);
              }}
            />
            <IconButton
              type="submit"
              sx={{ p: "10px" }}
              aria-label="search"
              onClick={handleOpen}
            >
              <SearchIcon />
            </IconButton>
          </form>
        </MDBox>
      </MDBox>
      <MDBox p={2}>
        {loscinco.length >= 1
          ? loscinco.map((item) => {
              return (
                <TimelineItem
                  color="success"
                  icon="notifications"
                  title={item.nombre + " " + item.apellidos}
                  dateTime={item.identidad}
                />
              );
            })
          : <CircularProgress/>}
        
      </MDBox>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box style={{borderRadius:'8px',borderColor:'white'}} sx={style}>
          {data.length >= 1 ? (
            <>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Nombre:{" "}
                {data.length >= 1
                  ? `${data[0].nombre} ${data[0].apellidos}`
                  : "Cargando ..."}
              </Typography>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                CI:{" "}
                {data.length >= 1 ? `${data[0].identidad} ` : "Cargando ..."}
              </Typography>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Edad: {data.length >= 1 ? `${data[0].edad} ` : "Cargando ..."}
              </Typography>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Sexo: {data.length >= 1 ? `${data[0].sexo} ` : "Cargando ..."}
              </Typography>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Pais: {data.length >= 1 ? `${data[0].pais} ` : "Cargando ..."}
              </Typography>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Provincia:{" "}
                {data.length >= 1 ? `${data[0].provincia} ` : "Cargando ..."}
              </Typography>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Municipio:{" "}
                {data.length >= 1 ? `${data[0].municipio} ` : "Cargando ..."}
              </Typography>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Direccion:{" "}
                {data.length >= 1 ? `${data[0].direccion} ` : "Cargando ..."}
              </Typography>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Fecha de nacimiento:{" "}
                {data.length >= 1
                  ? `${data[0].fecha_de_nacimiento} `
                  : "Cargando ..."}
              </Typography>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Situacion academica:{" "}
                {data.length >= 1
                  ? `${data[0].situacion_academica} `
                  : "Cargando ..."}
              </Typography>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Regimen de estudio:{" "}
                {data.length >= 1
                  ? `${data[0].regimen_de_estudio} `
                  : "Cargando ..."}
              </Typography>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Tipo de estudiante:{" "}
                {data.length >= 1
                  ? `${data[0].tipo_de_estudiante} `
                  : "Cargando ..."}
              </Typography>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Ano de estudio:{" "}
                {data.length >= 1
                  ? `${data[0].ano_de_estudio} `
                  : "Cargando ..."}
              </Typography>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Referencia:{" "}
                {data.length >= 1 ? `${data[0].referencia} ` : "Cargando ..."}
              </Typography>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Situacion:{" "}
                {data.length >= 1 ? `${data[0].situacion} ` : "Cargando ..."}
              </Typography>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Estado:{" "}
                {data.length >= 1 ? `${data[0].estado} ` : "Cargando ..."}
              </Typography>
            </>
          ) : (
            "No existe ..."
          )}
        </Box>
      </Modal>
    </Card>
  );
}

export default OrdersOverview;
