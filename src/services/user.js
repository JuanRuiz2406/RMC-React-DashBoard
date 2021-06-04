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

export const sendVerificationCode = async (email) => {
  return fetch(baseUrl + "user/verificationCode/"+ email, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(email),
  })
    .then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson);
      return responseJson;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};

export const verificationCode = async (email, code, password) => {
  return fetch(baseUrl + "user/verificationCode/"+ email + "/" + code + "/" +password, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson);
      return responseJson;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};

export const updateUser = async (user) => {
  return fetch(baseUrl + "user", {
      method: "PUT",
      headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: user.id,
        name: user.name,
        lastname: user.lastname,
        idCard: user.idCard,
        email: user.email,
        password: user.password,
        direction: user.direction,
        role: user.role,
        state: user.state,
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


}
