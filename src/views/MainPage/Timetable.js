import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import styles from "assets/jss/material-kit-react/views/componentsSections/javascriptStyles.js";
import { intToTime } from './ExternalHandler.js';
const useStyles = makeStyles(styles);
/*
  Timetable displays treated data. Set props.data
*/
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
          <h2>Room {props.roomName} Booking Record for {props.date}</h2>
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
  let booker = props.data['booker']
  if(props.data['booker']==""){
    booker = (<b>AVAILABLE</b>);
  }
  return (
    <GridContainer>
      <GridItem xs={12} sm={3}>
        {intToTime(props.data['start'])} to {intToTime(props.data['end'])}
      </GridItem>
      <GridItem xs={12} sm={3}>{props.data['duration']} hours</GridItem>
      <GridItem xs={12} sm={3}>{booker}</GridItem>
      <GridItem xs={12} sm={3}>{props.data['contact']}</GridItem>
    </GridContainer>
  );
}