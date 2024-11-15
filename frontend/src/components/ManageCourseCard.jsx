import { useNavigate } from 'react-router-dom';

export function ManageCourseCard({ title, details, id }) {
  const navigate = useNavigate();

  const handleEditClick = () => {
    if (id) {
      navigate(`/edit-course/${id}`);  // Use the correct `id` here
    } else {
      console.error('Course ID is undefined');
    }
  };

  return (
    <div className="w-1/2 p-6 bg-white border border-gray-200 rounded-lg shadow">
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{title}</h5>
      <p className="mb-3 font-normal text-gray-700">{details}</p>
      <button
        onClick={handleEditClick}
        className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800"
      >
        Edit
      </button>
    </div>
  );
}
