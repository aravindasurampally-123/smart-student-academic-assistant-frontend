
import { useEffect, useState } from "react";
import "./Attendance.css";
import { API_BASE_URL } from "./api";

function Attendance() {
  const [attendance, setAttendance] = useState([]);
  const [message, setMessage] = useState("Loading attendance...");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const studentId = localStorage.getItem("studentId");

    if (!token || !studentId) {
      window.location.href = "/";
      return;
    }

    fetch(`${API_BASE_URL}/api/attendance/student/${studentId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load attendance");
        }
        return response.json();
      })
      .then((data) => {
        setAttendance(data);
        setMessage("");
      })
      .catch((error) => {
        console.error("Attendance error:", error);
        setMessage("Cannot load attendance. Please try again.");
      });
  }, []);

  if (message) {
    return <h2>{message}</h2>;
  }

  return (
    <div className="attendance-page">
      <button
        className="back-button"
        onClick={() => {
          window.location.href = "/dashboard";
        }}
      >
        ← Back to Dashboard
      </button>

      <h1>Attendance</h1>

      {attendance.length === 0 ? (
        <p className="no-attendance">No attendance records found.</p>
      ) : (
        attendance.map((record) => (
          <div className="attendance-card" key={record.id}>
            <p>
              <strong>Subject ID:</strong> {record.subjectId}
            </p>
            <p>
              <strong>Date:</strong> {record.date}
            </p>
            <p>
              <strong>Status:</strong> {record.status}
            </p>
          </div>
        ))
      )}
    </div>
  );
}

export default Attendance;
