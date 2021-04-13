const baseUrl = process.env.REACT_APP_API_URL;

export const getReports = async () => {
  return fetch(baseUrl + "report", {
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

export const updateReportState = async (report, newState) => {
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
