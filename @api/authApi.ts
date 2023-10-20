export default {
  baseUrl: "/auth",
  LOGIN: {
    path: "/signin/{code}",
    method: "post",
  },
  RENEW: {
    path: "/renew",
    method: "post",
    params: {
      
    }
  },
};
