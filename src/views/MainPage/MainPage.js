import React, {useState} from "react";
// nodejs library that concatenates classes
import classNames from "classnames";

// material ui imports
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import styles from "assets/jss/material-kit-react/views/landingPage.js";
import Header from "components/Header/Header.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Parallax from "components/Parallax/Parallax.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";

//related
import RoomList from './RoomList.js';
import Calendar from './Calendar.js';

import Floorplan from './Floorplan.js';
import ServerWake from './ServerWake.js';

const useStyles = makeStyles(styles);

//need to ensure duration is always a number and check that not empty
export default function MainPage(props) {
  const classes = useStyles();
  //states to store mainpage form data.
  const [duration, setDuration] = useState("");
  const [date, setDate] = useState("");
  const [warn, setWarn] = useState("");
  
  //data put into list
  const [list, setList] = useState([]);

  function submitForm(){
    if(date=="" || isNaN(duration)){
      setWarn("Please select a valid date and duration (1-24).");
      return;
    }
    let dur = Math.ceil(parseFloat(duration)); 
    if(dur<=0 || dur>24){
      setWarn("Please select a valid date and duration (1-24).");
      return;   
    }
    setList(<RoomList date={date} duration={dur}/>)
    setWarn("");
  }

  return (
    <div>
      <Header
        brand="Room Booking App"
        fixed
        color="transparent"
        changeColorOnScroll={{
          height: 400,
          color: "info"
        }}
      />
      <Parallax image={require("assets/img/bg6.jpg")} style={{height:1000}}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={6}>
              <h1 className={classes.title}>Book a room quick.</h1>
            
            <Box item display={{ xs: "none", sm:"block" ,md:"block", lg: "block" }}>
              <h3>Or scroll down to select from a list of rooms.</h3>
              <h4>Or you can:</h4>

            </Box>
              <Button
                  color="danger"
                  size="lg"
                  onClick={(e) => setList(<RoomList full />)}
                  target="_blank"
                  rel="noopener noreferrer"
                  value="full"
              >Click for full list of rooms.</Button>
            </GridItem>

            <GridItem xs={12} sm={12} md={6} style={{zIndex:10000}}>
              <Card>
                <CardHeader color="warning">
                  <h3 className={classes.title}>Express booking</h3>
                </CardHeader>
                <CardBody>
                  <Calendar setDate={setDate}/>
                    <CustomInput
                      labelText="Duration (in hours)"
                      id="duration"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "text",
                        pattern:"[0-9]*",
                        onChange: (e) => setDuration(e.target.value)
                      }}
                    />
                </CardBody>
                <CardFooter className={classes.cardFooter}>
                  <Button 
                    color="info" size="lg" 
                    value="search"
                    onClick={submitForm}
                  >Continue</Button>
                  <div style={{color:'red'}}>{warn}</div>
                </CardFooter>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)} style={{top:0}}>
        
        {list}
        <Floorplan />
        <ServerWake />
      </div>
    </div>
  );
}
