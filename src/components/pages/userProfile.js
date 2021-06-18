import React from "react";
import {
  Box,
  Button,
  Divider,
  Grid,
  Container,
  Typography,
  CardActions,
} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";

const UserProfile = () => {
  const user = JSON.parse(localStorage.getItem("user")).user;

  return (
    <Box bgcolor="background.paper" p={2}>
      <Container>
        <div>
          <Grid item xs>
            <Box bgcolor="common.black" p={1.5} boxShadow={2}>
              <Avatar aria-label="recipe" src={user.imgURL} />
              <Grid item xs={12}>
                <Typography variant="h2" component="h2">
                  {user.name} {user.lastname}
                </Typography>
              </Grid>
              <Box item xs={6}>
                <Typography variant="h5" component="p">
                  {user.idCard}
                </Typography>
              </Box>
              <Box item xs={6}>
                <Typography variant="h5" component="p">
                  {user.email}
                </Typography>
              </Box>
              <Box item xs={6}>
                <Typography variant="h5" component="p">
                  {user.direction}
                </Typography>
              </Box>
              <Divider />
              <CardActions>
                <Button variant="contained" color="primary" onClick={() => {}}>
                  Editar
                </Button>
              </CardActions>
            </Box>
          </Grid>
        </div>
      </Container>
    </Box>
  );
};

export default UserProfile;
