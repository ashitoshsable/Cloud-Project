import { useEffect, useState } from 'react';
import { FooterSection } from "../components/FooterSection";
import { Navbar } from "../components/Navbar";
import { CardViewCourses } from "../components/CardViewCourses";


export default function ManageCourses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    async function fetchCourses() {
      try {
        const response = await fetch('http://localhost:3000/api/courses/'); // Fetch from the backend
        const data = await response.json();
        setCourses(data); // Set the fetched data
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    }

    fetchCourses();
  }, []);

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center pt-28 pb-4 bg-gray-50 min-h-screen space-y-6">
        {courses.map((course) => (
          <CardViewCourses key={course._id} title={course.title} details={course.details} />
        ))}
      </div>
      <FooterSection />
    </>
  );
}
