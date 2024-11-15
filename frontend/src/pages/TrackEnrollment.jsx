import { useEffect, useState } from 'react';
import { FooterSection } from "../components/FooterSection";
import { Navbar } from "../components/Navbar";
import { TrackEnrollmentCard } from "../components/TrackEnrollmentCard";

function EncouragingCard() {
  return (
    <div className="text-center max-w-xl mx-auto">
      <h2 className="text-2xl font-semibold text-gray-900">
      You haven’t enrolled in any courses yet!
      </h2>
      <p className="mt-4 text-lg text-gray-500">
      Discover great courses and start your learning journey today.
      </p>
      <div className="mt-6">
        <a
          href="/view-courses"
          className="inline-block rounded-md bg-blue-950 px-5 py-3 text-sm font-semibold text-white shadow-md hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:ring-offset-2"
        >
          Explore Courses
        </a>
      </div>
    </div>
  );
}

export default function TrackEnrollment() {
  const [courses, setCourses] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token'); // Retrieve the token from localStorage
    setIsLoggedIn(!!token); // Check if the user is logged in

    if (token) {
      async function fetchCourses() {
        try {
          const response = await fetch('http://localhost:3000/api/enrolled-courses/', {
            headers: {
              Authorization: `Bearer ${token}`, // Include the token in the Authorization header
              'Content-Type': 'application/json',
            },
          });

          if (!response.ok) {
            throw new Error('Failed to fetch courses');
          }

          const data = await response.json();
          setCourses(data); // Set the fetched data
        } catch (error) {
          console.error('Error fetching courses:', error);
        }
      }

      fetchCourses();
    }
  }, []);

  if (!isLoggedIn) {
    return (
      <>
        <Navbar />
        <main className="flex items-center justify-center min-h-screen bg-white">
          <div className="text-center max-w-xl mx-auto">
            <p className="text-base font-semibold text-yellow-600">Restricted</p>
            <h1 className="mt-4 text-5xl font-bold tracking-tight text-gray-900 sm:text-7xl">
              This operation requires a signup
            </h1>
            <p className="mt-6 text-lg text-gray-500">
              Sorry, you need to sign up or log in to access this page.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="/signup"
                className="rounded-md bg-blue-950 px-5 py-3 text-sm font-semibold text-white shadow-md hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:ring-offset-2"
              >
                Signup
              </a>
              <a
                href="/support"
                className="text-sm font-semibold text-gray-900 hover:text-yellow-600"
              >
                Contact support <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>
        </main>
        <FooterSection />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center pt-28 pb-4 bg-gray-50 min-h-screen space-y-6">
        {courses.length > 0 ? (
          courses.map((course) => (
            <TrackEnrollmentCard
              key={course._id}
              title={course.title}
              details={course.details}
              id={course._id}
            />
          ))
        ) : (
          <EncouragingCard />
        )}
      </div>
      <FooterSection />
    </>
  );
}
