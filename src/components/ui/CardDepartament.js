import React from "react";
import { useHistory } from "react-router";
import { deleteDepartment } from "../../services/departments";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { ConfirmDelete } from "../alerts";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import PersonIcon from "@material-ui/icons/Person";
import Chip from "@material-ui/core/Chip";
import EmailIcon from '@material-ui/icons/Email';
import PhoneIcon from '@material-ui/icons/Phone';
import DescriptionIcon from '@material-ui/icons/Description';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

const user = JSON.parse(localStorage.getItem("userData"));

export default function CardDepartament({ department }) {
  const classes = useStyles();
  const history = useHistory();

  const editDepartment = (department2) => {
    if (user.role === "RMCTeam") {
      localStorage.setItem("department", JSON.stringify(department2));
    }

    history.push("/municipalidades/departamentos/editar", {
      from: "municipalidades/departamentos",
    });
  };

  const editDepartmentAdministrator = (department2) => {
    if (user.role === "RMCTeam") {
      localStorage.setItem(
        "updateAdministrator",
        JSON.stringify(department2.manager)
      );
    }

    history.push("/municipalidades/departamentos/editarAdministrador", {
      from: "municipalidades",
    });
  };

  const deleteDepartmentSelected = async (departmentId) => {
    ConfirmDelete(
      "¿Estás seguro de eliminar este departamento?",
      "No podrás deshacer esta acción",
      deleteDepartment(departmentId)
    );
  };

  return (
    <Card className={classes.root}>

        <CardContent>
          <Typography gutterBottom variant="h3" component="h2" style={{marginLeft: 10}}>
            {department.name}
          </Typography>
          <Chip
          size="small"
            label={department.state}
            style={{
              marginLeft: 10,
              background: department.state === "Activo" ? "#4caf50" : "#FF0000",
              color:"#fff",
            }}
          />
          <List component="nav" aria-label="main mailbox folders">
        <ListItem>
          <ListItemIcon>
            <DescriptionIcon />
          </ListItemIcon>
          <ListItemText primary={department.description} />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <EmailIcon />
          </ListItemIcon>
          <ListItemText primary={department.email} />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <PhoneIcon />
          </ListItemIcon>
          <ListItemText primary={department.telephone} />
        </ListItem>
      </List>
        </CardContent>

      <CardActions>
        <Button color="primary" onClick={() => editDepartment(department)}>
          <EditIcon />
        </Button>
        <Button
          color="primary"
          onClick={() => editDepartmentAdministrator(department)}
        >
          <PersonIcon style={{ color: "#03A9F4" }} />
        </Button>
        <Button
          color="secondary"
          onClick={() => deleteDepartmentSelected(department.id)}
        >
          <DeleteIcon />
        </Button>
      </CardActions>
    </Card>
  );
}
