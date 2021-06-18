import React from "react";
import { NavBar } from "./navBarMaterial";

import { makeStyles } from "@material-ui/core/styles";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
}));

export const Container = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <NavBar />
      <div className={classes.content}>
        <div className={classes.toolbar}></div>
      </div>
    </div>
  );
};
