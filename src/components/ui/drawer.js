import React from "react";

import { makeStyles} from "@material-ui/core/styles";
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import {Lists} from './Lists';


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
      drawer: {
        width: drawerWidth,
        flexShrink: 0,
      },
      drawerPaper: {
        width: drawerWidth,
      },
      toolbar: theme.mixins.toolbar,
  }));

export const DrawerNav = () => {

    const classes = useStyles();

    return(
        <Drawer 
            className={classes.drawer} 
            variant="permanent" 
            classes={{paper: classes.drawerPaper}}
            anchor="left"
        >
            <div className={classes.toolbar}>

            </div>
            <Divider/>
            <Lists/>
        </Drawer>
    );
};