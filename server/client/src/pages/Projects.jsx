import { useEffect, useState } from "react";
import axios from "axios";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const token = localStorage.getItem("token");

  const fetchProjects = async () => {
    try {
      const res = await axios.get("https://dependable-comfort-production-9029.up.railway.app/api/projects", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProjects(res.data);
    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const createProject = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "https://dependable-comfort-production-9029.up.railway.app/api/projects",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setFormData({
        title: "",
        description: "",
      });

      fetchProjects();
    } catch (error) {
      console.error(error.response?.data || error.message);
      alert(error.response?.data?.message || "Project creation failed");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <h2 className="text-3xl font-bold mb-6">Projects</h2>

      <form
        onSubmit={createProject}
        className="bg-white rounded-2xl shadow p-5 mb-8 space-y-4"
      >
        <input
          type="text"
          name="title"
          placeholder="Project Title"
          value={formData.title}
          onChange={handleChange}
          className="border p-3 rounded-lg w-full"
          required
        />

        <input
          type="text"
          name="description"
          placeholder="Project Description"
          value={formData.description}
          onChange={handleChange}
          className="border p-3 rounded-lg w-full"
          required
        />

        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-lg"
        >
          Add Project
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div
            key={project._id}
            className="bg-white rounded-2xl shadow p-6"
          >
            <div className="text-4xl mb-4">📁</div>

            <h3 className="text-xl font-semibold mb-2">
              {project.title}
            </h3>

            <p className="text-gray-500 text-sm">
              {project.description}
            </p>

            <p className="text-xs text-gray-400 mt-3">
              Project ID: {project._id}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Projects;