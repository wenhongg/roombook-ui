import React from "react";
// react plugin for creating date-time-picker
import Datetime from "react-datetime";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Slide from "@material-ui/core/Slide";
import IconButton from "@material-ui/core/IconButton";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Tooltip from "@material-ui/core/Tooltip";
import Popover from "@material-ui/core/Popover";
// @material-ui/icons
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import Close from "@material-ui/icons/Close";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";

import styles from "assets/jss/material-kit-react/views/componentsSections/javascriptStyles.js";

import moment from 'moment';
const useStyles = makeStyles(styles);

export default function Calendar(props) {
  const classes = useStyles();

  let yesterday = Datetime.moment().subtract( 1, 'day' );
  let valid = function(current){
    return current.isAfter(yesterday);
  };

  function changeDate(date){
    if(typeof(date)!="string"){
      let c = date.format('DD-MM-YYYY');
      props.setDate(c);
    } else {
      console.log(date);
    }
  }
  return (
    <div className={classes.section}>
      <div className={classes.container}>
        <GridContainer>
          <GridItem xs={12} sm={12} md={6}>
            <h3>Select a date to view.</h3>
            <FormControl fullWidth>
              <Datetime
                dateFormat="DD-MM-YYYY" 
                timeFormat={false}
                isValidDate={valid}
                input={false}
                inputProps={{ placeholder: "Pick another date"}}
                onChange = {(e) => changeDate(e)}
                open={true}
              />
            </FormControl>
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}
