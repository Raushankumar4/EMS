import requests from "./AxiosConfig";

const AdminServices = {
   getAllEmployes() {
    return requests.get("/employee/getAllUser");
  },
    getAllCompletedTask(){
    return requests.get("/admin/allCompletedTask")
  }
};

export default AdminServices;
