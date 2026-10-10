import { useState } from "react";
import "./App.css";

import Dashboard from "./Dashboard";
import Attendance from "./Attendance";
import Marks from "./Marks";
import Assignments from "./Assignments";
import Notifications from "./Notifications";
import StudyMaterials from "./StudyMaterials";
import StudyProgress from "./StudyProgress";
import Timetable from "./Timetable";
import Subjects from "./Subjects";
import Register from "./Register";

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";


function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");


  const handleLogin = async (e) => {

    e.preventDefault();

    setMessage("Logging in...");

    try {

      const response = await fetch(
        "http://localhost:8080/api/students/login",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            email: email,
            password: password,
          }),
        }
      );


      const data = await response.json();


      if (response.ok) {

        localStorage.setItem("token", data.token);

        localStorage.setItem(
          "studentId",
          data.studentId
        );

        localStorage.setItem(
          "studentName",
          data.name
        );

        localStorage.setItem(
          "studentEmail",
          data.email
        );

        window.location.href = "/dashboard";

      } else {

        setMessage("Invalid email or password");

      }

    } catch (error) {

      console.error(error);

      setMessage("Cannot connect to backend");

    }

  };


  return (

    <div className="login-container">

      <div className="login-box">

        <h1>Smart Student</h1>

        <h2>Academic Assistant</h2>

        <p className="login-subtitle">
          Student Login
        </p>


        <form onSubmit={handleLogin}>

          <label>Email</label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />


          <label>Password</label>

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />


          <button type="submit">
            Login
          </button>

        </form>


        {message && (

          <p className="message">
            {message}
          </p>

        )}


        <p className="login-link">
          Don't have an account?{" "}

          <span
            onClick={() => {
              window.location.href = "/register";
            }}
          >
            Register
          </span>

        </p>

      </div>

    </div>

  );

}


function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/attendance"
          element={<Attendance />}
        />

        <Route
          path="/marks"
          element={<Marks />}
        />

        <Route
          path="/assignments"
          element={<Assignments />}
        />

        <Route
          path="/notifications"
          element={<Notifications />}
        />

        <Route
          path="/study-materials"
          element={<StudyMaterials />}
        />

        <Route
          path="/study-progress"
          element={<StudyProgress />}
        />

        <Route
          path="/timetable"
          element={<Timetable />}
        />

        <Route
          path="/subjects"
          element={<Subjects />}
        />

        <Route
          path="*"
          element={<Navigate to="/" />}
        />

      </Routes>

    </BrowserRouter>

  );

}


export default App;