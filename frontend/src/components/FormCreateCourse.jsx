import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from "../assets/logo.png";

export function FormCreateCourse() {
  const [title, setTitle] = useState('');
  const [semester, setSemester] = useState('');
  const [details, setDetails] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleCreateCourse = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3000/api/course', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ title, details, semester }) // Send all fields as per schema
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Course created successfully');
        navigate('/view-courses'); // Redirect to home page
      } else {
        setMessage(data.message || 'Course creation failed');
      }
    } catch (error) {
      setMessage('An error occurred during course creation');
      console.error(error);
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 pt-32 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Your Company"
            src={logo}
            className="mx-auto h-24 w-auto"
          />
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Create your Course
          </h2>
          {message && (
            <div className="text-center text-sm font-semibold text-yellow-600 mt-4">
              {message}
            </div>
          )}
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleCreateCourse} className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm/6 font-medium text-gray-900">
                Title
              </label>
              <div className="mt-2">
                <input
                  id="title"
                  name="title"
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <label htmlFor="semester" className="block text-sm/6 font-medium text-gray-900">
                Semester
              </label>
              <div className="mt-2">
                <input
                  id="semester"
                  name="semester"
                  type="text"
                  required
                  value={semester}
                  onChange={(e) => setSemester(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <label htmlFor="details" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                id="details"
                name="details"
                rows="4"
                required
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder="Write details about your course..."
                className="mt-2 w-full rounded-lg border-gray-200 shadow-sm sm:text-sm focus:ring-yellow-600"
              ></textarea>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-blue-950 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-yellow-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600"
              >
                Create Course
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
