import { useState } from 'react';

export function TrackEnrollmentCard({ title, details, id }) {
  const [isUnenrolling, setIsUnenrolling] = useState(false);
  const [error, setError] = useState(null);

  const handleUnenroll = async () => {
    setIsUnenrolling(true);
    const token = localStorage.getItem('token');

    try {
      const response = await fetch(`http://localhost:3000/api/unenroll/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to unenroll from the course');
      }

      const data = await response.json();
      alert(data.message); // Optionally display a success message
    } catch (error) {
      setError('Error unenrolling from the course');
      console.error(error);
    } finally {
      setIsUnenrolling(false);
    }
  };

  return (
    <div className="w-1/2 p-6 bg-white border border-gray-200 rounded-lg shadow">
      <a href="#">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{title}</h5>
      </a>
      <p className="mb-3 font-normal text-gray-700">{details}</p>
      <button
        onClick={handleUnenroll}
        disabled={isUnenrolling}
        className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300"
      >
        {isUnenrolling ? 'Unenrolling...' : 'Unenroll'}
        <svg
          className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 10"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M1 5h12m0 0L9 1m4 4L9 9"
          />
        </svg>
      </button>
      {error && (
        <div className="text-sm font-semibold text-red-600 mt-2">
          {error}
        </div>
      )}
    </div>
  );
}
