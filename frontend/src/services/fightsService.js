import api from "../api/api";

export const FightsAPI = {
  list: () => api.get("/fight/"),
  create: (data) => api.post("/fight/", data),
  update: (id, data) => api.patch(`/fight/${id}/`, data),
  delete: (id) => api.delete(`/fight/${id}/`),
};