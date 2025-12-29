import api from "../api/api";

export const FightsAPI = {
  list: () => api.get("/fight/fights/"),
  create: (data) => api.post("/fight/fights/", data),
  update: (id, data) => api.patch(`/fight/fights/${id}/`, data),
  delete: (id) => api.delete(`/fight/fights/${id}/`),
  listSections: () => api.get("/fight/sections/"),
};
