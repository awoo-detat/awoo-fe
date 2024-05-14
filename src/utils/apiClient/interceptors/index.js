import { getStore } from "@store/index";
import { INSPECTION_SET_UPDATING } from "@store/inspection/actionTypes";

const interceptors = {
  response: {
    success(response) {
      return response;
    },
    async error(error) {
      if (error) {
        const status = error.response?.status;
        const { config, code: errorCode } = error;
        const { url: configUrl = "" } = config;
        const store = getStore();

        // handle request to inspections api timeouts
        const connectionDidTimeout = errorCode === "ECONNABORTED";
        if (connectionDidTimeout) {
          if (configUrl.includes("/inspections")) {
            store.dispatch({ type: INSPECTION_SET_UPDATING, payload: { updating: false } });
          }
          return Promise.reject(error);
        }

        switch (status) {
          // TODO: build out error handling for various status codes
          default:
            return Promise.reject(error);
        }
      }
    },
  },
};

const installInterceptors = (axiosInstance) => {
  axiosInstance.interceptors.response.use(
    interceptors.response.success,
    interceptors.response.error
  );
  return axiosInstance;
};

export { installInterceptors };
