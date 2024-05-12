import { Route, Routes } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";
import MainLayout from "./layouts/MainLayout";
import Details from "./pages/Details";
import NewJob from "./pages/NewJob";
import Profile from "./pages/Profile";
import MyApplications from "./pages/MyApplications";
import PostedJobs from "./pages/PostedJobs";
import UpdateJob from "./pages/UpdateJob";

function App() {
  return (
    <>
      <Toaster />

      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm />} />
        </Route>

        <Route element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="/details/:id" element={<Details />} />
          <Route path="/newJob" element={<NewJob />} />
          <Route path="/updateJob/:id" element={<UpdateJob />} />
          {/* <Route path="/profile" element={<Profile />} /> */}
          <Route path="/applications" element={<MyApplications />} />
          <Route path="/postedJobs" element={<PostedJobs />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
