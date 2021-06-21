import React from "react";
import { useHistory } from "react-router";
import { useForm } from "react-hook-form";
import { updateDepartment } from "../../services/departments";
import {
  Box,
  Button,
  Container,
  Grid,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import { Success, Error } from "../alerts";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

const EditDepartment = () => {
  const history = useHistory();

  const departmentData = JSON.parse(localStorage.getItem("department"));

  const { register, handleSubmit, errors } = useForm();

  const onSubmit = async (data) => {
    const department = {
      id: departmentData.id,
      name: data.name,
      description: data.description,
      email: data.email,
      telephone: data.telephone,
      state: departmentData.state,
    };

    const updateResponse = await updateDepartment(
      department,
      departmentData.manager,
      departmentData.municipality
    );

    if (updateResponse.code === 200) {
      Success("Actualizado Correctamente!", updateResponse.message);
      setTimeout(() => {
        history.goBack();
      }, 1000 * 2);
    }
    if (updateResponse.code === 400) {
      Error(updateResponse.message);
    }
    if (updateResponse.status === 401) {
      Error(updateResponse.error);
    }
  };
  const classes = useStyles();
  return (
    <Box bgcolor="background.default" p={2}>
      <Container>
        <Button
          style={{ marginTop: 30 }}
          color="primary"
          onClick={() => {
            history.goBack();
          }}
        >
          <ArrowBackIcon style={{ color: "#0277BD", fontSize: 40 }} /> Volver
        </Button>

        <Grid container spacing={4} style={{ marginTop: 10 }}>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Box bgcolor="common.white" p={1.5} boxShadow={2}>
              <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
                <Typography variant="h5" gutterBottom>
                  Editar Departamento
                </Typography>
                <TextField
                  id="standard-basic"
                  margin="normal"
                  fullWidth
                  label="Nombre del Departamento"
                  type="text"
                  name="name"
                  defaultValue={departmentData.name}
                  inputRef={register({
                    required: "El nombre es requerido.",
                  })}
                  error={Boolean(errors.name)}
                  helperText={errors.name?.message}
                />

                <TextField
                  id="standard-basic"
                  margin="normal"
                  fullWidth
                  label="Descripcion"
                  type="text"
                  name="description"
                  defaultValue={departmentData.description}
                  inputRef={register({
                    required: "El apellido es requerido.",
                  })}
                  error={Boolean(errors.description)}
                  helperText={errors.description?.message}
                />

                <TextField
                  id="standard-basic"
                  margin="normal"
                  fullWidth
                  label="Correo del encargado"
                  type="email"
                  name="email"
                  defaultValue={departmentData.email}
                  inputRef={register({
                    required: "El correo es requerido.",
                  })}
                  error={Boolean(errors.email)}
                  helperText={errors.email?.message}
                />

                <TextField
                  id="standard-basic"
                  margin="normal"
                  fullWidth
                  label="Numero de telefono"
                  type="number"
                  name="telephone"
                  defaultValue={departmentData.telephone}
                  inputRef={register({
                    required: "La tarjeta de identificaion es requerida.",
                  })}
                  error={Boolean(errors.telephone)}
                  helperText={errors.telephone?.message}
                />

                <Button
                  type="submit"
                  className={classes.submit}
                  fullWidth
                  style={{ marginTop: "10%", background: "#4caf50" }}
                  variant="contained"
                >
                  Editar
                </Button>
              </form>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default EditDepartment;

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: 300,
    },
    textField: {
      width: "25ch",
    },
    button: {
      margin: theme.spacing(1),
    },
  },
  form: {
    marginLeft: "10%",
    marginRight: "10%",
    width: "80%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 5),
  },
  forgot: {
    color: theme.palette.primary.main,
    marginTop: theme.spacing(8),
  },
  title: {
    color: theme.palette.text.secondary,
  },
  next: {
    margin: theme.spacing(3, 0, 5),
  },
}));
