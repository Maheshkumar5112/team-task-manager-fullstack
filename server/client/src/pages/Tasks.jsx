import { useEffect, useState } from "react";
import axios from "axios";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
    project: ""
  });

  const token = localStorage.getItem("token");

  const fetchTasks = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/tasks",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setTasks(res.data);
    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  };

  useEffect(() => {
    fetchTasks();
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
        "http://localhost:5000/api/tasks",
        {
          ...formData,
          status: "todo"
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("Task created");

      setFormData({
        title: "",
        description: "",
        dueDate: "",
        project: ""
      });

      fetchTasks();
    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  };

  const markDone = async (id) => {
    try {
      await axios.patch(
        `http://localhost:5000/api/tasks/${id}`,
        { status: "done" },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      fetchTasks();
    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  };

  return (
    <div>
      <h2>Tasks</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Task title"
          value={formData.title}
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="text"
          name="description"
          placeholder="Task description"
          value={formData.description}
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="date"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="text"
          name="project"
          placeholder="Project ID"
          value={formData.project}
          onChange={handleChange}
        />

        <br /><br />

        <button type="submit">Create Task</button>
      </form>

      <hr />

      {tasks.map((task) => (
        <div key={task._id}>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <p>Status: {task.status}</p>

          <button onClick={() => markDone(task._id)}>
            Mark Done
          </button>
        </div>
      ))}
    </div>
  );
}

export default Tasks;