import React from "react";
// react plugin for creating date-time-picker
import Datetime from "react-datetime";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Slide from "@material-ui/core/Slide";
import IconButton from "@material-ui/core/IconButton";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Tooltip from "@material-ui/core/Tooltip";
import Popover from "@material-ui/core/Popover";
// @material-ui/icons
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import Close from "@material-ui/icons/Close";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";

import styles from "assets/jss/material-kit-react/views/componentsSections/javascriptStyles.js";
const useStyles = makeStyles(styles);

export default function Timetable(props) {
  const classes = useStyles();

  let i;
  let entries = [];
  let info = props.data;
  if(info!=null){
    for(i=0;i<info.length;i++){
      entries.push(<TimeEntry id={i} data={info[i]} />);
      entries.push(<hr style={{color: '#000000',backgroundColor: '#000000',height: .5}} />);
    }
  } else {
    entries.push(<GridItem xs={12} sm={12}><h3>No bookings have been made for this day.</h3></GridItem>);
  }
  return (
    <div className={classes.section}>
      <div className={classes.container}>
      <div className={classes.space50} />
        <div className={classes.title}>
          <h2>Room {props.name} Booking Record for {props.date}</h2>
        </div>
        <GridContainer>
          <GridItem xs={12} sm={3}><h4><b>Time</b></h4></GridItem>
          <GridItem xs={12} sm={3}><h4><b>Duration</b></h4></GridItem>
          <GridItem xs={12} sm={3}><h4><b>Booked by</b></h4></GridItem>
          <GridItem xs={12} sm={3}><h4><b>Contact</b></h4></GridItem>
        </GridContainer>
        <hr style={{color: '#000000',backgroundColor: '#000000',height: .5}} />
        {entries}
      </div>
    </div>
  );
}

function TimeEntry(props){
  let name = props.data['name']
  if(props.data['name']==""){
    name = (<b>AVAILABLE</b>);
  }
  return (
    <GridContainer>
      <GridItem xs={12} sm={3}>
        {intToTime(props.data['start'])} to {intToTime(props.data['end'])}
      </GridItem>
      <GridItem xs={12} sm={3}>{props.data['duration']} hours</GridItem>
      <GridItem xs={12} sm={3}>{name}</GridItem>
      <GridItem xs={12} sm={3}>{props.data['contact']}</GridItem>
    </GridContainer>
  );
}

function intToTime(num){
  let c = num%24;
  let str ="";
  if(c<10){
    str += "0"
  }
  str += c.toString();
  str += "00";
  return str;
}