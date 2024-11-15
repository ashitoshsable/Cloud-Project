import { useEffect, useState } from 'react';
import { FooterSection } from "../components/FooterSection";
import { Navbar } from "../components/Navbar";
import { CardViewCourses } from "../components/CardViewCourses";

export default function ViewCourses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    async function fetchCourses() {
      try {
        const response = await fetch('http://localhost:3000/api/courses/');
        const data = await response.json();
        setCourses(data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    }
  
    fetchCourses();
  }, []);  

  async function enrollCourse(courseId) {
    try {
      const response = await fetch(`http://localhost:3000/api/enroll/${courseId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // Use auth token if required
        },
      });
      
      if (response.ok) {
        alert('Enrollment successful!');
        // Optionally, update the UI to reflect the enrollment
      } else {
        const errorMessage = await response.text();
        alert(`Enrollment failed: ${errorMessage}`);
      }
    } catch (error) {
      console.error('Error enrolling in course:', error);
      alert('An error occurred during enrollment.');
    }
  }

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center pt-28 pb-4 bg-gray-50 min-h-screen space-y-6">
      {courses.map((course) => (
        <CardViewCourses 
          key={course._id} 
          courseId={course._id} 
          title={course.title} 
          details={course.details} 
          creator={course.creator?.name} 
          onEnroll={() => enrollCourse(course._id)}
        />
      ))} 
      </div>
      <FooterSection />
    </>
  );
}
