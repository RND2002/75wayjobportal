import { Route, Routes } from "react-router-dom";
import AuthanticatedLayout from "./layout/Authenticated";
import BasicLayout from "./layout/Basic";

import Login from "./pages/login";
import Home from "./pages/home";
import Register from "./pages/register";
import JobsPage from "./pages/jobspage";


function App() {
  return (
    <Routes>
      <Route element={<AuthanticatedLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/jobs" element={<JobsPage />} />
      </Route>
      <Route element={<BasicLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
      </Route>
    </Routes>
  );
}

export default App;
