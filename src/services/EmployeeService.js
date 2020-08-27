import API from "../helpers/Api";

const querystring = require("querystring");

export const getAll = (params) => {
  return API.get(`rest/employee/getAll`, {
    params: params,
    paramsSerializer: function (params) {
      return querystring.stringify(params);
    },
  });
};

export const getById = (id) => {
  return API.get(`rest/employee/getById?id=${id}`);
};

export const insert = (employee) => {
  return API.put(`rest/employee/insert`, employee);
};

export const update = (employee) => {
  return API.put(`rest/employee/update`, employee);
};

export const deleteEmployee = (params) => {
  return API.delete(`rest/employee/delete`, {
    params: params,
    paramsSerializer: function (params) {
      return querystring.stringify(params);
    },
  });
};
