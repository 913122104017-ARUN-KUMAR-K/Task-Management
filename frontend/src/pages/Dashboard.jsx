import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import "../style/Dashboard.css";

export default function Dashboard() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({
    Title: "",
    Description: "",
  });
  const [editingId, setEditingId] = useState(null);

  // 🔹 Get Tasks
  const getTasks = async () => {
    try {
      const res = await API.get("/tasks");
      setTasks(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  // 🔹 Handle Input Change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔹 Create OR Update
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await API.put(`/tasks/${editingId}`, form);
        setEditingId(null);
      } else {
        await API.post("/tasks", form);
      }

      setForm({ Title: "", Description: "" });
      getTasks();
    } catch (error) {
      console.log(error);
    }
  };

  // 🔹 Delete
  const deleteTask = async (id) => {
    await API.delete(`/tasks/${id}`);
    getTasks();
  };

  // 🔹 Edit
  const editTask = (task) => {
    setForm({
      Title: task.Title,
      Description: task.Description,
    });
    setEditingId(task._id);
  };

  // 🔹 Toggle Status
  const toggleStatus = async (task) => {
    const newStatus =
      task.Status === "Complete" ? "Not complete" : "Complete";

    await API.put(`/tasks/${task._id}`, { Status: newStatus });
    getTasks();
  };

  // 🔹 Logout
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <h1 style="text-align: center;">Task Management</h1>
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>Task Dashboard</h2>
        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </div>

      <div className="form-card">
        <h3>{editingId ? "Edit Task" : "Create Task"}</h3>

        <form onSubmit={handleSubmit} className="task-form">
          <input
            name="Title"
            placeholder="Title"
            value={form.Title}
            onChange={handleChange}
            required
          />
          <input
            name="Description"
            placeholder="Description"
            value={form.Description}
            onChange={handleChange}
            required
          />
          <button type="submit">
            {editingId ? "Update Task" : "Add Task"}
          </button>
        </form>
      </div>

      <div className="tasks-section">
        <h3>Your Tasks</h3>

        {tasks.map((task) => (
          <div key={task._id} className="task-card">
            <span><b>Title:</b>{task.Title}</span><br /><br />
             <span><b>Description:</b>{task.Description}</span>

            <p>
              Status:{" "}
              <span
                className={
                  task.Status === "Complete"
                    ? "status-complete"
                    : "status-notcomplete"
                }
              >
                {task.Status}
              </span>
            </p>

            <div className="task-buttons">
              <button
                className="toggle-btn"
                onClick={() => toggleStatus(task)}
              >
               {
                task.Status === "Complete"
                    ? "status-notcomplete"
                    : "status-complete"
               } 
              </button>

              <button
                className="edit-btn"
                onClick={() => editTask(task)}
              >
                Edit
              </button>

              <button
                className="delete-btn"
                onClick={() => deleteTask(task._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
