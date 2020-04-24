import React, {useState, useEffect} from 'react';
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';

import styles from "assets/jss/material-kit-react/views/componentsSections/javascriptStyles.js";
const useStyles = makeStyles(styles);


//props.setChoice , props.options
export default function CustomDropdown(props) {
  const classes = useStyles();
  const [value, setValue] = useState('');
  const [open, setOpen] = useState(false);

  const [options, setOptions] = useState(props.options);

  const [optionsFrags, setOptionsFrags] = useState([]);
  const [enabled, setEnabled] = useState(options!=null && options.length>0);
  let c = [];

  useEffect(() => {
    let info = props.options;
    if(info!=null && info.length>0){
      let i;
      for(i=0;i<info.length;i++){
        c.push(<MenuItem id={info[i]} value={info[i]}>{info[i]}</MenuItem>);
      }
      setEnabled(true);
      setOptionsFrags(c);
    } else {
      setEnabled(false);
      setOptionsFrags([]);
    }
    
  }, [props.options]);

  const handleChange = (event) => {
    setValue(event.target.value);
    props.setChoice(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  return (
    <FormControl disabled={!enabled} fullWidth>
      <InputLabel>{props.name}</InputLabel>
      <Select
        open={open}
        onClose={handleClose}
        onOpen={handleOpen}
        value={value}
        onChange={handleChange}
      >
      {optionsFrags}
      </Select>
    </FormControl>
  );
}

//
// style={{minWidth: 120}}