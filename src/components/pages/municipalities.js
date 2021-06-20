import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { getMunicipalities } from "../../services/municipalities";
import {
  Box,
  Button,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  makeStyles,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import TableRowMunis from "../ui/TableRowMunis";

const Municipalities = () => {
  const history = useHistory();

  const [municipalities, setMunicipalities] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMunicipalities();
  }, []);

  const fetchMunicipalities = async () => {
    const apiMunicipalities = await getMunicipalities();

    setMunicipalities(apiMunicipalities);
    setLoading(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

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
                <TableRowMunis municipality={municipality} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </Box>
  );
};

export default Municipalities;
