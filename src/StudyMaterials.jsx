import { useEffect, useState } from "react";
import "./StudyMaterials.css";
import { API_BASE_URL } from "./api";

function StudyMaterials() {
  const [materials, setMaterials] = useState([]);
  const [message, setMessage] = useState("Loading study materials...");

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch(`${API_BASE_URL}/api/study-materials`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load study materials");
        }

        return response.json();
      })
      .then((data) => {
        setMaterials(data);
        setMessage("");
      })
      .catch((error) => {
        console.error(error);
        setMessage("Cannot load study materials");
      });
  }, []);

  if (message) {
    return <h2>{message}</h2>;
  }

  return (
    <div className="study-materials-page">

      <button
        className="back-button"
        onClick={() => {
          window.location.href = "/dashboard";
        }}
      >
        ← Back to Dashboard
      </button>

      <h1>Study Materials</h1>

      {materials.length === 0 ? (
        <p className="no-materials">
          No study materials found.
        </p>
      ) : (
        materials.map((material) => (
          <div
            className="material-card"
            key={material.id}
          >

            <h3>{material.title}</h3>

            <p>
              <strong>Subject ID:</strong>{" "}
              {material.subjectId}
            </p>

            <p>
              <strong>Type:</strong>{" "}
              {material.type ||
                material.materialType ||
                material.fileType ||
                "PDF"}
            </p>

            {material.url && (
              <a
                href={material.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                Open Material
              </a>
            )}

          </div>
        ))
      )}

    </div>
  );
}

export default StudyMaterials;