import { useEffect, useState } from "react";
import "./Timetable.css";
import { API_BASE_URL } from "./api";

function Timetable() {
  const [timetable, setTimetable] = useState([]);
  const [message, setMessage] = useState("Loading timetable...");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const studentId = localStorage.getItem("studentId");

    if (!token || !studentId) {
      window.location.href = "/";
      return;
    }

    fetch(
      `${API_BASE_URL}/api/timetable/student/${studentId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load timetable");
        }

        return response.json();
      })
      .then((data) => {
        setTimetable(data);
        setMessage("");
      })
      .catch((error) => {
        console.error(error);
        setMessage("Cannot load timetable");
      });
  }, []);

  if (message) {
    return <h2>{message}</h2>;
  }

  return (
    <div className="timetable-page">

      <button
        className="back-button"
        onClick={() => {
          window.location.href = "/dashboard";
        }}
      >
        ← Back to Dashboard
      </button>

      <h1>Timetable</h1>

      {timetable.length === 0 ? (
        <p className="no-timetable">
          No timetable records found.
        </p>
      ) : (
        timetable.map((record) => (
          <div
            className="timetable-card"
            key={record.id}
          >
            <p>
              <strong>Subject:</strong>{" "}
              {record.subject}
            </p>

            <p>
              <strong>Day:</strong>{" "}
              {record.day}
            </p>

            <p>
              <strong>Time:</strong>{" "}
              {record.startTime} - {record.endTime}
            </p>

            <p>
              <strong>Room:</strong>{" "}
              {record.room}
            </p>
          </div>
        ))
      )}

    </div>
  );
}

export default Timetable;