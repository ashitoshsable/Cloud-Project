import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Navbar } from "../components/Navbar";

export function EditCourse() {
  const { courseId } = useParams(); // Extract `courseId` from the URL
  const [title, setTitle] = useState('');
  const [semester, setSemester] = useState('');
  const [details, setDetails] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    async function fetchCourseData() {
      try {
        console.log('Course ID:', courseId); // Check if courseId is logged correctly
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:3000/api/course/${courseId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch course details');
        }

        const data = await response.json();
        setTitle(data.title);
        setSemester(data.semester);
        setDetails(data.details);
      } catch (error) {
        console.error('Error fetching course data:', error);
        setMessage('Failed to load course data');
      }
    }

    fetchCourseData();
  }, [courseId]);

  const handleUpdateCourse = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3000/api/course/${courseId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ title, semester, details })
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Course updated successfully');
      } else {
        setMessage(data.message || 'Failed to update course');
      }
    } catch (error) {
      setMessage('An error occurred during course update');
      console.error(error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex min-h-full flex-1 pt-32 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
            Edit Course
          </h2>
          {message && (
            <div className="text-center text-sm font-semibold text-yellow-600 mt-4">
              {message}
            </div>
          )}
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleUpdateCourse} className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-900">
                Title
              </label>
              <input
                id="title"
                name="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-yellow-600 focus:border-yellow-600 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="semester" className="block text-sm font-medium text-gray-900">
                Semester
              </label>
              <input
                id="semester"
                name="semester"
                type="text"
                value={semester}
                onChange={(e) => setSemester(e.target.value)}
                required
                className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-yellow-600 focus:border-yellow-600 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="details" className="block text-sm font-medium text-gray-900">
                Details
              </label>
              <textarea
                id="details"
                name="details"
                rows="4"
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                required
                className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-yellow-600 focus:border-yellow-600 sm:text-sm"
              />
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-950 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-600"
              >
                Update Course
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
