import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [data, setData] = useState({});

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
    <div>
      <h2>Dashboard</h2>

      <h3>Total Tasks: {data.totalTasks}</h3>
      <h3>Completed Tasks: {data.completedTasks}</h3>
      <h3>Pending Tasks: {data.pendingTasks}</h3>
      <h3>Overdue Tasks: {data.overdueTasks}</h3>
    </div>
  );
}

export default Dashboard;