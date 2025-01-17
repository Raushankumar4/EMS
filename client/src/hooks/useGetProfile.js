import { useQuery } from "@tanstack/react-query";
import EmployeeServices from "../components/Axios/EmployeeServices";
import { setProfile } from "../Redux/Slice/userSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export const useGetProfile = () => {
  const dispatch = useDispatch();
  const {
    data: profile,
    isError,
    isLoading,
    error,
    status,
  } = useQuery({
    queryKey: ["profile"],
    queryFn: EmployeeServices.getProfile,
    staleTime: 0,
    gcTime: 0,
    onSuccess: () => {
      console.log("Profile");
    },
    onError: (error) => {
      console.log(error);
    },
  });

  useEffect(() => {
    if (profile && profile?.user) {
      dispatch(setProfile(profile?.user));
    }
  }, [profile, dispatch]);
  return { profile, isError, isLoading, error, status };
};
