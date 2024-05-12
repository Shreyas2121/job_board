import { useMutation } from "@tanstack/react-query";
import { api } from ".";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { handleApiErrors } from "@/lib/utils";
import { useAuthStore } from "@/store/user";
import { User } from "@/lib/types";

export const useRegister = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (data: any) => {
      const res = await api.post("users/register", data);
      return res.data as {
        message: string;
      };
    },
    onSuccess: (data) => {
      toast.success(data.message);
      navigate("/login");
    },
    onError: handleApiErrors,
  });
};

export const useLogin = () => {
  const setUser = useAuthStore((state) => state.setUser);
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (data: { email: string; password: string }) => {
      const res = await api.post("users/login", data);
      return res.data as {
        message: string;
        user: User;
      };
    },
    onSuccess: (data) => {
      toast.success(data.message);
      setUser({ user: data.user });

      navigate("/");
    },
    onError: handleApiErrors,
  });
};

export const useLogout = () => {
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async () => {
      const res = await api.get("users/logout");
      return res.data as {
        message: string;
      };
    },
    onSuccess: (data) => {
      toast.success(data.message);
      logout();
      navigate("/login");
    },
    onError: handleApiErrors,
  });
};
