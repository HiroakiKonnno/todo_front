import apiClient from "@/lib/axios";

export const fetchUsers = async () => {
  const response = await apiClient.get("/helloworld");
  return response.data; // APIのレスポンスをそのまま返す
};
