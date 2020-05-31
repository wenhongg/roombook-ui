import React, { useState, useEffect } from 'react';

import { makeStyles } from "@material-ui/core/styles";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import styles from "assets/jss/material-kit-react/views/componentsSections/javascriptStyles.js";

import { quickPing } from '../shared/ExternalHandler.js';

const useStyles = makeStyles(styles);

//Displays a modal which disappears once server is awake
export default function ServerWake(props) {

  const classes = useStyles();
  const [modal, setModal] = useState(true);
  const [modalText, setModalText] = useState("Please wait a moment while we wake the server up.");

  useEffect(()=>{
    quickPing()
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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});