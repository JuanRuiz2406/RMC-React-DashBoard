import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import {
  getMunicipalities,
  deleteMunicipality,
} from "../../services/municipalities";
import {
  Box,
  Button,
  Container,
  Typography,
  withStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  makeStyles,
  Menu,
  MenuItem,
  ListItemIcon,
} from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import { ConfirmDelete } from "../alerts";
import { RowingSharp, Tab } from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import EditIcon from "@material-ui/icons/Edit";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import BusinessIcon from "@material-ui/icons/Business";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";

const Municipalities = () => {
  const history = useHistory();

  const user = JSON.parse(localStorage.getItem("user")).user;

  const [municipalities, setMunicipalities] = useState({});
  const [loading, setLoading] = useState(true);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    fetchMunicipalities();
  }, []);

  const fetchMunicipalities = async () => {
    const apiMunicipalities = await getMunicipalities();

    setMunicipalities(apiMunicipalities);
    setLoading(false);
  };

  const municipalityDepartments = (municipality) => {
    if (user.role === "RMCTeam") {
      localStorage.setItem("municipality", JSON.stringify(municipality));
    }

    history.push("/municipalidades/departamentos", {
      from: "municipalidades",
    });
  };

  const municipalityCities = (municipality) => {
    if (user.role === "RMCTeam") {
      localStorage.setItem("municipality", JSON.stringify(municipality));
    }

    history.push("/municipalidad/ciudades", {
      from: "municipalidades",
    });
  };

  const editMunicipality = (municipality) => {
    if (user.role === "RMCTeam") {
      localStorage.setItem("municipality", JSON.stringify(municipality));
    }

    history.push("/municipalidades/editar", {
      from: "municipalidades",
    });
  };

  const editMunicipalityAdministrator = (municipality) => {
    if (user.role === "RMCTeam") {
      localStorage.setItem(
        "updateAdministrator",
        JSON.stringify(municipality.manager)
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

  if (loading) {
    return <div>Loading...</div>;
  }

  const ColorButton = withStyles((theme) => ({
    root: {
      color: theme.palette.getContrastText(green[500]),
      backgroundColor: green[500],
      "&:hover": {
        backgroundColor: green[700],
      },
    },
  }))(Button);

  const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });

  return (
    <Box bgcolor="background.default" p={2}>
      <Container>
        <Button
          style={{ marginTop: 30 }}
          onClick={() =>
            history.push("/municipalidades/crear", {
              from: "municipalidades",
            })
          }
        >
          <AddIcon style={{ color: "#4caf50", fontSize: 40 }} /> Crear
        </Button>

        <TableContainer component={Paper} style={{ marginTop: 50 }}>
          <Table
            className={useStyles.table}
            size="small"
            aria-label="a dense table"
          >
            <TableHead style={{ paddingTop: 100 }}>
              <TableRow>
                <TableCell style={{ fontSize: 40, padding: 20 }}>
                  Municipalidades
                </TableCell>
                <TableCell style={{ fontSize: 20 }} align="right">
                  Correo
                </TableCell>
                <TableCell style={{ fontSize: 20 }} align="right">
                  Telefono
                </TableCell>
                <TableCell style={{ fontSize: 20 }} align="right">
                  Estado
                </TableCell>
                <TableCell style={{ fontSize: 20 }} align="right">
                  Acciones
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {municipalities.map((municipality) => (
                <TableRow key={municipality.id}>
                  <TableCell
                    style={{ fontSize: 20 }}
                    component="th"
                    scope="row"
                  >
                    {municipality.name}
                  </TableCell>
                  <TableCell style={{ fontSize: 15 }} align="right">
                    {municipality.email}
                  </TableCell>
                  <TableCell style={{ fontSize: 15 }} align="right">
                    {municipality.telephone}
                  </TableCell>
                  <TableCell style={{ fontSize: 15 }} align="right">
                    {municipality.state}
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
                        <MenuItem
                          onClick={() => editMunicipality(municipality)}
                        >
                          <ListItemIcon>
                            <EditIcon style={{ color: "#0277BD" }} />
                          </ListItemIcon>
                          <Typography variant="inherit">Editar</Typography>
                        </MenuItem>
                        <MenuItem
                          onClick={() =>
                            editMunicipalityAdministrator(municipality)
                          }
                        >
                          <ListItemIcon>
                            <SupervisorAccountIcon
                              style={{ color: "#0277BD" }}
                            />
                          </ListItemIcon>
                          <Typography variant="inherit">
                            Editar Administrador
                          </Typography>
                        </MenuItem>
                        <MenuItem
                          onClick={() => municipalityCities(municipality)}
                        >
                          <ListItemIcon>
                            <LocationCityIcon style={{ color: "#0277BD" }} />
                          </ListItemIcon>
                          <Typography variant="inherit">
                            Ver Ciudades
                          </Typography>
                        </MenuItem>
                        <MenuItem
                          onClick={() => municipalityDepartments(municipality)}
                        >
                          <ListItemIcon>
                            <BusinessIcon style={{ color: "#0277BD" }} />
                          </ListItemIcon>
                          <Typography variant="inherit">
                            Ver Departamentos
                          </Typography>
                        </MenuItem>
                        <MenuItem
                          onClick={() =>
                            deleteMunicipalitySelected(municipality.id)
                          }
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
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </Box>
  );
};

export default Municipalities;
