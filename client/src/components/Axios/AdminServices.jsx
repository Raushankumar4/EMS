import requests from "./AxiosConfig";

const AdminServices = {
  getAllEmployes() {
    return requests.get("/employee/getAllUser");
  },
  getAllCompletedTask() {
    return requests.get("/admin/allCompletedTask");
  },
  ctreateWorKForEmplpyees(id, data) {
    return requests.post(`/admin/createTask/${id}`, data);
  },
  deleteTask(id) {
    return requests.delete(`/admin/delete/${id}`);
  },
};

export default AdminServices;
