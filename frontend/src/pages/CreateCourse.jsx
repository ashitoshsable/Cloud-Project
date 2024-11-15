import { useState, useEffect } from 'react';
import { Navbar } from "../components/Navbar";
import { FormCreateCourse } from "../components/FormCreateCourse";
import { FooterSection } from "../components/FooterSection";

export function CreateCourse() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token'); // Retrieve the token from localStorage
    setIsLoggedIn(!!token); // Check if the user is logged in
  }, []);

  if (!isLoggedIn) {
    return (
      <>
        <Navbar />
        <main className="flex items-center justify-center min-h-screen bg-white">
          <div className="text-center max-w-xl mx-auto">
            <p className="text-base font-semibold text-indigo-600">Restricted</p>
            <h1 className="mt-4 text-5xl font-bold tracking-tight text-gray-900 sm:text-7xl">
              This operation requires a signup
            </h1>
            <p className="mt-6 text-lg text-gray-500">
              Sorry, you need to sign up or log in to access this page.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="/signup"
                className="rounded-md bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
              >
                Signup
              </a>
              <a
                href="/support"
                className="text-sm font-semibold text-gray-900 hover:text-indigo-600"
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
      <FormCreateCourse />
      {/* Uncomment the footer section if required */}
      {/* <FooterSection /> */}
    </>
  );
}
