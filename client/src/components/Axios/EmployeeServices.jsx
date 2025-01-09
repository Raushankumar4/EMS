import requests from "./AxiosConfig";

const EmployeeServices = {
  getProfile() {
    return requests.get("/employee/getProfile");
  },
  updateUserProfile(data) {
    return requests.put("/employee/updateProfile", data);
  },
  registerUser(data) {
    return requests.post("/user/register", data);
  },
  loginUser(data) {
    return requests.post("/user/login", data);
  },
};

export default EmployeeServices;
