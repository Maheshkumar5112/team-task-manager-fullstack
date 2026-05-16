import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [data, setData] = useState({
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0,
    overdueTasks: 0
  });

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          "http://localhost:5000/api/tasks/dashboard",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        setData(res.data);
      } catch (error) {
        console.error(error.response?.data || error.message);
      }
    };

    fetchDashboard();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <h2 className="text-3xl font-bold mb-6">
        Dashboard
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

        <div className="bg-white p-5 rounded-xl shadow">
          <h3 className="text-gray-500">Total Tasks</h3>
          <p className="text-2xl font-bold">{data.totalTasks}</p>
        </div>

        <div className="bg-green-100 p-5 rounded-xl shadow">
          <h3 className="text-gray-600">Completed</h3>
          <p className="text-2xl font-bold">{data.completedTasks}</p>
        </div>

        <div className="bg-yellow-100 p-5 rounded-xl shadow">
          <h3 className="text-gray-600">Pending</h3>
          <p className="text-2xl font-bold">{data.pendingTasks}</p>
        </div>

        <div className="bg-red-100 p-5 rounded-xl shadow">
          <h3 className="text-gray-600">Overdue</h3>
          <p className="text-2xl font-bold">{data.overdueTasks}</p>
        </div>

      </div>

    </div>
  );
}

export default Dashboard;