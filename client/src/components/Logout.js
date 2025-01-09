import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logOutUser } from "../Redux/Slice/authSlice";
import axios from "axios";
import { loginUrl } from "../constant";
import toast from "react-hot-toast";

export const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const { data } = await axios.get(`${loginUrl}/logout`);
      dispatch(logOutUser());
      toast.success(data?.message);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  return handleLogout;
};
