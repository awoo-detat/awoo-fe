import axios from "axios";
import * as brotli from "brotli-js";
// import { getStore } from "@store/index";
import { installInterceptors } from "./interceptors";

class ApiClient {
  constructor(baseUri, timeout = 30) {
    // const store = getStore();
    this.baseUri = baseUri;
    this.timeout = timeout * 1000; // milliseconds, default is 30 seconds

    this.headers = {
      "Content-Type": "application/json",
      "Accept-Encoding": "gzip, br",
      // Authorization: store.getState().auth.tokens
      //   ? `Bearer ${store.getState().auth.tokens.jwtToken}`
      //   : null,
    };

    this.axiosInstance = axios.create({
      baseURL: this.baseUri,
      headers: this.headers,
      timeout: this.timeout,
      timeoutErrorMessage: "Awoo API request timed out.",
      ...(this.shouldCompressRequest && {
        transformRequest: axios.defaults.transformRequest.concat((data) => {
          if (data && this.shouldCompressRequest) {
            try {
              const buffer = Buffer.from(data);
              const compressed = brotli.default.compressArray(buffer, 3);
              const payload = new Uint8Array(compressed);
              return Buffer.from(payload);
            } catch (error) {
              return data;
            }
          }
          return data;
        }),
      }),
    });

    installInterceptors(this.axiosInstance);
  }

  get(url, params) {
    console.log(this.baseUri, url, params, `${this.baseUri}${url}`);
    const config = {
      url: `${this.baseUri}${url}`,
      method: "GET",
      params,
    };

    console.log({ config });

    return this.request(config);
  }

  post(url, data) {
    const config = {
      url: `${this.baseUri}${url}`,
      method: "POST",
      data,
    };
    return this.request(config);
  }

  put(url, data) {
    const config = {
      url: `${this.baseUri}${url}`,
      method: "PUT",
      data,
    };
    return this.request(config);
  }

  delete(url, params) {
    const config = {
      url: `${this.baseUri}${url}`,
      method: "DELETE",
      params,
    };

    return this.request(config);
  }

  request(config) {
    return this.axiosInstance.request(config);
  }
}

export default ApiClient;
