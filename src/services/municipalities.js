const baseUrl = process.env.REACT_APP_API_URL;

export const getMunicipalities = async () => {
  return fetch(baseUrl + "municipality", {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: localStorage.getItem("token"),
    },
  })
    .then((response) => response.json())
    .then((responseJson) => {
      return responseJson;
    });
};

export const newMunicipality = async (municipality) => {
    return fetch(baseUrl + "municipality", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
    },
      body: JSON.stringify({
        name: municipality.name,
        adress: municipality.adress,
        email: municipality.email,
        telephone: municipality.telephone,
        website: municipality.website,
        manager: municipality.manager,
        // state: "Activo",
        // schedule: "Nuevo",
    }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        return responseJson;
      })
      .catch((error) => {
        console.error(error);
      });
  };  

export const updateMunicipalitiestate = async (report, newState) => {
  return fetch(baseUrl + "report", {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    },
    body: JSON.stringify({
      id: report.id,
      title: report.title,
      description: report.description,
      state: newState,
      privacy: report.privacy,
      user: report.user,
      coords: report.coordenates,
      municipality: report.municipality,
    }),
  })
    .then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson);
      return responseJson;
    });
};
