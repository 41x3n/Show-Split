import axios from "axios";

const buildClient = ({ req }) => {
  if (typeof window === "undefined") {
    // We are on the server
    // We mention the Host header because in ingress-srv we have mentioned the host name and that api call need to tell the server what host it want to go.
    return axios.create({
      baseURL:
        "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local",
      headers: req.headers,
    });
  } else {
    // We are on client
    return axios.create({
      baseURL: "/",
    });
  }
};

export default buildClient;
