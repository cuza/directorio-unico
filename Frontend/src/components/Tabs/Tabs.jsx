import * as React from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import AccordionArbol from "../Accordion/AccordionArbol";
import { Card } from "@mui/material";

export default function CenteredTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Card sx={{ height: "100%" }}>
   
      <Tabs  value={value} onChange={handleChange} centered>
        <Tab   label="Facultades" />
        <Tab   label="Sedes municipales" />
      </Tabs>
      {value === 0 && <AccordionArbol url={ 'coincidences/coincidences_facultad' } />}
      {value === 1 && <AccordionArbol url={ 'coincidences/coincidences_sede' } />}
   
    </Card>
  );
}
