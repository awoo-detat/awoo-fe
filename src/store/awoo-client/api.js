import ApiClient from "@utils/apiClient/apiClient";
import config from "@constants/config";

export const getTodosTestAPI = () => {
  const inspectionApiClient = new ApiClient(config.baseUrl);

  return inspectionApiClient.get("", { type: "awoo" });
};
