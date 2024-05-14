import ApiClient from "@utils/apiClient/apiClient";
import config from "@constants/config";

// example:
// export const getAsiClassesAPI = () => {
//   const inspectionApiClient = new ApiClient(config.baseUrl);

//   return inspectionApiClient.get("/api/v1/customers");
// };

export const getTodosTestAPI = () => {
  const inspectionApiClient = new ApiClient("https://jsonplaceholder.typicode.com/todos");

  return inspectionApiClient.get("/1");
};
