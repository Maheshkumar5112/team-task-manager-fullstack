import { useEffect, useState } from "react";
import axios from "axios";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
    project: "",
    assignedTo: "",
  });

  const token = localStorage.getItem("token");

  // Fetch tasks
  const fetchTasks = async () => {
    try {
      setLoading(true);

      const res = await axios.get("http://localhost:5000/api/tasks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTasks(res.data);
    } catch (error) {
      console.error(error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Create task
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:5000/api/tasks",
        {
          ...formData,
          status: "todo",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setFormData({
        title: "",
        description: "",
        dueDate: "",
        project: "",
        assignedTo: "",
      });

      fetchTasks();
    } catch (error) {
      console.error(error.response?.data || error.message);
      alert(error.response?.data?.message || "Task creation failed");
    }
  };

  // Mark task done
  const markDone = async (id) => {
    try {
      await axios.patch(
        `http://localhost:5000/api/tasks/${id}`,
        { status: "done" },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchTasks();
    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  };

  // Loading screen
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg text-gray-600">
        Loading tasks...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-3xl font-bold mb-6">Tasks</h2>

      {/* Task Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded-xl shadow mb-6"
      >
        <input
          type="text"
          name="title"
          placeholder="Task Title"
          value={formData.title}
          onChange={handleChange}
          className="border p-2 w-full mb-3 rounded"
          required
        />

        <input
          type="text"
          name="description"
          placeholder="Task Description"
          value={formData.description}
          onChange={handleChange}
          className="border p-2 w-full mb-3 rounded"
          required
        />

        <input
          type="date"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleChange}
          className="border p-2 w-full mb-3 rounded"
          required
        />

        <input
          type="text"
          name="project"
          placeholder="Project ID"
          value={formData.project}
          onChange={handleChange}
          className="border p-2 w-full mb-3 rounded"
          required
        />

        <input
          type="text"
          name="assignedTo"
          placeholder="Assign User ID"
          value={formData.assignedTo}
          onChange={handleChange}
          className="border p-2 w-full mb-3 rounded"
        />

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 transition text-white px-4 py-2 rounded"
        >
          Create Task
        </button>
      </form>

      {/* Empty state */}
      {tasks.length === 0 && (
        <div className="text-center text-gray-500 mt-10">
          No tasks found. Create your first task 🚀
        </div>
      )}

      {/* Task cards */}
      <div className="space-y-4">
        {tasks.map((task) => (
          <div
            key={task._id}
            className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition flex justify-between items-center"
          >
            <div>
              <h3 className="text-lg font-bold">{task.title}</h3>
              <p className="text-gray-500">{task.description}</p>

              <p className="text-sm text-gray-400 mt-1">
                Assigned To: {task.assignedTo?._id || task.assignedTo || "Not Assigned"}
              </p>

              <span
                className={`inline-block mt-2 px-3 py-1 rounded text-sm ${
                  task.status === "done"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {task.status}
              </span>
            </div>

            {task.status !== "done" && (
              <button
                onClick={() => markDone(task._id)}
                className="bg-green-500 hover:bg-green-600 transition text-white px-4 py-2 rounded"
              >
                Mark Done
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Tasks;