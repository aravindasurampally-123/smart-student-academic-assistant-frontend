import { useEffect, useState } from "react";
import "./Subjects.css";
import { API_BASE_URL } from "./api";

function Subjects() {
  const [subjects, setSubjects] = useState([]);
  const [message, setMessage] = useState("Loading subjects...");

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch(`${API_BASE_URL}/api/subjects`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load subjects");
        }

        return response.json();
      })
      .then((data) => {
        setSubjects(data);
        setMessage("");
      })
      .catch((error) => {
        console.error(error);
        setMessage("Cannot load subjects");
      });
  }, []);

  if (message) {
    return <h2>{message}</h2>;
  }

  return (
    <div className="subjects-page">

      <button
        className="back-button"
        onClick={() => {
          window.location.href = "/dashboard";
        }}
      >
        ← Back to Dashboard
      </button>

      <h1>Subjects</h1>

      {subjects.length === 0 ? (
        <p className="no-subjects">
          No subjects found.
        </p>
      ) : (
        subjects.map((subject) => (
          <div
            className="subject-card"
            key={subject.id}
          >
            <h3>{subject.name}</h3>

            <p>
              <strong>Subject Code:</strong>{" "}
              {subject.code}
            </p>

            <p>
              <strong>Department:</strong>{" "}
              {subject.department}
            </p>

            <p>
              <strong>Year:</strong>{" "}
              {subject.year}
            </p>
          </div>
        ))
      )}

    </div>
  );
}

export default Subjects;