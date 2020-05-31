import React from "react";
import Datetime from "react-datetime";
import FormControl from "@material-ui/core/FormControl";

/*
  Calendar widget
  - provide setDate
  - setDate -> function to set a state of parent component (as the chosen date)
  - input -> if true, allow input
  - open -> if true, always open
*/
export default function Calendar(props) {
  let yesterday = Datetime.moment().subtract( 1, 'day' );
  let valid = function(current){
    return current.isAfter(yesterday);
  };
  function changeDate(date){
    if(typeof(date)!="string"){
      let c = date.format('DD-MM-YYYY');
      props.setDate(c);
    } 
  }
  return (
    <FormControl fullWidth>
      <Datetime
        dateFormat="DD-MM-YYYY" 
        timeFormat={false}
        isValidDate={valid}
        input={props.input}
        inputProps={{ placeholder: "Pick a date"}}
        onChange = {(e) => changeDate(e)}
        open={props.open}
      />
    </FormControl>
  );
}
