import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">

      <h1 className="text-xl font-bold text-blue-600">
        Team Task Manager
      </h1>

      <div className="flex gap-4 items-center">

        <Link to="/dashboard" className="text-gray-700 hover:text-blue-600">
          Dashboard
        </Link>

        <Link to="/projects" className="text-gray-700 hover:text-blue-600">
          Projects
        </Link>

        <Link to="/tasks" className="text-gray-700 hover:text-blue-600">
          Tasks
        </Link>

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-3 py-1 rounded"
        >
          Logout
        </button>

      </div>

    </nav>
  );
}

export default Navbar;