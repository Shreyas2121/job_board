// import { useAuthStore } from "@/store/user";
// import React from "react";
// import { Navigate } from "react-router-dom";

// const isAuthenticated = () => {
//   const { user } = useAuthStore();
//   return user !== null;
// };

// export const ProtectedRoute = ({ element }: { element: any }) => {
//   // Check if the user is authenticated
//   if (!isAuthenticated()) {
//     // Redirect to the login page if not authenticated
//     return <Navigate to="/login" replace />;
//   }

//   // Render the desired element (page/component) if authenticated
//   return element;
// };
