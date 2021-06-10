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

export const newMunicipality = async (municipality, manager) => {
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
      state: "activo",
      webSite: municipality.webSite,
      manager: manager,
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

export const updateMunicipality = async (municipality, manager) => {
  return fetch(baseUrl + "municipality", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    },
    body: JSON.stringify({
      id: municipality.id,
      name: municipality.name,
      adress: municipality.adress,
      email: municipality.email,
      telephone: municipality.telephone,
      state: municipality.state,
      webSite: municipality.webSite,
      manager: manager,
    }),
  })
    .then((response) => response.json())
    .then((responseJson) => {
      return responseJson;
    })
    .catch((error) => {
      console.error(error);
    });
};

export const deleteMunicipality = async (municipalityId) => {
  return fetch(baseUrl + "municipality/" + municipalityId, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    },
  })
    .then((response) => response.json())
    .then((responseJson) => {
      return responseJson;
    })
    .catch((error) => {
      console.error(error);
    });
};
