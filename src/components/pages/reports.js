import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { Search } from ".";
import { getReports, updateReportState } from "../../services/reports";
import Map from "../ui/map";

import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";

import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import { green,red } from "@material-ui/core/colors";

import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";

import DoneIcon from '@material-ui/icons/Done';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { makeStyles, withStyles } from "@material-ui/core/styles";

const filterReports = (reports, query) => {
  if (!query) {
    return reports;
  }

  return reports.filter((reports) => {
    const toFilter = reports.state.toLowerCase();
    return toFilter.includes(query);
  });
};

const Reports = () => {
  const history = useHistory();
  const { search } = window.location;
  const query = new URLSearchParams(search).get("s");
  const [searchQuery, setSearchQuery] = useState(query || "");

  const user = JSON.parse(localStorage.getItem("userData"));

  const [reports, setReports] = useState({});
  const [details, setDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = React.useState(false);

  useEffect(() => {
    fetchReports();
  }, []);

  const filteredReports = filterReports(reports, searchQuery);

  const fetchReports = async () => {
    const apiReports = await getReports();
    setReports(apiReports);
    
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

  const specificReport = (report) => {
    localStorage.setItem("report", JSON.stringify(report));

    history.push("/reporte", {
      from: "reportes",
    });
  };

  const reportNewDetail = (report) => {
    localStorage.setItem("report", JSON.stringify(report));

    history.push("/reportes/nuevo_detalle", {
      from: "reportes",
    });
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const defaultProps = {
    bgcolor: "common.white",
    mt: 5,
  };

  const defaultProps2 = {
    bgcolor: "common.white",
  };

  const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 600,
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
    gridContainer: {
      marginTop: '10%',
      color: '#011B42',
    },
  }));

  const ColorButton = withStyles((theme) => ({
    root: {
      color: theme.palette.getContrastText(green[500]),
      backgroundColor: green[500],
      "&:hover": {
        backgroundColor: green[700],
      },
    },
  }))(Button);

  return (
   
    <Box bgcolor='background.paper' p={2}>
        {user.role !== "DepartmentAdmin" && (
          <Container>
            <div class="alert alert-info" role="alert">
              <strong>Informacion: </strong>Solo los Administradores de los departamentos pueden añadir detalles
              a los reportes
            </div>
          </Container>
        )}

      <Container>
        <div className="mb-3">
          <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        </div>
        <Grid
          container
          className={useStyles.gridContainer}
        >

        {/*Container de lista*/}
        {filteredReports.map((report) => (
          <ul key={report.id}>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Card className={useStyles.root}>
                <CardHeader
                  title={report.title}
                  subheader={report.createdAt}
                />
                <CardMedia
                  className={useStyles.media}
                  title="Imagen"
                >
                  <img  style={{ height: '100%', width: '100%' }} src={report.imgURL}/>
                </CardMedia>
                <CardContent>
                  <Typography variant="body2" color="textSecondary" component="p">
                    {report.description}
                  </Typography>
                  
                  <Typography variant="body1" color="textSecondary" component="p">
                    Estado:
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    {report.state}
                  </Typography>
                </CardContent>
                <Divider/>
                <CardActions disableSpacing>
                  <IconButton>
                    <DoneIcon style={{ color: "#4caf50"}}/>
                  </IconButton>
                  <IconButton>
                    <DeleteForeverIcon color="secondary"/>
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
                  <Typography paragraph>Privacidad: </Typography>
                  <Typography paragraph variant="body2">{report.privacy} </Typography>
                    <Typography paragraph>Ubicacion: </Typography>
                    <CardMedia
                      className={useStyles.media}
                      title="Map"
                    >
                      <Map />
                    </CardMedia>
                    <Typography paragraph>Detalles: </Typography>
                    {details.length > 0 ? (
                      details.map((details) => (
                        <ul key={details.id}>
                          <Typography variant="body1" color="textSecondary" component="p">{details.updateDetail}</Typography>
                          <Typography variant="body2" color="textSecondary" component="p">{details.updateDetail}</Typography>
                        </ul>
                      ))
                    ) : (
                      <Typography variant="body2" color="textSecondary" component="p">No hay Detalles sobre este Reporte</Typography>
                    )}

                  </CardContent>
                </Collapse>

              </Card>

            </Grid>
            
          </ul>
        ))}
         {/*Fin Container de listae*/}
         </Grid>
      </Container>
    </Box>
  );
};

export default Reports;
