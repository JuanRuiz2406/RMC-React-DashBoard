const baseUrl = process.env.REACT_APP_API_URL;

export const login = async (user) => {
  await fetch(baseUrl + "auth/login", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => response.json())
    .then((responseJson) => {
      saveToken(responseJson.bearer + " " + responseJson.token);
      saveEmail(responseJson.email);
      return responseJson.bearer + " " + responseJson.token;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};

const saveToken = (token) => {
  localStorage.setItem("token", token);
};

const saveEmail = (email) => {
  localStorage.setItem("email", email);
};

export const getUserByEmail = async (userEmail) => {
  await fetch(baseUrl + "user/byEmail/" + userEmail, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: localStorage.getItem("token"),
    },
  })
    .then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson);
      saveUser(responseJson);
      return responseJson;
    });
};

const saveUser = (user) => {
  localStorage.setItem("userData", JSON.stringify(user));
};


