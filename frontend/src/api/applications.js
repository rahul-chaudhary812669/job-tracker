import api from "./axios";

export const getApplications = () => api.get("/api/applications");
export const createApplications = (data) => api.post("/api/applications", data);
export const updateApplications = (id, data) =>
  api.put(`/api/applications/${id}`, data);
export const deleteApplications = (id) => api.delete(`/api/applications/${id}`);
