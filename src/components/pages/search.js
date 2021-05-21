const SearchBar = ({ searchQuery, setSearchQuery }) => (
  <form action="/" method="get">
    <label htmlFor="header-search">
      <span className="visually-hidden">Filtrar Reportes...</span>
    </label>
    <input
      value={searchQuery}
      onInput={(e) => setSearchQuery(e.target.value)}
      type="text"
      id="header-search"
      placeholder="Filtrar por Estado..."
      name="s"
    />
    {/* <button type="submit">Buscar</button> */}
  </form>
);

export default SearchBar;
