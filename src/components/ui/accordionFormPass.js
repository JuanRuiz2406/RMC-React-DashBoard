import React, { useContext } from "react";
import { useHistory } from "react-router";
import { useForm } from "react-hook-form";
import { updateUser } from "../../services/user";
import { AuthContext } from "../../auth/AuthContext";
import { types } from "../../types/types";
import {
  makeStyles,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  Typography,
  Button,
} from "@material-ui/core";
import { Success, Error } from "../alerts";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

export default function AccordionFormPass({ user }) {
  const { register, handleSubmit, errors } = useForm();
  const history = useHistory();
  const { dispatch } = useContext(AuthContext);
  const classes = useStyles();

  const onSubmit = async (data) => {
    console.log(data);
    const manager = {
      id: user.id,
      name: user.userName,
      lastname: user.lastName,
      idCard: user.idCard,
      email: user.userEmail,
      password: data.password,
      direction: data.direction,
      role: user.role,
      state: user.state,
    };

    const createResponse = await updateUser(manager);

    if (createResponse.code === 201) {
      Success("Actualizado Correctamente!", createResponse.message);
      setTimeout(() => {
        handleLogout();
      }, 1000 * 2);
    }
  };

  const handleLogout = () => {
    history.replace("/login");

    localStorage.clear();

    dispatch({
      type: types.logout,
    });
  };

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography color="textPrimary">CAMBIAR CONTRASEÑA</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            id="standard-password-input"
            margin="normal"
            className={classes.title}
            fullWidth
            type="password"
            label="Nueva Contraseña"
            name="password"
            inputRef={register({
              required: "La campo requerido.",
            })}
            error={Boolean(errors.password)}
            helperText={errors.password?.message}
          />
          <TextField
            id="standard-password-input"
            margin="normal"
            className={classes.title}
            fullWidth
            type="password"
            label="Confirme Contraseña"
            name="password"
            inputRef={register({
              required: "La campo requerido.",
            })}
            error={Boolean(errors.password)}
            helperText={errors.password?.message}
          />
          <Button
            type="submit"
            className={classes.submit}
            fullWidth
            style={{
              marginTop: "10%",
              background: "#ff9800",
              color: "#fff",
            }}
            variant="contained"
          >
            Cambiar Contraseña
          </Button>
        </form>
      </AccordionDetails>
    </Accordion>
  );
}

const useStyles = makeStyles((theme) => ({
  form: {
    marginTop: "5%",
    backgroundColor: theme.palette.grey[200],
    borderRadius: 4,
  },
  submit: {
    margin: theme.spacing(3, 0, 5),
  },
  title: {
    color: theme.palette.text.secondary,
  },
  submit: {
    margin: theme.spacing(3, 0, 5),
  },
}));
