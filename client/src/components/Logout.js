import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logOutUser } from "../Redux/Slice/authSlice";
import axios from "axios";
import { loginUrl } from "../constant";
import toast from "react-hot-toast";
import { setALlTasks, setProfile, setUsers } from "../Redux/Slice/userSlice";
import { setMyTasks } from "../Redux/Slice/taskSlice";

export const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const { data } = await axios.get(`${loginUrl}/logout`);
      dispatch(logOutUser());
      dispatch(setUsers(null));
      dispatch(setProfile(null));
      dispatch(setALlTasks(null));
      dispatch(setMyTasks(null));
      toast.success(data?.message);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  return handleLogout;
};
