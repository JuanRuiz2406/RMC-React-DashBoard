import React from "react";
import { useHistory } from "react-router";
import logo from "../../images/LogoBlanco.png";

import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";

import PersonIcon from "@material-ui/icons/Person";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import ReportIcon from "@material-ui/icons/Report";
import Avatar from "@material-ui/core/Avatar";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 250,
    backgroundColor: theme.palette.primary.dark,
    overflow: "auto",
  },
  icon: {
    color: theme.palette.primary.main,
  },
  large: {
    width: theme.spacing(27),
    height: theme.spacing(27),
  },
  title: {
    color: theme.palette.text.hint,
  },
  listItem: {
    flexGrow: 1,
  },
}));

const user = JSON.parse(localStorage.getItem("userData"));

export const Lists = () => {
  const history = useHistory();

  const classes = useStyles();

  const handletHome = () => {
    history.replace("/");
  };

  const handletMuni = () => {
    history.replace("/municipalidades");
  };

  const handletProfile = () => {
    history.replace("/perfil");
  };

  return (
    <div className={classes.root}>
      <List componet="nav">
        <ListItem button onClick={handletHome}>
          <ListItemIcon>
            <ReportIcon className={classes.icon} />
          </ListItemIcon>
          <ListItemText className={classes.title} primary="Reportes" />
        </ListItem>
        {user.role === "RMCTeam" ? (
          <ListItem button onClick={handletMuni}>
            <ListItemIcon>
              <AccountBalanceIcon className={classes.icon} />
            </ListItemIcon>
            <ListItemText className={classes.title} primary="Municipalidades" />
          </ListItem>
        ) : (
          <ListItem button onClick={handletMuni}>
            <ListItemIcon>
              <AccountBalanceIcon className={classes.icon} />
            </ListItemIcon>
            <ListItemText
              className={classes.title}
              primary="Municipalidad"
              onClick={handletMuni}
            />
          </ListItem>
        )}
        <ListItem button>
          <ListItemIcon>
            <PersonIcon className={classes.icon} />
          </ListItemIcon>
          <ListItemText
            className={classes.title}
            primary="Perfil"
            onClick={handletProfile}
          />
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <Avatar alt="Logo" src={logo} className={classes.large} />
          </ListItemAvatar>
        </ListItem>
      </List>
    </div>
  );
};
