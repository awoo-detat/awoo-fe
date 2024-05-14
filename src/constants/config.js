import base64 from "base-64";

global.atob = base64.decode;
global.btoa = base64.encode;

const ENV = {
  baseUrl: "https://api.awoo.com", // TODO: update this with the correct base url
};

export default ENV;
