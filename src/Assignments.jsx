import { useEffect, useState } from "react";
import "./Assignments.css";

function Assignments() {
  const [assignments, setAssignments] = useState([]);
  const [message, setMessage] = useState("Loading assignments...");

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:8080/api/assignments", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load assignments");
        }

        return response.json();
      })
      .then((data) => {
        setAssignments(data);
        setMessage("");
      })
      .catch((error) => {
        console.error(error);
        setMessage("Cannot load assignments");
      });
  }, []);

  if (message) {
    return <h2>{message}</h2>;
  }

  return (
    <div className="assignments-page">

      <button
        className="back-button"
        onClick={() => {
          window.location.href = "/dashboard";
        }}
      >
        ← Back to Dashboard
      </button>

      <h1>Assignments</h1>

      {assignments.length === 0 ? (
        <p className="no-assignments">
          No assignments found.
        </p>
      ) : (
        assignments.map((assignment) => (
          <div className="assignment-card" key={assignment.id}>

            <h3>{assignment.title}</h3>

            <p>
              <strong>Subject ID:</strong>{" "}
              {assignment.subjectId}
            </p>

            <p>
              <strong>Due Date:</strong>{" "}
              {assignment.dueDate}
            </p>

            <p>
              <strong>Status:</strong>{" "}
              {assignment.status}
            </p>

          </div>
        ))
      )}

    </div>
  );
}

export default Assignments;