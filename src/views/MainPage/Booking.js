import React, { useState, useEffect } from 'react';

import { makeStyles } from "@material-ui/core/styles";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
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

import { postRoomBooking } from './ExternalHandler.js';

const useStyles = makeStyles(styles);

//transition for modal
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function Booking(props) {
  const classes = useStyles();
  const [modal, setModal] = React.useState(false);
  const [modalText, setModalText] = React.useState("Please wait...");

  const [start, setStart] = useState(-1);
  const [end, setEnd] = useState(-1);
  
  const [starts, setStarts] = useState([]);
  const [ends, setEnds] = useState([]);
  function childSetStart(str){ setStart(parseInt(str)/100);}
  function childSetEnd(str){ setEnd(parseInt(str)/100);}

  
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [warning, setWarning] = useState("");
  //this updates possible starts
  useEffect(()=>{
    let data = props.data;
    let i;
    let tmp = []
    for(i=0;i<data.length;i++){
      if(data[i]['name']==""){
        let c = data[i]['start'];
        while(c!=data[i]['end']){
          tmp.push(intToTime(c));
          c+=1;
        }
      }
    }

    setStarts(tmp);
  }, [props]);

  // this updates possible ends
  useEffect(()=>{
    if(start>=0){
      let data = props.data;
      let i,d;
      //seeking the time frame
      for(i=0;i<data.length;i++){
        if(data[i]['name']==""){
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
  }, [start])

  //check validity and submit
  function submitForm(){
    if(start==-1 || end==-1){
      setWarning("Please select start and end time.")
      return;
    }
    if(name=="" || contact==""){
      setWarning("Please fill in both name and contact.")
      return;
    }

    let data = {
      room_name: props.name,
      name: name,
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
  return (
    <div className={classes.section}>
      <div className={classes.container}>
        <div className={classes.title}>
          <h3>Book room {props.name} for {props.date}</h3>
        </div>
        <GridContainer style={{margin: 30}}>
          <GridItem xs={12} sm={12} md={6}>
            <CustomDropdown options={starts} name={"Start time"} setChoice={childSetStart}/>
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
            <CustomDropdown options={ends} name={"End time"} setChoice={childSetEnd}/>
          </GridItem>
        </GridContainer>

        <GridContainer style={{margin: 30}}>
          <GridItem xs={12} sm={12} md={6}>
            <CustomInput
              labelText="Name"
              id="float"
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                onChange: (e) => setName(e.target.value)  
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
          <Button onClick={() => setModal(false)}>Close</Button>
        </DialogActions>
      </Dialog>
      </div>
    </div>
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