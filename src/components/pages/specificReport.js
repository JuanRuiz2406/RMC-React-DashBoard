import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { getDetails, updateReportState } from "../../services/reports";
import Map from "../ui/map";
import { makeStyles, withStyles} from "@material-ui/core/styles";

import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import { green } from '@material-ui/core/colors';

const SpecificReport = () => {
  const history = useHistory();

  const user = JSON.parse(localStorage.getItem("userData"));
  const report = JSON.parse(localStorage.getItem("report"));

  const [details, setDetails] = useState({});
  const [loading, setLoading] = useState(true);

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    const apiDetails = await getDetails(report.id);

    setDetails(apiDetails);
    setLoading(false);
  };

  const refreshPage = () => {
    window.location.reload();
  };

  const replyReport = async (report, newState) => {
    const response = await updateReportState(report, newState);

    console.log(response);

    refreshPage();
  };

  const reportNewDetail = (report) => {
    localStorage.setItem("report", JSON.stringify(report));

    history.push("/reportes/nuevo_detalle", {
      from: "reportes",
    });
  };


  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      marginBottom: '10%',
    },
    pos: {
      marginBottom: 12,
    },
    card: {
      flexGrow: 1,
    },
    colorCard: {
      background: "#000",
    },
    cardRoot: {
      maxWidth: 345,
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: red[500],
    },
  }));

  const ColorButton = withStyles((theme) => ({
    root: {
      color: theme.palette.getContrastText(green[500]),
      backgroundColor: green[500],
      '&:hover': {
        backgroundColor: green[700],
      },
    },
  }))(Button);


  if (loading) {
    return <div>Loading...</div>;
  }

  return (



    <Container>
      <Box
        bgcolor='common.black'
        p={1.5}
        mt={2}
      >
          <Grid item xs={12} direction='row' alignContent='center'>
            <Grid item xs>
              <Grid item xs={3}>
                <h2>Título:</h2>
              <h6>{report.title}</h6>
              </Grid>
              <Grid item xs={3}>
                <h4>Descripción:</h4>
              <h6>{report.description}</h6>
              </Grid>
            </Grid>
            <Grid item xs>
              <Grid item xs={3}>
                <h4>Privacidad</h4>
              <h6>{report.privacy}</h6>
              </Grid>
              <Grid item xs={3}>
                <h4>Estado:</h4>
              <h6>{report.state}</h6>
              </Grid>
            </Grid>

          </Grid>
          <Grid item xs={12}>
            <Grid item xs={6}>

            </Grid>
            <Grid item xs={6}>

            </Grid>

          </Grid>
          
          <Grid item>
            <h4>Imagen:</h4>
            <img className="rounded" style={{height: 400, width: 800}} src={report.imgURL}></img>

            <h4>Ubicación:</h4>
            <Map />

            <ul>
              <h2>Detalles:</h2>

              {details.length > 0 ? (
                details.map((details) => (
                  <ul key={details.id}>
                    <h2>{details.updateDetail}</h2>
                    <h4>{details.updateDetail}</h4>
                  </ul>
                ))
              ) : (
                <h4>No hay Detalles sobre este Reporte</h4>
              )}
              <button
                onClick={() => {
                  replyReport(report, "Aceptado");
                }}
              >
                Aceptar
              </button>

              <button
                onClick={() => {
                  replyReport(report, "Rechazado");
                }}
              >
                Rechazar
              </button>

              {user.role === "DepartmentAdmin" && (
                <button
                  onClick={() => {
                    reportNewDetail(report);
                  }}
                >
                  Añadir Nuevo Detalle
                </button>
              )}
            </ul>
          </Grid>
      </Box>
      
    </Container>
  );
};

export default SpecificReport;
