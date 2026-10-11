import { useEffect, useState } from "react";
import "./Marks.css";
import { API_BASE_URL } from "./api";

function Marks() {
  const [marks, setMarks] = useState([]);
  const [message, setMessage] = useState("Loading marks...");

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch(`${API_BASE_URL}/api/marks`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load marks");
        }

        return response.json();
      })
      .then((data) => {
        setMarks(data);
        setMessage("");
      })
      .catch((error) => {
        console.error(error);
        setMessage("Cannot load marks");
      });
  }, []);

  if (message) {
    return <h2>{message}</h2>;
  }

  return (
    <div className="marks-page">

      <button
        className="back-button"
        onClick={() => {
          window.location.href = "/dashboard";
        }}
      >
        ← Back to Dashboard
      </button>

      <h1>Marks</h1>

      {marks.length === 0 ? (
        <p className="no-marks">
          No marks records found.
        </p>
      ) : (
        marks.map((record) => (
          <div className="marks-card" key={record.id}>

            <p>
              <strong>Subject ID:</strong> {record.subjectId}
            </p>

            <p>
              <strong>Exam Type:</strong> {record.examType}
            </p>

            <p>
              <strong>Marks Obtained:</strong>{" "}
              {record.marksObtained}
            </p>

            <p>
              <strong>Total Marks:</strong>{" "}
              {record.totalMarks}
            </p>

          </div>
        ))
      )}

    </div>
  );
}

export default Marks;