import React, { useState, useEffect } from 'react';

import {Redirect} from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Button from "components/CustomButtons/Button.js";
import Slide from "@material-ui/core/Slide";
import IconButton from "@material-ui/core/IconButton";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import styles from "assets/jss/material-kit-react/views/componentsSections/javascriptStyles.js";

import Close from "@material-ui/icons/Close";
import CustomInput from "components/CustomInput/CustomInput.js";
import CustomDropdown from './CustomDropdown.js';

import { postRoomBooking, intToTime } from './ExternalHandler.js';

const useStyles = makeStyles(styles);

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

/*
  The only booking endpoint for the app.
  REQUIRED: date , roomName
  EITHER data OR start and end 
*/
export default function Booking(props) {
  //provide a callback to rerender calendar page upon successful book
  var toggleCallBack = Function();
  if(props.callback!=null){
    toggleCallBack = props.callback;
  }

  const classes = useStyles();
  const [start, setStart] = useState(-1);
  const [end, setEnd] = useState(-1);

  //deal with possible values
  const [hide, setHide] = useState(false);  
  const [starts, setStarts] = useState([]);
  const [ends, setEnds] = useState([]);
  function childSetStart(str){ setStart(parseInt(str)/100);}
  function childSetEnd(str){ setEnd(parseInt(str)/100);}

  //Get final details from user
  const [booker, setBooker] = useState("");
  const [contact, setContact] = useState("");
  const [warning, setWarning] = useState("");

  //Renders modal 
  const [modal, setModal] = useState(false);
  const [modalText, setModalText] = useState("Please wait...");
  const [redirect, setRedirect] = useState(false);

  //if props contain interval i.e. from express booking
  useEffect(()=>{
    if(props.start!=null && props.end!=null){
      setStart(props.start)
      setEnd(props.end)
      setHide(true)
    } else {
      //identify possible starts
      let data = props.data;
      let i;
      let tmp = []
      for(i=0;i<data.length;i++){
        if(data[i]['booker']==""){
          let c = data[i]['start'];
          while(c!=data[i]['end']){
            tmp.push(intToTime(c));
            c+=1;
          }
        }
      }
      setStarts(tmp);
    }
  }, [props]);


  // this updates possible ends
  useEffect(()=>{
    if(start>=0 && props.end==null){
      let data = props.data;
      let i,d;
      //seeking the time frame
      for(i=0;i<data.length;i++){
        if(data[i]['booker']==""){
          if(data[i]['start']<=start && data[i]['end']>start){
            d = data[i]['end'];
          }
        }
      }
      //getting possible end times
      let tmp = []
      i =start+1;
      while(i<=d){
        tmp.push(intToTime(i));
        i+=1;
      }
      setEnds(tmp);
    } else {
      setEnds([]);
    }
  }, [start, props])

  //check validity of input and submit
  function submitForm(){
    if(start==-1 || end==-1){
      setWarning("Please select start and end time.")
      return;
    }
    if(booker=="" || contact==""){
      setWarning("Please fill in both name and contact.")
      return;
    }

    let data = {
      roomName: props.roomName,
      booker: booker,
      contact: contact,
      start: start,
      end: end,
      duration: end-start,
      date: props.date
    }
    setModal(true);

    postRoomBooking(data)
    .then(text => setModalText(text));
  }

  function closeModal(){
    setModal(false);
    //redirect to same component seems to cause issue.
    if(hide){
      setRedirect(true);  
    } else {
      toggleCallBack();
    }
  }

  //redirect to view completed booking once successful.
  if(redirect){
    return(<Redirect to={{ pathname: '/cal/'+props.roomName , state:{date: props.date}}} />);
  };

  return (
    <div className={classes.container}>
      <div className={classes.title}>
        <h3>Book room {props.roomName} for {props.date}</h3>
      </div>
      <GridContainer style={{margin: 30}}>
        <GridItem hidden={hide} xs={12} sm={12} md={6}>
          <CustomDropdown options={starts} name={"Start time"} setChoice={childSetStart}/>
        </GridItem>
        <GridItem hidden={hide} xs={12} sm={12} md={6}>
          <CustomDropdown options={ends} name={"End time"} setChoice={childSetEnd}/>
        </GridItem>
      </GridContainer>

      <GridContainer style={{margin: 30}}>
        <GridItem xs={12} sm={12} md={6}>
          <CustomInput
            labelText="Name"
            id="float"
            formControlProps={{
              fullWidth: true,
            }}
            inputProps={{
              onChange: (e) => setBooker(e.target.value)  
            }}              
          />
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
          <CustomInput
            labelText="Contact"
            id="float"
            formControlProps={{
              fullWidth: true
            }}
            inputProps={{
              onChange: (e) => setContact(e.target.value)  
            }}
          />
        </GridItem>
        <GridItem xs={12} sm={12} md={12}>
          <Button color="primary" size="lg" onClick={submitForm}>Confirm</Button>
          <div style={{color:'red'}}>{warning}</div>
        </GridItem>
      </GridContainer>


      <Dialog fullWidth
        classes={{
          root: classes.center,
          paper: classes.modal
        }}
        open={modal}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setModal(false)}
        aria-labelledby="modal-slide-title"
        aria-describedby="modal-slide-description"
      >
        <DialogTitle
          id="classic-modal-slide-title"
          disableTypography
          className={classes.modalHeader}
        >
        <IconButton
          className={classes.modalCloseButton}
          key="close"
          aria-label="Close"
          color="inherit"
          onClick={() => setModal(false)}
        ><Close className={classes.modalClose} /></IconButton>
        <h4 className={classes.modalTitle}><b>Thanks for booking.</b></h4>
      </DialogTitle>
      <DialogContent
        id="modal-slide-description"
        className={classes.modalBody}
      ><h5>{modalText}</h5>
      </DialogContent>
      <DialogActions className={classes.modalFooter + " " + classes.modalFooterCenter}>
        <Button onClick={closeModal}>Close</Button>
      </DialogActions>
    </Dialog>
    </div>
  );
}

