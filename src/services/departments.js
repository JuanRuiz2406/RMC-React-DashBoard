const baseUrl = process.env.REACT_APP_API_URL;

export const getDepartments = async (municipalityId) => {
  return fetch(baseUrl + "departament/byMunicipality/" + municipalityId, {
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

export const getDepartmentAdmin = async (userId) => {
  return fetch(baseUrl + "departament/byUser/" + userId, {
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

export const newDepartment = async (department, manager, municipality) => {
  console.log(
    JSON.stringify({
      name: department.name,
      description: department.description,
      email: department.email,
      telephone: department.telephone,
      state: "activo",
      manager: manager,
      municipality: municipality,
    })
  );
  return fetch(baseUrl + "departament", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    },
    body: JSON.stringify({
      name: department.name,
      description: department.description,
      email: department.email,
      telephone: department.telephone,
      state: "activo",
      manager: manager,
      municipality: municipality,
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

export const updateDepartment = async (department, manager, municipality) => {
  return fetch(baseUrl + "departament", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    },
    body: JSON.stringify({
      id: department.id,
      name: department.name,
      description: department.description,
      email: department.email,
      telephone: department.telephone,
      state: department.state,
      manager: manager,
      municipality: municipality,
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

export const deleteDepartment = async (departmentId) => {
  return fetch(baseUrl + "departament/" + departmentId, {
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
