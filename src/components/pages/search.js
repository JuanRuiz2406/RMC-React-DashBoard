import { TextField } from "@material-ui/core";

const Search = ({ searchQuery, setSearchQuery }) => (
  <form style={{ marginBottom: 20, marginTop: 10 }} action="/" method="get">
    <TextField
      value={searchQuery}
      onInput={(e) => setSearchQuery(e.target.value)}
      type="text"
      id="standard-basic"
      label="Filtrar por Título..."
      name="s"
    />
    {/* <button type="submit">Buscar</button> */}
  </form>
);

export default Search;
