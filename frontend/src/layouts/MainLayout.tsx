import { checkSession } from "@/api/query";
import Navbar from "@/components/Navbar";
import { useAuthStore } from "@/store/user";
import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";

const MainLayout = () => {
  const { logout, user } = useAuthStore((state) => state);

  useEffect(() => {
    const interval = setInterval(async () => {
      const res = await checkSession();
      if (!res.valid) {
        logout();
      }
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  if (!user) {
    return <Navigate to="/login?error=true" />;
  }

  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default MainLayout;
