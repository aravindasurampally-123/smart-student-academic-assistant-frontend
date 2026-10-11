import { useEffect, useState } from "react";
import "./Dashboard.css";
import { API_BASE_URL } from "./api";

function Dashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [message, setMessage] = useState("Loading dashboard...");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const studentId = localStorage.getItem("studentId");

    if (!token || !studentId) {
      window.location.href = "/";
      return;
    }

    fetch(`${API_BASE_URL}/api/dashboard/${studentId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load dashboard");
        }

        return response.json();
      })
      .then((data) => {
        setDashboard(data);
        setMessage("");
      })
      .catch((error) => {
        console.error(error);
        setMessage("Cannot load dashboard");
      });
  }, []);

  if (message) {
    return <h2>{message}</h2>;
  }

  return (
    <div className="dashboard">

      <div className="dashboard-header">
        <h1>Smart Student Academic Assistant</h1>

        <h2>Welcome, {dashboard.student.name}</h2>

        <p>Email: {dashboard.student.email}</p>
      </div>

      <h2 className="summary-title">
        Academic Summary
      </h2>

      <div className="summary-grid">

        <div
          className="summary-card clickable"
          onClick={() => {
            window.location.href = "/subjects";
          }}
        >
          <h3>Subjects</h3>
          <p>{dashboard.subjects.length}</p>
        </div>

        <div
          className="summary-card clickable"
          onClick={() => {
            window.location.href = "/attendance";
          }}
        >
          <h3>Attendance</h3>
          <p>{dashboard.attendance.length}</p>
        </div>

        <div
          className="summary-card clickable"
          onClick={() => {
            window.location.href = "/marks";
          }}
        >
          <h3>Marks</h3>
          <p>{dashboard.marks.length}</p>
        </div>

        <div
          className="summary-card clickable"
          onClick={() => {
            window.location.href = "/assignments";
          }}
        >
          <h3>Assignments</h3>
          <p>{dashboard.assignments.length}</p>
        </div>

        <div
          className="summary-card clickable"
          onClick={() => {
            window.location.href = "/notifications";
          }}
        >
          <h3>Notifications</h3>
          <p>{dashboard.notifications.length}</p>
        </div>

        <div
          className="summary-card clickable"
          onClick={() => {
            window.location.href = "/study-materials";
          }}
        >
          <h3>Study Materials</h3>
          <p>{dashboard.studyMaterials.length}</p>
        </div>

        <div
          className="summary-card clickable"
          onClick={() => {
            window.location.href = "/study-progress";
          }}
        >
          <h3>Study Progress</h3>
          <p>{dashboard.studyProgress.length}</p>
        </div>

        <div
          className="summary-card clickable"
          onClick={() => {
            window.location.href = "/timetable";
          }}
        >
          <h3>Timetable</h3>
          <p>{dashboard.timetable.length}</p>
        </div>

      </div>

    </div>
  );
}

export default Dashboard;