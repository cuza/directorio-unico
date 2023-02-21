import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import { width } from "@mui/system";
import { Typography } from "@mui/material";
const style = {
  width: "100%",
  maxWidth: width,
  bgcolor: "background.paper",
};

export default function ListDividers(props) {
  return (
    <List sx={style} component="nav" aria-label="mailbox folders">
      
      <Typography variant="h6" fontWeight="medium" alignText="center" >Referencias</Typography>
    
      <ListItem>{props.referencia}</ListItem>
    
      <ListItem>{props.similitud}</ListItem>
    
      <ListItem>{props.situacion}</ListItem>
      <Divider/>
    </List>
  );
}
