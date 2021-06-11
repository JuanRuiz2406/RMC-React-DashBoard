import React, { useContext } from "react";
import { useHistory } from "react-router";
import { AuthContext } from "../../auth/AuthContext";
import { types } from "../../types/types";
import { Link as RouterList } from "react-router-dom";


import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';



const user = JSON.parse(localStorage.getItem("userData"));

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    offset: theme.mixins.toolbar,
    appBar: {
        width: `calc(100% - ${250}px)`,
        marginLeft: 250,
      },
  }));

export const NavBar = () => {

    const { dispatch } = useContext(AuthContext);
    const history = useHistory();

    const classes = useStyles();

    const handleLogout = () => {
        history.replace("/login");
    
        dispatch({
          type: types.logout,
        });
      };

    return(
        <div className={classes.root}>
            <AppBar className={classes.appBar} color='primary'>
                <Toolbar>
                    <Typography className={classes.title} variant='h6'>
                        ReportsMyCity
                    </Typography>
                    <Button variant='text' color='inherit' onClick={handleLogout}>
                        Logout
                    </Button>
                </Toolbar>
            </AppBar>
            <div className={classes.offset}>

            </div>
        </div>
    );

};