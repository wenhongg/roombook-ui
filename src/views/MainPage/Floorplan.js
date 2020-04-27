import React, {useState ,useRef, useEffect} from "react";

import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-kit-react/views/componentsSections/typographyStyle.js";
const useStyles = makeStyles(styles);

//hard coded floorplan .. can explore possibility of shifting to server side?
export default function Floorplan(props){
	const classes = useStyles();
  	const [areas, setAreas] = useState([]);

  	//ensure map remains correct
  	function handleResize(){
		let newAreas = [];
		if(document.getElementById('floorimg')==null)
			return;
		let width = document.getElementById('floorimg').clientWidth;
	
		let i;
		for(i=0;i<coords.length;i++){

			let name = coords[i]['name'];
			let cset = coords[i]['coords'];

			let cdata = []
			let j;
			for(j=0;j<4;j++){
				cdata.push(Math.floor((cset[j]*width)/1000).toString());
			}
			cdata = cdata.join(",");
			newAreas.push(<area shape="rect" coords={cdata} alt={name} href={"/cal/" + name} />);
		}
		setAreas(newAreas);
	}

	//initial sizing
	useEffect(()=> {
  		handleResize();
	}, []);

	//listen for resize and handle accordingly
  	useEffect(() => {
    	window.addEventListener('resize', handleResize);
  	});

	return(
		<div className={classes.section}>
        	<div className={classes.container} >
          		<div className={classes.space50} />
          		<div id="images">
            		<div className={classes.title} >
              		<h2>Map of rooms:</h2>
              		<h3><i>Choose a room</i></h3>
            	</div>

            <img id="floorimg" style={{ width: '100%', position: 'relative'}} src={require('assets/img/layout_text.jpg')} alt="Workplace" usemap="#floormap" />
			<map name="floormap">
				{areas}
			</map>
          </div>
        </div>
      </div>
	);
}

const coords = [
{
	name: "M03",
	coords: [1,1,368,260]
},
{
	name: "S03",
	coords: [360,1,568,187]
},
{
	name: "L01",
	coords: [574,1,991,367]
},
{
	name: "M02",
	coords: [666,368,999,669]
},
{
	name: "M01",
	coords: [667,676,999,999]
},
{
	name: "S01",
	coords: [209,784,435,999]
},
{
	name: "S02",
	coords: [434,787,665,999]
}
]