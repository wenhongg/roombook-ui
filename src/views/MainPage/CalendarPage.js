import React, { useState, useEffect } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// react components for routing our app without refresh
import { Link } from "react-router-dom";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Parallax from "components/Parallax/Parallax.js";
// sections for this page
import HeaderLinks from "components/Header/HeaderLinks.js";
import SectionBasics from "./Sections/SectionBasics.js";
import SectionNavbars from "./Sections/SectionNavbars.js";
import SectionTabs from "./Sections/SectionTabs.js";
import SectionPills from "./Sections/SectionPills.js";
import SectionNotifications from "./Sections/SectionNotifications.js";
import SectionTypography from "./Sections/SectionTypography.js";
import SectionJavascript from "./Sections/SectionJavascript.js";
import SectionCarousel from "./Sections/SectionCarousel.js";
import SectionCompletedExamples from "./Sections/SectionCompletedExamples.js";
import SectionLogin from "./Sections/SectionLogin.js";
import SectionExamples from "./Sections/SectionExamples.js";
import SectionDownload from "./Sections/SectionDownload.js";

import styles from "assets/jss/material-kit-react/views/components.js";

import RoomList from './RoomList.js';
import Calendar from './Calendar.js';
import Timetable from './Timetable.js';
import { getSingleRoomData } from './ExternalHandler.js';
import Booking from './Booking.js';

const useStyles = makeStyles(styles);

//props.name , props.date

//calendar page will hold the information.
export default function CalendarPage(props) {
  const classes = useStyles();
  const [name, setName] = useState(props.location.state.name);
  const [date, setDate] = useState(props.location.state.date);
  

  
  //get date today if no date was specified 
  if(date==""){
    let today = new Date();
    var d = today.getDate();
    var m = today.getMonth()+1; //As January is 0.
    var y = today.getFullYear();

    if(d<10) d='0'+d;
    if(m<10) m='0'+m;

    let dateStr = d + "-" + m + "-" + y;
    console.log(dateStr);
    setDate(dateStr);
  }

  const [data, setData] = useState({});

  //updates room data only upon change in date, name
  useEffect(() => {
    getSingleRoomData(name,date).then(info => setData(info));
  }, [name, date]);
  

  return (
    <div>
      <Header
        brand="Room Booking App"
        fixed
        color="transparent"
        changeColorOnScroll={{
          height: 400,
          color: "white"
        }}
        rightLinks={<Link to="/main">Back to main</Link>}
      />
      <Parallax image={require("assets/img/bg4.jpg")}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem>
              <div className={classes.brand}>
                <h1 className={classes.title}>Calendar for room {name}</h1>
                <h3 className={classes.subtitle}>
                  See the room booking calendar for today.
                </h3>
              </div>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)} style={{paddingBottom: 500}}>
        <Timetable name={name} date={date} data={data}/>
        <Calendar name={name} date={date} setDate={setDate}/>
        <Booking name={name} date={date} data={data}/>
      </div>
      <Footer />
    </div>
  );
}
