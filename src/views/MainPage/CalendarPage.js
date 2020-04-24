import React, { useState, useEffect } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
import { makeStyles } from "@material-ui/core/styles";
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";

import styles from "assets/jss/material-kit-react/views/components.js";

//related
import Calendar from './Calendar.js';
import Timetable from './Timetable.js';
import Booking from './Booking.js';
import { getSingleRoomData } from './ExternalHandler.js';


const useStyles = makeStyles(styles);

//props.name , props.date

//calendar page will hold the information.
export default function CalendarPage(props) {
  const classes = useStyles();
  const [roomName, setRoomName] = useState(props.location.state.roomName);
  const [date, setDate] = useState(props.location.state.date);

  const [data, setData] = useState({});

  //get date today if no date was specified 
  if(date==""){
    let today = new Date();
    var d = today.getDate();
    var m = today.getMonth()+1; //As January is 0.
    var y = today.getFullYear();

    if(d<10) d='0'+d;
    if(m<10) m='0'+m;

    let dateStr = d + "-" + m + "-" + y;
    setDate(dateStr);
  }

  
  //updates room data only upon change in date, name
  useEffect(() => {
    getSingleRoomData(roomName,date).then(info => setData(info));
    window.scrollTo(0, 0);
  }, [roomName, date]);

  return (
    <div>
      <Header
        brand="Room Booking App"
        fixed
        color="info"
      />
      
      <div className={classNames(classes.main)} style={{ paddingBottom: 500}}>
        <Timetable roomName={roomName} date={date} data={data}/>

        

      <div className={classes.container}>
        <h3>Select a date to view.</h3>
        <GridContainer>
          <GridItem xs={12} sm={12} md={6}>
        <Calendar input={false} open={true} date={date} setDate={setDate}/>
        </GridItem>
          <GridItem xs={12} sm={12} md={6}>
          </GridItem>
        </GridContainer>
      </div>
        <Booking roomName={roomName} date={date} data={data}/>
      </div>
      <Footer />
    </div>
  );
}
