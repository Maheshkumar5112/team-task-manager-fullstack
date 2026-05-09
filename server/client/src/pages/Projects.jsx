import { useEffect, useState } from "react";
import axios from "axios";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: ""
  });

  const token = localStorage.getItem("token");

  const fetchProjects = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/projects",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

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
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:5000/api/projects",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("Project created");

      setFormData({
        title: "",
        description: ""
      });

      fetchProjects();
    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  };

  return (
    <div>
      <h2>Projects</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Project title"
          value={formData.title}
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="text"
          name="description"
          placeholder="Project description"
          value={formData.description}
          onChange={handleChange}
        />

        <br /><br />

        <button type="submit">Create Project</button>
      </form>

      <hr />

      {projects.map((project) => (
        <div key={project._id}>
          <h3>{project.title}</h3>
          <p>{project.description}</p>
          <p><b>ID:</b> {project._id}</p>
        </div>
      ))}
    </div>
  );
}

export default Projects;