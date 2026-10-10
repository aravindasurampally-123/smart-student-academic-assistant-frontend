import { useEffect, useState } from "react";
import "./Notifications.css";

function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [message, setMessage] = useState("Loading notifications...");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const studentId = localStorage.getItem("studentId");

    if (!token || !studentId) {
      window.location.href = "/";
      return;
    }

    fetch(
      `http://localhost:8080/api/notifications/student/${studentId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load notifications");
        }

        return response.json();
      })
      .then((data) => {
        setNotifications(data);
        setMessage("");
      })
      .catch((error) => {
        console.error(error);
        setMessage("Cannot load notifications");
      });
  }, []);

  if (message) {
    return <h2>{message}</h2>;
  }

  return (
    <div className="notifications-page">

      <button
        className="back-button"
        onClick={() => {
          window.location.href = "/dashboard";
        }}
      >
        ← Back to Dashboard
      </button>

      <h1>Notifications</h1>

      {notifications.length === 0 ? (
        <p className="no-notifications">
          No notifications found.
        </p>
      ) : (
        notifications.map((notification) => (
          <div
            className="notification-card"
            key={notification.id}
          >
            <h3>{notification.title}</h3>

            <p>
              {notification.message}
            </p>
          </div>
        ))
      )}

    </div>
  );
}

export default Notifications;