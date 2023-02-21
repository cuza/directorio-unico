import React, { useState, useEffect } from "react";
import Accordion from "./Accordion";
import CircularProgress from "../CircularProgress/CircularProgress";
import Badge from "../Badge/Badge";
import ListDividers from "../ListDividers/ListDividers";
import Modal from "../Modal/Modal";


function AccordionArbol(props) {
  const [data, setData] = useState([]);

  const url = props.url;

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(url);
      const datos = await response.json();
      setData(datos);
    }
    fetchData();
  }, [url]);

  return (
    <div>
      {data.length >= 1 ? (
        data.map((item) => (
          <div key={item._id}>
            <Accordion
              name={item.name_facultad}
              badge={
                <Badge
                  danger={item.num_danger}
                  warning={item.num_warn}
                  info={item.num_info}
                  safe={item.num_safe}
                />
              }
              content={item.carrera.map((item2) =>
                item2.num_danger !== 0 ||
                item2.num_warn !== 0 ||
                item2.num_info !== 0 ||
                item2.num_safe ? (
                  <div key={item2._id}>
                    <Accordion
                      name={item2.name_carrera}
                      badge={
                        <Badge
                          danger={item2.num_danger}
                          warning={item2.num_warn}
                          info={item2.num_info}
                          safe={item2.num_safe}
                        />
                      }
                      content={item2.modalidad.map((item3) =>
                        item3.num_danger !== 0 ||
                        item3.num_warn !== 0 ||
                        item3.num_info !== 0 ||
                        item3.num_safe ? (
                          <div key={item3._id}>
                            <Accordion
                              name={item3.name_modalidad}
                              badge={
                                <Badge
                                  danger={item3.num_danger}
                                  warning={item3.num_warn}
                                  info={item3.num_info}
                                  safe={item3.num_safe}
                                />
                              }
                              content={item3.casos.map((item4) =>
                                item4.situacion !== "Safe" ? (
                                  <div key={item4._id}>
                                    <Accordion
                                      name={`${item4.nombre} ${item4.apellidos}`}
                                      modal={
                                        <Modal 
                                          identidad={`CI: ${item4.identidad}`}
                                          nombre={`Nombre: ${item4.nombre}`}
                                          apellidos={`Apellidos: ${item4.apellidos}`}
                                          situacion={`Situación: ${item4.situacion}`}
                                          direccion={`Dirección: ${item4.direccion}`}
                                          fecha_nacimiento={`Fecha de nacimiento: ${item4.fecha_de_nacimiento}`}
                                          pais={`Pais: ${item4.pais}`}
                                          estado={`Estado: ${item4.estado}`}
                                          provincia={`Provincia: ${item4.provincia}`}
                                          municipio={`Municipio: ${item4.municipio}`}
                                          situacion_academica={`Situación académica: ${item4.situacion_academica}`}
                                          grupo={`Grupo: ${item4.grupo}`}
                                          regimen_estudio={`Régimen de estudio: ${item4.regimen_de_estudio}`}
                                          sexo={`Sexo: ${item4.sexo}`}
                                          tipo_estudiante={`Tipo de estudiante: ${item4.tipo_de_estudiante}`}
                                          anno_estudio={`Año de estudio: ${item4.ano_de_estudio}`}
                                          edad={`Edad: ${item4.edad}`}
                                          referencia={`Referencia: ${item4.referencia}`}
                                          cantidad={`Cantidad: ${item4.cantidad}`}
                                        />
                                      }
                                      content={item4.coincidencias.map(
                                        (item5) => (
                                          <div key={item5._id}>
                                            <ListDividers 
                                            referencia={`Referencia: ${item5.referencia}`}
                                            similitud={`Similitud: ${item5.similitud}`}
                                            situacion={`Situación: ${item5.situacion}`}
                                            />
                                          </div>
                                        )
                                      )}
                                    />
                                  </div>
                                ) : (
                                  ""
                                )
                              )}
                            />
                          </div>
                        ) : (
                          ""
                        )
                      )}
                    />
                  </div>
                ) : (
                  ""
                )
              )}
            />
          </div>
        ))
      ) : (
        <CircularProgress />
      )}
    </div>
  );
}

export default AccordionArbol;
