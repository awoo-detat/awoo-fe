const interceptors = {
  response: {
    success(response) {
      return response;
    },
    async error(error) {
      if (error) {
        const status = error.response?.status;
        const { code: errorCode } = error;
        const connectionDidTimeout = errorCode === "ECONNABORTED";
        if (connectionDidTimeout) {
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
