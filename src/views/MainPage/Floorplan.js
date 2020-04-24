import React, {useState} from "react";

import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-kit-react/views/componentsSections/typographyStyle.js";
const useStyles = makeStyles(styles);

//hard coded floorplan .. can explore possibility of shifting to server side?
export default function Floorplan(props){
	const classes = useStyles();
	return(
		<div className={classes.section}>
        	<div className={classes.container}>
          		<div className={classes.space50} />
          		<div id="images">
            		<div className={classes.title} >
              		<h2>Map of rooms:</h2>
              		<h3><i>Choose a room</i></h3>
            	</div>

            <img src={require('assets/img/layout_text.jpg')} alt="Workplace" usemap="#floormap"/>
			<map name="floormap">
  				<area shape="rect" coords="1,1,368,260" alt="M03" href="/cal/M03" />
  				<area shape="rect" coords="360,1,568,187" alt="S03" href="/cal/S03" />
  				<area shape="rect" coords="574,1,991,367" alt="L01" href="/cal/L01" />
  				<area shape="rect" coords="666,368,999,669" alt="M02" href="/cal/M02" />
  				<area shape="rect" coords="667,676,999,999" alt="M01" href="/cal/M01" />
  				<area shape="rect" coords="209,784,435,999" alt="S01" href="/cal/S01" />
  				<area shape="rect" coords="434,787,665,999" alt="S02" href="/cal/S02" />
			</map>
          </div>
        </div>
      </div>
	);
}
const data = [];