import React, {useState, useEffect} from "react";// @material-ui/core components
import {Redirect} from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import styles from "assets/jss/material-kit-react/views/componentsSections/typographyStyle.js";

//related imports
import Booking from './Booking.js';

import {getOverview, getSearchResults, intToTime } from "./ExternalHandler.js";


const useStyles = makeStyles(styles);

/*
  Room list component: can display list of rooms OR list of possible timeslots

  To display list of rooms: set props.full to true
  To display list of slots: set props.date and props.duration
*/
export default function RoomList(props) {
  const classes = useStyles();
  //hold room data
  const [data, setData] = useState({});
  const [titles, setTitles] = useState(["",""]);
  

  //Get data from correct API
  useEffect(() => {
    if(props.full){
      getOverview().then(data => setData(data));
      setTitles(["Full Room List:","Click to view room calendar."]);
    } else {
      getSearchResults(props.date, props.duration).then(data => setData(data));
      setTitles(["Search results:","Click to book."]);
    }
  }, [props]);


  //Render data
  let i;
  let entries = [];
  if(props.full){
    //if full list is required, push RoomEntry
    for(i=0;i<data.length;i++){
      entries.push(<RoomEntry id={data[i]['roomName']} data={data[i]} />);
      entries.push(<hr style={{color: '#000000',backgroundColor: '#000000',height: .5}} />);
    }  
  } else {
    //if search result is required, push RoomTimeEntry
    for(i=0;i<data.length;i++){
      entries.push(<RoomTimeEntry id={i} data={data[i]} date={props.date} />);
      entries.push(<hr style={{color: '#000000',backgroundColor: '#000000',height: .5}} />);
    }  
  }

  return (
      <div className={classes.section}>
        <div className={classes.container}>
          <div className={classes.space50} />
            <div className={classes.title} >
              <h2>{titles[0]}</h2>
              <h3><i>{titles[1]}</i></h3>
            </div>
            {entries}
        </div>
      </div>
  );
}


// Timeslot entry
// props.data has room_name, start, end
function RoomTimeEntry(props){
  //activates booking slip if clicked
  const [book, setBook] = useState([]);

  //Read in props 
  let roomName = props.data['roomName'];
  let start = props.data['start'];
  let end = props.data['end'];

  //if any change to props
  useEffect(() => {
    setBook([]);
  }, [props]);

  function clicked(){
    setBook(<Booking roomName={roomName} date={props.date} start={start} end={end}/>);
  }
  return (
    <GridContainer style={{margin: '50px 0px 50px 0px', cursor: 'pointer'}} onClick={clicked}>
      <GridItem xs={12} sm={3}>
        <h3><b>{roomName}</b></h3>
      </GridItem>
      <GridItem xs={4} sm={3}><h3><b>{intToTime(start)}</b></h3></GridItem>
      <GridItem xs={4} sm={3}><h3>to</h3></GridItem>
      <GridItem xs={4} sm={3}><h3><b>{intToTime(end)}</b></h3></GridItem>
      {book}
    </GridContainer>
  );
}

// for full list: 
// props.data has name, booked(bool), end
function RoomEntry(props){
  const [redirect, setRedirect] = useState(false);

  let pathname = '/cal/' +props.data['roomName']
  let b = [];
  let text = [];
  if(!props.data['booked']){
    text.push(<h3>Available Now</h3>);
  } else {
    text.push(<h3>Room in use</h3>);
  }

  if(redirect){
    return(<Redirect to={{ pathname: pathname, state:{roomName: props.data['roomName'], date: ""}}} />);
  };

  return (
    <GridContainer style={{margin: '50px 0px 50px 0px', cursor: 'pointer'}} onClick={(e) => setRedirect(true)}>
      <GridItem xs={12} sm={3}>
        <h3><b>{props.data['roomName']}</b></h3>
      </GridItem>
      <GridItem xs={12} sm={6}>{text}</GridItem>
      <GridItem xs={12} sm={3}>{b}</GridItem>
    </GridContainer>
  );
}