export const createQueryParams = (params: Object) =>
  Object.keys(params)
    .map(key => key + "=" + params[key])
    .join("&");
