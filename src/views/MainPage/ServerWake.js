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

import { getOverview } from './ExternalHandler.js';

const useStyles = makeStyles(styles);

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});


export default function ServerWake(props) {

  const classes = useStyles();
  const [modal, setModal] = useState(true);
  const [modalText, setModalText] = useState("Please wait a moment while we wake the server up.");

  useEffect(()=>{
    getOverview()
    .then(()=> { setModal(false)})
    .catch(()=> { setModalText("Something went wrong. Please refresh.")});
  },[]);

  return (
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
    </DialogTitle>
    <DialogContent
      id="modal-slide-description"
      className={classes.modalBody}
    ><h5>{modalText}</h5>
    </DialogContent>
    </Dialog>
  );
}

