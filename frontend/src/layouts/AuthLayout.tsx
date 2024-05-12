import { useAuthStore } from "@/store/user";
import {
  Link,
  Outlet,
  useLocation,
  Navigate,
  useSearchParams,
} from "react-router-dom";

const AuthLayout = () => {
  const location = useLocation();
  const isRegister = location.pathname === "/register";

  const [params] = useSearchParams();

  const error = Boolean(params.get("error"));

  const user = useAuthStore((state) => state.user);

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-md shadow-md">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold text-gray-800">
            {isRegister ? "Registration" : "Login"}
          </h1>
          {error && (
            <p className="text-red-500 text-sm">
              Session expired. Please login again.
            </p>
          )}
        </div>
        <Outlet />
        <p className="mt-2">
          {isRegister ? "Already" : "Don't"} have an account?{" "}
          <Link
            className="text-blue-500 hover:underline"
            to={isRegister ? "/login" : "/register"}
          >
            {isRegister ? "Login" : "Register"}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AuthLayout;
