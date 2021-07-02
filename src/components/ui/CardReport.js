import React, { useState, useEffect } from "react";
import Map from "./map";
import {
  getDetails,
  updateReportState,
  newDetail,
} from "../../services/reports";
import { useForm } from "react-hook-form";
import { getPhotos } from "../../services/photography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Grow from "@material-ui/core/Grow";

import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import { red } from "@material-ui/core/colors";

import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import Chip from "@material-ui/core/Chip";
import Avatar from "@material-ui/core/Avatar";

import DoneIcon from "@material-ui/icons/Done";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import moment from "moment";
import "moment/locale/es";
import DoneAllIcon from "@material-ui/icons/DoneAll";
import BuildRoundedIcon from "@material-ui/icons/BuildRounded";

import { makeStyles } from "@material-ui/core/styles";

const CardReport = ({ report }) => {
  const [details, setDetails] = useState({});
  const [photos, setPhotos] = useState({});
  const [expanded, setExpanded] = React.useState(false);
  const [date, setDate] = useState("");
  const { register, handleSubmit, errors } = useForm();

  const departmentStorage = JSON.parse(localStorage.getItem("department"));
  const user = JSON.parse(localStorage.getItem("userData"));

  const [checked, setChecked] = React.useState(true);

  const handleChangeChecked = () => {
    setChecked((prev) => !prev);
  };

  const handleExpandClick = () => {
    localStorage.setItem("report", JSON.stringify(report));

    setExpanded(!expanded);
  };

  const fetchDetails = async (reportId) => {
    const apiDetails = await getDetails(reportId);
    setDetails(apiDetails);
    const apiPhotos = await getPhotos(reportId);

    let uris = "";
    apiPhotos.map((x) => (uris = uris + "," + x.imagePath));
    uris = uris.substring(1);
    uris = uris.split(",");
    setPhotos(uris);
    console.log(photos);
  };

  useEffect(() => {
    var m = moment(report.createdAt, "DD/MM/YYYY");
    m.locale("es");
    setDate(m.format("LL"));
    console.log(date);
    fetchDetails(report.id);
  }, []);

  const onSubmit = async (data) => {
    const department = departmentStorage;

    const createResponse = await newDetail(data.coment, department, report);

    if (createResponse.code === 200 || createResponse.code === 400) {
      alert(createResponse.message);
      refreshPage();
    }
    if (createResponse.status === 401) {
      alert(createResponse.error);
    }
  };

  const replyReport = async (report, newState) => {
    const response = await updateReportState(report, newState);

    console.log(response);

    refreshPage();
  };

  const refreshPage = () => {
    handleChangeChecked();
    window.location.reload();
  };

  const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 600,
    },
    media: {
      height: 0,
      paddingTop: "56.25%", // 16:9
    },
    expand: {
      transform: "rotate(0deg)",
      marginLeft: "auto",
      transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: "rotate(180deg)",
    },
    avatar: {
      backgroundColor: red[500],
    },
    gridContainer: {
      marginTop: "10%",
      color: "#011B42",
    },
  }));

  return (
    <Grow in={checked}>
      <Card style={{ backgroundColor: "#fff" }} className={useStyles.root}>
        <CardHeader
          avatar={
            <Avatar
              aria-label="recipe"
              className={useStyles.avatar}
              src={report.user.imgURL}
            />
          }
          title={report.user.name + " " + report.user.lastname}
          subheader={date}
        />
        <CardMedia className={useStyles.media} title="Imagen">
          <img
            style={{ height: 300, width: "100%", objectFit: "cover" }}
            src={photos[0]}
          />
        </CardMedia>
        <CardContent>
          <Chip
            label={report.state}
            style={{
              background:
                report.state === "Aceptado"
                  ? "#4caf50"
                  : report.state === "Procesando"
                  ? "#ff9800"
                  : report.state === "Rechazado"
                  ? "#FF0000"
                  : "#0277BD",
              color: "#fff",
            }}
          />
          <Chip
            label={report.privacy}
            style={{
              background: report.privacy === "Privado" ? "#011B42" : "#03A9F4",
              color: report.privacy === "Procesando" ? "#000" : "#fff",
              margin: 5,
            }}
          />
          <Typography
            gutterBottom
            variant="h5"
            component="h2"
            style={{ marginTop: 10 }}
          >
            {report.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {report.description}
          </Typography>
        </CardContent>
        <Divider />
        <CardActions disableSpacing>
          <IconButton
            onClick={() => {
              replyReport(report, "Aceptado");
            }}
          >
            <DoneIcon style={{ color: "#4caf50" }} />
          </IconButton>
          <IconButton
            onClick={() => {
              replyReport(report, "Procesando");
            }}
          >
            <BuildRoundedIcon style={{ color: "#ff9800" }} />
          </IconButton>
          <IconButton
            onClick={() => {
              replyReport(report, "Finalizado");
            }}
          >
            <DoneAllIcon color="primary" />
          </IconButton>
          <IconButton
            onClick={() => {
              replyReport(report, "Rechazado");
            }}
          >
            <DeleteForeverIcon color="secondary" />
          </IconButton>
          <IconButton
            className={clsx(useStyles.expand, {
              [useStyles.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography
              gutterBottom
              variant="h6"
              component="h2"
              style={{ marginTop: 10 }}
            >
              Detalles
            </Typography>
            {details.length > 0 ? (
              details.map((details) => (
                <ul key={details.id}>
                  <Typography
                    variant="body1"
                    color="textSecondary"
                    component="p"
                  >
                    - {details.updateDetail}
                  </Typography>
                </ul>
              ))
            ) : (
              <ul>
                <Typography variant="body2" color="textSecondary" component="p">
                  No hay Detalles sobre este Reporte
                </Typography>
              </ul>
            )}
            <Typography
              gutterBottom
              variant="h6"
              component="h2"
              style={{ marginTop: 10 }}
            >
              Ubicacion
            </Typography>
            <CardMedia className={useStyles.media} title="Map">
              <Map />
            </CardMedia>

            {user.role === "DepartmentAdmin" && (
              <Container>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Grid container xs={12}>
                    <TextField
                      id="standard-multiline-static"
                      label="Comentario"
                      multiline
                      rows={3}
                      fullWidth
                      type="text"
                      name="coment"
                      inputRef={register({
                        required: false,
                      })}
                    />
                  </Grid>
                  <Grid container>
                    <Button type="submit" color="primary">
                      Agregar
                    </Button>
                  </Grid>
                </form>
              </Container>
            )}
          </CardContent>
        </Collapse>
      </Card>
    </Grow>
  );
};

export default CardReport;
