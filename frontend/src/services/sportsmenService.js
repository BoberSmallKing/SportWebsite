import api from "../api/api";

export const SportsmenAPI = {
  list: () => api.get("/sportsmen/"),
  retrieve: (id) => api.get(`/sportsmen/${id}/`),
  create: (data) => api.post("/sportsmen/", data),
  update: (id, data) => api.patch(`/sportsmen/${id}/`, data),
  delete: (id) => api.delete(`/sportsmen/${id}/`),
};
