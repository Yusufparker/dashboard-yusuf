import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import Projects from "./pages/Projects/Projects";
import { SidebarProvider } from "./components/Context/SidebarContext";
import Blog from "./pages/Blog/Blog";
import CreateBlog from "./pages/Blog/CreateBlog";
import CreateProject from "./pages/Projects/CreateProject";
import Experiences from "./pages/Experiences/Experiences";
import CreateExperiences from "./pages/Experiences/CreateExperiences";




function App() {
  return (
    <SidebarProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} title="Login" />
          <Route path="/" element={<PrivateRoute element={<Dashboard />} />} />

          {/* blog */}
          <Route path="/blog" element={<PrivateRoute element={<Blog />} />} />
          <Route path="/blog/create" element={<PrivateRoute element={<CreateBlog />} />} />

          {/* project */}
          <Route path="/projects" element={<PrivateRoute element={<Projects />} />} />
          <Route path="/projects/create" element={<PrivateRoute element={<CreateProject />} />} />

          {/* experiences */}
          <Route path="/experiences" element={<PrivateRoute element={<Experiences />} />} />
          <Route path="/experiences/create" element={<PrivateRoute element={<CreateExperiences />} />} />
        </Routes>
      </Router>
    </SidebarProvider>
  );
}

export default App;
