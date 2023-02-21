import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import '../../stylesheets/Modal.css';

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


export default function BasicModal(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className='modal'>
      <Button onClick={handleOpen}>Detalles</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box style={{borderRadius:'8px',borderColor:'black'}} sx={style}>
        <Typography variant="h6" fontWeight="medium" id="modal-modal-description" >
            {props.identidad}
          </Typography>
          <Typography variant="h6" fontWeight="medium" id="modal-modal-description" >
            {props.nombre}
          </Typography>
          <Typography variant="h6" fontWeight="medium" id="modal-modal-description" >
            {props.apellidos}
          </Typography>
          <Typography variant="h6" fontWeight="medium" id="modal-modal-description" >
            {props.situacion}
          </Typography>
          <Typography variant="h6" fontWeight="medium" id="modal-modal-description" >
            {props.direccion}
          </Typography>
          <Typography variant="h6" fontWeight="medium" id="modal-modal-description" >
            {props.fecha_nacimiento}
          </Typography>
          <Typography variant="h6" fontWeight="medium" id="modal-modal-description" >
            {props.pais}
          </Typography>
          <Typography variant="h6" fontWeight="medium" id="modal-modal-description" >
            {props.estado}
          </Typography>
          <Typography variant="h6" fontWeight="medium" id="modal-modal-description" >
            {props.provincia}
          </Typography>
          <Typography variant="h6" fontWeight="medium" id="modal-modal-description" >
            {props.municipio}
          </Typography>
          <Typography variant="h6" fontWeight="medium" id="modal-modal-description" >
            {props.situacion_academica}
          </Typography>
          <Typography variant="h6" fontWeight="medium" id="modal-modal-description" >
            {props.grupo}
          </Typography>
          <Typography variant="h6" fontWeight="medium" id="modal-modal-description" >
            {props.regimen_estudio}
          </Typography>
          <Typography variant="h6" fontWeight="medium" id="modal-modal-description" >
            {props.sexo}
          </Typography>
          <Typography variant="h6" fontWeight="medium" id="modal-modal-description" >
            {props.tipo_estudiante}
          </Typography>
          <Typography variant="h6" fontWeight="medium" id="modal-modal-description" >
            {props.anno_estudio}
          </Typography>
          <Typography variant="h6" fontWeight="medium" id="modal-modal-description" >
            {props.edad}
          </Typography>
          <Typography variant="h6" fontWeight="medium" id="modal-modal-description" >
            {props.referencia}
          </Typography>
          <Typography variant="h6" fontWeight="medium" id="modal-modal-description" >
            {props.cantidad}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}