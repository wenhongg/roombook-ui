import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
import { makeStyles } from "@material-ui/core/styles";
import Header from "components/Header/Header.js";

import styles from "assets/jss/material-kit-react/views/components.js";

const useStyles = makeStyles(styles);

//Error page. Displayed upon fetch error
export default function ErrorPage(props) {
  const classes = useStyles();
  return (
    <div>
      <Header
        brand="RoomBook"
        fixed
        color="info"
      />
      <div className={classNames(classes.main)} style={{ paddingTop: 500, paddingBottom: 500}}>
        <div className={classes.container}>
          <h2>Something went wrong.</h2>

          <h3>Click top left corner to return to homepage.</h3>
        </div>
      </div>
    </div>
  );
}