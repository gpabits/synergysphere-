import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function Navbar() {
  return (
    <nav className="bg-gray-900 text-white px-6 py-3 flex gap-4">
      <Link to="/">Home</Link>
      <Link to="/login">Login</Link>
      <Link to="/signup">Sign Up</Link>
      <Link to="/projects">Projects</Link>
      <Link to="/tasks">My Tasks</Link>
      <Link to="/projects/create">Create Project</Link>
    </nav>
  );
}

function Home() {
  return <h1 className="p-6 text-2xl">Welcome to SynergySphere!</h1>;
}

function Projects() {
  return <h1 className="p-6 text-2xl">Projects View</h1>;
}

function MyTasks() {
  return <h1 className="p-6 text-2xl">My Tasks View</h1>;
}

function CreateProject() {
  return <h1 className="p-6 text-2xl">Project Create View</h1>;
}

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/tasks" element={<MyTasks />} />
        <Route path="/projects/create" element={<CreateProject />} />
      </Routes>
    </Router>
  );
}
