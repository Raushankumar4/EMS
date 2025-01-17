import requests from "./AxiosConfig";

const EmployeeServices = {
  getProfile() {
    return requests.get("/employee/getProfile");
  },
  updateUserProfile(data) {
    return requests.put("/employee/updateProfile", data);
  },
  getMyTask(id) {
    return requests.get(`employee/getMyTask/${id}`);
  },
  registerUser(data) {
    return requests.post("/user/register", data);
  },
  loginUser(data) {
    return requests.post("/user/login", data);
  },
  markAsCompleted(id) {
    return requests.put(`/employee/markAsCompleted/${id}`);
  },
  updateTaskStatus(id) {
    return requests.put(`/employee/updateTaskStatus/${id}`);
  },
};

export default EmployeeServices;
