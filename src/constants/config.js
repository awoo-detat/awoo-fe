import base64 from "base-64";

global.atob = base64.decode;
global.btoa = base64.encode;

const ENV = {
  baseUrl: "wss://ws.werewolf.live",
};

export default ENV;
