import { useEffect, useState } from 'react';
import { FooterSection } from "../components/FooterSection";
import { Navbar } from "../components/Navbar";
import { ManageCourseCard } from "../components/ManageCourseCard";

function RestrictedAccessCard() {
  return (
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
  );
}

function NoCoursesCard() {
  return (
    <div className="text-center max-w-xl mx-auto">
      <h2 className="text-2xl font-semibold text-gray-900">
        You haven't created any courses yet.
      </h2>
      <p className="mt-4 text-lg text-gray-500">
        Start creating your courses and share your knowledge with others!
      </p>
      <div className="mt-6">
        <a
          href="/create-course"
          className="inline-block rounded-md bg-blue-950 px-5 py-3 text-sm font-semibold text-white shadow-md hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:ring-offset-2"
        >
          Create Your First Course
        </a>
      </div>
    </div>
  );
}

export default function ManageCourses() {
  const [courses, setCourses] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);

    if (token) {
      async function fetchCourses() {
        try {
          const response = await fetch('http://localhost:3000/api/my-courses/', {
            headers: {
              'Authorization': `Bearer ${token}`, // Include token if auth is required
            },
          });
          if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
          }
          const data = await response.json();
          setCourses(data);
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
        <RestrictedAccessCard />
        <FooterSection />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center pt-28 pb-4 bg-gray-50 min-h-screen space-y-6">
        {courses.length === 0 ? (
          <NoCoursesCard />
        ) : (
          courses.map((course) => (
            <ManageCourseCard key={course._id} title={course.title} details={course.details} id={course._id} />
          ))
        )}
      </div>
      <FooterSection />
    </>
  );
}
