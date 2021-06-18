const baseUrl = process.env.REACT_APP_API_URL;


export const getPhotos = async (reportId) => {
    return fetch(baseUrl + "photography/byReport/" + reportId, {
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