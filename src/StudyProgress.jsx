import { useEffect, useState } from "react";
import "./StudyProgress.css";
import { API_BASE_URL } from "./api";

function StudyProgress() {
  const [progress, setProgress] = useState([]);
  const [message, setMessage] = useState("Loading study progress...");

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch(`${API_BASE_URL}/api/study-progress`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load study progress");
        }

        return response.json();
      })
      .then((data) => {
        setProgress(data);
        setMessage("");
      })
      .catch((error) => {
        console.error(error);
        setMessage("Cannot load study progress");
      });
  }, []);

  if (message) {
    return <h2>{message}</h2>;
  }

  return (
    <div className="study-progress-page">

      <button
        className="back-button"
        onClick={() => {
          window.location.href = "/dashboard";
        }}
      >
        ← Back to Dashboard
      </button>

      <h1>Study Progress</h1>

      {progress.length === 0 ? (
        <p className="no-progress">
          No study progress records found.
        </p>
      ) : (
        progress.map((record) => (
          <div
            className="progress-card"
            key={record.id}
          >
            <p>
              <strong>Subject ID:</strong>{" "}
              {record.subjectId}
            </p>

            <p>
              <strong>Progress:</strong>{" "}
              {record.progressPercentage}%
            </p>

            <p>
              <strong>Completed Topics:</strong>{" "}
              {record.completedTopics}
            </p>
          </div>
        ))
      )}

    </div>
  );
}

export default StudyProgress;