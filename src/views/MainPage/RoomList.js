import {Redirect} from "react-router-dom";
import React, {useState, useEffect} from "react";// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Small from "components/Typography/Small.js";
import Danger from "components/Typography/Danger.js";
import Warning from "components/Typography/Warning.js";
import Success from "components/Typography/Success.js";
import Info from "components/Typography/Info.js";
import Primary from "components/Typography/Primary.js";
import Muted from "components/Typography/Muted.js";
import Quote from "components/Typography/Quote.js";

import image from "assets/img/faces/avatar.jpg";

import styles from "assets/jss/material-kit-react/views/componentsSections/typographyStyle.js";

import {getAllRoomData} from "./ExternalHandler.js";


const useStyles = makeStyles(styles);

export default function RoomList() {
  const classes = useStyles();
  //hold room data
  const [data, setData] = useState({});
  useEffect(() => {
    getAllRoomData().then(data => setData(data));
  }, []);

  let i;
  let entries = [];

  for(i=0;i<data.length;i++){
    entries.push(<RoomEntry id={data[i]['name']} data={data[i]} />);
    entries.push(<hr style={{color: '#000000',backgroundColor: '#000000',height: .5}} />);
  }



  return (
      <div className={classes.section}>
        <div className={classes.container}>
          <div className={classes.space50} />
          <div id="images">
            <div className={classes.title} >
              <h2>Room list:</h2>
              <h3><i>Click to view room calendar.</i></h3>
            </div>
            {entries}
          </div>
        </div>
      </div>
  );
}

//props to supply: id and individual data
function RoomEntry(props){
  let b = [];
  let text = [];
  if(!props.data['booked']){
    text.push(<h3>Available</h3>);
  } else {
    text.push(<h3>Room in use</h3>);
  }
  const [redirect, setRedirect] = useState(false);

  if(redirect){
    return(<Redirect to={{ pathname: '/cal', state:{name: props.data.name, date: ""}}} />);
  };

  return (
    <GridContainer style={{margin: '50px 0px 50px 0px', cursor: 'pointer'}} onClick={(e) => setRedirect(true)}>
      <GridItem xs={12} sm={3}>
        <h3><b>{props.data['name']}</b></h3>
      </GridItem>
      <GridItem xs={12} sm={6}>{text}</GridItem>
      <GridItem xs={12} sm={3}>{b}</GridItem>
    </GridContainer>
  );
}