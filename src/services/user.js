const baseUrl = process.env.REACT_APP_API_URL;

export const login = async (user) => {
  return fetch(baseUrl + "auth/login", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => response.json())
    .then((responseJson) => {
      return responseJson;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};

export const getUserByEmail = async (token, userEmail) => {
  return fetch(baseUrl + "user/byEmail/" + userEmail, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: token,
    },
  })
    .then((response) => response.json())
    .then((responseJson) => {
      return responseJson;
    });
};
