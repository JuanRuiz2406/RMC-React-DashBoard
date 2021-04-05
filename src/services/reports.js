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


