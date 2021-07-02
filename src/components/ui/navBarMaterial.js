import React, { useContext } from "react";
import { useHistory } from "react-router";
import { AuthContext } from "../../auth/AuthContext";
import { types } from "../../types/types";

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

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
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: theme.palette.primary.light,
  },
}));

export const NavBar = () => {
  const { dispatch } = useContext(AuthContext);
  const history = useHistory();

  const classes = useStyles();

  const handleLogout = () => {
    dispatch({
      type: types.logout,
    });
    history.replace("/login");
  };

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography className={classes.title} variant="h6">
            Panel de Control
          </Typography>
          <IconButton onClick={() => handleLogout()}>
            <ExitToAppIcon style={{ color: "#fff", fontSize: 40 }} />
          </IconButton>
        </Toolbar>
      </AppBar>
      <div className={classes.offset}></div>
    </div>
  );
};
