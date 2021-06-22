import React, { useState } from "react";
import { useHistory } from "react-router";
import { deleteMunicipality } from "../../services/municipalities";
import {
  Typography,
  TableCell,
  TableRow,
  Menu,
  MenuItem,
  ListItemIcon,
  Chip,
} from "@material-ui/core";
import { ConfirmDelete } from "../alerts";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import EditIcon from "@material-ui/icons/Edit";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import BusinessIcon from "@material-ui/icons/Business";
import DeleteIcon from "@material-ui/icons/Delete";

const TableRowMunis = ({ municipality }) => {
  const history = useHistory();

  const [anchorEl, setAnchorEl] = useState(null);

  const user = JSON.parse(localStorage.getItem("user")).user;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const municipalityDepartments = (municipalityRow) => {
    if (user.role === "RMCTeam") {
      localStorage.setItem("municipality", JSON.stringify(municipalityRow));
    }

    history.push("/municipalidades/departamentos", {
      from: "municipalidades",
    });
  };

  const municipalityCities = (municipalityRow) => {
    if (user.role === "RMCTeam") {
      localStorage.setItem("municipality", JSON.stringify(municipalityRow));
    }

    history.push("/municipalidad/ciudades", {
      from: "municipalidades",
    });
  };

  const editMunicipality = (municipalityRow) => {
    if (user.role === "RMCTeam") {
      localStorage.setItem("municipality", JSON.stringify(municipalityRow));
    }

    history.push("/municipalidades/editar", {
      from: "municipalidades",
    });
  };

  const editMunicipalityAdministrator = (municipalityRow) => {
    if (user.role === "RMCTeam") {
      localStorage.setItem(
        "updateAdministrator",
        JSON.stringify(municipalityRow.manager)
      );
    }

    history.push("/municipalidades/editarAdministrador", {
      from: "municipalidades",
    });
  };

  const deleteMunicipalitySelected = async (municipalityId) => {
    ConfirmDelete(
      "¿Estás seguro de eliminar esta municipalidad?",
      "No podrás deshacer esta acción",
      deleteMunicipality(municipalityId)
    );
  };

  return (
    <TableRow>
      <TableCell style={{ fontSize: 20 }} component="th" scope="row">
        {municipality.name}
      </TableCell>
      <TableCell style={{ fontSize: 15 }} align="right">
        {municipality.email}
      </TableCell>
      <TableCell style={{ fontSize: 15 }} align="right">
        {municipality.telephone}
      </TableCell>
      <TableCell style={{ fontSize: 15 }} align="right">
      <Chip
            label={municipality.state}
            style={{
              background: municipality.state === "activo" ? "#4caf50" : "#FF0000",
              color:"#fff",
              margin: 5,
            }}
          />
      </TableCell>
      <TableCell style={{ fontSize: 15 }} align="right">
        <div>
          <IconButton
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleClick}
          >
            <MoreVertIcon style={{ color: "#0277BD" }} />
          </IconButton>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={() => editMunicipality(municipality)}>
              <ListItemIcon>
                <EditIcon style={{ color: "#0277BD" }} />
              </ListItemIcon>
              <Typography variant="inherit">Editar</Typography>
            </MenuItem>
            <MenuItem
              onClick={() => editMunicipalityAdministrator(municipality)}
            >
              <ListItemIcon>
                <SupervisorAccountIcon style={{ color: "#0277BD" }} />
              </ListItemIcon>
              <Typography variant="inherit">Editar Administrador</Typography>
            </MenuItem>
            <MenuItem onClick={() => municipalityCities(municipality)}>
              <ListItemIcon>
                <LocationCityIcon style={{ color: "#0277BD" }} />
              </ListItemIcon>
              <Typography variant="inherit">Ver Ciudades</Typography>
            </MenuItem>
            <MenuItem onClick={() => municipalityDepartments(municipality)}>
              <ListItemIcon>
                <BusinessIcon style={{ color: "#0277BD" }} />
              </ListItemIcon>
              <Typography variant="inherit">Ver Departamentos</Typography>
            </MenuItem>
            <MenuItem
              onClick={() => deleteMunicipalitySelected(municipality.id)}
            >
              <ListItemIcon>
                <DeleteIcon style={{ color: "#FF0000" }} />
              </ListItemIcon>
              <Typography variant="inherit">Eliminar</Typography>
            </MenuItem>
          </Menu>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default TableRowMunis;
