import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Landing } from "./pages/Landing";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import ViewCourses from "./pages/ViewCourses";
import ManageCourses from "./pages/ManageCourses";
import TrackEnrollment from "./pages/TrackEnrollment";
import { CreateCourse } from "./pages/CreateCourse";
import { EditCourse } from "./pages/EditCourse";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/view-courses" element={<ViewCourses />} />
        <Route path="/manage-courses" element={<ManageCourses />} />
        <Route path="/track-enrollment" element={<TrackEnrollment />} />
        <Route path="/create-course" element={<CreateCourse />} />
        <Route path="/edit-course/:courseId" element={<EditCourse />} />
      </Routes>
    </Router>
  );
}

export default App;
